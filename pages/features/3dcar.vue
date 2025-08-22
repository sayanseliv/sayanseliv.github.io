<template>
	<main class="main-page-3d-car">
		<ThreeDCar />
	</main>
</template>
<script lang="ts" setup>
const ThreeDCar = defineAsyncComponent(() => import('@/components/features/ThreeDCar.vue'));

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
