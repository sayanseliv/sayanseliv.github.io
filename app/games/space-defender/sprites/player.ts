import type { Container } from 'pixi.js';
import appConstants from '../common/constants';
import { Player } from '../classes/player';
import type { GameApplication } from '../types';

let player: Player | undefined;
let app: GameApplication | undefined;

export const addPlayer = (currApp: GameApplication, root: Container): Player => {
	app = currApp;

	player = new Player({
		container: root,
		x: appConstants.size.WIDTH / 2,
		y: appConstants.size.HEIGHT - 200,
		app: currApp,
	});

	return player;
};

export const getPlayer = (): Player | undefined =>
	player && player.sprite ? player : undefined;
