<template>
	<TresGroup ref="groupRef">
		<TresMesh
			v-for="(particle, index) in particlesData"
			:key="index"
			:user-data="{ basePosition: particle.position }">
			<TresSphereGeometry :args="[particleSize, 8, 8]" />
			<TresMeshBasicMaterial :color="0x48abed" :transparent="true" :opacity="1" />
		</TresMesh>
	</TresGroup>
</template>

<script setup lang="ts">
import * as THREE from 'three';

defineOptions({
	name: 'WaveScene',
});

const PARTICLE_COUNT = 8;
const PARTICLE_SIZE = 0.03;
const GRID_SIZE = 2;
const WAVE_AMPLITUDE = 0.3;

const particleSize = shallowRef(PARTICLE_SIZE);
const groupRef = shallowRef<THREE.Group | null>(null);

const particlesData = computed(() => {
	const data = [];
	for (let x = 0; x < PARTICLE_COUNT; x++) {
		for (let y = 0; y < PARTICLE_COUNT; y++) {
			for (let z = 0; z < PARTICLE_COUNT; z++) {
				const u = (x / (PARTICLE_COUNT - 1) - 0.5) * GRID_SIZE;
				const v = (y / (PARTICLE_COUNT - 1) - 0.5) * GRID_SIZE;
				const w = (z / (PARTICLE_COUNT - 1) - 0.5) * GRID_SIZE;

				data.push({
					position: new THREE.Vector3(u, v, w),
				});
			}
		}
	}
	return data;
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
	if (!groupRef.value) return;

	groupRef.value.children.forEach((child) => {
		const mesh = child as THREE.Mesh;
		const base = mesh.userData.basePosition as THREE.Vector3;

		if (base) {
			const wave =
				Math.sin(base.x * 3 + elapsed) *
				Math.sin(base.y * 3 + elapsed) *
				Math.sin(base.z * 3 + elapsed) *
				WAVE_AMPLITUDE;

			const scaledPos = base.clone();
			scaledPos.multiplyScalar(1 + wave);
			mesh.position.copy(scaledPos);
		}
	});
});
</script>
