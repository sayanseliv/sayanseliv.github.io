<template>
	<div ref="wrap" class="canvas-wrap">
		<canvas
			ref="canvas"
			class="canvas-el"
			role="button"
			tabindex="0"
			aria-label="Interactive canvas for adding particles with mouse or keyboard"
			@click="handleClick"
			@pointerdown="handlePointerDown"
			@keydown="handleKeyDown" />
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'CanvasParticle',
});

const wrap = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const particlesArray = ref<readonly Particle[]>([]);
const mouseX = ref<number>(0);
const mouseY = ref<number>(0);
const hue = ref<number>(0);

class Particle {
	x: number;
	y: number;
	size: number;
	readonly speedX: number;
	readonly speedY: number;
	readonly color: string;
	constructor() {
		this.x = mouseX.value;
		this.y = mouseY.value;
		this.size = Math.random() * 5 + 1;
		this.speedX = Math.random() * 5 - 1.5;
		this.speedY = Math.random() * 5 - 1.5;
		this.color = `hsl(${hue.value}, 100%, 50%)`;
	}
	update() {
		this.x += this.speedX;

		this.y += this.speedY;

		if (this.size > 0.2) this.size -= 0.1;
	}
	draw() {
		if (!ctx.value) return;
		drawCircle(ctx.value, this.x, this.y, this.size, this.color);
	}
}

const drawCircle = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	size: number,
	color: string
) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fill();
};

const drawLine = (
	ctx: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	color: string
) => {
	ctx.beginPath();

	ctx.strokeStyle = color;

	ctx.lineWidth = 0.2;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
};

const resizeCanvas = () => {
	if (canvas.value && wrap.value) {
		canvas.value.width = wrap.value.clientWidth;
		canvas.value.height = wrap.value.clientHeight;
		ctx.value = canvas.value.getContext('2d');
		if (!ctx.value) {
			console.error('2D context is not supported');
			return;
		}
	} else {
		console.error('Canvas element not found');
	}
};

const addParticles = (count: number) => {
	if (particlesArray.value.length < 200) {
		particlesArray.value = [
			...particlesArray.value,
			...Array.from({ length: count }, () => new Particle()),
		];
	}
};

const onPointer = () => {
	if (!canvas.value) return;
	canvas.value.addEventListener('pointermove', (e: PointerEvent) => {
		const rect = canvas.value!.getBoundingClientRect();
		mouseX.value = e.clientX - rect.left;
		mouseY.value = e.clientY - rect.top;
		addParticles(5);
	});
};

const handleClick = (event: MouseEvent) => {
	if (!canvas.value) return;
	const rect = canvas.value.getBoundingClientRect();
	mouseX.value = event.clientX - rect.left;
	mouseY.value = event.clientY - rect.top;
	addParticles(10);
};

const handlePointerDown = (event: PointerEvent) => {
	if (!canvas.value) return;
	const rect = canvas.value.getBoundingClientRect();
	mouseX.value = event.clientX - rect.left;
	mouseY.value = event.clientY - rect.top;
	addParticles(10);
};

const handleKeyDown = (event: KeyboardEvent) => {
	if (!canvas.value) return;
	const step = 10;
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		addParticles(10);
	} else if (event.key === 'ArrowUp') {
		mouseY.value = Math.max(0, mouseY.value - step);
		addParticles(5);
	} else if (event.key === 'ArrowDown') {
		mouseY.value = Math.min(canvas.value.height, mouseY.value + step);
		addParticles(5);
	} else if (event.key === 'ArrowLeft') {
		mouseX.value = Math.max(0, mouseX.value - step);
		addParticles(5);
	} else if (event.key === 'ArrowRight') {
		mouseX.value = Math.min(canvas.value.width, mouseX.value + step);
		addParticles(5);
	}
};

const handleParticles = () => {
	if (!ctx.value || !canvas.value) return;
	ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

	particlesArray.value = particlesArray.value.filter((particle, i) => {
		particle.update();
		particle.draw();
		for (let j = i; j < particlesArray.value.length; j++) {
			const other = particlesArray.value[j]!;
			const dx = particle.x - other.x;
			const dy = particle.y - other.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100 && ctx.value) {
				drawLine(
					ctx.value,
					particle.x,
					particle.y,
					other.x,
					other.y,
					particle.color
				);
			}
		}
		return particle.size > 0.3;
	});

	drawText(ctx.value, 'Canvas Particle', canvas.value.width / 2, 50, 'white', 'bold 28px Arial');
	drawText(
		ctx.value,
		'Click and press Enter/Space to add particles',
		canvas.value.width / 2,
		100,
		'white',
		'bold 16px Arial'
	);
	if (canvas.value.contains(document.activeElement)) {
		drawCircle(ctx.value, mouseX.value, mouseY.value, 5, 'rgba(255, 255, 255, 0.5)');
	}

	hue.value += 2;
};

const animate = () => {
	handleParticles();
	requestAnimationFrame(animate);
};

const drawText = (
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	color: string,
	font = '20px Arial',
	align: CanvasTextAlign = 'center'
) => {
	ctx.fillStyle = color;

	ctx.font = font;

	ctx.textAlign = align;
	ctx.fillText(text, x, y);
};

onMounted(() => {
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
	onPointer();
	animate();
});

onUnmounted(() => {
	window.removeEventListener('resize', resizeCanvas);
});
</script>

<style lang="scss" scoped>
.canvas-wrap {
	display: block;
	height: calc(100dvh - 5rem);
	width: 100%;
	border: 1px solid var(--blue-300);
}
.canvas-el {
	touch-action: none;
	cursor: pointer;
}
</style>
