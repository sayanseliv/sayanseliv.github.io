import type { Container } from 'pixi.js';
import { addNode, removeNode } from '../common/collisions';
import appConstants from '../common/constants';
import { EventHub } from '../common/eventHub';
import { getLevel } from '../common/levels';
import { destroySprite } from '../common/utils';
import type { CollisionBox, CollisionEvent, Coord, GameSprite, LevelConfig } from '../types';

interface BaseSpriteOptions<TSprite extends GameSprite> {
	container: Container;
	sprite: TSprite;
	offset?: Coord;
	isCentered?: boolean;
}

export class BaseSprite<TSprite extends GameSprite = GameSprite> {
	startX: number | null;
	startY: number | null;
	container: Container | null;
	sprite: TSprite | null;
	box: CollisionBox<TSprite> | null;
	curentLevel: LevelConfig;

	constructor({ container, sprite, offset, isCentered }: BaseSpriteOptions<TSprite>) {
		this.startX = sprite.position.x;
		this.startY = sprite.position.y;
		this.container = container;

		this.sprite = sprite;

		this.box = addNode(this.sprite, {
			offset,
			isCentered,
		});

		this.container.addChild(this.sprite);

		this.onTick = this.onTick.bind(this);
		this.onCollision = this.onCollision.bind(this);
		this.onRestartGame = this.onRestartGame.bind(this);

		EventHub.on(appConstants.events.tick, this.onTick);
		EventHub.on(appConstants.events.collision, this.onCollision);
		EventHub.on(appConstants.events.restartGame, this.onRestartGame);
		this.curentLevel = getLevel();
	}

	dispose(): void {
		EventHub.off(appConstants.events.tick, this.onTick);
		EventHub.off(appConstants.events.collision, this.onCollision);
		EventHub.off(appConstants.events.restartGame, this.onRestartGame);
		removeNode(this.box!);
		this.box = null;
		destroySprite(this.sprite!);
		this.sprite = null;
		this.startX = null;
		this.startY = null;
		this.container = null;
	}

	onTick(): void {}

	onRestartGame(): void {
		this.dispose();
	}

	onCollision(_event: CollisionEvent): void {}

	get width(): number {
		return this.sprite!.width;
	}

	get height(): number {
		return this.sprite!.height;
	}

	get x(): number {
		return this.sprite!.position.x;
	}

	get y(): number {
		return this.sprite!.position.y;
	}
	set x(value: number) {
		this.sprite!.position.x = value;
	}

	set y(value: number) {
		this.sprite!.position.y = value;
	}

	destroyMe(): void {
		this.dispose();
	}
}
