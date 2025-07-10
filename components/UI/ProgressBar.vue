<template>
	<div class="progress-container">
		<div class="progress__title">
			<p>{{ label }}</p>
			<p ref="progressLabel">{{ currentProgress }}%</p>
		</div>
		<div class="progress-bar__wrapper">
			<div
				ref="progressBar"
				class="progress-bar__line"
				:style="{ width: progressBarWidth }" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
.progress-container {
	max-width: 400px;
	margin-block: 0.9375rem;
}
.progress__title {
	display: flex;
	justify-content: space-between;
}
.progress-bar__wrapper {
	margin-block: 0.9375rem;
	background-color: var(--empty-color);
}
.progress-bar__line {
	height: 2px;
	border-radius: 25px;
	background-color: var(--light-blue);
}
</style>
