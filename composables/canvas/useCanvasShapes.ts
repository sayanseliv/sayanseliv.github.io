/* eslint-disable functional/immutable-data */
import type {
	DrawContext,
	Rectangle,
	Circle,
	Triangle,
	Rhombus,
	Ellipse,
	Polygon,
	Star,
	RoundedRect,
	Line,
	RegularPolygon,
	Arc,
	BezierCurve,
	QuadraticCurve,
	Arrow,
	Heart,
	Spiral,
} from '@/types/canvas';

export const useCanvasShapes = () => {
	// Базовые фигуры
	const drawRect = (
		ctx: DrawContext,
		{ x, y, width, height, color, hasStroke = false }: Rectangle
	): void => {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);

		if (hasStroke) {
			ctx.strokeStyle = '#C0392B';
			ctx.lineWidth = 3;
			ctx.strokeRect(x, y, width, height);
		}
	};

	const drawCircle = (
		ctx: DrawContext,
		{ x, y, radius, color, isStroke = false }: Circle
	): void => {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);

		if (isStroke) {
			ctx.strokeStyle = color;
			ctx.lineWidth = 8;
			ctx.stroke();
		} else {
			ctx.fillStyle = color;
			ctx.fill();
		}
	};

	const drawTriangle = (ctx: DrawContext, { x, y, size, color }: Triangle): void => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(x, y - size);
		ctx.lineTo(x - size, y + size);
		ctx.lineTo(x + size, y + size);
		ctx.closePath();
		ctx.fill();
	};

	const drawRhombus = (ctx: DrawContext, { centerX, centerY, size, color }: Rhombus): void => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY - size);
		ctx.lineTo(centerX - size, centerY);
		ctx.lineTo(centerX, centerY + size);
		ctx.lineTo(centerX + size, centerY);
		ctx.closePath();
		ctx.fill();
	};

	const drawEllipse = (ctx: DrawContext, { x, y, radiusX, radiusY, color }: Ellipse): void => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
		ctx.fill();
	};

	const drawPolygon = (ctx: DrawContext, { points, color }: Polygon): void => {
		if (points.length < 3) return;

		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(points[0][0], points[0][1]);
		points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
		ctx.closePath();
		ctx.fill();
	};

	const drawLine = (
		ctx: DrawContext,
		{ x1, y1, x2, y2, color, width, isDashed = false }: Line
	): void => {
		ctx.strokeStyle = color;
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

	// Сложные фигуры
	const drawStar = (
		ctx: DrawContext,
		{ x, y, outerRadius, innerRadius, points, color }: Star
	): void => {
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

	const drawRegularPolygon = (
		ctx: DrawContext,
		{ x, y, radius, sides, color }: RegularPolygon
	): void => {
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
		ctx: DrawContext,
		{ x, y, width, height, radius, color }: RoundedRect
	): void => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.roundRect(x, y, width, height, radius);
		ctx.fill();
	};

	const drawArc = (
		ctx: DrawContext,
		{ x, y, radius, startAngle, endAngle, color }: Arc
	): void => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, radius, startAngle, endAngle);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.fill();
	};

	// Curves
	const drawBezierCurve = (
		ctx: DrawContext,
		{ startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, color, width }: BezierCurve
	): void => {
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
		ctx.stroke();
	};

	const drawQuadraticCurve = (
		ctx: DrawContext,
		{ startX, startY, cpX, cpY, endX, endY, color, width }: QuadraticCurve
	): void => {
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.quadraticCurveTo(cpX, cpY, endX, endY);
		ctx.stroke();
	};

	// Special figures
	const drawArrow = (ctx: DrawContext, { x1, y1, x2, y2, thickness, color }: Arrow): void => {
		const angle = Math.atan2(y2 - y1, x2 - x1);
		const arrowLength = thickness * 3;
		const arrowOffset = arrowLength * 0.8;

		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = thickness;

		// Main line
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2 - arrowOffset * Math.cos(angle), y2 - arrowOffset * Math.sin(angle));
		ctx.stroke();

		// Arrow
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

	const drawHeart = (ctx: DrawContext, { x, y, size, color }: Heart): void => {
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
		ctx: DrawContext,
		{ centerX, centerY, maxRadius, color, turns = 3 }: Spiral
	): void => {
		ctx.strokeStyle = color;
		ctx.lineWidth = maxRadius * 0.05;
		ctx.beginPath();

		const maxAngle = turns * 2 * Math.PI;

		for (let angle = 0; angle < maxAngle; angle += 0.1) {
			const radius = (angle / maxAngle) * maxRadius;
			const x = centerX + Math.cos(angle) * radius;
			const y = centerY + Math.sin(angle) * radius;

			if (angle === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}

		ctx.stroke();
	};

	return {
		drawRect,
		drawCircle,
		drawTriangle,
		drawRhombus,
		drawEllipse,
		drawPolygon,
		drawLine,
		drawStar,
		drawRegularPolygon,
		drawRoundedRect,
		drawArc,
		drawBezierCurve,
		drawQuadraticCurve,
		drawArrow,
		drawHeart,
		drawSpiral,
	};
};
