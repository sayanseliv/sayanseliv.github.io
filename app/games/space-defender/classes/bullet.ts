import { AnimatedSprite, ColorMatrixFilter, type Container, type Texture } from 'pixi.js';
import { involvesSprite, involvesSpriteType, setPosition } from '../common/collisions';
import appConstants from '../common/constants';
import { play } from '../common/sound';
import { addExplosion } from '../sprites/explosions';
import type { CollisionEvent, GameAnimatedSprite } from '../types';
import { BaseSprite } from './baseSprite';

interface BulletOptions {
	container: Container;
	x: number;
	y: number;
	textures: Texture[];
}

export class Bullet extends BaseSprite<GameAnimatedSprite> {
	constructor({ container, x, y, textures }: BulletOptions) {
		const bullet = new AnimatedSprite(textures) as GameAnimatedSprite;
		const filter = new ColorMatrixFilter();
		bullet.loop = false;
		const { matrix } = filter;
		matrix[1] = Math.sin(Math.random() * 10);
		matrix[2] = Math.cos(Math.random() * 10);
		matrix[3] = Math.cos(Math.random() * 10);
		matrix[4] = Math.sin(Math.random() * 10);
		matrix[5] = Math.sin(Math.random() * 10);
		matrix[6] = Math.sin(Math.random() * 10);
		bullet.filters = [filter];
		bullet.animationSpeed = 0.2;
		bullet.anchor.set(0.5);
		bullet.position.set(x, y - 50);
		bullet.spriteType = appConstants.spriteType.bullet;

		super({
			container,
			sprite: bullet,
			isCentered: true,
		});

		this.sprite!.play();
		play(appConstants.sounds.shot);
	}

	override dispose(): void {
		super.dispose();
	}

	override onTick(): void {
		this.y -= this.curentLevel.bulletSpeed;
		setPosition(this.box!, { x: this.x, y: this.y });
		if (this.y < 0) {
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
		if (involvesSpriteType(event, appConstants.spriteType.bomb)) {
			this.dispose();
		} else if (involvesSpriteType(event, appConstants.spriteType.enemy)) {
			// people destroy
			this.destroyMe();
		}
	}

	override destroyMe(): void {
		addExplosion({ x: this.x, y: this.y - 20 });
		this.dispose();
	}
}
