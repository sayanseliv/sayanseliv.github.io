<template>
	<div class="card-portfolio">
		<div class="card-portfolio__content">
			<figure class="card-portfolio__figure">
				<img :src="logo" :alt="`Projects logo - ${title}`" loading="lazy" />
			</figure>

			<div class="card-portfolio__body">
				<h3 class="text-gradient card-portfolio__title">{{ title }}</h3>
				<p class="card-portfolio__description">{{ description }}</p>

				<div class="card-portfolio__tech">
					<h4 class="card-portfolio__tech-title">🛠 Tech Stack</h4>
					<p class="card-portfolio__tech-list">{{ technology }}</p>
				</div>

				<div class="card-portfolio__actions">
					<NuxtLink
						:to="link"
						external
						target="_blank"
						class="card-portfolio__action"
						:aria-label="`Visit ${title} project website (opens in new tab)`">
						<span>Visit Project</span>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7 17L17 7M17 7H7M17 7V17"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</NuxtLink>
				</div>
			</div>
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
@keyframes slideUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes glow {
	0%,
	100% {
		box-shadow: 0 4px 20px rgba(72, 171, 237, 0.1);
	}
	50% {
		box-shadow: 0 8px 32px rgba(72, 171, 237, 0.3);
	}
}

.card-portfolio {
	width: 100%;
	height: 100%;
	background-color: var(--gray-900);
	border-radius: var(--border-radius);
	border: 1px solid var(--gray-300);
	overflow: hidden;
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

	&:hover {
		animation: glow 2s ease-in-out infinite;
		border-color: var(--blue-300);

		.card-portfolio__figure {
			&::after {
				width: 100%;
			}

			img {
				transform: scale(1.05);
			}
		}
	}
}

.card-portfolio__content {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.card-portfolio__figure {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	background-color: var(--white);
	min-height: 80px;
	overflow: hidden;
	@include media(768px) {
		padding: 1.5rem 1rem;
	}
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--blue-300), var(--blue-700));
		transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	img {
		height: 40px;
		width: auto;
		max-width: 200px;
		object-fit: contain;
		transition: transform 0.3s ease;
		@include media(768px) {
			height: 32px;
		}
	}
}

.card-portfolio__body {
	flex: 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
}

.card-portfolio__title {
	font-size: var(--fs-h3);
	font-weight: var(--fw-bold);
	line-height: 1.3;
}

.card-portfolio__description {
	color: #e5e7eb;
	font-size: var(--fs-primary);
	line-height: 1.6;
	margin: 0;
	flex: 1;
}

.card-portfolio__tech {
	padding: 1rem;
	background-color: rgba(72, 171, 237, 0.05);
	border: 1px solid rgba(72, 171, 237, 0.2);
	border-radius: calc(var(--border-radius) - 1px);
}

.card-portfolio__tech-title {
	color: var(--blue-200);
	font-size: var(--fs-secondary);
	font-weight: var(--fw-semibold);
	margin: 0 0 0.5rem 0;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.card-portfolio__tech-list {
	color: #f3f4f6;
	font-size: var(--fs-primary);
	font-weight: var(--fw-medium);
	line-height: 1.5;
	margin: 0;
}

.card-portfolio__actions {
	margin-top: auto;
}

.card-portfolio__action {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 100%;
	padding: 0.875rem 1.5rem;
	font-size: var(--fs-primary);
	font-weight: var(--fw-semibold);
	text-decoration: none;
	color: var(--white);
	background: linear-gradient(135deg, var(--blue-600) 0%, var(--blue-700) 100%);
	border: 2px solid var(--blue-600);
	border-radius: calc(var(--border-radius) + 2px);
	cursor: pointer;
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	position: relative;
	overflow: hidden;
	@include media(768px) {
		padding: 0.75rem 1.25rem;
		font-size: 0.9rem;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}

	&:hover {
		color: var(--white);
		background: linear-gradient(135deg, var(--blue-700) 0%, var(--blue-600) 100%);
		border-color: var(--blue-700);
		box-shadow: 0 8px 25px rgba(38, 132, 255, 0.4);

		&::before {
			left: 100%;
		}

		svg {
			transform: translate(2px, -2px);
		}
	}

	&:focus {
		outline: 3px solid rgba(38, 132, 255, 0.5);
		outline-offset: 2px;
	}

	&:active {
		transform: translateY(0);
	}

	svg {
		transition: transform 0.3s ease;
		flex-shrink: 0;
	}
}

.card-portfolio__title {
	animation: slideUp 0.6s ease-out 0.1s both;
}

.card-portfolio__description {
	animation: slideUp 0.6s ease-out 0.2s both;
}

.card-portfolio__tech {
	animation: slideUp 0.6s ease-out 0.3s both;
}

.card-portfolio__actions {
	animation: slideUp 0.6s ease-out 0.4s both;
}
</style>
