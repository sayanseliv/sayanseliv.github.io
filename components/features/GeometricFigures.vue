<template>
	<div class="container geometric-figures">
		<h1 class="text-gradient geometric-figures__title">Adaptive geometric shapes on canvas</h1>

		<div class="geometric-figures__controls">
			<button
				v-for="mode in ['basic', 'complex', 'patterns', 'animated']"
				:key="mode"
				:class="['geometric-figures__btn', { active: currentMode === mode }]"
				@click="drawShapes(mode as Mode)">
				{{ mode }}
			</button>
		</div>
		<div ref="canvasWrap">
			<canvas ref="canvas" class="geometric-figures__canvas" />
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'GeometricFigures',
});
type Mode = 'basic' | 'complex' | 'patterns' | 'animated';

const canvasWrap = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const currentMode = ref<Mode>('basic');
const animationId = ref<number | null>(null);
const animationTime = ref<number>(0);

const aspectRatio = 2 / 3;
const maxCanvasWidth = 800;

const drawShapes = (mode: Mode) => {
	currentMode.value = mode;
	if (animationId.value) {
		cancelAnimationFrame(animationId.value);
		animationId.value = null;
	}
	switch (mode) {
		case 'basic':
			drawBasicShapes();
			break;
		case 'complex':
			drawComplexShapes();
			break;
		case 'patterns':
			drawPatterns();
			break;
		case 'animated':
			animationTime.value = 0;
			drawAnimatedShapes();
			break;
	}
};
const drawBasicShapes = () => {
	if (!canvas.value) return;
	const dpr = window.devicePixelRatio || 1;
	const w = canvas.value.width / dpr;
	const h = canvas.value.height / dpr;

	ctx.value?.clearRect(0, 0, canvas.value.width, canvas.value.height);
	if (ctx.value) {
		// Rectangle
		ctx.value.fillStyle = '#FF6B6B';
		ctx.value.fillRect(w * 0.05, h * 0.05, w * 0.2, h * 0.25);

		// Rectangle with stroke
		ctx.value.fillStyle = '#E74C3C';
		ctx.value.strokeStyle = '#C0392B';
		ctx.value.lineWidth = 3;
		ctx.value.fillRect(w * 0.3, h * 0.05, w * 0.15, h * 0.25);
		ctx.value.strokeRect(w * 0.3, h * 0.05, w * 0.15, h * 0.25);

		// Circle
		ctx.value.fillStyle = '#4ECDC4';
		ctx.value.beginPath();
		ctx.value.arc(w * 0.6, h * 0.18, w * 0.1, 0, 2 * Math.PI);
		ctx.value.fill();

		// Ring
		ctx.value.strokeStyle = '#26A69A';
		ctx.value.lineWidth = 8;
		ctx.value.beginPath();
		ctx.value.arc(w * 0.8, h * 0.18, w * 0.08, 0, 2 * Math.PI);
		ctx.value.stroke();

		// Triangle
		ctx.value.fillStyle = '#45B7D1';
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.15, h * 0.7);
		ctx.value.lineTo(w * 0.05, h * 0.45);
		ctx.value.lineTo(w * 0.25, h * 0.45);
		ctx.value.closePath();
		ctx.value.fill();

		// Rhombus
		ctx.value.fillStyle = '#3498DB';
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.4, h * 0.45);
		ctx.value.lineTo(w * 0.35, h * 0.55);
		ctx.value.lineTo(w * 0.4, h * 0.65);
		ctx.value.lineTo(w * 0.45, h * 0.55);
		ctx.value.closePath();
		ctx.value.fill();

		// Ellipse
		ctx.value.fillStyle = '#F7DC6F';
		ctx.value.beginPath();
		ctx.value.ellipse(w * 0.65, h * 0.55, w * 0.12, h * 0.08, 0, 0, 2 * Math.PI);
		ctx.value.fill();

		// Parallelogram
		ctx.value.fillStyle = '#F39C12';
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.75, h * 0.45);
		ctx.value.lineTo(w * 0.9, h * 0.45);
		ctx.value.lineTo(w * 0.95, h * 0.65);
		ctx.value.lineTo(w * 0.8, h * 0.65);
		ctx.value.closePath();
		ctx.value.fill();

		// Trapezoid
		ctx.value.fillStyle = '#9B59B6';
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.05, h * 0.8);
		ctx.value.lineTo(w * 0.25, h * 0.8);
		ctx.value.lineTo(w * 0.22, h * 0.95);
		ctx.value.lineTo(w * 0.08, h * 0.95);
		ctx.value.closePath();
		ctx.value.fill();

		// Lines of different thickness
		ctx.value.strokeStyle = '#8E44AD';
		ctx.value.lineWidth = 2;
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.4, h * 0.8);
		ctx.value.lineTo(w * 0.6, h * 0.95);
		ctx.value.stroke();

		ctx.value.lineWidth = 5;
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.65, h * 0.8);
		ctx.value.lineTo(w * 0.85, h * 0.95);
		ctx.value.stroke();

		// Dotted lines
		ctx.value.setLineDash([10, 5]);
		ctx.value.lineWidth = 3;
		ctx.value.strokeStyle = '#E67E22';
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.5, h * 0.35);
		ctx.value.lineTo(w * 0.9, h * 0.35);
		ctx.value.stroke();
		ctx.value.setLineDash([]);
	}
};
const drawComplexShapes = () => {
	if (!canvas.value) return;
	const dpr = window.devicePixelRatio || 1;
	const w = canvas.value.width / dpr;
	const h = canvas.value.height / dpr;

	ctx.value?.clearRect(0, 0, canvas.value.width, canvas.value.height);

	drawStar(ctx.value, w * 0.15, h * 0.2, w * 0.08, w * 0.04, 5, '#FF6B6B');
	drawStar(ctx.value, w * 0.35, h * 0.2, w * 0.06, w * 0.03, 8, '#E74C3C');

	drawPolygon(ctx.value, w * 0.6, h * 0.2, w * 0.08, 6, '#4ECDC4');
	drawPolygon(ctx.value, w * 0.8, h * 0.2, w * 0.06, 8, '#26A69A');

	drawRoundedRect(ctx.value, w * 0.05, h * 0.4, w * 0.2, h * 0.15, w * 0.015, '#45B7D1');
	drawRoundedRect(ctx.value, w * 0.3, h * 0.4, w * 0.15, h * 0.15, w * 0.03, '#3498DB');

	if (ctx.value) {
		ctx.value.fillStyle = '#F7DC6F';
		ctx.value.beginPath();
		ctx.value.arc(w * 0.6, h * 0.5, w * 0.1, 0, Math.PI * 1.5); // Drawing an arc
		ctx.value.lineTo(w * 0.6, h * 0.5);
		ctx.value.closePath();
		ctx.value.fill();

		ctx.value.fillStyle = '#F39C12';
		ctx.value.beginPath();
		ctx.value.arc(w * 0.8, h * 0.5, w * 0.08, Math.PI * 0.5, Math.PI * 1.8);
		ctx.value.lineTo(w * 0.8, h * 0.5);
		ctx.value.closePath();
		ctx.value.fill();

		// Bezier curves
		ctx.value.strokeStyle = '#8E44AD';
		ctx.value.lineWidth = 4;
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.1, h * 0.7);
		ctx.value.bezierCurveTo(w * 0.2, h * 0.6, w * 0.3, h * 0.8, w * 0.4, h * 0.7);
		ctx.value.stroke();

		ctx.value.strokeStyle = '#9B59B6';
		ctx.value.lineWidth = 3;
		ctx.value.beginPath();
		ctx.value.moveTo(w * 0.5, h * 0.8);
		ctx.value.quadraticCurveTo(w * 0.65, h * 0.7, w * 0.8, h * 0.8);
		ctx.value.stroke();

		// Arrow
		drawArrow(ctx.value, w * 0.15, h * 0.85, w * 0.35, h * 0.85, w * 0.02, '#E67E22');

		// Heart
		drawHeart(ctx.value, w * 0.65, h * 0.85, w * 0.04, '#E91E63');
	}
};
const drawPatterns = () => {
	if (!canvas.value) return;
	const dpr = window.devicePixelRatio || 1;
	const w = canvas.value.width / dpr;
	const h = canvas.value.height / dpr;

	ctx.value?.clearRect(0, 0, canvas.value.width, canvas.value.height);

	// Grid of multi-colored circles
	const gridSize = Math.min(w, h) * 0.04;
	const rectX = w * 0.25; // Shift the rectangle to the right
	const rectY = h * 0.01; // Rectangle start Y
	const rectWidth = w * 0.28;
	const rectHeight = h * 0.28;
	if (!ctx.value) return;

	// Draw a rectangle for the grid
	ctx.value.fillStyle = 'rgba(255, 255, 255, 0.1)';
	ctx.value.fillRect(rectX, rectY, rectWidth, rectHeight);

	// Draw circles inside the rectangle for the grid
	for (let x = rectX + gridSize; x < rectX + rectWidth - gridSize; x += gridSize) {
		for (let y = rectY + gridSize; y < rectY + rectHeight - gridSize; y += gridSize) {
			const hue = ((x + y) * 0.5) % 360;
			ctx.value.fillStyle = `hsl(${hue}, 70%, 60%)`;
			ctx.value.beginPath();
			ctx.value.arc(x, y, gridSize * 0.15, 0, 2 * Math.PI);
			ctx.value.fill();
		}
	}

	// Zigzag pattern
	ctx.value.strokeStyle = '#FF6B6B';
	ctx.value.lineWidth = 3;
	ctx.value.beginPath();
	for (let x = 0; x < w; x += 20) {
		const y1 = h * 0.3 + Math.sin(x * 0.1) * 20;
		const y2 = h * 0.3 + Math.sin((x + 10) * 0.1) * 20;
		if (x === 0) ctx.value.moveTo(x, y1);
		else ctx.value.lineTo(x, y1);
		ctx.value.lineTo(x + 10, y2);
	}
	ctx.value.stroke();

	// Spirals
	drawSpiral(ctx.value, w * 0.1, h * 0.1, w * 0.04, '#4ECDC4');
	drawSpiral(ctx.value, w * 0.9, h * 0.1, w * 0.05, '#45B7D1');
	drawSpiral(ctx.value, w * 0.1, h * 0.9, w * 0.06, '#F7DC6F');
	drawSpiral(ctx.value, w * 0.9, h * 0.9, w * 0.04, '#9B59B6');

	// Checkered pattern
	const cellSize = 15;
	for (let x = w * 0.4; x < w * 0.6; x += cellSize) {
		for (let y = h * 0.6; y < h * 0.9; y += cellSize) {
			if ((Math.floor(x / cellSize) + Math.floor(y / cellSize)) % 2 === 0) {
				ctx.value.fillStyle = '#E74C3C';
				ctx.value.fillRect(x, y, cellSize, cellSize);
			}
		}
	}

	// Concentric circles
	const centerX = w * 0.75;
	const centerY = h * 0.75;
	const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#9B59B6'];
	for (let i = 5; i > 0; i--) {
		ctx.value.strokeStyle = colors[i - 1];
		ctx.value.lineWidth = 2;
		ctx.value.beginPath();
		ctx.value.arc(centerX, centerY, i * 8, 0, 2 * Math.PI);
		ctx.value.stroke();
	}
};
const drawAnimatedShapes = () => {
	if (!canvas.value) return;
	const dpr = window.devicePixelRatio || 1;
	const w = canvas.value.width / dpr;
	const h = canvas.value.height / dpr;

	ctx.value?.clearRect(0, 0, canvas.value.width, canvas.value.height);

	if (!ctx.value) return;
	// Rotating triangle
	ctx.value.save();
	ctx.value.translate(w * 0.2, h * 0.2);
	ctx.value.rotate(animationTime.value * 0.02);
	ctx.value.fillStyle = '#FF6B6B';
	ctx.value.beginPath();
	ctx.value.moveTo(0, -w * 0.08);
	ctx.value.lineTo(-w * 0.07, w * 0.07);
	ctx.value.lineTo(w * 0.07, w * 0.07);
	ctx.value.closePath();
	ctx.value.fill();
	ctx.value.restore();

	// Rotating square
	ctx.value.save();
	ctx.value.translate(w * 0.45, h * 0.2);
	ctx.value.rotate(animationTime.value * -0.015);
	ctx.value.fillStyle = '#4ECDC4';
	ctx.value.fillRect(-w * 0.06, -w * 0.06, w * 0.12, w * 0.12);
	ctx.value.restore();

	// Pulsating circle
	const pulseRadius = w * 0.06 + Math.sin(animationTime.value * 0.05) * w * 0.03;
	ctx.value.fillStyle = `hsl(${(animationTime.value * 2) % 360}, 70%, 60%)`;
	ctx.value.beginPath();
	ctx.value.arc(w * 0.75, h * 0.2, pulseRadius, 0, 2 * Math.PI);
	ctx.value.fill();

	// Oscillating Ellipse
	const oscillation = Math.sin(animationTime.value * 0.03) * 0.5 + 1;
	ctx.value.fillStyle = '#F7DC6F';
	ctx.value.beginPath();
	ctx.value.ellipse(w * 0.15, h * 0.5, w * 0.08 * oscillation, w * 0.04, 0, 0, 2 * Math.PI);
	ctx.value.fill();

	// Moving sine wave
	ctx.value.strokeStyle = '#45B7D1';
	ctx.value.lineWidth = 3;
	ctx.value.beginPath();
	for (let x = 0; x < w; x += 3) {
		const y = h * 0.5 + Math.sin((x + animationTime.value * 2) * 0.02) * h * 0.08;
		if (x === 0) ctx.value.moveTo(x, y);
		else ctx.value.lineTo(x, y);
	}
	ctx.value.stroke();

	// Moving particles
	for (let i = 0; i < 8; i++) {
		const angle = animationTime.value * 0.01 + (i * Math.PI * 2) / 8;
		const radius = w * 0.15 + Math.sin(animationTime.value * 0.02 + i) * w * 0.05;
		const x = w * 0.75 + Math.cos(angle) * radius;
		const y = h * 0.75 + Math.sin(angle) * radius;

		ctx.value.fillStyle = `hsl(${i * 45 + animationTime.value}, 80%, 60%)`;
		ctx.value.beginPath();
		ctx.value.arc(x, y, w * 0.01, 0, 2 * Math.PI);
		ctx.value.fill();
	}

	// Waves of different frequencies
	ctx.value.strokeStyle = '#9B59B6';
	ctx.value.lineWidth = 2;
	ctx.value.beginPath();
	for (let x = 0; x < w; x += 2) {
		const y = h * 0.8 + Math.sin((x + animationTime.value * 3) * 0.03) * h * 0.05;
		if (x === 0) ctx.value.moveTo(x, y);
		else ctx.value.lineTo(x, y);
	}
	ctx.value.stroke();

	animationTime.value++;
	if (currentMode.value === 'animated') {
		animationId.value = requestAnimationFrame(drawAnimatedShapes);
	}
};
const drawStar = (
	ctx: CanvasRenderingContext2D | null,
	x: number, // X coordinate of the star center
	y: number, // Y coordinate of the star center
	outerRadius: number, // outer radius (length of rays)
	innerRadius: number, // inner radius (depth between rays)
	points: number, // number of "rays"
	color: string
) => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	for (let i = 0; i < points * 2; i++) {
		const radius = i % 2 === 0 ? outerRadius : innerRadius;
		const angle = (i * Math.PI) / points;
		const px = x + Math.cos(angle) * radius;
		const py = y + Math.sin(angle) * radius;
		if (i === 0) ctx.moveTo(px, py);
		else ctx.lineTo(px, py);
	}
	ctx.closePath();
	ctx.fill();
};

const drawPolygon = (
	ctx: CanvasRenderingContext2D | null,
	x: number, // X coordinate of the polygon center
	y: number, // Y coordinate of the polygon center
	radius: number, // radius of the circle in which the polygon is inscribed
	sides: number, // number of sides of a polygon
	color: string
) => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	for (let i = 0; i < sides; i++) {
		const angle = (i * 2 * Math.PI) / sides;
		const px = x + Math.cos(angle) * radius;
		const py = y + Math.sin(angle) * radius;
		if (i === 0) ctx.moveTo(px, py);
		else ctx.lineTo(px, py);
	}
	ctx.closePath();
	ctx.fill();
};

const drawRoundedRect = (
	ctx: CanvasRenderingContext2D | null,
	x: number, // the X coordinate of the upper left corner of the rectangle
	y: number, // Y coordinate of the upper left corner
	width: number,
	height: number,
	radius: number, // corner rounding radius
	color: string
) => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.roundRect(x, y, width, height, radius);
	ctx.fill();
};

const drawArrow = (
	ctx: CanvasRenderingContext2D | null,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	thickness: number,
	color: string
) => {
	if (!ctx) return;
	const angle = Math.atan2(y2 - y1, x2 - x1);
	const arrowLength = thickness * 3;

	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = color;
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = thickness;

	const arrowOffset = arrowLength * 0.8;
	// Main Line
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2 - arrowOffset * Math.cos(angle), y2 - arrowOffset * Math.sin(angle));
	ctx.stroke();

	// Arrowhead
	ctx.beginPath();
	ctx.moveTo(x2, y2);
	ctx.lineTo(
		x2 - arrowLength * Math.cos(angle - Math.PI / 6),
		y2 - arrowLength * Math.sin(angle - Math.PI / 6)
	);
	ctx.lineTo(
		x2 - arrowLength * Math.cos(angle + Math.PI / 6),
		y2 - arrowLength * Math.sin(angle + Math.PI / 6)
	);
	ctx.closePath();
	ctx.fill();
};

const drawHeart = (
	ctx: CanvasRenderingContext2D | null,
	x: number,
	y: number,
	size: number,
	color: string
) => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();

	const topCurveHeight = size * 0.3;
	ctx.moveTo(x, y + topCurveHeight);

	// Left cardiac curve
	ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
	ctx.bezierCurveTo(
		x - size / 2,
		y + (topCurveHeight + size) / 2,
		x,
		y + (topCurveHeight + size) / 2,
		x,
		y + size
	);

	// Right cardiac curve
	ctx.bezierCurveTo(
		x,
		y + (topCurveHeight + size) / 2,
		x + size / 2,
		y + (topCurveHeight + size) / 2,
		x + size / 2,
		y + topCurveHeight
	);
	ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);

	ctx.fill();
};

const drawSpiral = (
	ctx: CanvasRenderingContext2D | null,
	centerX: number,
	centerY: number,
	maxRadius: number,
	color: string
) => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = color;
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = maxRadius * 0.05;
	ctx.beginPath();
	for (let angle = 0; angle < 6 * Math.PI; angle += 0.1) {
		const radius = (angle / (6 * Math.PI)) * maxRadius;
		const x = centerX + Math.cos(angle) * radius;
		const y = centerY + Math.sin(angle) * radius;
		if (angle === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
};

const resizeCanvas = () => {
	if (canvas.value && canvasWrap.value) {
		const containerWidth = canvasWrap.value.clientWidth - 40;
		const maxWidth = Math.min(containerWidth, maxCanvasWidth);

		const dpr = window.devicePixelRatio || 1;

		canvas.value.width = maxWidth * dpr;
		canvas.value.height = maxWidth * aspectRatio * dpr;

		canvas.value.style.width = `${maxWidth}px`;
		canvas.value.style.height = `${maxWidth * aspectRatio}px`;

		ctx.value = canvas.value.getContext('2d');
		if (!ctx.value) {
			console.error('2D context is not supported');
			return;
		}
		// For Retina
		ctx.value.scale(dpr, dpr);

		// Enable anti-aliasing
		ctx.value.imageSmoothingEnabled = true;
		ctx.value.imageSmoothingQuality = 'high';

		drawShapes(currentMode.value);
	} else {
		console.error('Canvas element not found');
	}
};

onMounted(() => {
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
	drawShapes('basic');
});

onUnmounted(() => {
	window.removeEventListener('resize', resizeCanvas);
});
</script>

<style scoped lang="scss">
.geometric-figures__title {
	margin-bottom: 2rem;
	text-align: center;
	font-size: 2.5rem;
	color: var(--white);
}

.geometric-figures__canvas {
	display: block;
	height: auto;
	max-width: 100%;
	margin-inline: auto;
	background-color: var(--white);
	border: 1px solid rgba(var(--blue-rgb), 0.3);
	border-radius: var(--border-radius);
}

.geometric-figures__controls {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
	margin: 1.5rem 0;
}

.geometric-figures__btn {
	padding: 0.75rem 1rem;
	font-weight: 500;
	color: var(--white);
	background: linear-gradient(135deg, rgba(var(--blue-rgb), 0.1), rgba(var(--blue-rgb), 0.05));
	border: 1px solid rgba(var(--blue-rgb), 0.3);
	border-radius: var(--border-radius);
	transition: all 0.3s ease;
	cursor: pointer;
	text-transform: capitalize;
	&:hover {
		background: linear-gradient(135deg, rgba(var(--blue-rgb), 0.2), rgba(var(--blue-rgb), 0.1));
		border-color: var(--blue-300);
	}
	&.active {
		background: var(--blue-300);
		color: var(--gray-900);
		border-color: var(--blue-300);
	}
}
</style>
