import type { AnimatedSprite, Application, Container, Sprite, Text } from 'pixi.js';
import type { Box } from 'detect-collisions';

export interface CustomIdExpando {
	customId?: string;
}

export interface SpriteExpando extends CustomIdExpando {
	spriteType?: string;
	alive?: boolean;
}

export type GameSprite = Sprite & SpriteExpando;
export type GameAnimatedSprite = AnimatedSprite & SpriteExpando;
export type GameContainer = Container & CustomIdExpando;
export type GameText = Text & CustomIdExpando;

export type CollisionBox<TSprite extends GameSprite = GameSprite> = Box & { sprite: TSprite };

export interface CollisionEvent<TSprite extends GameSprite = GameSprite> {
	a: CollisionBox<TSprite>;
	b: CollisionBox<TSprite>;
}

export interface LevelConfig {
	bombSpeed: number;
	enemySpeed: number;
	bulletSpeed: number;
	enemyCount: number;
	playerLockTime: number;
	shotPause: number;
	bombProbability: number;
	bombPause: number;
}

export interface GameState {
	stopped: boolean;
	moveLeftActive: boolean;
	moveRightActive: boolean;
	mousePosition: number;
}

export type GameApplication = Application & { gameState: GameState };

export interface Coord {
	x: number;
	y: number;
}
