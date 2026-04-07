export type DrawContext = CanvasRenderingContext2D;

export interface Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	hasStroke?: boolean;
}

export interface Circle {
	x: number;
	y: number;
	radius: number;
	color: string;
	isStroke?: boolean;
}

export interface Triangle {
	x: number;
	y: number;
	size: number;
	color: string;
}

export interface Rhombus {
	centerX: number;
	centerY: number;
	size: number;
	color: string;
}

export interface Ellipse {
	x: number;
	y: number;
	radiusX: number;
	radiusY: number;
	color: string;
}

export interface Polygon {
	points: [number, number][];
	color: string;
}

export interface Line {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	color: string;
	width: number;
	isDashed?: boolean;
}

export interface Star {
	x: number;
	y: number;
	outerRadius: number;
	innerRadius: number;
	points: number;
	color: string;
}

export interface RegularPolygon {
	x: number;
	y: number;
	radius: number;
	sides: number;
	color: string;
}

export interface RoundedRect {
	x: number;
	y: number;
	width: number;
	height: number;
	radius: number;
	color: string;
}

export interface Arc {
	x: number;
	y: number;
	radius: number;
	startAngle: number;
	endAngle: number;
	color: string;
}

export interface BezierCurve {
	startX: number;
	startY: number;
	cp1X: number;
	cp1Y: number;
	cp2X: number;
	cp2Y: number;
	endX: number;
	endY: number;
	color: string;
	width: number;
}

export interface QuadraticCurve {
	startX: number;
	startY: number;
	cpX: number;
	cpY: number;
	endX: number;
	endY: number;
	color: string;
	width: number;
}

export interface Arrow {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	thickness: number;
	color: string;
}

export interface Heart {
	x: number;
	y: number;
	size: number;
	color: string;
}

export interface Spiral {
	centerX: number;
	centerY: number;
	maxRadius: number;
	color: string;
	turns?: number;
}

export interface GridWithCircles {
	width: number;
	height: number;
	gridSize: number;
	rectX: number;
	rectY: number;
	rectWidth: number;
	rectHeight: number;
}

export interface Zigzag {
	width: number;
	height: number;
	amplitude?: number;
	frequency?: number;
	yPosition?: number;
}

export interface CheckeredPattern {
	width: number;
	height: number;
	cellSize?: number;
	startX?: number;
	startY?: number;
	endX?: number;
	endY?: number;
}

export interface ConcentricCircles {
	centerX: number;
	centerY: number;
	colors: string[];
	spacing?: number;
}

export interface SineWave {
	width: number;
	height: number;
	amplitude: number;
	frequency: number;
	phase?: number;
	yOffset?: number;
	color?: string;
	lineWidth?: number;
}

export interface RotatingShape {
	centerX: number;
	centerY: number;
	time: number;
	rotationSpeed: number;
	drawFunction: (ctx: DrawContext) => void;
}

export interface PulsatingCircle {
	x: number;
	y: number;
	baseRadius: number;
	pulseAmplitude: number;
	pulseSpeed: number;
	time: number;
	color: string;
}

export interface OscillatingEllipse {
	x: number;
	y: number;
	baseRadiusX: number;
	baseRadiusY: number;
	oscillationSpeed: number;
	time: number;
	color: string;
}

export interface MovingParticles {
	centerX: number;
	centerY: number;
	particleCount: number;
	baseRadius: number;
	radiusVariation: number;
	time: number;
	particleRadius: number;
}

export interface AnimatedSineWave {
	width: number;
	height: number;
	amplitude: number;
	frequency: number;
	phase: number;
	yOffset: number;
	color: string;
	lineWidth: number;
}

export interface ColorCyclingShape {
	time: number;
	hueSpeed: number;
	saturation?: number;
	lightness?: number;
	drawFunction: (ctx: DrawContext, color: string) => void;
}
