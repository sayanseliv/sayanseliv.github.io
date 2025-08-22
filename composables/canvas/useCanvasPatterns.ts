/* eslint-disable functional/immutable-data */
import type {
	DrawContext,
	GridWithCircles,
	Zigzag,
	CheckeredPattern,
	ConcentricCircles,
	SineWave,
} from '@/types/canvas';
import { useCanvasShapes } from './useCanvasShapes';

export const useCanvasPatterns = () => {
	const { drawCircle } = useCanvasShapes();

	const drawGridWithCircles = (
		ctx: DrawContext,
		{ gridSize, rectX, rectY, rectWidth, rectHeight }: GridWithCircles
	): void => {
		// Grid background
		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

		// Colored circles in a grid
		for (let x = rectX + gridSize; x < rectX + rectWidth - gridSize; x += gridSize) {
			for (let y = rectY + gridSize; y < rectY + rectHeight - gridSize; y += gridSize) {
				const hue = ((x + y) * 0.5) % 360;
				drawCircle(ctx, {
					x,
					y,
					radius: gridSize * 0.15,
					color: `hsl(${hue}, 70%, 60%)`,
				});
			}
		}
	};

	const drawZigzag = (
		ctx: DrawContext,
		{ width, height, amplitude = 20, frequency = 0.1, yPosition = 0.3 }: Zigzag
	): void => {
		ctx.strokeStyle = '#FF6B6B';
		ctx.lineWidth = 3;
		ctx.beginPath();

		for (let x = 0; x < width; x += 20) {
			const y1 = height * yPosition + Math.sin(x * frequency) * amplitude;
			const y2 = height * yPosition + Math.sin((x + 10) * frequency) * amplitude;

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
		ctx: DrawContext,
		{
			width,
			height,
			cellSize = 15,
			startX = 0.4,
			startY = 0.6,
			endX = 0.6,
			endY = 0.9,
		}: CheckeredPattern
	): void => {
		for (let x = width * startX; x < width * endX; x += cellSize) {
			for (let y = height * startY; y < height * endY; y += cellSize) {
				if ((Math.floor(x / cellSize) + Math.floor(y / cellSize)) % 2 === 0) {
					ctx.fillStyle = '#E74C3C';
					ctx.fillRect(x, y, cellSize, cellSize);
				}
			}
		}
	};

	const drawConcentricCircles = (
		ctx: DrawContext,
		{ centerX, centerY, colors, spacing = 8 }: ConcentricCircles
	): void => {
		colors.forEach((color, i) => {
			const reverseIndex = colors.length - i;
			ctx.strokeStyle = color;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(centerX, centerY, reverseIndex * spacing, 0, 2 * Math.PI);
			ctx.stroke();
		});
	};

	const drawSineWave = (
		ctx: DrawContext,
		{
			width,
			height,
			amplitude,
			frequency,
			phase = 0,
			yOffset = 0.5,
			color = '#45B7D1',
			lineWidth = 3,
		}: SineWave
	): void => {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.beginPath();

		for (let x = 0; x < width; x += 3) {
			const y = height * yOffset + Math.sin((x + phase) * frequency) * amplitude;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}

		ctx.stroke();
	};

	return {
		drawGridWithCircles,
		drawZigzag,
		drawCheckeredPattern,
		drawConcentricCircles,
		drawSineWave,
	};
};
