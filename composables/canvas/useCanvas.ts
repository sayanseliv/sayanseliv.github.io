/* eslint-disable functional/immutable-data */
import type { DrawContext } from '@/types/canvas';

export const useCanvas = () => {
	const clearCanvas = (ctx: DrawContext, canvas: HTMLCanvasElement): void => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	const getCanvasDimensions = (canvas: HTMLCanvasElement) => {
		const dpr = window.devicePixelRatio || 1;
		return {
			width: canvas.width / dpr,
			height: canvas.height / dpr,
		};
	};

	const setupCanvasContext = (canvas: HTMLCanvasElement): DrawContext | null => {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.error('2D context is not supported');
			return null;
		}

		// For Retina
		const dpr = window.devicePixelRatio || 1;
		ctx.scale(dpr, dpr);

		// Enable anti-aliasing
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = 'high';

		return ctx;
	};

	const setupCanvas = (
		canvas: HTMLCanvasElement,
		containerWidth: number,
		aspectRatio: number,
		maxWidth: number
	): DrawContext | null => {
		const maxCanvasWidth = Math.min(containerWidth, maxWidth);
		const dpr = window.devicePixelRatio || 1;

		canvas.width = maxCanvasWidth * dpr;
		canvas.height = maxCanvasWidth * aspectRatio * dpr;

		canvas.style.width = `${maxCanvasWidth}px`;
		canvas.style.height = `${maxCanvasWidth * aspectRatio}px`;

		return setupCanvasContext(canvas);
	};

	return {
		clearCanvas,
		getCanvasDimensions,
		setupCanvasContext,
		setupCanvas,
	};
};
