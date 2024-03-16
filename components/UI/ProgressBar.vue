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
				:style="{ width: progressBarWidth }"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		targetProgress: {
			type: Number,
			required: true,
		},
		label: { type: String, default: null },
	},
	data() {
		return {
			progressBarWidth: '0%',
			currentProgress: 0,
		};
	},
	mounted() {
		this.initializeProgressBar();
	},
	methods: {
		initializeProgressBar() {
			const progressLabel = this.$refs.progressLabel;

			let width = 0;
			const id = setInterval(() => {
				if (width >= this.targetProgress) {
					clearInterval(id);
				} else {
					width++;
					this.currentProgress = width;
					this.progressBarWidth = `${width}%`;
					progressLabel.innerHTML = `${width}%`;
				}
			}, 10);
		},
	},
};
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
