import { Texture, Container } from 'pixi.js';
import { Bullet } from '../classes/bullet';
import appConstants from '../common/constants';
import type { Coord, GameApplication, GameContainer } from '../types';

let bullets: GameContainer | undefined;

const bulletTypes = ['Bullet_Sequence1', 'Bullet_Sequence2'];

const allTextures: Record<string, Texture[]> = {};

export const initBullets = (currApp: GameApplication, root: Container): GameContainer => {
	bullets = new Container() as GameContainer;
	bullets.customId = appConstants.containers.bullets;
	return bullets;
};

export const addBullet = (coord: Coord): void => {
	const bulletType = bulletTypes[Math.floor(Math.random() * bulletTypes.length)]!;

	let textures: Texture[] = [];
	if (allTextures[bulletType]) {
		textures = allTextures[bulletType];
	} else {
		for (let i = 0; i < 6; i++) {
			const texture = Texture.from(`${bulletType} ${i + 1}.png`);
			textures.push(texture);
		}
		allTextures[bulletType] = textures;
	}

	new Bullet({
		container: bullets!,
		x: coord.x,
		y: coord.y,
		textures,
	});
};
