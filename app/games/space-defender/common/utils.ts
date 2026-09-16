import type { Container } from 'pixi.js';

export const randomIntFromInterval = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const checkCollision = (obj1?: Container, obj2?: Container): boolean => {
	if (obj1 && obj2) {
		const bounds1 = obj1.getBounds();
		const bounds2 = obj2.getBounds();

		return (
			bounds1.x < bounds2.x + bounds2.width &&
			bounds1.y < bounds2.y + bounds2.height &&
			bounds2.x < bounds1.x + bounds1.width &&
			bounds2.y < bounds1.y + bounds1.height
		);
	}
	return false;
};

export const destroySprite = (sprite: Container): void => {
	sprite.parent!.removeChild(sprite);
	sprite.destroy({ children: true });
};

export const getCoordX = (x1: number, y1: number, x2: number, y2: number, y: number): number => {
	const k = (y2 - y1) / (x2 - x1);
	return (y - y1) / k + x1;
};

export const getCoordXangle = (x1: number, y1: number, angle: number, y: number): number => {
	const result = (y1 - y) / Math.tan(angle > 0 ? 1 - angle : Math.abs(angle) - 1) + x1;
	return result;
};
