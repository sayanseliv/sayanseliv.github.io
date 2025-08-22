<template>
	<div class="geometric-figures">
		<h1 class="text-gradient geometric-figures__title">Adaptive geometric shapes on canvas</h1>

		<div class="geometric-figures__controls">
			<button
				v-for="mode in modes"
				:key="mode"
				:class="['geometric-figures__btn', { active: currentMode === mode }]"
				@click="setMode(mode)">
				{{ mode }}
			</button>
		</div>

		<div ref="canvasWrap">
			<canvas ref="canvasRef" class="geometric-figures__canvas" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCanvas } from '@/composables/canvas/useCanvas';
import { useCanvasShapes } from '@/composables/canvas/useCanvasShapes';
import { useCanvasPatterns } from '@/composables/canvas/useCanvasPatterns';
import { useCanvasAnimations } from '@/composables/canvas/useCanvasAnimations';
import type { DrawContext } from '@/types/canvas';

defineOptions({
	name: 'GeometricFigures',
});

type Mode = 'basic' | 'complex' | 'patterns' | 'animated';

// Constants
const ASPECT_RATIO = 2 / 3;
const MAX_CANVAS_WIDTH = 800;
const modes: Mode[] = ['basic', 'complex', 'patterns', 'animated'];

// Composables
const { clearCanvas, getCanvasDimensions, setupCanvas } = useCanvas();
const shapes = useCanvasShapes();
const patterns = useCanvasPatterns();
const animations = useCanvasAnimations();

// Refs
const canvasWrap = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const currentMode = ref<Mode>('basic');
const ctx = ref<DrawContext | null>(null);
const animationId = ref<number | null>(null);
const animationTime = ref<number>(0);

// Animation control
const stopAnimation = (): void => {
	if (animationId.value) {
		cancelAnimationFrame(animationId.value);
		animationId.value = null;
	}
};

// Drawing functions
const drawBasicShapes = (context: DrawContext, w: number, h: number): void => {
	clearCanvas(context, canvasRef.value!);

	// Basic rectangles
	shapes.drawRect(context, {
		x: w * 0.05,
		y: h * 0.05,
		width: w * 0.2,
		height: h * 0.25,
		color: '#FF6B6B',
	});
	shapes.drawRect(context, {
		x: w * 0.3,
		y: h * 0.05,
		width: w * 0.15,
		height: h * 0.25,
		color: '#E74C3C',
		hasStroke: true,
	});

	// Circles
	shapes.drawCircle(context, { x: w * 0.6, y: h * 0.18, radius: w * 0.1, color: '#4ECDC4' });
	shapes.drawCircle(context, {
		x: w * 0.8,
		y: h * 0.18,
		radius: w * 0.08,
		color: '#26A69A',
		isStroke: true,
	});

	// Polygons
	shapes.drawTriangle(context, { x: w * 0.15, y: h * 0.575, size: w * 0.1, color: '#45B7D1' });
	shapes.drawRhombus(context, {
		centerX: w * 0.4,
		centerY: h * 0.55,
		size: w * 0.05,
		color: '#3498DB',
	});

	// Ellipse
	shapes.drawEllipse(context, {
		x: w * 0.65,
		y: h * 0.55,
		radiusX: w * 0.12,
		radiusY: h * 0.08,
		color: '#F7DC6F',
	});

	// Parallelogram
	shapes.drawPolygon(context, {
		points: [
			[w * 0.75, h * 0.45],
			[w * 0.9, h * 0.45],
			[w * 0.95, h * 0.65],
			[w * 0.8, h * 0.65],
		],
		color: '#F39C12',
	});

	// Trapezoid
	shapes.drawPolygon(context, {
		points: [
			[w * 0.05, h * 0.8],
			[w * 0.25, h * 0.8],
			[w * 0.22, h * 0.95],
			[w * 0.08, h * 0.95],
		],
		color: '#9B59B6',
	});

	// Lines
	shapes.drawLine(context, {
		x1: w * 0.4,
		y1: h * 0.8,
		x2: w * 0.6,
		y2: h * 0.95,
		color: '#8E44AD',
		width: 2,
	});
	shapes.drawLine(context, {
		x1: w * 0.65,
		y1: h * 0.8,
		x2: w * 0.85,
		y2: h * 0.95,
		color: '#8E44AD',
		width: 5,
	});
	shapes.drawLine(context, {
		x1: w * 0.5,
		y1: h * 0.35,
		x2: w * 0.9,
		y2: h * 0.35,
		color: '#E67E22',
		width: 3,
		isDashed: true,
	});
};

const drawComplexShapes = (context: DrawContext, w: number, h: number): void => {
	clearCanvas(context, canvasRef.value!);

	// Stars
	shapes.drawStar(context, {
		x: w * 0.15,
		y: h * 0.2,
		outerRadius: w * 0.08,
		innerRadius: w * 0.04,
		points: 5,
		color: '#FF6B6B',
	});
	shapes.drawStar(context, {
		x: w * 0.35,
		y: h * 0.2,
		outerRadius: w * 0.06,
		innerRadius: w * 0.03,
		points: 8,
		color: '#E74C3C',
	});

	// Regular polygons
	shapes.drawRegularPolygon(context, {
		x: w * 0.6,
		y: h * 0.2,
		radius: w * 0.08,
		sides: 6,
		color: '#4ECDC4',
	});
	shapes.drawRegularPolygon(context, {
		x: w * 0.8,
		y: h * 0.2,
		radius: w * 0.06,
		sides: 8,
		color: '#26A69A',
	});

	// Rounded rectangles
	shapes.drawRoundedRect(context, {
		x: w * 0.05,
		y: h * 0.4,
		width: w * 0.2,
		height: h * 0.15,
		radius: w * 0.015,
		color: '#45B7D1',
	});
	shapes.drawRoundedRect(context, {
		x: w * 0.3,
		y: h * 0.4,
		width: w * 0.15,
		height: h * 0.15,
		radius: w * 0.03,
		color: '#3498DB',
	});

	// Arcs
	shapes.drawArc(context, {
		x: w * 0.6,
		y: h * 0.5,
		radius: w * 0.1,
		startAngle: 0,
		endAngle: Math.PI * 1.5,
		color: '#F7DC6F',
	});
	shapes.drawArc(context, {
		x: w * 0.8,
		y: h * 0.5,
		radius: w * 0.08,
		startAngle: Math.PI * 0.5,
		endAngle: Math.PI * 1.8,
		color: '#F39C12',
	});

	// Curves
	shapes.drawBezierCurve(context, {
		startX: w * 0.1,
		startY: h * 0.7,
		cp1X: w * 0.2,
		cp1Y: h * 0.6,
		cp2X: w * 0.3,
		cp2Y: h * 0.8,
		endX: w * 0.4,
		endY: h * 0.7,
		color: '#8E44AD',
		width: 4,
	});
	shapes.drawQuadraticCurve(context, {
		startX: w * 0.5,
		startY: h * 0.8,
		cpX: w * 0.65,
		cpY: h * 0.7,
		endX: w * 0.8,
		endY: h * 0.8,
		color: '#9B59B6',
		width: 3,
	});

	// Special shapes
	shapes.drawArrow(context, {
		x1: w * 0.15,
		y1: h * 0.85,
		x2: w * 0.35,
		y2: h * 0.85,
		thickness: w * 0.02,
		color: '#E67E22',
	});
	shapes.drawHeart(context, { x: w * 0.65, y: h * 0.85, size: w * 0.04, color: '#E91E63' });
};

const drawPatterns = (context: DrawContext, w: number, h: number): void => {
	clearCanvas(context, canvasRef.value!);

	// Grid pattern
	const gridSize = Math.min(w, h) * 0.04;
	patterns.drawGridWithCircles(context, {
		width: w,
		height: h,
		gridSize,
		rectX: w * 0.25,
		rectY: h * 0.01,
		rectWidth: w * 0.28,
		rectHeight: h * 0.28,
	});

	// Zigzag pattern
	patterns.drawZigzag(context, {
		width: w,
		height: h,
		amplitude: 20,
		frequency: 0.1,
		yPosition: 0.3,
	});

	// Spirals
	shapes.drawSpiral(context, {
		centerX: w * 0.1,
		centerY: h * 0.1,
		maxRadius: w * 0.04,
		color: '#4ECDC4',
		turns: 3,
	});
	shapes.drawSpiral(context, {
		centerX: w * 0.9,
		centerY: h * 0.1,
		maxRadius: w * 0.05,
		color: '#45B7D1',
		turns: 3,
	});
	shapes.drawSpiral(context, {
		centerX: w * 0.1,
		centerY: h * 0.9,
		maxRadius: w * 0.06,
		color: '#F7DC6F',
		turns: 3,
	});
	shapes.drawSpiral(context, {
		centerX: w * 0.9,
		centerY: h * 0.9,
		maxRadius: w * 0.04,
		color: '#9B59B6',
		turns: 3,
	});

	// Checkered pattern
	patterns.drawCheckeredPattern(context, { width: w, height: h, cellSize: 15 });

	// Concentric circles
	patterns.drawConcentricCircles(context, {
		centerX: w * 0.75,
		centerY: h * 0.75,
		colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#9B59B6'],
	});
};

const drawAnimatedShapes = (): void => {
	if (!canvasRef.value || !ctx.value) return;

	const { width: w, height: h } = getCanvasDimensions(canvasRef.value);
	if (!w || !h) return;

	const context = ctx.value;
	const time = animationTime.value;

	clearCanvas(context, canvasRef.value);

	// Rotating triangle
	animations.drawRotatingShape(context, {
		centerX: w * 0.2,
		centerY: w * 0.2,
		time,
		rotationSpeed: 0.02,
		drawFunction: (ctx) => {
			// eslint-disable-next-line functional/immutable-data
			ctx.fillStyle = '#FF6B6B';
			ctx.beginPath();
			ctx.moveTo(0, -w * 0.08);
			ctx.lineTo(-w * 0.07, w * 0.07);
			ctx.lineTo(w * 0.07, w * 0.07);
			ctx.closePath();
			ctx.fill();
		},
	});

	// Rotating square
	animations.drawRotatingShape(context, {
		centerX: w * 0.45,
		centerY: w * 0.2,
		time,
		rotationSpeed: -0.015,
		drawFunction: (ctx) => {
			// eslint-disable-next-line functional/immutable-data
			ctx.fillStyle = '#4ECDC4';
			ctx.fillRect(-w * 0.06, -w * 0.06, w * 0.12, w * 0.12);
		},
	});

	// Pulsating circle
	animations.drawPulsatingCircle(context, {
		x: w * 0.75,
		y: h * 0.2,
		baseRadius: w * 0.06,
		pulseAmplitude: w * 0.03,
		pulseSpeed: 0.05,
		time,
		color: `hsl(${(time * 2) % 360}, 70%, 60%)`,
	});

	// Oscillating ellipse
	animations.drawOscillatingEllipse(context, {
		x: w * 0.15,
		y: h * 0.5,
		baseRadiusX: w * 0.08,
		baseRadiusY: w * 0.04,
		oscillationSpeed: 0.03,
		time,
		color: '#F7DC6F',
	});

	// Animated sine wave
	animations.drawAnimatedSineWave(context, {
		width: w,
		height: h,
		amplitude: h * 0.08,
		frequency: 0.02,
		phase: time * 2,
		yOffset: 0.5,
		color: '#45B7D1',
		lineWidth: 3,
	});

	// Moving particles
	animations.drawMovingParticles(context, {
		centerX: w * 0.75,
		centerY: h * 0.75,
		particleCount: 8,
		baseRadius: w * 0.15,
		radiusVariation: w * 0.05,
		time,
		particleRadius: w * 0.01,
	});

	// Secondary wave
	animations.drawAnimatedSineWave(context, {
		width: w,
		height: h,
		amplitude: h * 0.05,
		frequency: 0.03,
		phase: time * 3,
		yOffset: 0.8,
		color: '#9B59B6',
		lineWidth: 2,
	});

	animationTime.value++;
	if (currentMode.value === 'animated') {
		animationId.value = requestAnimationFrame(drawAnimatedShapes);
	}
};

// Mode drawing dispatcher
const drawingModes = {
	basic: (context: DrawContext, w: number, h: number) => drawBasicShapes(context, w, h),
	complex: (context: DrawContext, w: number, h: number) => drawComplexShapes(context, w, h),
	patterns: (context: DrawContext, w: number, h: number) => drawPatterns(context, w, h),
	animated: () => drawAnimatedShapes(),
} as const;

const setMode = (mode: Mode): void => {
	currentMode.value = mode;
	stopAnimation();

	if (mode === 'animated') {
		animationTime.value = 0;
		drawAnimatedShapes();
	} else {
		drawCurrentMode();
	}
};

const drawCurrentMode = (): void => {
	if (!canvasRef.value || !ctx.value) return;

	const { width: w, height: h } = getCanvasDimensions(canvasRef.value);
	if (!w || !h) return;

	const drawFunction = drawingModes[currentMode.value];
	if (typeof drawFunction === 'function' && currentMode.value !== 'animated') {
		drawFunction(ctx.value, w, h);
	}
};

const resizeCanvas = (): void => {
	if (!canvasRef.value || !canvasWrap.value) return;

	const containerWidth = canvasWrap.value.clientWidth;
	const context = setupCanvas(canvasRef.value, containerWidth, ASPECT_RATIO, MAX_CANVAS_WIDTH);

	if (!context) {
		console.error('Failed to setup canvas context');
		return;
	}

	ctx.value = context;

	if (currentMode.value === 'animated') {
		drawAnimatedShapes();
	} else {
		drawCurrentMode();
	}
};

onMounted(() => {
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
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
