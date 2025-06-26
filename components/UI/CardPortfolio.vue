<template>
	<NuxtLink :to="content.link" external target="_blank" class="card-portfolio">
		<figure class="card-portfolio__figure">
			<img :src="content.logo" alt="Projects logo" />
		</figure>
		<div class="card-portfolio__body">
			<h3>{{ content.title }}</h3>
			<p>{{ content.text }}</p>
		</div>
	</NuxtLink>
</template>

<script setup>
// CardPortfolio
defineProps({
	content: {
		type: Object,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
.card-portfolio {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	text-decoration: none;
}
.card-portfolio__figure {
	display: flex;
	align-items: center;
	justify-content: center;
	// height: 30px;
	padding: 2rem 1rem;
	background-color: var(--white);
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
	& > img {
		height: 30px;
		width: auto;
	}
}
.card-portfolio__body {
	height: 100%;
	padding: 1rem;
	background-color: var(--bg-secondary-color);
	border-bottom-left-radius: var(--border-radius);
	border-bottom-right-radius: var(--border-radius);

	& > h3 {
		padding-bottom: 0.6rem;
		margin-bottom: 1rem;
		color: var(--light-blue);
		border-bottom: 1px solid var(--tc-secondary);
	}
	& > p {
		color: var(--white);
	}
}
</style>
