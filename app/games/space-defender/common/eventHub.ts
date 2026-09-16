import { EventEmitter } from 'pixi.js';
import appConstants from './constants';

export const EventHub = new EventEmitter();

export const ufoDestroyed = (data?: unknown): void => {
	EventHub.emit(appConstants.events.ufoDestroyed, data);
};
export const manKilled = (data?: unknown): void => {
	EventHub.emit(appConstants.events.manKilled, data);
};
export const youWin = (data?: unknown): void => {
	EventHub.emit(appConstants.events.youWin, data);
};
export const gameOver = (data?: unknown): void => {
	EventHub.emit(appConstants.events.gameOver, data);
};
export const restartGame = (data?: unknown): void => {
	EventHub.emit(appConstants.events.restartGame, data);
};
export const resetPeople = (data?: unknown): void => {
	EventHub.emit(appConstants.events.resetPeople, data);
};
