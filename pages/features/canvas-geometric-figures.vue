<template>
	<main class="main__canvas-geometric-figures">
		<div class="container">
			<GeometricFigures />
		</div>
	</main>
</template>

<script setup lang="ts">
defineOptions({
	name: 'CanvasGeometricFigures',
});
</script>

<style scoped lang="scss">
.main__canvas-geometric-figures {
	padding-top: 4rem;
	overflow: hidden;
}
</style>
