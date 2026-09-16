import { Sprite, type Container } from 'pixi.js';
import { getTexture } from '../common/assets';
import { involvesSprite, involvesSpriteType, setPosition } from '../common/collisions';
import appConstants from '../common/constants';
import { play } from '../common/sound';
import { allTextureKeys } from '../common/textures';
import { addBullet } from '../sprites/bullets';
import type { CollisionEvent, GameApplication, GameSprite } from '../types';
import { BaseSprite } from './baseSprite';

interface PlayerOptions {
	container: Container;
	x: number;
	y: number;
	app: GameApplication;
}

export class Player extends BaseSprite<GameSprite> {
	#lockedState: false | null | ReturnType<typeof setTimeout>;
	#shotTimeout: false | ReturnType<typeof setTimeout>;
	app: GameApplication;

	constructor({ container, x, y, app }: PlayerOptions) {
		const player = new Sprite(getTexture(allTextureKeys.spaceShip) ?? undefined) as GameSprite;
		player.customId = appConstants.containers.player;
		player.anchor.set(0.5);
		player.position.x = x;
		player.position.y = y;
		player.spriteType = appConstants.spriteType.player;

		super({
			container,
			sprite: player,
			isCentered: true,
		});

		this.app = app;
		this.#lockedState = false;
		this.#shotTimeout = false;
	}

	override dispose(): void {
		super.dispose();
	}

	override onTick(): void {
		if (this.#lockedState) {
			this.sprite!.alpha = 0.5;
		} else {
			this.sprite!.alpha = 1;
		}

		const playerPosition = this.x;

		this.x = this.app.gameState.mousePosition;

		if (this.x < playerPosition) {
			this.sprite!.rotation = -0.3;
		} else if (this.x > playerPosition) {
			this.sprite!.rotation = 0.3;
		} else {
			this.sprite!.rotation = 0;
		}
	}

	override get x(): number {
		return super.x;
	}

	override set x(value: number) {
		super.x = value;
		setPosition(this.box!, { x: value, y: this.y });
	}

	override onRestartGame(): void {
		this.dispose();
	}

	override onCollision(event: CollisionEvent): void {
		if (!involvesSprite(event, this.sprite!)) {
			return;
		}
		if (involvesSpriteType(event, appConstants.spriteType.bomb)) {
			//
		}
	}
	shoot(): void {
		if (!this.#lockedState) {
			if (this.#shotTimeout) {
				//  play(appConstants.sounds.miss);

				return;
			} else {
				addBullet({ x: this.x, y: this.y });
				play(appConstants.sounds.shot);
				this.#shotTimeout = setTimeout(() => {
					this.#shotTimeout = false;
				}, this.curentLevel.shotPause);
			}
		}
	}

	lockPlayer(): void {
		if (!this.#lockedState) {
			this.#lockedState = setTimeout(() => {
				this.#lockedState = null;
			}, this.curentLevel.playerLockTime);
		}
	}

	get locked(): false | null | ReturnType<typeof setTimeout> {
		return this.#lockedState;
	}

	override destroyMe(): void {}
}
