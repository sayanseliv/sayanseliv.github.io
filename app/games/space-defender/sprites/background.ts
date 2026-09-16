import { Sprite, type Container } from 'pixi.js';
import { getTexture } from '../common/assets';
import appConstants from '../common/constants';
import { getLevelNumber } from '../common/levels';
import { allTextureKeys } from '../common/textures';
import type { GameApplication, GameSprite } from '../types';

let app: GameApplication | undefined;
let rootContainer: Container | undefined;
let background: GameSprite | undefined;

export const addBackground = (currApp: GameApplication, root: Container): GameSprite => {
	app = currApp;
	rootContainer = root;

	background = new Sprite(getTexture(allTextureKeys.background1) ?? undefined) as GameSprite;
	background.customId = appConstants.containers.background;

	background.width = appConstants.size.WIDTH;
	background.height = appConstants.size.HEIGHT;

	rootContainer.addChild(background);

	return background;
};

export const setBackgroundForLevel = (): void => {
	const level = getLevelNumber();
	const key = (allTextureKeys as Record<string, string>)[`background${level + 1}`]!;
	background!.texture = getTexture(key)!;
};
