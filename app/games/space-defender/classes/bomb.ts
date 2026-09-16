import { Sprite, type Container } from 'pixi.js';
import { getTexture } from '../common/assets';
import { involvesSprite, involvesSpriteType, setPosition } from '../common/collisions';
import appConstants from '../common/constants';
import { allTextureKeys } from '../common/textures';
import { getCoordX } from '../common/utils';
import { addExplosion } from '../sprites/explosions';
import { getPlayer } from '../sprites/player';
import type { CollisionEvent, Coord, GameSprite } from '../types';
import { BaseSprite } from './baseSprite';

interface BombOptions {
	container: Container;
	x: number;
	y: number;
	target?: Coord;
}

export class Bomb extends BaseSprite<GameSprite> {
	target: Coord | undefined;

	constructor({ container, x, y, target }: BombOptions) {
		const bomb = new Sprite(getTexture(allTextureKeys.bomb) ?? undefined) as GameSprite;
		bomb.anchor.set(0.5);
		bomb.alive = true;
		bomb.position.x = x;
		bomb.position.y = y;
		bomb.spriteType = appConstants.spriteType.bomb;

		super({
			container,
			sprite: bomb,
			isCentered: true,
		});
		if (target) {
			const angle = Math.atan((target.y - this.y) / (target.x - this.x));
			if (angle < 0) {
				this.sprite!.rotation = angle + Math.PI / 2;
			} else if (angle > 0) {
				this.sprite!.rotation = angle - Math.PI / 2;
			}
		}
		this.target = target;
	}

	override dispose(): void {
		super.dispose();
		this.target = undefined;
	}

	override onTick(): void {
		const currX = this.x;
		const currY = this.y;
		this.y += this.curentLevel.bombSpeed;

		let newX = currX;
		if (this.target) {
			newX = getCoordX(currX, currY, this.target.x, this.target.y, this.y);
		}

		this.x = newX;
		setPosition(this.box!, { x: this.x, y: this.y });
		if (this.y > appConstants.size.HEIGHT || this.x < 0 || this.x > appConstants.size.WIDTH) {
			this.dispose();
		}
	}

	override onRestartGame(): void {
		this.dispose();
	}

	override onCollision(event: CollisionEvent): void {
		if (!involvesSprite(event, this.sprite!)) {
			return;
		}
		if (involvesSpriteType(event, appConstants.spriteType.player)) {
			const player = getPlayer();
			if (!player!.locked) {
				player!.lockPlayer();
				this.destroyMe();
			}
		} else if (involvesSpriteType(event, appConstants.spriteType.man)) {
			// collision with man
			this.destroyMe();
		} else if (involvesSpriteType(event, appConstants.spriteType.bullet)) {
			// collision with bullet
			this.destroyMe();
		}
	}

	override destroyMe(): void {
		addExplosion({ x: this.x, y: this.y + 20 });
		this.dispose();
	}
}
