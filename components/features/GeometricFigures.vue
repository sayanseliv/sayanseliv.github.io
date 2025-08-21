<template>
	<div class="geometric-figures">
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
type DrawContext = CanvasRenderingContext2D;

// Refs
const canvasWrap = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<DrawContext | null>(null);
const currentMode = ref<Mode>('basic');
const animationId = ref<number | null>(null);
const animationTime = ref<number>(0);

// Constants
const ASPECT_RATIO = 2 / 3;
const MAX_CANVAS_WIDTH = 800;

// Utility functions
const clearCanvas = (): void => {
	if (!canvas.value || !ctx.value) return;
	ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

const getCanvasDimensions = () => {
	if (!canvas.value) return { width: 0, height: 0 };
	const dpr = window.devicePixelRatio || 1;
	return {
		width: canvas.value.width / dpr,
		height: canvas.value.height / dpr,
	};
};

const stopAnimation = (): void => {
	if (animationId.value) {
		cancelAnimationFrame(animationId.value);
		animationId.value = null;
	}
};

// Shape drawing functions
const drawRect = (
	ctx: DrawContext | null,
	x: number,
	y: number,
	width: number,
	height: number,
	color: string,
	hasStroke = false
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);

	if (hasStroke) {
		// eslint-disable-next-line functional/immutable-data
		ctx.strokeStyle = '#C0392B';
		// eslint-disable-next-line functional/immutable-data
		ctx.lineWidth = 3;
		ctx.strokeRect(x, y, width, height);
	}
};

const drawCircle = (
	ctx: DrawContext | null,
	x: number,
	y: number,
	radius: number,
	color: string,
	isStroke = false
): void => {
	if (!ctx) return;

	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);

	if (isStroke) {
		// eslint-disable-next-line functional/immutable-data
		ctx.strokeStyle = color;
		// eslint-disable-next-line functional/immutable-data
		ctx.lineWidth = 8;
		ctx.stroke();
	} else {
		// eslint-disable-next-line functional/immutable-data
		ctx.fillStyle = color;
		ctx.fill();
	}
};

const drawTriangle = (
	ctx: DrawContext | null,
	x: number,
	y: number,
	size: number,
	color: string
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x, y - size);
	ctx.lineTo(x - size, y + size);
	ctx.lineTo(x + size, y + size);
	ctx.closePath();
	ctx.fill();
};

const drawRhombus = (
	ctx: DrawContext | null,
	centerX: number,
	centerY: number,
	size: number,
	color: string
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(centerX, centerY - size);
	ctx.lineTo(centerX - size, centerY);
	ctx.lineTo(centerX, centerY + size);
	ctx.lineTo(centerX + size, centerY);
	ctx.closePath();
	ctx.fill();
};

const drawEllipse = (
	ctx: DrawContext | null,
	x: number,
	y: number,
	radiusX: number,
	radiusY: number,
	color: string
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
	ctx.fill();
};

const drawParallelogram = (
	ctx: DrawContext | null,
	points: [number, number][],
	color: string
): void => {
	if (!ctx || points.length !== 4) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(points[0][0], points[0][1]);
	points.slice(1).forEach(([x, y]) => ctx!.lineTo(x, y));
	ctx.closePath();
	ctx.fill();
};

const drawLine = (
	ctx: DrawContext | null,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	color: string,
	width: number,
	isDashed = false
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = color;
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = width;

	if (isDashed) {
		ctx.setLineDash([10, 5]);
	}

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();

	if (isDashed) {
		ctx.setLineDash([]);
	}
};

const drawStar = (
	ctx: DrawContext | null,
	x: number, // X coordinate of the star center
	y: number, // Y coordinate of the star center
	outerRadius: number, // outer radius (length of rays)
	innerRadius: number, // inner radius (depth between rays)
	points: number, // number of "rays"
	color: string
): void => {
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
	ctx: DrawContext | null,
	x: number, // X coordinate of the polygon center
	y: number, // Y coordinate of the polygon center
	radius: number, // radius of the circle in which the polygon is inscribed
	sides: number, // number of sides of a polygon
	color: string
): void => {
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
	ctx: DrawContext | null,
	x: number, // the X coordinate of the upper left corner of the rectangle
	y: number, // Y coordinate of the upper left corner
	width: number,
	height: number,
	radius: number, // corner rounding radius
	color: string
): void => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.roundRect(x, y, width, height, radius);
	ctx.fill();
};

const drawArc = (
	ctx: DrawContext | null,
	x: number,
	y: number,
	radius: number,
	startAngle: number,
	endAngle: number,
	color: string
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle, endAngle);
	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.fill();
};

const drawBezierCurve = (
	ctx: DrawContext | null,
	startX: number,
	startY: number,
	cp1X: number,
	cp1Y: number,
	cp2X: number,
	cp2Y: number,
	endX: number,
	endY: number,
	color: string,
	width: number
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = color;
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
	ctx.stroke();
};

const drawQuadraticCurve = (
	ctx: DrawContext | null,
	startX: number,
	startY: number,
	cpX: number,
	cpY: number,
	endX: number,
	endY: number,
	color: string,
	width: number
): void => {
	if (!ctx) return;

	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = color;
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.quadraticCurveTo(cpX, cpY, endX, endY);
	ctx.stroke();
};

const drawArrow = (
	ctx: DrawContext | null,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	thickness: number,
	color: string
): void => {
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
	ctx: DrawContext | null,
	x: number,
	y: number,
	size: number,
	color: string
): void => {
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
	ctx: DrawContext | null,
	centerX: number,
	centerY: number,
	maxRadius: number,
	color: string
): void => {
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

const drawGridWithCircles = (ctx: DrawContext | null, w: number, h: number): void => {
	if (!ctx) return;
	const gridSize = Math.min(w, h) * 0.04;
	const rectX = w * 0.25;
	const rectY = h * 0.01;
	const rectWidth = w * 0.28;
	const rectHeight = h * 0.28;

	// Grid background
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
	ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

	// Colored circles grid
	for (let x = rectX + gridSize; x < rectX + rectWidth - gridSize; x += gridSize) {
		for (let y = rectY + gridSize; y < rectY + rectHeight - gridSize; y += gridSize) {
			const hue = ((x + y) * 0.5) % 360;
			drawCircle(ctx, x, y, gridSize * 0.15, `hsl(${hue}, 70%, 60%)`);
		}
	}
};
const drawZigzag = (ctx: DrawContext | null, w: number, h: number): void => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = '#FF6B6B';
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = 3;
	ctx.beginPath();

	for (let x = 0; x < w; x += 20) {
		const y1 = h * 0.3 + Math.sin(x * 0.1) * 20;
		const y2 = h * 0.3 + Math.sin((x + 10) * 0.1) * 20;

		if (x === 0) {
			ctx.moveTo(x, y1);
		} else {
			ctx.lineTo(x, y1);
		}

		ctx.lineTo(x + 10, y2);
	}

	ctx.stroke();
};

const drawCheckeredPattern = (
	ctx: DrawContext | null,
	w: number,
	h: number,
	cellSize: number = 15
): void => {
	if (!ctx) return;
	for (let x = w * 0.4; x < w * 0.6; x += cellSize) {
		for (let y = h * 0.6; y < h * 0.9; y += cellSize) {
			if ((Math.floor(x / cellSize) + Math.floor(y / cellSize)) % 2 === 0) {
				// eslint-disable-next-line functional/immutable-data
				ctx.fillStyle = '#E74C3C';
				ctx.fillRect(x, y, cellSize, cellSize);
			}
		}
	}
};
const drawConcentricCircles = (ctx: DrawContext | null, w: number, h: number): void => {
	if (!ctx) return;
	const centerX = w * 0.75;
	const centerY = h * 0.75;
	const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#9B59B6'];

	colors.forEach((color, i) => {
		const reverseIndex = colors.length - i;
		// eslint-disable-next-line functional/immutable-data
		ctx.strokeStyle = color;
		// eslint-disable-next-line functional/immutable-data
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(centerX, centerY, reverseIndex * 8, 0, 2 * Math.PI);
		ctx.stroke();
	});
};

const drawRotatingTriangle = (
	ctx: DrawContext | null,
	w: number,
	h: number,
	time: number
): void => {
	if (!ctx) return;
	ctx.save();
	ctx.translate(w * 0.2, h * 0.2);
	ctx.rotate(time * 0.02);
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = '#FF6B6B';
	ctx.beginPath();
	ctx.moveTo(0, -w * 0.08);
	ctx.lineTo(-w * 0.07, w * 0.07);
	ctx.lineTo(w * 0.07, w * 0.07);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
};

const drawRotatingSquare = (ctx: DrawContext | null, w: number, h: number, time: number): void => {
	if (!ctx) return;
	ctx.save();
	ctx.translate(w * 0.45, h * 0.2);
	ctx.rotate(time * -0.015);
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = '#4ECDC4';
	ctx.fillRect(-w * 0.06, -w * 0.06, w * 0.12, w * 0.12);
	ctx.restore();
};

const drawPulsatingCircle = (ctx: DrawContext | null, w: number, h: number, time: number): void => {
	if (!ctx) return;
	const pulseRadius = w * 0.06 + Math.sin(time * 0.05) * w * 0.03;
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = `hsl(${(time * 2) % 360}, 70%, 60%)`;
	ctx.beginPath();
	ctx.arc(w * 0.75, h * 0.2, pulseRadius, 0, 2 * Math.PI);
	ctx.fill();
};

const drawOscillatingEllipse = (
	ctx: DrawContext | null,
	w: number,
	h: number,
	time: number
): void => {
	if (!ctx) return;
	const oscillation = Math.sin(time * 0.03) * 0.5 + 1;
	// eslint-disable-next-line functional/immutable-data
	ctx.fillStyle = '#F7DC6F';
	ctx.beginPath();
	ctx.ellipse(w * 0.15, h * 0.5, w * 0.08 * oscillation, w * 0.04, 0, 0, 2 * Math.PI);
	ctx.fill();
};

const drawSineWave = (ctx: DrawContext | null, w: number, h: number, time: number): void => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = '#45B7D1';
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = 3;
	ctx.beginPath();
	for (let x = 0; x < w; x += 3) {
		const y = h * 0.5 + Math.sin((x + time * 2) * 0.02) * h * 0.08;
		if (x === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
};

const drawMovingParticles = (ctx: DrawContext | null, w: number, h: number, time: number): void => {
	if (!ctx) return;
	for (let i = 0; i < 8; i++) {
		const angle = time * 0.01 + (i * Math.PI * 2) / 8;
		const radius = w * 0.15 + Math.sin(time * 0.02 + i) * w * 0.05;
		const x = w * 0.75 + Math.cos(angle) * radius;
		const y = h * 0.75 + Math.sin(angle) * radius;

		// eslint-disable-next-line functional/immutable-data
		ctx.fillStyle = `hsl(${i * 45 + time}, 80%, 60%)`;
		ctx.beginPath();
		ctx.arc(x, y, w * 0.01, 0, 2 * Math.PI);
		ctx.fill();
	}
};

const drawFrequencyWaves = (ctx: DrawContext | null, w: number, h: number, time: number): void => {
	if (!ctx) return;
	// eslint-disable-next-line functional/immutable-data
	ctx.strokeStyle = '#9B59B6';
	// eslint-disable-next-line functional/immutable-data
	ctx.lineWidth = 2;
	ctx.beginPath();
	for (let x = 0; x < w; x += 2) {
		const y = h * 0.8 + Math.sin((x + time * 3) * 0.03) * h * 0.05;
		if (x === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
};

const drawBasicShapes = () => {
	const { width: w, height: h } = getCanvasDimensions();
	if (!w || !h) return;

	clearCanvas();

	// Basic rectangles
	drawRect(ctx.value, w * 0.05, h * 0.05, w * 0.2, h * 0.25, '#FF6B6B');
	drawRect(ctx.value, w * 0.3, h * 0.05, w * 0.15, h * 0.25, '#E74C3C', true);

	// Circles
	drawCircle(ctx.value, w * 0.6, h * 0.18, w * 0.1, '#4ECDC4');
	drawCircle(ctx.value, w * 0.8, h * 0.18, w * 0.08, '#26A69A', true);

	// Polygons
	drawTriangle(ctx.value, w * 0.15, h * 0.575, w * 0.1, '#45B7D1');
	drawRhombus(ctx.value, w * 0.4, h * 0.55, w * 0.05, '#3498DB');

	// Ellipse
	drawEllipse(ctx.value, w * 0.65, h * 0.55, w * 0.12, h * 0.08, '#F7DC6F');

	// Parallelogram
	const parallelogramPoints: [number, number][] = [
		[w * 0.75, h * 0.45],
		[w * 0.9, h * 0.45],
		[w * 0.95, h * 0.65],
		[w * 0.8, h * 0.65],
	];
	drawParallelogram(ctx.value, parallelogramPoints, '#F39C12');

	// Trapezoid
	const trapezoidPoints: [number, number][] = [
		[w * 0.05, h * 0.8],
		[w * 0.25, h * 0.8],
		[w * 0.22, h * 0.95],
		[w * 0.08, h * 0.95],
	];
	drawParallelogram(ctx.value, trapezoidPoints, '#9B59B6');

	// Lines
	drawLine(ctx.value, w * 0.4, h * 0.8, w * 0.6, h * 0.95, '#8E44AD', 2);
	drawLine(ctx.value, w * 0.65, h * 0.8, w * 0.85, h * 0.95, '#8E44AD', 5);
	drawLine(ctx.value, w * 0.5, h * 0.35, w * 0.9, h * 0.35, '#E67E22', 3, true);
};

const drawComplexShapes = () => {
	const { width: w, height: h } = getCanvasDimensions();
	if (!w || !h) return;

	clearCanvas();

	// Stars
	drawStar(ctx.value, w * 0.15, h * 0.2, w * 0.08, w * 0.04, 5, '#FF6B6B');
	drawStar(ctx.value, w * 0.35, h * 0.2, w * 0.06, w * 0.03, 8, '#E74C3C');

	// Polygons
	drawPolygon(ctx.value, w * 0.6, h * 0.2, w * 0.08, 6, '#4ECDC4');
	drawPolygon(ctx.value, w * 0.8, h * 0.2, w * 0.06, 8, '#26A69A');

	// Rounded rectangles
	drawRoundedRect(ctx.value, w * 0.05, h * 0.4, w * 0.2, h * 0.15, w * 0.015, '#45B7D1');
	drawRoundedRect(ctx.value, w * 0.3, h * 0.4, w * 0.15, h * 0.15, w * 0.03, '#3498DB');

	// Arcs
	drawArc(ctx.value, w * 0.6, h * 0.5, w * 0.1, 0, Math.PI * 1.5, '#F7DC6F');
	drawArc(ctx.value, w * 0.8, h * 0.5, w * 0.08, Math.PI * 0.5, Math.PI * 1.8, '#F39C12');

	// Curves
	drawBezierCurve(
		ctx.value,
		w * 0.1,
		h * 0.7,
		w * 0.2,
		h * 0.6,
		w * 0.3,
		h * 0.8,
		w * 0.4,
		h * 0.7,
		'#8E44AD',
		4
	);
	drawQuadraticCurve(
		ctx.value,
		w * 0.5,
		h * 0.8,
		w * 0.65,
		h * 0.7,
		w * 0.8,
		h * 0.8,
		'#9B59B6',
		3
	);

	// Special shapes
	drawArrow(ctx.value, w * 0.15, h * 0.85, w * 0.35, h * 0.85, w * 0.02, '#E67E22');
	drawHeart(ctx.value, w * 0.65, h * 0.85, w * 0.04, '#E91E63');
};
const drawPatterns = () => {
	const { width: w, height: h } = getCanvasDimensions();
	if (!w || !h || !ctx.value) return;

	clearCanvas();

	// Grid pattern
	drawGridWithCircles(ctx.value, w, h);

	// Zigzag pattern
	drawZigzag(ctx.value, w, h);

	// Spirals
	drawSpiral(ctx.value, w * 0.1, h * 0.1, w * 0.04, '#4ECDC4');
	drawSpiral(ctx.value, w * 0.9, h * 0.1, w * 0.05, '#45B7D1');
	drawSpiral(ctx.value, w * 0.1, h * 0.9, w * 0.06, '#F7DC6F');
	drawSpiral(ctx.value, w * 0.9, h * 0.9, w * 0.04, '#9B59B6');

	// Checkered pattern
	drawCheckeredPattern(ctx.value, w, h);

	// Concentric circles
	drawConcentricCircles(ctx.value, w, h);
};
const drawAnimatedShapes = () => {
	const { width: w, height: h } = getCanvasDimensions();
	if (!w || !h || !ctx.value) return;

	clearCanvas();

	const context = ctx.value;
	const time = animationTime.value;

	if (!ctx.value) return;

	// Rotating triangle
	drawRotatingTriangle(context, w, h, time);

	// Rotating square
	drawRotatingSquare(context, w, h, time);

	// Pulsating circle
	drawPulsatingCircle(context, w, h, time);

	// Oscillating ellipse
	drawOscillatingEllipse(context, w, h, time);

	// Moving sine wave
	drawSineWave(context, w, h, time);

	// Moving particles
	drawMovingParticles(context, w, h, time);

	// Secondary wave
	drawFrequencyWaves(context, w, h, time);

	animationTime.value++;
	if (currentMode.value === 'animated') {
		animationId.value = requestAnimationFrame(drawAnimatedShapes);
	}
};

// Mode drawing dispatcher
const drawingModes: Record<Mode, () => void> = {
	basic: drawBasicShapes,
	complex: drawComplexShapes,
	patterns: drawPatterns,
	animated: drawAnimatedShapes,
};
const drawShapes = (mode: Mode): void => {
	currentMode.value = mode;
	stopAnimation();

	if (mode === 'animated') {
		animationTime.value = 0;
	}

	drawingModes[mode]();
};

const resizeCanvas = () => {
	if (canvas.value && canvasWrap.value) {
		const containerWidth = canvasWrap.value.clientWidth;
		const maxWidth = Math.min(containerWidth, MAX_CANVAS_WIDTH);

		const dpr = window.devicePixelRatio || 1;

		canvas.value.width = maxWidth * dpr;
		canvas.value.height = maxWidth * ASPECT_RATIO * dpr;

		canvas.value.style.width = `${maxWidth}px`;
		canvas.value.style.height = `${maxWidth * ASPECT_RATIO}px`;

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
	stopAnimation();
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
