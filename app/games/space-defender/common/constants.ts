const HEADER_HEIGHT_PX = 48;

const appConstants = {
	size: {
		WIDTH: window.innerWidth ? window.innerWidth : 800,
		HEIGHT: window.innerHeight ? window.innerHeight - HEADER_HEIGHT_PX : 600,
	},
	containers: {
		player: 'player',
		bullets: 'bullets',
		people: 'people',
		enemies: 'enemies',
		bombs: 'bombs',
		explosions: 'explosions',
		infoPanel: 'infoPanel',
		background: 'background',
	},
	timeouts: {
		playerLock: 2000,
		playerShoots: 100,
	},
	probability: {
		enemyChangeDirection: 1,
		bomb: 3,
	},
	events: {
		infoUpdated: 'indoUpdated',
		ufoDestroyed: 'ufoDestroyed',
		manKilled: 'manKilled',
		bombDestroyed: 'bombDestroyed',
		youWin: 'youWin',
		levelMessage: 'levelMessage',
		gameOver: 'gameOver',
		restartGame: 'restartGame',
		resetPeople: 'resetPeople',
		tick: 'tick',
		collision: 'collision',
	},
	sounds: {
		shot: 'shot',
		miss: 'miss',
		explosion: 'explosion',
		gameOver: 'gameOver',
		youWin: 'youWin',
		background: 'background',
	},
	// indexed dynamically with keys that don't always exist (e.g. 'enemy', 'shoot') —
	// kept as a loose dictionary rather than a literal type to preserve that behavior
	spriteType: {
		player: 'player',
		bullet: 'bullet',
		man: 'man',
		tombStone: 'tombStone',
		bomb: 'bomb',
	} as Record<string, string>,
};

export default appConstants;
