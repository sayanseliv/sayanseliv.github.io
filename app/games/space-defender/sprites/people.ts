import { Container, type Texture } from 'pixi.js';
import { getTexture } from '../common/assets';
import appConstants from '../common/constants';
import { allTextureKeys } from '../common/textures';
import { randomIntFromInterval } from '../common/utils';
import { resetPeople } from '../common/eventHub';
import { Man } from '../classes/man';
import type { GameApplication, GameContainer, GameSprite } from '../types';

let rootContainer: Container | undefined;
let people: GameContainer | undefined;
let aliveCoords: number[] = [];
let peopleFrames: Texture[] | null = null;
let tombStoneFrames: Texture[] | null = null;

export const initPeople = (currApp: GameApplication, root: Container): GameContainer => {
	if (!peopleFrames) {
		peopleFrames = [
			getTexture(allTextureKeys.man)!,
			getTexture(allTextureKeys.man2)!,
			getTexture(allTextureKeys.woman)!,
		];
	}
	if (!tombStoneFrames) {
		tombStoneFrames = [getTexture(allTextureKeys.TombStone1)!, getTexture(allTextureKeys.TombStone2)!];
	}
	people = new Container() as GameContainer;
	people.customId = appConstants.containers.people;
	rootContainer = root;
	return people;
};

let x = 10;
let y = appConstants.size.HEIGHT;

export const recalculateAlivePeople = (): void => {
	const result: number[] = [];
	people!.children.forEach((child) => {
		const person = child as GameSprite;
		if (person.alive) {
			result.push(person.position.x);
		}
	});
	aliveCoords = [...result];
};

export const restorePeople = (): void => {
	aliveCoords.length = 0;
	x = 30;
	y = appConstants.size.HEIGHT;

	while (x < appConstants.size.WIDTH) {
		const man = new Man({
			container: people!,
			x,
			y,
			peopleFrames: peopleFrames!,
			tombStoneFrames: tombStoneFrames!,
		});
		x += man.width + 10;
	}
	resetPeople({ count: people!.children.length });
	recalculateAlivePeople();
};

export const getAlivePeople = (): number[] => {
	return [...aliveCoords];
};

export const getRandomAlivePerson = (): number | null => {
	const allAlive = getAlivePeople();
	if (allAlive.length) {
		return allAlive[randomIntFromInterval(0, allAlive.length - 1)]!;
	}
	return null;
};
