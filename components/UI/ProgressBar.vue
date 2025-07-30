<template>
	<div class="progress">
		<div class="progress__header">
			<p>{{ label }}</p>
			<p ref="progressLabel">{{ currentProgress }}%</p>
		</div>
		<div class="progress-bar__wrapper">
			<div ref="progressBar" class="progress__bar" :style="{ width: progressBarWidth }" />
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'ProgressBar',
});

const props = defineProps<{
	readonly targetProgress: number;
	readonly label?: string | null;
}>();

const progressBarWidth = ref('0%');
const currentProgress = ref(0);
const progressLabel = ref<HTMLElement | null>(null);

const updateProgress = (target: number, progress = 0): void => {
	if (progress > target) return;

	currentProgress.value = progress;
	progressBarWidth.value = `${progress}%`;

	if (progressLabel.value) {
		progressLabel.value.innerHTML = `${progress}%`;
	}

	setTimeout(() => updateProgress(target, progress + 1), 10);
};

onMounted(() => {
	updateProgress(props.targetProgress);
});
</script>

<style scoped>
.progress {
	max-width: 400px;
	margin-block: 0.9375rem;
}
.progress__header {
	display: flex;
	justify-content: space-between;
}
.progress-bar__wrapper {
	margin-block: 0.9375rem;
	background-color: var(--empty-color);
}
.progress__bar {
	height: 2px;
	border-radius: 25px;
	background-color: var(--light-blue);
}
</style>
