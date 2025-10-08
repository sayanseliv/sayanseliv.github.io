<template>
	<div class="absolute inset-0 w-full h-full -z-1">
		<TresCanvas clear-color="#000" :shadow="false" :antialias="true">
			<TresPerspectiveCamera :position="[0, 0, 800]" />
			<OrbitControls />

			<primitive ref="points" :object="new THREE.Points(geometry, material)" />
		</TresCanvas>
	</div>
</template>
<script setup lang="ts">
import * as THREE from 'three';

const points = shallowRef<THREE.Points>();

// grid
const cols = 120;
const rows = 60;
const spacing = 10;
let time = 0;

const positions = new Float32Array(cols * rows * 3);
const colors = new Float32Array(cols * rows * 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
	size: 2,
	vertexColors: true,
	transparent: true,
});

// init points
let index = 0;
for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
		positions[index * 3] = j * spacing - (cols * spacing) / 2;
		positions[index * 3 + 1] = i * spacing - (rows * spacing) / 2;
		positions[index * 3 + 2] = 0;

		colors[index * 3] = 1;
		colors[index * 3 + 1] = 1;
		colors[index * 3 + 2] = 1;
		index++;
	}
}

// animation update
const { onLoop } = useRenderLoop();
onLoop(({ delta }) => {
	if (!points.value) return;
	time += delta * 2;

	const pos = geometry.attributes.position.array as Float32Array;
	const col = geometry.attributes.color.array as Float32Array;

	let k = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const x = j * spacing;
			const y = i * spacing;

			// волны
			const wave1 = Math.sin(x * 0.015 + time * 2) * 80;
			const wave2 = Math.cos(y * 0.02 + time * 1.5) * 60;
			const wave3 = Math.sin((x + y) * 0.01 + time * 2.5) * 50;
			const wave4 = Math.cos(x * 0.008 - y * 0.012 + time) * 40;
			const z = wave1 + wave2 + wave3 + wave4;

			pos[k * 3 + 2] = z;

			// brightness → color (purple gradient)
			const brightness = Math.max(0, Math.min(1, (z + 150) / 250));
			col[k * 3] = 0.6 + brightness * 0.4; // R
			col[k * 3 + 1] = 0.2 + brightness * 0.3; // G
			col[k * 3 + 2] = 0.8 + brightness * 0.2; // B
			k++;
		}
	}

	geometry.attributes.position.needsUpdate = true;
	geometry.attributes.color.needsUpdate = true;
});
</script>
