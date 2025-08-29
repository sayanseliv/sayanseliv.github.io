<template>
	<div ref="animatedWrap" class="animated-grid__wrapper">
		<canvas
			ref="canvas"
			class="animated-grid"
			role="img"
			aria-label="Interactive animated grid with mouse and keyboard controls"
			tabindex="0"
			@mousemove="onMouseMove"
			@touchmove.prevent="onTouchMove" />
		<div class="animated-grid__controls">
			<div>Controls:</div>
			<div class="controls__btns">
				<button id="animBtn" @click="toggleAnimation">
					{{ animationEnabled ? 'Disable' : 'Enable' }} animation
				</button>
				<button @click="changeGridSize">Change grid size</button>
			</div>
			<div>
				<small>Move your mouse over the grid!</small>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
defineOptions({
	name: 'AnimatedGrid',
});
const animatedWrap = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const mouseTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

// Settings
const gridSize = ref<number>(40);
const animationEnabled = ref<boolean>(false);
const mouseX = ref<number>(0);
const mouseY = ref<number>(0);
const time = ref<number>(0);

const resizeCanvas = () => {
	if (canvas.value && animatedWrap.value) {
		ctx.value = canvas.value.getContext('2d');
		canvas.value.width = animatedWrap.value.clientWidth;
		canvas.value.height = animatedWrap.value.clientHeight;
		if (!ctx.value) {
			console.error('2D context is not supported');
			return;
		}
	} else {
		console.error('Canvas element not found');
	}
};
const drawGrid = () => {
	if (canvas.value && ctx.value) {
		ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

		ctx.value.strokeStyle = '#333';
		ctx.value.lineWidth = 1;

		// Horizontal lines
		for (let y = 0; y <= canvas.value.height; y += gridSize.value) {
			ctx.value.beginPath();
			ctx.value.moveTo(0, y);
			ctx.value.lineTo(canvas.value.width, y);
			ctx.value.stroke();
		}

		// Vertical lines
		for (let x = 0; x <= canvas.value.width; x += gridSize.value) {
			ctx.value.beginPath();
			ctx.value.moveTo(x, 0);
			ctx.value.lineTo(x, canvas.value.height);
			ctx.value.stroke();
		}

		// Intersection points
		drawIntersectionPoints();

		// Highlighting the area around the mouse
		drawMouseInteraction();
	}
};

const animate = () => {
	time.value += 1;
	drawGrid();
	requestAnimationFrame(animate);
};

const drawIntersectionPoints = () => {
	if (canvas.value && ctx.value) {
		for (let x = 0; x <= canvas.value.width; x += gridSize.value) {
			for (let y = 0; y <= canvas.value.height; y += gridSize.value) {
				// Mouse distance
				const distance = Math.sqrt((x - mouseX.value) ** 2 + (y - mouseY.value) ** 2);
				const maxDistance = 150;

				// Animation points
				// eslint-disable-next-line functional/no-let
				let offsetX = 0;
				// eslint-disable-next-line functional/no-let
				let offsetY = 0;
				// eslint-disable-next-line functional/no-let
				let animatedSize = 1;

				if (animationEnabled.value) {
					offsetX = Math.sin(time.value * 0.02 + x * 0.008 + y * 0.005) * 5;
					offsetY = Math.cos(time.value * 0.02 + y * 0.008 + x * 0.005) * 5;
					// Animated dot size
					animatedSize = 1 + Math.sin(time.value * 0.03 + x * 0.01 + y * 0.01) * 0.5;
				}

				if (distance < maxDistance && ctx.value) {
					// The size of the dot depends on the distance to the mouse
					const size = ((1 - distance / maxDistance) * 4 + 1) * animatedSize;

					ctx.value.fillStyle = '#66d9ff';
					ctx.value.beginPath();
					ctx.value.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
					ctx.value.fill();
				} else {
					// Regular dots are also animated
					const size = animatedSize;
					ctx.value.fillStyle = animationEnabled.value ? '#666' : '#444';
					ctx.value.beginPath();
					ctx.value.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
					ctx.value.fill();
				}
			}
		}
	}
};

const drawMouseInteraction = () => {
	if (ctx.value) {
		const gradient = ctx.value.createRadialGradient(
			mouseX.value,
			mouseY.value,
			0,
			mouseX.value,
			mouseY.value,
			100
		);
		gradient.addColorStop(0, 'rgba(102, 217, 255, 0.1)');
		gradient.addColorStop(1, 'rgba(102, 217, 255, 0)');

		ctx.value.fillStyle = gradient;
		ctx.value.beginPath();
		ctx.value.arc(mouseX.value, mouseY.value, 100, 0, Math.PI * 2);
		ctx.value.fill();
	}
};

const onMouseMove = (e: MouseEvent) => {
	if (!canvas.value) return;
	const rect = canvas.value.getBoundingClientRect();
	mouseX.value = e.clientX - rect.left;
	mouseY.value = e.clientY - rect.top;

	setCanvasCursor('crosshair');

	if (mouseTimeout.value) clearTimeout(mouseTimeout.value);

	mouseTimeout.value = setTimeout(() => {
		setCanvasCursor('none');
	}, 2000);
};

const onTouchMove = (e: TouchEvent) => {
	if (!canvas.value) return;
	const rect = canvas.value.getBoundingClientRect();
	mouseX.value = e.touches[0].clientX - rect.left;
	mouseY.value = e.touches[0].clientY - rect.top;
};

const setCanvasCursor = (cursor: string) => {
	if (canvas.value) {
		canvas.value.style.cursor = cursor;
	}
};

const toggleAnimation = () => {
	animationEnabled.value = !animationEnabled.value;
};

const changeGridSize = () => {
	gridSize.value = gridSize.value === 40 ? 60 : gridSize.value === 60 ? 80 : 40;
};

onMounted(() => {
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
	animate();
});

onUnmounted(() => {
	window.removeEventListener('resize', resizeCanvas);
});
</script>
<style lang="scss" scoped>
.animated-grid__wrapper {
	width: 100%;
	height: 100dvh;
}
.animated-grid {
	display: block;
	cursor: crosshair;
}
.animated-grid__controls {
	position: fixed;
	top: 5rem;
	left: 20px;
	padding: 1rem;
	font-size: 14px;
	color: var(--white);
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 8px;
}
.controls__btns {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-block: 0.5rem;
	& button {
		padding: 8px 12px;
		background-color: #333;
		color: var(--white);
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s;
		&:hover {
			background-color: #555;
		}
	}
}
</style>
