<template>
	<div class="particle-canvas">
		<div id="particle-canvas" />
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'ParticleCanvas',
});
onMounted(() => {
	if (typeof window !== 'undefined' && window.ParticleNetwork) {
		const container = document.getElementById('particle-canvas') as HTMLDivElement | null;
		if (container) {
			new window.ParticleNetwork(container, {
				particleColor: '#888',
				background: '#161313',
				interactive: false,
				speed: 'slow',
				density: 'high',
			});
		}
	}
});
</script>

<style lang="scss">
.particle-canvas {
	position: fixed;
	top: 3rem;
	height: 100%;
	width: 100vw;
}
#particle-canvas {
	width: 100%;
	height: 100%;
}
</style>
