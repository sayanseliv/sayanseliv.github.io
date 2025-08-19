<template>
	<main class="main-features">
		<section class="features-hero">
			<div class="container-1440">
				<div class="hero__wrapper">
					<h1 class="text-gradient hero__title">Features</h1>
					<p class="hero__description">
						The Features page showcases a variety of implementations, from real-time
						communication with WebSocket and interactive 3D graphics with TresJS to UI
						components, form handling, and Canvas experiments. These examples highlight
						modern frontend technologies and creative approaches to solving tasks.
					</p>
				</div>
			</div>
		</section>

		<section class="features__cards">
			<div class="container-1440">
				<AnimatedBlock class="cards__container">
					<CardFeature
						v-for="(feature, index) in features"
						:key="'feature-' + index"
						:title="feature.title"
						:description="feature.description"
						:link="feature.link"
						:tags="feature.tags" />
				</AnimatedBlock>
			</div>
		</section>
	</main>
</template>
<script lang="ts" setup>
import data from '@/static/data.json';
defineOptions({
	name: 'PageFeatures',
});
const config = useRuntimeConfig();
useHead({
	title: 'Features – Lang Eugen',
	link: [
		{
			rel: 'canonical',
			href: `${config.public.siteUrl}/features`,
		},
	],
});
const features = data.features.slice().reverse();
</script>
<style lang="scss" scoped>
.main-features {
	padding-block: 4rem 2rem;
}
.features-hero {
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
