import * as PIXI from 'pixi.js';
import { loadAssets } from './common/assets';
import appConstants from './common/constants';
import { initBullets } from './sprites/bullets';
import { addPlayer, getPlayer } from './sprites/player';
import { initPeople, restorePeople } from './sprites/people';
import { initEnemies, addEnemies } from './sprites/enemy';
import { initBombs } from './sprites/bombs';
import { initExplosions } from './sprites/explosions';
import { initInfo } from './sprites/infoPanel';
import { EventHub } from './common/eventHub';
import { play, stopAll } from './common/sound';
import {
	detachMessages,
	getGameOver,
	getLevelMessage,
	getYouWin,
	isLevelMessageActive,
} from './sprites/messages';
import { checkCollisions, clearCollisions } from './common/collisions';
import { getLevelNumber, isLastLevel, nextLevel, resetLevel } from './common/levels';
import { addBackground, setBackgroundForLevel } from './sprites/background';
import type { GameApplication } from './types';

const WIDTH = appConstants.size.WIDTH;
const HEIGHT = appConstants.size.HEIGHT;

let rootContainer: PIXI.Container | undefined;
let tickMode = true;

let app: GameApplication | undefined;

let keydownHandler: ((event: KeyboardEvent) => void) | undefined;

let sessionToken = 0;

const createScene = async (mountElement: HTMLElement): Promise<GameApplication> => {
	const pixiApp = new PIXI.Application() as GameApplication;
	await pixiApp.init({
		width: WIDTH,
		height: HEIGHT,
		antialias: true,
		transparent: false,
		resolution: 1,
		background: '#000000',
	} as Partial<PIXI.ApplicationOptions>);

	pixiApp.gameState = {
		stopped: false,
		moveLeftActive: false,
		moveRightActive: false,
		mousePosition: 0,
	};

	mountElement.appendChild(pixiApp.canvas);
	rootContainer = pixiApp.stage;
	rootContainer.eventMode = 'static';
	rootContainer.hitArea = pixiApp.screen;

	app = pixiApp;

	return pixiApp;
};

const startLevelOrShoot = (): void => {
	if (isLevelMessageActive()) {
		EventHub.emit(appConstants.events.restartGame, appConstants.events.levelMessage);
	} else {
		getPlayer()?.shoot();
	}
};

const initInteraction = (): void => {
	app!.gameState.mousePosition = appConstants.size.WIDTH / 2;

	app!.stage.addEventListener('pointermove', (event) => {
		app!.gameState.mousePosition = event.global.x;
	});

	app!.stage.addEventListener('pointertap', startLevelOrShoot);

	keydownHandler = (event) => {
		if (event.code !== 'Space' && event.code !== 'Enter') {
			return;
		}
		startLevelOrShoot();
	};
	document.addEventListener('keydown', keydownHandler);

	app!.ticker.add((delta) => {
		if (tickMode) {
			EventHub.emit(appConstants.events.tick, delta);
		} else {
			checkCollisions((a, b) => {
				if (a.sprite.spriteType !== b.sprite.spriteType) {
					EventHub.emit(appConstants.events.collision, { a, b });
				}
			});
		}

		tickMode = !tickMode;
	});
};

export const initGame = async (mountElement: HTMLElement): Promise<void> => {
	const token = ++sessionToken;

	const pixiApp = await createScene(mountElement);

	loadAssets((progress) => {
		if (progress === 'all') {
			if (token !== sessionToken) {
				return;
			}

			addBackground(pixiApp, rootContainer!);
			initInfo(pixiApp, rootContainer!);

			const bullets = initBullets(pixiApp, rootContainer!);
			rootContainer!.addChild(bullets);

			const people = initPeople(pixiApp, rootContainer!);
			rootContainer!.addChild(people);

			const enemies = initEnemies(pixiApp, rootContainer!);
			rootContainer!.addChild(enemies);

			const bombs = initBombs(pixiApp, rootContainer!);
			rootContainer!.addChild(bombs);

			initExplosions(pixiApp, rootContainer!);
			initInteraction();
			rootContainer!.addChild(getLevelMessage(getLevelNumber() + 1));
		}
	});
};

const restartGame = (): void => {
	setTimeout(() => {
		if (!app) {
			return;
		}
		setBackgroundForLevel();
		addPlayer(app, rootContainer!);
		addEnemies();
		restorePeople();
	}, 0);
};

EventHub.on(appConstants.events.youWin, () => {
	app!.ticker.stop();
	if (isLastLevel()) {
		rootContainer!.addChild(getYouWin());
		setTimeout(() => play(appConstants.sounds.youWin), 1000);
	} else {
		nextLevel();
		rootContainer!.addChild(getLevelMessage(getLevelNumber() + 1));
	}
});

EventHub.on(appConstants.events.gameOver, () => {
	app!.ticker.stop();
	rootContainer!.addChild(getGameOver());
	setTimeout(() => play(appConstants.sounds.gameOver), 1000);
});

EventHub.on(appConstants.events.restartGame, (event: string) => {
	if (event === appConstants.events.gameOver) {
		rootContainer!.removeChild(getGameOver());
		resetLevel();
		rootContainer!.addChild(getLevelMessage(getLevelNumber() + 1));
	}
	if (event === appConstants.events.youWin) {
		rootContainer!.removeChild(getYouWin());
		resetLevel();
		restartGame();
	}
	if (event === appConstants.events.levelMessage) {
		rootContainer!.removeChild(getLevelMessage());
		restartGame();
	}
	app!.ticker.start();
});

export const destroyGame = (): void => {
	if (!app) {
		return;
	}

	sessionToken += 1;

	if (keydownHandler) {
		document.removeEventListener('keydown', keydownHandler);
		keydownHandler = undefined;
	}

	// disposes every live sprite (player, enemies, bullets, bombs, people): unsubscribes
	// their tick/collision/restartGame listeners so they don't keep firing against
	// sprites this teardown is about to destroy
	EventHub.emit(appConstants.events.restartGame, 'destroy');

	detachMessages();
	app.destroy(true, { children: true });
	app = undefined;
	rootContainer = undefined;

	stopAll();
	clearCollisions();
	resetLevel();
};
