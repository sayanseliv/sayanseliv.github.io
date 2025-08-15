<template>
	<main class="main-portfolio">
		<AnimatedCircles />
		<section class="portfolio-hero">
			<div class="container-1440 hero__container">
				<div class="hero__info">
					<div class="hero__content">
						<h1 class="text-gradient hero__title">Portfolio</h1>
						<p class="hero__description">
							The portfolio presents a range of projects, reflecting my experience
							with chat apps, mobile development, admin dashboards, interactive maps,
							and multilingual websites — built with modern technologies like
							Wordpress, Nuxt, Vue, and React Native. These works emphasize clean
							architecture, responsive design, and a user-centered approach.
						</p>
					</div>
					<figure class="hero__figure">
						<img
							src="/images/portfolio-hero.webp"
							alt="Portfolio image"
							loading="lazy" />
					</figure>
				</div>
			</div>
		</section>
		<section>
			<div class="container-1440">
				<h2 class="portfolio-projects__title">Projects</h2>
				<AnimatedBlock>
					<div class="portfolio-projects__grid">
						<CardPortfolio
							v-for="(card, index) in cards"
							:key="'card-portfolio-' + index"
							v-memo="card.id"
							:content="card" />
					</div>
				</AnimatedBlock>
			</div>
		</section>
	</main>
</template>
<script setup lang="ts">
import data from '@/static/data.json';
const cards = data.projects;
defineOptions({
	name: 'PagePortfolio',
});
</script>

<style lang="scss" scoped>
.main-portfolio {
	padding-block: 3rem;
}
.portfolio-hero {
	margin-bottom: 2rem;
	@include media(768px) {
		margin-bottom: 1.6rem;
	}
}
.hero__container {
	padding-block: 2rem;
	overflow: hidden;
	@include media(768px) {
		padding-block: 1rem;
	}
}
.hero__info {
	position: relative;
	display: flex;
	background: linear-gradient(135deg, var(--gray-900) 0%, rgba(45, 45, 58, 0.8) 100%);
	border-radius: var(--border-radius);

	@include media(768px) {
		flex-direction: column;
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
.hero__content {
	padding: 2rem;
	@include media(768px) {
		padding: 1rem;
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
	max-width: 80%;
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
.hero__figure {
	position: relative;
	flex-shrink: 0;
	display: flex;
	min-height: 15rem;
	width: 15rem;
	overflow: hidden;
	border-top-left-radius: 60%;
	border-top-right-radius: var(--border-radius);
	border-bottom-right-radius: var(--border-radius);
	@include media(768px) {
		min-height: 20rem;
		width: 100%;
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: 60%;
	}
	& > img {
		position: absolute;
		inset: 0;
		height: 100%;
		transform: scale(1.8);
		width: 100%;
		object-fit: cover;
		@include media(768px) {
			transform: scale(1.2);
		}
	}
}
.portfolio-projects__title {
	margin-bottom: 1rem;
	font-size: var(--fs-h2);
}
.portfolio-projects__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	gap: 1rem;
}
</style>
