<template>
	<div ref="containerRef" class="flow-field-container">
		<TresCanvas clear-color="#000000" preserve-drawing-buffer>
			<TresOrthographicCamera
				ref="cameraRef"
				:args="[-500, 500, 500, -500, 0.1, 1000]"
				:position="[500, 500, 100]"
				:look-at="[500, 500, 0]"
				:zoom="1" />

			<TresLineSegments>
				<TresBufferGeometry ref="linesGeometry" :position="[positions, 3]" />
				<TresLineBasicMaterial
					:color="new THREE.Color('hsla(218, 95%, 50%, 1)')"
					:blending="THREE.AdditiveBlending"
					:transparent="true"
					:opacity="0.15"
					:depth-test="false" />
			</TresLineSegments>
		</TresCanvas>
	</div>
</template>

<script setup lang="ts">
import * as THREE from 'three';

defineOptions({
	name: 'FlowField3D',
});

// --- Simplex Noise
interface SimplexNoise {
	noise: (xn: number, yn: number) => number;
}
const SimpNs: SimplexNoise = (function () {
	const grd = [
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
	const pt = [
		151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
		142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252,
		219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168,
		68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
		133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80,
		73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100,
		109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82,
		85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
		152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
		108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238,
		210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
		181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205,
		93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
	];
	const arr: number[] = [];
	for (let i = 0; i < 512; i++) arr[i] = pt[i & 255];
	const part = (a: number[], x: number, y: number) => a[0] * x + a[1] * y;
	const floor = (num: number) => num << 0;
	return {
		noise: function (xn: number, yn: number) {
			let n0, n1, n2;
			const F2 = 0.5 * (Math.sqrt(3) - 1);
			const s = (xn + yn) * F2;
			const i = floor(xn + s);
			const j = floor(yn + s);
			const G2 = (3 - Math.sqrt(3)) / 6;
			const t = (i + j) * G2;
			const X0 = i - t;
			const Y0 = j - t;
			const x0 = xn - X0;
			const y0 = yn - Y0;
			let i1, j1;
			if (x0 > y0) {
				i1 = 1;
				j1 = 0;
			} else {
				i1 = 0;
				j1 = 1;
			}
			const x1 = x0 - i1 + G2;
			const y1 = y0 - j1 + G2;
			const x2 = x0 - 1 + 2 * G2;
			const y2 = y0 - 1 + 2 * G2;
			const ii = i & 255;
			const jj = j & 255;
			const gi0 = arr[ii + arr[jj]] % 12;
			const gi1 = arr[ii + i1 + arr[jj + j1]] % 12;
			const gi2 = arr[ii + 1 + arr[jj + 1]] % 12;
			let t0 = 0.5 - x0 * x0 - y0 * y0;
			if (t0 < 0) n0 = 0;
			else {
				t0 *= t0;
				n0 = t0 * t0 * part(grd[gi0], x0, y0);
			}
			let t1 = 0.5 - x1 * x1 - y1 * y1;
			if (t1 < 0) n1 = 0;
			else {
				t1 *= t1;
				n1 = t1 * t1 * part(grd[gi1], x1, y1);
			}
			let t2 = 0.5 - x2 * x2 - y2 * y2;
			if (t2 < 0) n2 = 0;
			else {
				t2 *= t2;
				n2 = t2 * t2 * part(grd[gi2], x2, y2);
			}
			return 20 * (n0 + n1 + n2);
		},
	};
})();

// --- Setup ---
const COUNT = 5000;
const linesGeometry = shallowRef<THREE.BufferGeometry | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const cameraRef = shallowRef<THREE.OrthographicCamera | null>(null);

const positions = new Float32Array(COUNT * 2 * 3);
const currentPositions = new Float32Array(COUNT * 2);

const width = shallowRef(1000);
const height = shallowRef(1000);
const mw = shallowRef(0);
const mh = shallowRef(0);

const initParticles = (w: number, h: number) => {
	for (let i = 0; i < COUNT; i++) {
		currentPositions[i * 2] = Math.random() * w;
		currentPositions[i * 2 + 1] = Math.random() * h;
	}
};

const updateDimensions = (init = false) => {
	if (containerRef.value) {
		const rect = containerRef.value.getBoundingClientRect();
		width.value = rect.width;
		height.value = rect.height;

		mw.value = ((Math.PI / 3) * 7) / width.value;
		mh.value = Math.PI / 2 / height.value;

		if (cameraRef.value) {
			const cam = cameraRef.value;
			cam.left = -width.value / 2;
			cam.right = width.value / 2;
			cam.top = height.value / 2;
			cam.bottom = -height.value / 2;
			cam.position.set(width.value / 2, height.value / 2, 100);
			cam.lookAt(width.value / 2, height.value / 2, 0);
			cam.updateProjectionMatrix();
		}

		if (init) {
			initParticles(width.value, height.value);
		}
	}
};

let animationFrameId: number;

const animate = () => {
	if (linesGeometry.value) {
		const posAttr = linesGeometry.value.attributes.position;
		const posArr = posAttr.array as Float32Array;

		const _mw = mw.value;
		const _mh = mh.value;
		const _w = width.value;
		const _h = height.value;

		for (let i = 0; i < COUNT; i++) {
			let x = currentPositions[i * 2];
			let y = currentPositions[i * 2 + 1];

			const idx = i * 6;
			posArr[idx] = x;
			posArr[idx + 1] = y;
			posArr[idx + 2] = 0;

			const noiseVal = SimpNs.noise(x * _mw * 0.25, y * _mh * 1.18);
			const angle = Math.PI * 2.8 * noiseVal;
			const stepLength = 25;

			let nextX = x + stepLength * Math.sin(angle);
			let nextY = y + stepLength * Math.cos(angle);

			posArr[idx + 3] = nextX;
			posArr[idx + 4] = nextY;
			posArr[idx + 5] = 0;

			if (nextX < 0 || nextX > _w || nextY < 0 || nextY > _h) {
				nextX = Math.random() * _w;
				nextY = Math.random() * _h;
			}

			currentPositions[i * 2] = nextX;
			currentPositions[i * 2 + 1] = nextY;
		}

		posAttr.needsUpdate = true;
	}

	animationFrameId = requestAnimationFrame(animate);
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
	if (containerRef.value) {
		requestAnimationFrame(() => {
			updateDimensions(true);
			animate();
		});

		resizeObserver = new ResizeObserver(() => {
			updateDimensions(false);
		});
		resizeObserver.observe(containerRef.value);
	}
});

onUnmounted(() => {
	cancelAnimationFrame(animationFrameId);
	if (resizeObserver && containerRef.value) {
		resizeObserver.disconnect();
	}
});
</script>

<style scoped lang="scss">
.flow-field-container {
	width: 100%;
	height: 100%;
	min-height: 1px;
}
</style>
