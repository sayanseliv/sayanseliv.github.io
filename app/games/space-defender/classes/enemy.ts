import { AnimatedSprite, type Container, type Texture } from 'pixi.js';
import { involvesSprite, involvesSpriteType, setPosition } from '../common/collisions';
import appConstants from '../common/constants';
import { ufoDestroyed } from '../common/eventHub';
import { randomIntFromInterval } from '../common/utils';
import { addBomb } from '../sprites/bombs';
import { addEnemy } from '../sprites/enemy';
import { getAlivePeople, getRandomAlivePerson } from '../sprites/people';
import type { CollisionEvent, GameAnimatedSprite } from '../types';
import { BaseSprite } from './baseSprite';

interface EnemyOptions {
	container: Container;
	x: number;
	y: number;
	textures: Texture[];
}

export class Enemy extends BaseSprite<GameAnimatedSprite> {
	#leftDirection: boolean;
	#recreateTimeout: ReturnType<typeof setTimeout> | null;

	constructor({ container, x, y, textures }: EnemyOptions) {
		const enemy = new AnimatedSprite(textures) as GameAnimatedSprite;
		enemy.anchor.set(0.5, 1);
		enemy.position.x = x;
		enemy.position.y = y;
		enemy.animationSpeed = 0.1;

		super({
			container,
			sprite: enemy,
			offset: {
				x: -enemy.width / 2,
				y: -enemy.height,
			},
		});

		this.#leftDirection = Math.random() < 0.5 ? true : false;
		this.#recreateTimeout = null;
	}

	override dispose(): void {
		super.dispose();
		if (this.#recreateTimeout) {
			clearTimeout(this.#recreateTimeout);
			this.#recreateTimeout = null;
		}
	}

	get left(): boolean {
		return this.#leftDirection;
	}

	override onTick(): void {
		let directionChanged = false;
		if (this.left) {
			this.x -= 1 * this.curentLevel.enemySpeed;
			if (this.x < 20) {
				this.#leftDirection = false;
				directionChanged = true;
			}
		} else {
			this.x += 1 * this.curentLevel.enemySpeed;
			if (this.x > appConstants.size.WIDTH - 20) {
				this.#leftDirection = true;
				directionChanged = true;
			}
		}

		if (
			!directionChanged &&
			Math.random() * 100 < appConstants.probability.enemyChangeDirection
		) {
			this.#leftDirection = !this.left;
			const idx = randomIntFromInterval(0, 1);
			this.sprite!.gotoAndStop(idx);
		}
		const allAlive = getAlivePeople();
		const underPerson = allAlive.filter((personX) => {
			return personX - 10 <= this.x && personX + 10 >= this.x;
		});

		if (underPerson.length) {
			if (Math.random() * 100 < this.curentLevel.bombProbability) {
				//generate bomb
				addBomb({ x: this.x, y: this.y });
			}
		} else {
			if (Math.random() * 100 < this.curentLevel.bombProbability / 4) {
				//generate bomb
				if (Math.random() < 0.2) {
					const x = getRandomAlivePerson();

					addBomb(
						{ x: this.x, y: this.y },
						{ x: x!, y: appConstants.size.HEIGHT - this.height / 2 },
					);
				} else {
					addBomb({ x: this.x, y: this.y });
				}
			}
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
		if (involvesSpriteType(event, appConstants.spriteType.shoot)) {
			this.destroyMe();
		}
	}

	override destroyMe(): void {
		//addExplosion({ x: this.x, y: this.y - 20 });
		const y = this.y;
		this.dispose();
		ufoDestroyed();
		this.#recreateTimeout = setTimeout(() => {
			addEnemy(y);
			this.#recreateTimeout = null;
		}, 1000);
	}
}
