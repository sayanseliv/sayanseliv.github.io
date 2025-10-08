<template>
	<div ref="animatedWrap" class="animation-blue-mellow__wrapper">
		<canvas ref="canvas" class="blue-mellow" />
	</div>
</template>

<script setup lang="ts">
interface Particle {
	x: number;
	y: number;
}

// === Options ===
const trailOpacity = 0.1;

// === Variables ===
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let simplex: SimplexNoise;
let particles: Particle[] = [];
let animationFrame: number;

// === Simplex Noise ===
class SimplexNoise {
	private grad3: number[][] = [
		[1, 1, 0],
		[-1, 1, 0],
		[1, -1, 0],
		[-1, -1, 0],
		[1, 0, 1],
		[-1, 0, 1],
		[1, 0, -1],
		[-1, 0, -1],
		[0, 1, 1],
		[0, -1, 1],
		[0, 1, -1],
		[0, -1, -1],
	];
	private perm: number[] = [];
	private gradP: number[][] = [];

	constructor() {
		const p = [
			151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
			69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94,
			252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136,
			171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229,
			122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
			63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116,
			188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202,
			38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28,
			42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43,
			172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
			246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145,
			235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115,
			121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141,
			128, 195, 78, 66, 215, 61, 156, 180,
		];
		for (let i = 0; i < 512; i++) {
			this.perm[i] = p[i & 255];
			this.gradP[i] = this.grad3[this.perm[i] % 12];
		}
	}

	noise2D(xin: number, yin: number): number {
		let n0, n1, n2; // Изменено на const для n0, n1, n2, чтобы исправить ESLint ошибки prefer-const
		const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
		const s = (xin + yin) * F2;
		const i = Math.floor(xin + s);
		const j = Math.floor(yin + s);
		const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
		const t = (i + j) * G2;
		const x0 = xin - i + t;
		const y0 = yin - j + t;
		const i1 = x0 > y0 ? 1 : 0;
		const j1 = x0 > y0 ? 0 : 1;
		const x1 = x0 - i1 + G2;
		const y1 = y0 - j1 + G2;
		const x2 = x0 - 1 + 2 * G2;
		const y2 = y0 - 1 + 2 * G2;
		const ii = i & 255;
		const jj = j & 255;
		const gi0 = this.gradP[ii + this.perm[jj]];
		const gi1 = this.gradP[ii + i1 + this.perm[jj + j1]];
		const gi2 = this.gradP[ii + 1 + this.perm[jj + 1]];
		let t0 = 0.5 - x0 * x0 - y0 * y0;
		n0 = t0 < 0 ? 0 : (t0 *= t0) * t0 * (gi0[0] * x0 + gi0[1] * y0);
		let t1 = 0.5 - x1 * x1 - y1 * y1;
		n1 = t1 < 0 ? 0 : (t1 *= t1) * t1 * (gi1[0] * x1 + gi1[1] * y1);
		let t2 = 0.5 - x2 * x2 - y2 * y2;
		n2 = t2 < 0 ? 0 : (t2 *= t2) * t2 * (gi2[0] * x2 + gi2[1] * y2);
		return 70.0 * (n0 + n1 + n2);
	}
}

// === MAIN ===
function init() {
	const c = canvas.value;
	if (!c) return;
	ctx = c.getContext('2d');
	if (!ctx) return;
	simplex = new SimplexNoise();
	resize();
	draw();
}

function resize() {
	const c = canvas.value;
	if (!c) return;
	if (ctx) {
		ctx.clearRect(0, 0, c.width, c.height);
	}
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	const count = Math.min(3000, Math.floor((c.width * c.height) / 100));
	particles = Array.from({ length: count }, () => ({
		x: Math.random() * c.width,
		y: Math.random() * c.height,
	}));
}

function draw() {
	const c = canvas.value;
	if (!c || !ctx) return;

	ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.globalCompositeOperation = 'lighter';
	ctx.strokeStyle = 'rgba(50, 150, 255, 0.8)';
	ctx.lineWidth = 1;

	const mw = 0.002;
	const mh = 0.002;
	const speed = 2;

	for (const p of particles) {
		const noise = simplex.noise2D(p.x * mw, p.y * mh);
		const angle = noise * Math.PI * 2;

		const newX = p.x + Math.cos(angle) * speed;
		const newY = p.y + Math.sin(angle) * speed;

		ctx.beginPath();
		ctx.moveTo(p.x, p.y);
		ctx.lineTo(newX, newY);
		ctx.stroke();

		p.x = newX;
		p.y = newY;

		if (p.x < 0 || p.x > c.width || p.y < 0 || p.y > c.height) {
			p.x = Math.random() * c.width;
			p.y = Math.random() * c.height;
		}
	}

	ctx.globalCompositeOperation = 'source-over';
	animationFrame = requestAnimationFrame(draw);
}

onMounted(() => {
	init();
	window.addEventListener('resize', resize);
});

onBeforeUnmount(() => {
	cancelAnimationFrame(animationFrame);
	window.removeEventListener('resize', resize);
});
</script>

<style scoped lang="scss">
.animation-blue-mellow__wrapper {
	position: relative;
	width: 100%;
	height: calc(100dvh - 3rem);
}
</style>
