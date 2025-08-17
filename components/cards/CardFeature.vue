<template>
	<NuxtLink class="card" :to="link" :style="backgroundStyle">
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
	readonly image: string;
	readonly link: string;
}>();

const { title, description, tags, image, link } = props;

const backgroundStyle = computed(() => ({
	'--bg-img': `url('${image}')`,
}));
</script>
<style lang="scss" scoped>
.card {
	position: relative;
	transform: rotate(0);
	display: flex;
	align-items: flex-end;
	min-height: 24rem;
	width: 100%;
	padding: 1rem;
	font-size: var(--fs-secondary);
	color: var(--white);
	border-radius: 1rem;
	border: 1px solid var(--gray-600);

	box-shadow: 0 0 5em -1rem black;
	--bg-filter-opacity: 0.5;
	background-size: cover;
	background-position: center;
	// background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%), var(--bg-img);

	background-image: linear-gradient(
			rgba(0, 0, 0, var(--bg-filter-opacity)),
			rgba(0, 0, 0, var(--bg-filter-opacity))
		),
		var(--bg-img);
	text-decoration: none;
	overflow: hidden;
	transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	& > div {
		// background-color: rgba(0, 0, 0, 0.5);
	}
}

.card h3 {
	margin: 0;
	font-size: var(--fs-h3);
}

.card p {
	margin-block: 0.5rem;
	font-size: var(--fs-caption);
	line-height: 150%;
}

.card .tags {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.card .tags .tag {
	font-size: var(--fs-caption);
	background: rgba(38, 132, 255, 0.5);
	color: var(--white);
	border: 1px solid rgba(72, 171, 237, 0.2);
	border-radius: 12px;
	padding: 4px 10px;
	transition: all 0.3s ease;
	white-space: nowrap;
}

.card:hover .tags .tag {
	background-color: var(--blue-300);
	color: var(--gray-900);
	box-shadow: 0 4px 8px rgba(72, 171, 237, 0.3);
}

.card:before,
.card:after {
	content: '';
	position: absolute;
	left: -50%;
	top: -50%;
	z-index: -5;
	transform: scale(0);
	transform-origin: top left;
	border-radius: 50%;
	transition: all, var(--transition-time);
	transition-timing-function: ease-in-out;
}

.card:before {
	width: 250%;
	height: 250%;
	background-color: var(--blue-300);
	opacity: 0.2;
}

.card:after {
	width: 200%;
	height: 200%;
	background-color: var(--white);
	opacity: 0.2;
}

.card:hover {
	// color: var(--gray-800);
	border-color: var(--blue-300);
	box-shadow: 0 20px 40px rgba(72, 171, 237, 0.2);
}

.card:hover:before,
.card:hover:after {
	transform: scale(1);
}
</style>
