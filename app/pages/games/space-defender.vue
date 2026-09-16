<template>
	<main class="main-game">
		<ClientOnly fallback-tag="div" fallback="Loading game…">
			<SpaceDefenderGame />
		</ClientOnly>
	</main>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PageSpaceDefender',
});

useHead({
	title: 'Space Defender – Mini Game | Lang Eugen',
	meta: [
		{
			name: 'description',
			content:
				'Play Space Defender, a small PixiJS arcade game built by Lang Eugen — defend your people from alien invaders across increasingly harder levels.',
		},
	],
});
</script>

<style lang="scss" scoped>
.main-game {
	overflow: hidden;
}
</style>
