<template>
	<div class="platformer">
		<div class="platformer__header">
			<h2>🎮 Chase Game</h2>
			<div class="platformer__game-stats">
				<div class="platformer__stat">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="red">
						<path
							d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
					</svg>
					<span>{{ gameState.lives }}</span>
				</div>
				<div class="platformer__stat">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="gold">
						<circle cx="12" cy="12" r="10" />
						<circle cx="12" cy="12" r="6" fill="yellow" />
					</svg>
					<span>{{ gameState.score }}</span>
				</div>
			</div>
		</div>

		<div ref="gameArea" class="platformer__block">
			<div
				ref="player"
				class="platformer__heroic"
				:style="{ left: positions.player.x + 'px', top: positions.player.y + 'px' }" />
			<div
				ref="enemy"
				class="platformer__enemy"
				:style="{ left: positions.enemy.x + 'px', top: positions.enemy.y + 'px' }" />
			<div
				v-if="isShowContextMenu"
				class="platformer__contextmenu"
				:style="{ left: contextMenuPos.x + 'px', top: contextMenuPos.y + 'px' }">
				<button
					v-for="item in menuItems"
					:key="item.action"
					class="platformer__btn-main"
					@click="menuActions[item.action as keyof typeof menuActions]">
					{{ item.title }}
				</button>
			</div>
			<div
				v-for="wall in walls"
				:key="wall.id"
				class="platformer__wall"
				:style="{
					left: wall.x + 'px',
					top: wall.y + 'px',
					width: wall.width + 'px',
					height: wall.height + 'px',
				}" />
			<div
				v-for="coin in coins"
				:key="coin.id"
				class="platformer__coin"
				:style="{
					left: coin.x + 'px',
					top: coin.y + 'px',
				}" />
			<div class="platformer__instructions">
				Arrows - move | RMB - menu | Collect coins, avoid red!
			</div>
		</div>

		<div v-if="showGameOver" class="platformer__game-over">
			<h2>{{ gameOverMessage }}</h2>
			<p>{{ finalScoreMessage }}</p>
			<button class="platformer__restart" @click="restartGame">Restart</button>
		</div>
	</div>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'PlatformerChaseGame',
});
interface Stats {
	lives: number;
	score: number;
	gameRunning: boolean;
	invulnerable: boolean;
}
interface Coords {
	x: number;
	y: number;
}
interface Positions {
	player: Coords;
	enemy: Coords;
}
interface Wall {
	id: number;
	x: number;
	y: number;
	width: number;
	height: number;
}
interface Coin {
	id: number;
	x: number;
	y: number;
	collected: boolean;
}
const gameState = reactive<Stats>({ lives: 3, score: 0, gameRunning: true, invulnerable: false });
const lastDamageTime = ref<number>(0);

const GAME_CONFIG = {
	HEADER_HEIGHT: 60,
	PLAYER_SPEED: 5,
	ENEMY_SPEED: 2,
	COIN_COUNT: 8,
	WALL_COUNT: 6,
	BORDER_OFFSET: 2,
	INVULNERABILITY_TIME: 2000,
} as const;

// Elements
const player = ref<HTMLElement | null>(null);
const enemy = ref<HTMLElement | null>(null);
const gameArea = ref<HTMLElement | null>(null);

const keys = ref<Record<string, boolean>>({});

// Position
const positions = reactive<Positions>({
	player: { x: 20, y: 0 },
	enemy: { x: 0, y: 0 },
});

// Array objects
const walls = ref<Wall[]>([]);
const coins = ref<Coin[]>([]);

// Context menu
const isShowContextMenu = ref<boolean>(false);
const contextMenuPos = reactive({ x: 0, y: 0 });
const menuItems = [
	{ title: 'Pause', action: 'togglePause' },
	{ title: 'Restart', action: 'restart' },
	{ title: 'Teleport', action: 'teleport' },
];
const menuActions = {
	togglePause: () => {
		gameState.gameRunning = !gameState.gameRunning;
		hideContextMenu();
	},
	restart: () => {
		restartGame();
		hideContextMenu();
	},
	teleport: () => {
		teleportPlayer();
		hideContextMenu();
	},
};

// Game Over Screen
const gameOverMessage = ref<string>('');
const finalScoreMessage = ref<string>('');
const showGameOver = ref<boolean>(false);

const createWalls = () => {
	if (!gameArea.value) return;
	const areaWidth = gameArea.value.clientWidth;
	const areaHeight = gameArea.value.clientHeight;

	walls.value = [];

	for (let i = 0; i < GAME_CONFIG.WALL_COUNT; i++) {
		walls.value.push({
			id: i,
			x: Math.random() * (areaWidth - 80),
			y: Math.random() * (areaHeight - 120),
			width: 80,
			height: 120,
		});
	}
};

const createCoins = () => {
	if (!gameArea.value) return;
	const areaWidth = gameArea.value.clientWidth;
	const areaHeight = gameArea.value.clientHeight;

	coins.value = [];

	for (let i = 0; i < GAME_CONFIG.COIN_COUNT; i++) {
		let x: number, y: number;

		let validPosition = false;

		let attempts = 0;

		while (!validPosition && attempts < 50) {
			x = Math.random() * (areaWidth - 40);
			y = Math.random() * (areaHeight - 40);

			validPosition = !walls.value.some(
				(wall) =>
					x! < wall.x + wall.width + 30 &&
					x! + 20 > wall.x - 30 &&
					y! < wall.y + wall.height + 30 &&
					y! + 20 > wall.y - 30
			);

			attempts++;
		}

		coins.value.push({
			id: i,
			x: x!,
			y: y!,
			collected: false,
		});
	}
};

const setInitPlayer = () => {
	if (!gameArea.value) return;
	const areaWidth = gameArea.value.clientWidth;
	const areaHeight = gameArea.value.clientHeight;

	const playerWidth = 40;
	const playerHeight = 40;

	const x = 20;

	let y = areaHeight / 2 - GAME_CONFIG.HEADER_HEIGHT;

	let attempts = 0;

	let validPosition = false;

	while (!validPosition && attempts < 50) {
		validPosition = !walls.value.some(
			(wall) =>
				x < wall.x + wall.width &&
				x + playerWidth > wall.x &&
				y < wall.y + wall.height &&
				y + playerHeight > wall.y
		);

		if (!validPosition) {
			y = Math.random() * (areaHeight - playerHeight);
		}

		attempts++;
	}

	positions.player.x = x;

	positions.player.y = y;

	positions.enemy.x = areaWidth - 60;

	positions.enemy.y = areaHeight / 3 - GAME_CONFIG.HEADER_HEIGHT;
};

const moveEnemy = () => {
	if (!gameState.gameRunning) return;

	const playerPos = positions.player;
	const enemyPos = positions.enemy;

	const dx = playerPos.x - enemyPos.x;
	const dy = playerPos.y - enemyPos.y;
	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance === 0) return;

	const moveX = (dx / distance) * GAME_CONFIG.ENEMY_SPEED;
	const moveY = (dy / distance) * GAME_CONFIG.ENEMY_SPEED;

	let newX = enemyPos.x + moveX;

	let newY = enemyPos.y + moveY;

	const enemyWidth = 35;
	const enemyHeight = enemy.value?.offsetHeight || 35;

	// Ограничения экрана
	if (gameArea.value) {
		newX = Math.max(0, Math.min(gameArea.value.clientWidth - enemyWidth, newX));
		newY = Math.max(0, Math.min(gameArea.value.clientHeight - enemyHeight, newY));
	}

	// Проверка столкновений со стенами
	const canMove = !walls.value.some(
		(wall) =>
			newX < wall.x + wall.width + 5 &&
			newX + enemyWidth > wall.x - 5 &&
			newY < wall.y + wall.height + 5 &&
			newY + enemyHeight > wall.y - 5
	);

	if (canMove) {
		positions.enemy.x = newX;

		positions.enemy.y = newY;
	} else {
		// Простое обходное движение
		if (Math.abs(dx) > Math.abs(dy)) {
			newY += dy > 0 ? GAME_CONFIG.ENEMY_SPEED : -GAME_CONFIG.ENEMY_SPEED;
		} else {
			newX += dx > 0 ? GAME_CONFIG.ENEMY_SPEED : -GAME_CONFIG.ENEMY_SPEED;
		}

		if (gameArea.value) {
			newX = Math.max(0, Math.min(gameArea.value.clientWidth - enemyWidth, newX));
			newY = Math.max(0, Math.min(gameArea.value.clientHeight - enemyHeight, newY));
		}

		positions.enemy.x = newX;

		positions.enemy.y = newY;
	}
};

const checkCollisions = () => {
	if (!gameState.gameRunning) return;

	const playerPos = positions.player;
	const enemyPos = positions.enemy;

	// Player-enemy collision
	const enemyDist = Math.sqrt(
		Math.pow(playerPos.x + 20 - enemyPos.x - 17.5, 2) +
			Math.pow(playerPos.y + 20 - enemyPos.y - 17.5, 2)
	);
	if (enemyDist < 35 && !gameState.invulnerable) {
		takeDamage();
	}

	// Player-coin collision
	coins.value = coins.value.filter((coin) => {
		if (coin.collected) return false;

		const coinDist = Math.sqrt(
			Math.pow(playerPos.x + 20 - coin.x - 10, 2) +
				Math.pow(playerPos.y + 20 - coin.y - 10, 2)
		);

		if (coinDist < 25) {
			coin.collected = true;

			gameState.score++;
			return false;
		}
		return true;
	});
	if (gameState.score >= GAME_CONFIG.COIN_COUNT) {
		winGame();
	}
};
const takeDamage = () => {
	if (!player.value) return;

	const now = Date.now();
	if (now - lastDamageTime.value < 2000) return;
	lastDamageTime.value = now;

	gameState.lives--;

	gameState.invulnerable = true;

	player.value.style.opacity = '0.5';

	setTimeout(() => {
		gameState.invulnerable = false;
		if (player.value) {
			player.value.style.opacity = '1';
		}
	}, 2000);

	if (gameState.lives <= 0) {
		gameOver();
	}
};

const initGame = () => {
	createWalls();
	setInitPlayer();
	createCoins();
	gameLoop();
};

const movePlayer = () => {
	if (!gameState.gameRunning || !gameArea.value) return;

	let newX = positions.player.x;

	let newY = positions.player.y;

	const playerHeight = player.value?.offsetHeight || 40;
	const playerWidth = 40;

	if ((keys.value['ArrowUp'] || keys.value['KeyW']) && newY > GAME_CONFIG.BORDER_OFFSET)
		newY -= GAME_CONFIG.PLAYER_SPEED;
	if (
		(keys.value['KeyS'] || keys.value['ArrowDown']) &&
		newY < gameArea.value!.clientHeight - playerHeight - GAME_CONFIG.BORDER_OFFSET
	)
		newY += GAME_CONFIG.PLAYER_SPEED;
	if ((keys.value['KeyA'] || keys.value['ArrowLeft']) && newX > GAME_CONFIG.BORDER_OFFSET)
		newX -= GAME_CONFIG.PLAYER_SPEED;
	if (
		(keys.value['KeyD'] || keys.value['ArrowRight']) &&
		newX < gameArea.value!.clientWidth - playerWidth - GAME_CONFIG.BORDER_OFFSET
	)
		newX += GAME_CONFIG.PLAYER_SPEED;
	const canMove = !walls.value.some(
		(wall) =>
			Math.round(newX) < Math.round(wall.x + wall.width) &&
			Math.round(newX + playerWidth) > Math.round(wall.x) &&
			Math.round(newY) < Math.round(wall.y + wall.height) &&
			Math.round(newY + playerHeight) > Math.round(wall.y)
	);

	if (canMove) {
		positions.player.x = newX;

		positions.player.y = newY;
	}
};
const gameLoop = () => {
	if (gameState.gameRunning) {
		movePlayer();
		moveEnemy();
		checkCollisions();
	}
	requestAnimationFrame(gameLoop);
};

const winGame = () => {
	gameState.gameRunning = false;
	gameOverMessage.value = 'Victory!';
	finalScoreMessage.value = `All coins collected! Lives remaining: ${gameState.lives}`;
	showGameOver.value = true;
};

function gameOver() {
	gameState.gameRunning = false;
	gameOverMessage.value = 'Game over!';
	finalScoreMessage.value = `Coins collected: ${gameState.score} from ${GAME_CONFIG.COIN_COUNT}`;
	showGameOver.value = true;
}

const restartGame = () => {
	Object.assign(gameState, { lives: 3, score: 0, gameRunning: true, invulnerable: false });
	setInitPlayer();

	showGameOver.value = false;
	if (player.value) {
		player.value.style.opacity = '1';
	}

	createWalls();
	createCoins();
};

const showContextMenu = (event: MouseEvent) => {
	event.preventDefault();
	if (!gameArea.value) return;

	const rect = gameArea.value.getBoundingClientRect();
	if (
		event.clientX < rect.left ||
		event.clientX > rect.right ||
		event.clientY < rect.top ||
		event.clientY > rect.bottom
	)
		return;

	contextMenuPos.x = Math.min(event.clientX, window.innerWidth - 120);

	contextMenuPos.y = Math.min(event.clientY, window.innerHeight - 120);

	isShowContextMenu.value = true;

	document.addEventListener('click', hideContextMenu);
};
const hideContextMenu = () => {
	isShowContextMenu.value = false;
	document.removeEventListener('click', hideContextMenu);
};
const teleportPlayer = () => {
	if (!gameState.gameRunning || !gameArea.value) return;

	const areaWidth = gameArea.value.clientWidth;
	const areaHeight = gameArea.value.clientHeight;
	const playerWidth = 40;
	const playerHeight = 40;

	let newX: number = 0,
		newY: number = 0;

	let validPosition = false;

	let attempts = 0;

	while (!validPosition && attempts < 50) {
		newX = Math.random() * (areaWidth - playerWidth);
		newY = Math.random() * (areaHeight - playerHeight);

		// Check distance from enemy
		const enemyDist = Math.sqrt(
			Math.pow(newX + playerWidth / 2 - (positions.enemy.x + 17.5), 2) +
				Math.pow(newY + playerHeight / 2 - (positions.enemy.y + 17.5), 2)
		);

		// Check for wall collisions
		const insideWall = walls.value.some(
			(wall) =>
				newX < wall.x + wall.width &&
				newX + playerWidth > wall.x &&
				newY < wall.y + wall.height &&
				newY + playerHeight > wall.y
		);

		// Ensure player is not too close to enemy and not inside a wall
		validPosition = enemyDist >= 100 && !insideWall;
		attempts++;
	}

	if (validPosition) {
		positions.player.x = newX;

		positions.player.y = newY;
	}
};

onMounted(() => {
	initGame();

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		keys.value[e.code] = true;
	});

	document.addEventListener('keyup', (e: KeyboardEvent) => {
		keys.value[e.code] = false;
	});

	document.addEventListener('contextmenu', showContextMenu);
	document.body.addEventListener('contextmenu', (e) => e.preventDefault());
});
</script>
<style lang="scss" scoped>
.platformer__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60px;
	padding: 0 1rem;
	color: var(--white);
	background: linear-gradient(135deg, rgba(var(--blue-rgb), 0.2), rgba(var(--blue-rgb), 0.1));
	box-shadow: 0 2px 10px rgba(110, 179, 225, 0.3);
}
.platformer__game-stats {
	display: flex;
	gap: 30px;
}

.platformer__stat {
	display: flex;
	align-items: center;
	gap: 5px;
}
.platformer__block {
	position: relative;
	width: 100vw;
	height: calc(100dvh - 3rem - 60px);
	overflow: hidden;
}
.platformer__heroic {
	position: absolute;
	top: 50%;
	left: 20px;
	z-index: 10;
	width: 40px;
	height: 40px;
	background-color: var(--blue-700);
	border-radius: 50%;
	border: 3px solid var(--white);
	box-shadow: 0 8px 16px rgba(var(--blue-rgb), 0.2);
}
.platformer__enemy {
	position: absolute;
	top: 30%;
	right: 20px;
	z-index: 10;
	width: 35px;
	height: 35px;
	background-color: #ff3742;
	border-radius: 50%;
	border: 3px solid var(--white);
	box-shadow: 0 8px 16px rgba(var(--pink-500), 0.2);
}
.platformer__wall {
	position: absolute;
	width: 80px;
	height: 120px;
	background-color: #2ed573;
	border: 2px solid #1e90ff;
	border-radius: 5px;
}
.platformer__coin {
	position: absolute;
	width: 20px;
	height: 20px;
	background-color: #feca57;
	border-radius: 50%;
	border: 2px solid #ff9f43;
	animation: coinSpin 2s linear infinite;
}
@keyframes coinSpin {
	0% {
		transform: rotate(0deg) scale(1);
	}

	50% {
		transform: rotate(180deg) scale(1.1);
	}

	100% {
		transform: rotate(360deg) scale(1);
	}
}
.platformer__contextmenu {
	position: fixed;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	padding: 0.2rem;
	width: 120px;
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.95);
}
.platformer__btn-main {
	width: 100%;
	height: 40px;
	background-color: var(--blue-300);
	border: none;
	border-bottom: 1px solid #ccc;
	cursor: pointer;
	transition: background-color 0.2s;
	&:hover {
		background-color: rgb(162, 179, 179);
	}
	&:last-child {
		border-bottom: none;
		border-radius: 0 0 5px 5px;
	}
	&:first-child {
		border-radius: 5px 5px 0 0;
	}
}
.platformer__game-over {
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 2000;
	transform: translate(-50%, -50%);
	display: block;
	padding: 30px;
	text-align: center;
	color: rgba(0, 0, 0, 0.9);
	background-color: var(--white);
	border-radius: 10px;
}
.platformer__restart {
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #3742fa;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	&:hover {
		background-color: #2f3542;
	}
}
.platformer__instructions {
	position: absolute;
	top: 10px;
	left: 10px;
	padding: 5px;
	font-size: 12px;
	color: #2f3542;
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 3px;
}
</style>
