<template>
	<main class="main__canvas-vanilla">
		<div class="container-1440">
			<CanvasParticle />
		</div>
	</main>
</template>
<script setup lang="ts">
defineOptions({
	name: 'CanvasParticleInteractive',
});
</script>
<style lang="scss" scoped>
.main__canvas-vanilla {
	padding-top: 4rem;
	overflow: hidden;
}
</style>
