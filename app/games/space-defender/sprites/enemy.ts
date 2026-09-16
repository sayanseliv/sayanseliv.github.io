import { getRandomAlivePerson } from './people';
import { allTextureKeys } from '../common/textures';
import { getTexture } from '../common/assets';
import { Container, type Texture } from 'pixi.js';
import appConstants from '../common/constants';
import { randomIntFromInterval } from '../common/utils';
import { Enemy } from '../classes/enemy';
import { getLevel } from '../common/levels';
import type { GameApplication, GameContainer } from '../types';

let enemies: GameContainer | undefined;
let app: GameApplication | undefined;
let rootContainer: Container | undefined;

export const initEnemies = (currApp: GameApplication, root: Container): GameContainer => {
	enemies = new Container() as GameContainer;
	enemies.customId = appConstants.containers.enemies;
	app = currApp;
	rootContainer = root;
	return enemies;
};

export const addEnemies = (): void => {
	const textures: Texture[] = [
		getTexture(allTextureKeys.shipBlue)!,
		getTexture(allTextureKeys.shipBlue2)!,
	];

	const curentLevel = getLevel();
	const y = 80;
	for (let i = 0; i < curentLevel.enemyCount; i++) {
		const alivePerson = getRandomAlivePerson();
		let x: number;
		if (alivePerson) {
			x = alivePerson;
		} else {
			x = randomIntFromInterval(20, appConstants.size.WIDTH - 20);
		}

		new Enemy({ container: rootContainer!, x, y: y + 30 * i, textures });
	}
};

export const addEnemy = (y: number): void => {
	const textures: Texture[] = [
		getTexture(allTextureKeys.shipBlue)!,
		getTexture(allTextureKeys.shipBlue2)!,
	];

	const curentLevel = getLevel();
	//const y = 80;
	const count = enemies!.children.length;
	if (curentLevel.enemyCount > count) {
		const alivePerson = getRandomAlivePerson();
		let x: number;
		if (alivePerson) {
			x = alivePerson;
		} else {
			x = randomIntFromInterval(20, appConstants.size.WIDTH - 20);
		}

		new Enemy({ container: rootContainer!, x, y, textures });
	}
};
