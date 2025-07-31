<template>
	<NuxtLink class="card" :to="link" :style="backgroundStyle">
		<div>
			<h3>{{ title }}</h3>
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
	border-radius: 1em;
	border: 2px solid var(--white);
	box-shadow: 0 0 5em -1em black;
	--bg-filter-opacity: 0.5;
	background-size: cover;
	background-position: center;
	background-image: linear-gradient(
			rgba(0, 0, 0, var(--bg-filter-opacity)),
			rgba(0, 0, 0, var(--bg-filter-opacity))
		),
		var(--bg-img);
	text-decoration: none;
	overflow: hidden;
	transition: transform, var(--transition-time);
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
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 0.3rem;
	padding: 0.2rem 0.5rem;
	transition: background-color var(--transition-time), color var(--transition-time);
}

.card:hover .tags .tag {
	color: var(--white);
	background-color: var(--black);
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
	background-color: var(--light-blue);
	opacity: 0.2;
}

.card:after {
	width: 200%;
	height: 200%;
	background-color: var(--white);
	opacity: 0.2;
}

.card:hover {
	color: var(--black);
}

.card:hover:before,
.card:hover:after {
	transform: scale(1);
}
</style>
