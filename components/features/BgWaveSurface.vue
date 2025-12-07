<template>
	<div class="bg-wave-surface">
		<TresCanvas clear-color="#000" :shadow="false" :antialias="true" preset="realistic">
			<TresPerspectiveCamera :position="[0, 0, 800]" :fov="55" />
			<WaveMesh />
		</TresCanvas>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'BgWaveSurface',
});
</script>

<style lang="scss" scoped>
.bg-wave-surface {
	display: block;
	height: 100%;
	width: 100%;
}
</style>
