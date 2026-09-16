import { Container } from 'pixi.js';
import { Bomb } from '../classes/bomb';
import appConstants from '../common/constants';
import { getLevel } from '../common/levels';
import type { Coord, GameApplication, GameContainer } from '../types';

let app: GameApplication | undefined;
let bombs: GameContainer | undefined;
let rootContainer: Container | undefined;

export const initBombs = (currApp: GameApplication, root: Container): GameContainer => {
	bombs = new Container() as GameContainer;
	bombs.customId = appConstants.containers.bombs;
	app = currApp;
	rootContainer = root;
	return bombs;
};

let bombTimeout: ReturnType<typeof setTimeout> | null = null;

export const addBomb = (coord: Coord, target?: Coord): void => {
	if (bombTimeout) {
		return;
	}
	const level = getLevel();
	bombTimeout = setTimeout(() => {
		bombTimeout = null;
	}, level.bombPause);

	new Bomb({ container: bombs!, x: coord.x, y: coord.y + 20, target });
};
