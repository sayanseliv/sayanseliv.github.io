<template>
	<NuxtLink class="card" :to="link">
		<div>
			<h3 class="text-gradient">{{ title }}</h3>
			<p>
				{{ description }}
			</p>
			<div class="tags">
				<div v-for="tag in tags" :key="tag" class="tag">{{ tag }}</div>
			</div>
		</div>
	</NuxtLink>
</template>
<script setup lang="ts">
defineOptions({
	name: 'CardFeature',
});

const props = defineProps<{
	readonly title: string;
	readonly description: string;
	readonly tags: readonly string[];
	readonly link: string;
}>();

const { title, description, tags, link } = props;
</script>
<style lang="scss" scoped>
.card {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 14rem;
	width: 100%;
	padding: 1rem;
	background: var(--gray-900);
	border: 1px solid var(--gray-600);
	border-radius: var(--border-radius);
	text-decoration: none;
	overflow: hidden;
	transition: border-color var(--transition-time) ease, box-shadow var(--transition-time) ease;

	background-image: linear-gradient(
		135deg,
		rgba(var(--blue-rgb), 0.05),
		rgba(var(--blue-rgb), 0.15)
	);

	&:hover {
		border-color: var(--blue-300);
		box-shadow: 0 8px 16px rgba(var(--blue-rgb), 0.2);
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 50%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(var(--blue-rgb), 0.3), transparent);
		animation: shimmer 2s infinite;
		z-index: 0;
	}
}

.card__canvas {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.card__content {
	position: relative;
	z-index: 1;
	padding: 1.5rem;
	width: 100%;
}

.card h3 {
	margin: 0;
	font-size: var(--fs-h3);
	font-weight: var(--fw-semibold);
	color: var(--white);
	transition: color var(--transition-time) ease;
}

.card p {
	margin-block: 0.75rem;
	font-size: var(--fs-caption);
	line-height: 1.6;
	color: var(--gray-50);
	max-width: 90%;
}

.card .tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.card .tags .tag {
	font-size: var(--fs-small);
	background: rgba(var(--blue-rgb), 0.2);
	color: var(--gray-50);
	border: 1px solid rgba(var(--blue-rgb), 0.3);
	border-radius: 20px;
	padding: 0.3rem 0.8rem;
	transition: all var(--transition-time) ease;
}

.card:hover .tags .tag {
	background: var(--blue-300);
	color: var(--gray-900);
	border-color: var(--blue-300);
}
</style>
