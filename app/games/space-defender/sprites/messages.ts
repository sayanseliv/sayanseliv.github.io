import { Container, Graphics, Text, TextStyle, FillGradient } from 'pixi.js';
import appConstants from '../common/constants';
import { restartGame } from '../common/eventHub';

const gradient = new FillGradient({
	type: 'linear',
	start: { x: 0, y: 0 }, // Start at top
	end: { x: 0, y: 1 },
	colorStops: [
		{ offset: 0, color: 0xffffff },
		{ offset: 1, color: 0x00ff99 },
	],
	textureSpace: 'local',
});

const style = new TextStyle({
	fontFamily: 'Arial',
	fontSize: 36,
	fontStyle: 'normal',
	fontWeight: 'bold',
	fill: gradient,
	stroke: { color: 0x4a1850, width: 5, join: 'round' },
	dropShadow: { color: 0x000000, blur: 4, distance: 6 },
	wordWrap: true,
	wordWrapWidth: 440,
});

const createMessageBox = (initialText: string): { container: Container; text: Text } => {
	const container = new Container();
	container.eventMode = 'static';

	const graphics = new Graphics();
	graphics.stroke({ width: 1, color: 0xff00ff, alpha: 1 });
	graphics.fill({ color: 0x650a5a, alpha: 0.25 });
	graphics.roundRect(0, 0, 250, 100, 16);
	container.addChild(graphics);

	const text = new Text({ text: initialText, style });
	text.anchor.set(0.5);
	text.x = 250 / 2;
	text.y = 100 / 2;
	container.addChild(text);

	return { container, text };
};

const centerMessage = (message: Container): Container => {
	message.position.x = appConstants.size.WIDTH / 2 - message.width / 2;
	message.position.y = appConstants.size.HEIGHT / 2 - message.height / 2;
	return message;
};

const { container: gameOverMessage } = createMessageBox('Game Over');
gameOverMessage.on('pointertap', () => {
	restartGame(appConstants.events.gameOver);
});

export const getGameOver = (): Container => centerMessage(gameOverMessage);

const { container: youWinMessage } = createMessageBox('You Win!');
youWinMessage.on('pointertap', () => {
	restartGame(appConstants.events.youWin);
});

export const getYouWin = (): Container => centerMessage(youWinMessage);

const { container: levelMessage, text: levelText } = createMessageBox('Level ');

export const getLevelMessage = (level?: number): Container => {
	levelText.text = 'Level ' + level;
	return centerMessage(levelMessage);
};

export const isLevelMessageActive = (): boolean => levelMessage.parent !== null;

export const detachMessages = (): void => {
	[gameOverMessage, youWinMessage, levelMessage].forEach((message) => {
		if (message.parent) {
			message.parent.removeChild(message);
		}
	});
};
