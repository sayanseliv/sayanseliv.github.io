<template>
	<div class="particle-canvas__wrapper">
		<div id="particle-canvas"></div>
	</div>
</template>

<script setup>
onMounted(() => {
	const canvasDiv = document.getElementById('particle-canvas');
	if (canvasDiv) {
		const options = {
			particleColor: '#888',
			background: '#161313',
			interactive: false,
			speed: 'medium',
			density: 'high',
		};
		new ParticleNetwork(canvasDiv, options);
	}
});
</script>

<style lang="scss">
.particle-canvas__wrapper {
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
