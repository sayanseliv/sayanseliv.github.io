<template>
	<div class="space-defender">
		<p v-if="!hasStarted" class="space-defender__loading">Loading game…</p>
		<div ref="mountPoint" class="space-defender__canvas" />
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'SpaceDefenderGame',
});

const mountPoint = ref<HTMLDivElement | null>(null);
const hasStarted = ref(false);

let destroyGame: (() => void) | undefined;

onMounted(async () => {
	const gameModule = await import('@/game/game');
	destroyGame = gameModule.destroyGame;

	if (!mountPoint.value) {
		return;
	}

	await gameModule.initGame(mountPoint.value);
	hasStarted.value = true;
});

onUnmounted(() => {
	destroyGame?.();
});
</script>

<style lang="scss" scoped>
.space-defender {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	padding-top: 3rem;
	background-color: #000;

	&__loading {
		position: absolute;
		color: #fff;
	}

	&__canvas {
		display: flex;
		align-items: center;
		justify-content: center;

		:deep(canvas) {
			display: block;
		}
	}
}
</style>
