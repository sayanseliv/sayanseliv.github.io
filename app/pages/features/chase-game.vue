<template>
	<main class="main-chase-game">
		<PlatformerChaseGame />
	</main>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'ChaseGame',
});
</script>
<style lang="scss" scoped>
.main-chase-game {
	padding-top: 3rem;
	overflow: hidden;
}
</style>
