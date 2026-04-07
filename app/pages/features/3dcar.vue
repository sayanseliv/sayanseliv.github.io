<template>
	<main class="main-page-3d-car">
		<ClientOnly fallback-tag="div" fallback="Loading 3D Engine...">
			<ThreeDCar />
		</ClientOnly>
	</main>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'Page3dCar',
});
</script>
<style scoped lang="scss">
.main-page-3d-car {
	padding-top: 4rem;
	overflow: hidden;
}
</style>
