import { Sprite, type Container, type Texture } from 'pixi.js';
import { setPosition } from '../common/collisions';
import appConstants from '../common/constants';
import { manKilled } from '../common/eventHub';
import { randomIntFromInterval } from '../common/utils';
import { recalculateAlivePeople } from '../sprites/people';
import type { CollisionEvent, GameSprite } from '../types';
import { BaseSprite } from './baseSprite';

interface ManOptions {
	container: Container;
	x: number;
	y: number;
	index?: string;
	peopleFrames: Texture[];
	tombStoneFrames: Texture[];
}

export class Man extends BaseSprite<GameSprite> {
	peopleFrames: Texture[] | null;
	tombStoneFrames: Texture[] | null;

	constructor({ container, x, y, index, peopleFrames, tombStoneFrames }: ManOptions) {
		const man = new Sprite(
			peopleFrames[randomIntFromInterval(0, peopleFrames.length - 1)],
		) as GameSprite;
		man.anchor.set(0.5, 1);
		man.customId = index;
		man.alive = true;
		man.position.x = x;
		man.position.y = y;
		man.spriteType = appConstants.spriteType.man;

		super({
			container,
			sprite: man,
			offset: {
				x: -man.width / 2,
				y: -man.height,
			},
		});

		this.peopleFrames = peopleFrames;
		this.tombStoneFrames = tombStoneFrames;
	}

	override dispose(): void {
		super.dispose();
		this.peopleFrames = null;
		this.tombStoneFrames = null;
	}

	override onTick(): void {
		if (this.y > this.startY!) {
			this.y -= 1;
			setPosition(this.box!, { x: this.startX!, y: this.y });
		}
	}

	override onRestartGame(): void {
		this.dispose();
	}

	override onCollision(event: CollisionEvent): void {
		const { a, b } = event;
		if (a.sprite === this.sprite || b.sprite === this.sprite) {
			this.destroyMe();
		}
	}

	override destroyMe(): void {
		if (this.sprite!.alive) {
			this.sprite!.alive = false;
			manKilled();
			this.sprite!.texture =
				this.tombStoneFrames![randomIntFromInterval(0, this.tombStoneFrames!.length - 1)]!;
			this.sprite!.position.y = this.startY! + 100;
			setPosition(this.box!, { x: this.startX!, y: this.startY! + 100 });
			recalculateAlivePeople();
		} else {
			this.dispose();
		}
	}
}
