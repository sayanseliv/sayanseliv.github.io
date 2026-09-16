import { AnimatedSprite, Container, Texture } from 'pixi.js';
import appConstants from '../common/constants';
import { play } from '../common/sound';
import { randomIntFromInterval, destroySprite } from '../common/utils';
import type { Coord, GameApplication, GameContainer } from '../types';

let app: GameApplication | undefined;
let explosions: GameContainer | undefined;

const explosionTypes = [
	'Explosion_Sequence',
	'Explosion_Sequence1',
	'Explosion_Sequence2',
	'Explosion_Sequence3',
];

const explosionTextures: Record<string, Texture[]> = {};

export const initExplosions = (currApp: GameApplication, root: Container): GameContainer => {
	explosions = new Container() as GameContainer;
	explosions.customId = appConstants.containers.explosions;
	app = currApp;
	root.addChild(explosions);
	return explosions;
};

export const addExplosion = (coords: Coord): void => {
	const idx = randomIntFromInterval(0, explosionTypes.length - 1);
	const explosionType = explosionTypes[idx]!;
	let textures: Texture[];
	if (explosionTextures[explosionType]) {
		textures = explosionTextures[explosionType];
	} else {
		textures = [];
		for (let i = 0; i < 12; i++) {
			const texture = Texture.from(`${explosionType} ${i + 1}.png`);
			textures.push(texture);
		}
		explosionTextures[explosionType] = textures;
	}

	const explosion = new AnimatedSprite(textures);
	explosion.loop = false;
	explosion.animationSpeed = 0.2;
	explosion.anchor.set(0.5);
	explosion.position.set(coords.x, coords.y);
	explosions!.addChild(explosion);
	explosion.onComplete = function () {
		destroySprite(this);
	};
	explosion.play();
	play(appConstants.sounds.explosion);
};
