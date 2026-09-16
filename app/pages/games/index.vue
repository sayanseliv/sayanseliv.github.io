<template>
	<main class="main-games">
		<section class="games__hero">
			<div class="container">
				<div class="hero__wrapper">
					<h1 class="text-gradient hero__title">Games</h1>
					<p class="hero__description">
						A small collection of playable mini-games built for fun and experimentation
						with canvas rendering, physics, and game loops.
					</p>
				</div>
			</div>
		</section>

		<section class="games__cards">
			<div class="container">
				<AnimatedBlock class="cards__container">
					<CardFeature
						v-for="game in games"
						:key="'game-' + game.id"
						:title="game.title"
						:description="game.description"
						:link="game.link"
						:tags="game.tags" />
				</AnimatedBlock>
			</div>
		</section>
	</main>
</template>
<script lang="ts" setup>
import data from '@@/content/data.json';
defineOptions({
	name: 'PageGames',
});
const config = useRuntimeConfig();
useHead({
	title: 'Games – Lang Eugen',
	link: [
		{
			rel: 'canonical',
			href: `${config.public.siteUrl}/games`,
		},
	],
});
const games = data.games;
</script>
<style lang="scss" scoped>
.main-games {
	padding-block: 4rem 2rem;
}
.games__hero {
	margin-bottom: 3rem;
}
.hero__wrapper {
	position: relative;
	padding: 2rem;
	background: linear-gradient(135deg, var(--gray-900) 0%, rgba(45, 45, 58, 0.8) 100%);
	border-radius: var(--border-radius);
	overflow: hidden;
	@include media(768px) {
		padding: 1rem;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			45deg,
			transparent 30%,
			rgba(var(--blue-rgb), 0.1) 50%,
			transparent 70%
		);
		opacity: 0;
		animation: shimmer 3s ease-in-out infinite;
		pointer-events: none;
	}
}
.hero__title {
	margin-bottom: 1rem;
	font-size: 2.5rem;
	font-weight: 700;
	@include media(768px) {
		text-align: center;
	}
}
.hero__description {
	font-size: var(--fs-secondary);
	line-height: 120%;
	color: var(--gray-300);
	@include media(768px) {
		max-width: 100%;
		padding-top: 1rem;
		border-top: 1px solid var(--gray-300);
	}
	@include media(480px) {
		font-size: 1rem;
	}
}
.cards__container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	width: 100%;
	max-width: 100%;
	gap: 1rem;
	@include media(480px) {
		grid-template-columns: 1fr;
	}
}
</style>
