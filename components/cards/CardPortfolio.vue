<template>
	<div class="card-portfolio">
		<div class="card-portfolio__inner">
			<!-- Front -->
			<div class="card-portfolio__face card-portfolio__face--front">
				<NuxtLink :to="link" external target="_blank" class="card-portfolio__content">
					<figure class="card-portfolio__figure">
						<img :src="logo" alt="Projects logo" loading="lazy" />
					</figure>
					<div class="card-portfolio__body">
						<h3>{{ title }}</h3>
						<p>{{ description }}</p>
					</div>
				</NuxtLink>
			</div>

			<!-- Back -->
			<NuxtLink
				:to="link"
				external
				target="_blank"
				class="card-portfolio__face card-portfolio__face--back">
				<div class="card-portfolio__back-link">
					<h3>Technology</h3>
					<p>{{ technology }}</p>
					<p class="card-portfolio__action">Click to Visit</p>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'CardPortfolio',
});
interface Content {
	readonly id: number;
	readonly title: string;
	readonly description: string;
	readonly logo: string;
	readonly technology: string;
	readonly link: string;
}
const props = defineProps<{
	readonly content: Content;
}>();
const { content } = props;
const { title, description, logo, technology, link } = content;
</script>

<style lang="scss" scoped>
@property --a {
	syntax: '<angle>';
	initial-value: 0deg;
	inherits: false;
}

@keyframes rotateBorder {
	to {
		--a: 1turn;
	}
}
.card-portfolio {
	perspective: 1000px;
	width: 100%;
	cursor: pointer;
}
.card-portfolio__inner {
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 18rem;
	transform-style: preserve-3d;
	transition: transform 0.8s ease;
}
.card-portfolio:hover > .card-portfolio__inner {
	transform: rotateY(180deg);
}
.card-portfolio__face {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: var(--border-radius);
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.card-portfolio__face--front {
	backface-visibility: hidden;
	transform: rotateY(0deg);
	background-color: var(--gray-900);
}

.card-portfolio__content {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	text-decoration: none;
}
.card-portfolio__figure {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 1rem;
	background-color: var(--white);
	& > img {
		height: 30px;
		width: auto;
	}
}
.card-portfolio__body {
	height: 100%;
	padding: 1rem;
	background-color: var(--gray-900);
	color: var(--white);
	border-bottom-left-radius: var(--border-radius);
	border-bottom-right-radius: var(--border-radius);
	border-right: 1px solid var(--gray-300);
	border-bottom: 1px solid var(--gray-300);
	border-left: 1px solid var(--gray-300);
	& > h3 {
		z-index: 10;
		position: relative;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		color: var(--blue-300);
		border-bottom: 1px solid var(--gray-300);
		padding-bottom: 0.6rem;
		margin-bottom: 1rem;
	}
	& > p {
		color: var(--white);
	}
}
.card-portfolio__face--back {
	position: relative;
	transform: rotateY(180deg);
	padding: 1rem;
	border-radius: var(--border-radius);
	text-align: center;
	background-color: var(--gray-900);
	backface-visibility: hidden;
	overflow: hidden;
	text-decoration: none;

	&::before {
		content: '';
		position: absolute;
		inset: -1em;
		z-index: -1;
		border: solid 1.25em;
		border-image: conic-gradient(
				from var(--a),
				#48abed,
				#48abed,
				#48abed,
				#48abed,
				#48abed,
				#48abed,
				#48abed,
				#48abed,
				#48abed,
				#48abed,
				#48abed
			)
			1;
		filter: blur(0.75em);
		animation: rotateBorder 4s linear infinite;
	}
}
.card-portfolio__back-link {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	width: 100%;
	& > h3 {
		margin-bottom: 1rem;
		font-size: var(--fs-h1);
		font-weight: bold;
		color: var(--white);
		opacity: 0;
		transform: translateY(8px);
		transition: opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s;
	}
	& > p {
		color: var(--white);
		opacity: 0;
		transform: translateY(8px);
		transition: opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s;
	}
	& > .card-portfolio__action {
		margin-top: 2rem;
		color: var(--blue-300);
	}
}
.card-portfolio:hover
	> .card-portfolio__inner
	> .card-portfolio__face--back
	> .card-portfolio__back-link {
	& > h3,
	& > p {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
