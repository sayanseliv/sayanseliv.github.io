<template>
	<main class="main-home">
		<ParticleCanvas />
		<div class="container-1440">
			<div class="home__container">
				<AppSidebar v-model="isShowSidebar" />
				<div class="home__content">
					<section class="content__hero">
						<div class="hero__text-bg">
							<h1 class="hero__title">Welcome to Lang Eugen's Digital Space</h1>
							<p class="hero__description">
								Explore a portfolio showcasing Lang's expertise in HTML, CSS,
								JavaScript, and popular front-end frameworks like React and Vue.
								From responsive designs that adapt seamlessly to any device to
								interactive elements that engage users, Lang's work reflects a
								commitment to excellence and innovation.
								<br />
								<br />
								Whether you're seeking a modern website for your business, an
								engaging web application, or advice on front-end development best
								practices, Lang Eugen is your trusted partner. Join the digital
								revolution and elevate your online presence with Lang Eugen's
								expertise.
							</p>
						</div>
					</section>
					<section class="content__image" />
					<section class="content__technologies">
						<h2 class="technologies__title">Technologies</h2>
						<div class="technologies__grid">
							<CardTechnology
								v-for="(card, index) in cards"
								:key="'card-technology-' + index"
								v-memo="[card.id]"
								:content="card" />
						</div>
					</section>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import cardsData from '@/static/data.json';
defineOptions({
	name: 'MainPage',
});

const cards = cardsData.technology;
const isShowSidebar = ref(false);
</script>

<style lang="scss" scoped>
.main-home {
	padding-top: 3rem;
}
.home__container {
	position: relative;
	display: flex;
	column-gap: 2rem;
	padding-block: 1rem;
}
.home__content {
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
	width: 100%;
	margin-left: 20.125rem;
	padding: 0 1rem 1rem;
	border-radius: var(--border-radius);
	@include media(992px) {
		margin-left: 0;
	}
	@include media(640px) {
		padding: 0 0 1rem;
	}
}
.content__hero {
	background-color: var(--bg-secondary-color);
	border-radius: var(--border-radius);
}
.hero__text-bg {
	padding: 1rem;
	width: fit-content;
	border-radius: var(--border-radius);
}
.hero__title {
	margin-bottom: 1rem;
	background: 50% 100% / 50% 50% no-repeat
		radial-gradient(ellipse at bottom, var(--light-blue), transparent, transparent);
	background-clip: text;
	color: transparent;
	text-align: left;
	font-size: var(--fs-h1);
	font-weight: 400;
	animation: reveal 3000ms ease-in-out forwards 200ms, glow 2500ms linear infinite 4000ms;
	@include media(640px) {
		font-size: var(--fs-h1-s);
	}
	@keyframes reveal {
		80% {
			letter-spacing: 0.1rem;
		}
		100% {
			background-size: 300% 300%;
		}
	}
	@keyframes glow {
		40% {
			text-shadow: 0 0 0.1rem var(--light-blue);
		}
	}
}
.hero__description {
	font-size: var(--fs-secondary);
	line-height: 120%;
	color: var(--tc-secondary);
	@include media(640px) {
		font-size: 1rem;
	}
}
.content__image {
	min-height: 25rem;
	width: 100%;
	background-image: url('/images/pixlr-6.webp');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	border-radius: var(--border-radius);
	@include media(992px) {
		min-height: 20rem;
	}
	@include media(640px) {
		min-height: 15rem;
	}
}
.technologies__title {
	margin-bottom: 1rem;
	font-size: var(--fs-h2);
}
.technologies__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
	gap: 1rem;
}
</style>
