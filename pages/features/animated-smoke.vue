<template>
	<main class="main-animated-smoke">
		<AnimatedSmokeCanvas />
	</main>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'AnimatedSmoke',
});
</script>
<style lang="scss" scoped>
.main-animated-smoke {
	padding-top: 3rem;
	overflow: hidden;
}
</style>
