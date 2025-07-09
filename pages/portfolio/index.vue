<template>
	<main class="main-portfolio">
		<section class="portfolio-hero">
			<div class="container-1440 hero__container">
				<div class="hero__info">
					<div>
						<h1 class="hero__title">Portfolio</h1>
						<p class="hero__description">
							The portfolio presents a range of projects, reflecting my experience
							with chat apps, mobile development, admin dashboards, interactive maps,
							and multilingual websites — built with modern technologies like
							Wordpress, Nuxt, Vue, and React Native. These works emphasize clean
							architecture, responsive design, and a user-centered approach.
						</p>
					</div>
					<figure class="hero__figure">
						<img src="/images/photo4.jpeg" alt="Portfolio image" />
					</figure>
				</div>
			</div>
		</section>
		<section>
			<div class="container-1440 hero__grid">
				<CardPortfolio
					v-for="(card, index) in cards"
					:key="'card-portfolio-' + index"
					:content="card" />
			</div>
		</section>
	</main>
</template>
<script setup>
import cardsData from '/static/data.json';
const cards = cardsData.projects;
// 'Portfolio',
</script>

<style lang="scss" scoped>
.main-portfolio {
	padding-block: 3rem;
}
.portfolio-hero {
	margin-bottom: 3rem;
	@include media(992px) {
		margin-bottom: 1.6rem;
	}
}
.hero__container {
	padding-block: 1rem;
	overflow: hidden;
}
.hero__info {
	display: flex;
	width: 75%;
	margin-inline: auto;
	background-color: var(--bg-secondary-color);
	border-radius: var(--border-radius);
	@include media(992px) {
		width: 100%;
		flex-direction: column;
	}
	& > div {
		padding: 1rem;
	}
}
.hero__title {
	margin-bottom: 1rem;
	font-size: var(--fs-h2);
	@include media(992px) {
		text-align: center;
	}
}
.hero__description {
	max-width: 80%;
	font-size: var(--fs-secondary);
	line-height: 120%;
	color: var(--tc-secondary);
	@include media(992px) {
		max-width: 100%;
		padding-top: 1rem;
		border-top: 1px solid var(--tc-secondary);
	}
	@include media(640px) {
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
	@include media(992px) {
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
		@include media(992px) {
			transform: scale(1.2);
		}
	}
}

.hero__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	gap: 1rem;
}
</style>
