import { System, Box, SATVector, type BodyOptions } from 'detect-collisions';
import type { CollisionBox, Coord, GameSprite } from '../types';

const system = new System();

interface AddNodeOptions extends Omit<BodyOptions, 'userData'> {
	offset?: Coord;
}

export const addNode = <TSprite extends GameSprite>(
	sprite: TSprite,
	{ offset, ...rest }: AddNodeOptions = {},
): CollisionBox<TSprite> => {
	const box = new Box(
		{
			x: sprite.position.x,
			y: sprite.position.y,
		},
		sprite.width,
		sprite.height,
		{
			...rest,
		},
	) as CollisionBox<TSprite>;
	if (offset) {
		box.setOffset(new SATVector(offset.x, offset.y));
	}
	box.sprite = sprite;
	system.insert(box);
	return box;
};

export const removeNode = (node: CollisionBox): void => {
	system.remove(node);
};

export const setPosition = (node: CollisionBox, { x, y }: Coord): void => {
	node.setPosition(x, y);
};

export const checkCollisions = (
	callback: (a: CollisionBox, b: CollisionBox) => void,
): void => {
	system.checkAll((response) => {
		callback(response.a as CollisionBox, response.b as CollisionBox);
	});
};

export const clearCollisions = (): void => {
	system.clear();
};
