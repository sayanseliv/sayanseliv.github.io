<template>
	<div class="bg-wave-cube">
		<TresCanvas v-bind="glSettings">
			<TresPerspectiveCamera :position="[0, 0, 4]" :fov="55" />

			<WaveScene />
		</TresCanvas>
	</div>
</template>

<script setup lang="ts">
import * as THREE from 'three';

defineOptions({
	name: 'BgWaveCube',
});

const glSettings = {
	clearColor: '#000000',
	alpha: true,
	antialias: true,
	powerPreference: 'high-performance',
	outputColorSpace: THREE.SRGBColorSpace,
};
</script>

<style scoped>
.bg-wave-cube {
	display: block;
	width: 100%;
	height: 100%;
}
</style>
