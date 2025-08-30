<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
	<div
		class="card-portfolio"
		@click="handleCardClick"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave">
		<div
			class="card-portfolio__inner"
			:class="{ 'is-flipped': isFlipped, 'is-hovered': isHovered }">
			<!-- Front -->
			<div class="card-portfolio__face card-portfolio__face--front">
				<div class="card-portfolio__content">
					<figure class="card-portfolio__figure">
						<img :src="logo" :alt="`Projects logo - ${title}`" loading="lazy" />
					</figure>
					<div class="card-portfolio__body">
						<h3>{{ title }}</h3>
						<p>{{ description }}</p>

						<div class="card-portfolio__mobile-hint">
							<span class="card-portfolio__tap-hint">👆 Tap to see tech stack</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Back -->
			<div class="card-portfolio__face card-portfolio__face--back">
				<div class="card-portfolio__back-link">
					<h3 class="text-gradient">🛠 Tech Stack</h3>
					<p class="card-portfolio__tech-stack">
						{{ technology }}
						<span class="sr-only">{{ technology }}</span>
					</p>
					<NuxtLink :to="link" external target="_blank" class="card-portfolio__action">
						Go to the project website
						<span class="sr-only">(opens in a new tab)</span>
					</NuxtLink>

					<button
						class="card-portfolio__flip-back"
						type="button"
						aria-label="Flip back to project info"
						@click.stop="flipBack">
						<ArrowLeft :size="16" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';

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

const isFlipped = ref(false);
const isHovered = ref(false);

const handleCardClick = (event: Event) => {
	const target = event.target as HTMLElement;
	if (target.closest('.card-portfolio__action') || target.closest('.card-portfolio__flip-back')) {
		return;
	}

	isFlipped.value = !isFlipped.value;
};

const handleMouseEnter = () => {
	if (!isFlipped.value) {
		isHovered.value = true;
	}
};

const handleMouseLeave = () => {
	isHovered.value = false;
};

const flipBack = () => {
	isFlipped.value = false;
	isHovered.value = false;
};
</script>

<style lang="scss" scoped>
@property --a {
	syntax: '<angle>';
	initial-value: 0deg;
	inherits: false;
}

@keyframes rotateBorder {
	to {
		--a: 360deg;
	}
}

@keyframes pulse {
	0%,
	100% {
		opacity: 0.6;
	}
	50% {
		opacity: 1;
	}
}

.card-portfolio {
	perspective: 1200px;
	width: 100%;
	cursor: pointer;
	transition: transform 0.3s ease;
}

.card-portfolio__inner {
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 19rem;
	transform-style: preserve-3d;
	transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);

	&.is-hovered,
	&.is-flipped {
		transform: rotateY(180deg);
	}
}

.card-portfolio__face {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: var(--border-radius);
	overflow: hidden;
	backface-visibility: hidden;
}

.card-portfolio__face--front {
	transform: rotateY(0deg);
	background-color: var(--gray-900);
}

.card-portfolio__content {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
}

.card-portfolio__figure {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 1rem;
	background-color: var(--white);
	border-bottom: 1px solid var(--blue-300);

	& > img {
		height: 30px;
		width: auto;
	}
}

.card-portfolio__body {
	position: relative;
	height: 100%;
	padding: 1rem;
	color: var(--white);
	background-color: var(--gray-900);
	border-bottom-left-radius: var(--border-radius);
	border-bottom-right-radius: var(--border-radius);
	border-right: 1px solid var(--gray-300);
	border-bottom: 1px solid var(--gray-300);
	border-left: 1px solid var(--gray-300);

	& > h3 {
		position: relative;
		z-index: 10;
		margin-bottom: 0.5rem;
		padding-bottom: 0.6rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		color: var(--blue-300);
		border-bottom: 1px solid var(--gray-300);
	}

	& > p {
		color: var(--white);
	}
}

.card-portfolio__mobile-hint {
	position: absolute;
	bottom: 0.5rem;
	right: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card-portfolio__tap-hint {
	padding: 0.3rem 0.6rem;
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--blue-200);
	background: rgba(72, 171, 237, 0.1);
	border-radius: 12px;
	border: 1px solid var(--blue-300);
	animation: pulse 2s infinite;
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
		transform: translateY(20px) scale(0.8);
		transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
	}
}

.card-portfolio__tech-stack {
	color: #f8f9fa;
	font-weight: 500;
	font-size: 1.1rem;
	line-height: 1.5;
	opacity: 0;
	transform: translateY(20px) scale(0.8);
	transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
}

.card-portfolio__action {
	position: relative;
	transform: translateY(20px) scale(0.8);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-top: 2rem;
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
	font-weight: 600;
	text-decoration: none;
	color: #ffffff;
	background-color: var(--blue-600);
	border: 2px solid var(--blue-600);
	border-radius: 8px;
	cursor: pointer;
	opacity: 0;
	transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); // Тень для текста

	&:hover {
		color: #ffffff !important;
		background-color: var(--blue-700);
		border-color: var(--blue-700);
		transform: translateY(0) scale(1.05);
		box-shadow: 0 4px 12px rgba(38, 132, 255, 0.4);
	}

	&:focus {
		outline: 3px solid rgba(38, 132, 255, 0.5);
		outline-offset: 2px;
	}
}

.card-portfolio__flip-back {
	position: absolute;
	top: 1rem;
	left: 1rem;
	z-index: 10;
	transform: translateY(-10px) scale(0.9);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3rem;
	width: 1.8rem;
	height: 1.8rem;
	font-size: 0.75rem;
	line-height: 1;
	text-align: center;
	color: #ffffff;
	background: var(--blue-600);
	border: 1px solid var(--blue-600);
	border-radius: 50%;
	cursor: pointer;
	opacity: 0;
	transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s, box-shadow 0.3s ease;
	box-shadow: 0 2px 6px rgba(72, 171, 237, 0.2);

	&:hover {
		transform: translateY(-10px) scale(1);
		color: #ffffff;
		background: var(--blue-700);
		border: 1px solid var(--blue-700);
		box-shadow: 0 3px 8px rgba(72, 171, 237, 0.4);
	}

	&:focus {
		outline: 3px solid rgba(38, 132, 255, 0.5);
		outline-offset: 2px;
	}
}

// Animation of elements appearing on the back side
.card-portfolio__inner.is-flipped .card-portfolio__face--back h3,
.card-portfolio__inner.is-flipped .card-portfolio__tech-stack,
.card-portfolio__inner.is-flipped .card-portfolio__action,
.card-portfolio__inner.is-flipped .card-portfolio__flip-back,
.card-portfolio__inner.is-hovered .card-portfolio__face--back h3,
.card-portfolio__inner.is-hovered .card-portfolio__tech-stack,
.card-portfolio__inner.is-hovered .card-portfolio__action,
.card-portfolio__inner.is-hovered .card-portfolio__flip-back {
	transform: translateY(0) scale(1);
	opacity: 1;
}

@media (hover: none) and (pointer: coarse) {
	.card-portfolio {
		&:active {
			transform: scale(0.98);
		}
	}
}
</style>
