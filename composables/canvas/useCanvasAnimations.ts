/* eslint-disable functional/immutable-data */
import type {
	DrawContext,
	RotatingShape,
	PulsatingCircle,
	OscillatingEllipse,
	MovingParticles,
	AnimatedSineWave,
	ColorCyclingShape,
} from '@/types/canvas';

export const useCanvasAnimations = () => {
	const drawRotatingShape = (
		ctx: DrawContext,
		{ centerX, centerY, time, rotationSpeed, drawFunction }: RotatingShape
	): void => {
		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.rotate(time * rotationSpeed);
		drawFunction(ctx);
		ctx.restore();
	};

	const drawPulsatingCircle = (
		ctx: DrawContext,
		{ x, y, baseRadius, pulseAmplitude, pulseSpeed, time, color }: PulsatingCircle
	): void => {
		const pulseRadius = baseRadius + Math.sin(time * pulseSpeed) * pulseAmplitude;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI);
		ctx.fill();
	};

	const drawOscillatingEllipse = (
		ctx: DrawContext,
		{ x, y, baseRadiusX, baseRadiusY, oscillationSpeed, time, color }: OscillatingEllipse
	): void => {
		const oscillation = Math.sin(time * oscillationSpeed) * 0.5 + 1;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.ellipse(x, y, baseRadiusX * oscillation, baseRadiusY, 0, 0, 2 * Math.PI);
		ctx.fill();
	};

	const drawMovingParticles = (
		ctx: DrawContext,
		{
			centerX,
			centerY,
			particleCount,
			baseRadius,
			radiusVariation,
			time,
			particleRadius,
		}: MovingParticles
	): void => {
		for (let i = 0; i < particleCount; i++) {
			const angle = time * 0.01 + (i * Math.PI * 2) / particleCount;
			const radius = baseRadius + Math.sin(time * 0.02 + i) * radiusVariation;
			const x = centerX + Math.cos(angle) * radius;
			const y = centerY + Math.sin(angle) * radius;

			ctx.fillStyle = `hsl(${i * (360 / particleCount) + time}, 80%, 60%)`;
			ctx.beginPath();
			ctx.arc(x, y, particleRadius, 0, 2 * Math.PI);
			ctx.fill();
		}
	};

	const drawAnimatedSineWave = (
		ctx: DrawContext,
		{ width, height, amplitude, frequency, phase, yOffset, color, lineWidth }: AnimatedSineWave
	): void => {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.beginPath();

		for (let x = 0; x < width; x += 2) {
			const y = height * yOffset + Math.sin((x + phase) * frequency) * amplitude;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}

		ctx.stroke();
	};

	const drawColorCyclingShape = (
		ctx: DrawContext,
		{ time, hueSpeed, saturation = 70, lightness = 60, drawFunction }: ColorCyclingShape
	): void => {
		const hue = (time * hueSpeed) % 360;
		const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		drawFunction(ctx, color);
	};

	return {
		drawRotatingShape,
		drawPulsatingCircle,
		drawOscillatingEllipse,
		drawMovingParticles,
		drawAnimatedSineWave,
		drawColorCyclingShape,
	};
};
