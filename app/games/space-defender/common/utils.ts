import type { Container } from 'pixi.js';

export const randomIntFromInterval = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const destroySprite = (sprite: Container): void => {
	sprite.parent!.removeChild(sprite);
	sprite.destroy({ children: true });
};

export const getCoordX = (x1: number, y1: number, x2: number, y2: number, y: number): number => {
	const k = (y2 - y1) / (x2 - x1);
	return (y - y1) / k + x1;
};
