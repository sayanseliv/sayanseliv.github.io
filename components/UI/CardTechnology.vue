<template>
	<div class="technology__card" @mousemove="handleMouseMove">
		<div class="glow" />
		<h6>{{ content.title }}</h6>
		<p>{{ content.text }}</p>
		<NuxtLink :to="content.link" external target="_blank">Learn more</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type { Content } from '@types';

defineProps<{
	readonly content: Content;
}>();

const handleMouseMove = (e: MouseEvent) => {
	const card = e.currentTarget as HTMLElement;
	const rect = card.getBoundingClientRect();
	const mouseX = e.clientX - rect.left - rect.width / 2;
	const mouseY = e.clientY - rect.top - rect.height / 2;

	const rawAngle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
	const angle = (rawAngle + 360) % 360;

	card.style.setProperty('--start', `${angle + 60}`);
};
</script>

<style lang="scss" scoped>
.technology__card {
	--start: 0;
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-radius: var(--border-radius);
	box-shadow: 0 3px 8px 0 rgba(15, 15, 20, 0.2);
	background-color: var(--bg-secondary-color);
	transition: border-color 0.3s ease-in-out;
	&::before {
		position: absolute;
		content: '';
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: var(--border-radius);
		border: 2px solid transparent;
		background: var(--gradient);
		background-attachment: fixed;
		mask: linear-gradient(#0000, #0000),
			conic-gradient(
				from calc((var(--start) - (20 * 1.1)) * 1deg),
				#ffffff1f 0deg,
				white,
				#ffffff00 100deg
			);
		mask-composite: intersect;
		mask-clip: padding-box, border-box;
		opacity: 0;
		transition: 0.5s ease;
	}
	& > h6 {
		margin-bottom: 0.5rem;
		font-size: var(--fs-h6);
	}
	& > p {
		margin-bottom: 0.5rem;
		color: var(--tc-secondary);
	}
	& > a {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		margin-top: auto;
		padding-right: 1.5rem;
		color: var(--light-blue);
		text-decoration: none;
		transition: text-shadow 0.3s;
		&:hover {
			text-shadow: 0 0 3px rgba(72, 171, 237, 0.4);
			&::after {
				right: 0rem;
			}
		}
		&::after {
			content: 'ᐳ';
			position: absolute;
			right: 0.5rem;
			font-size: var(--fs-caption);
			transition: right 0.3s;
		}
	}
	&:hover > .glow::before {
		opacity: 1;
	}
	&:hover::before {
		opacity: 0.6;
	}
}
.glow {
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	filter: blur(14px);
}
.glow::before {
	position: absolute;
	content: '';
	width: 98%;
	height: 98%;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 14px;
	border: 5px solid transparent;
	background: var(--gradient);
	background-attachment: fixed;
	mask: linear-gradient(#0000, #0000),
		conic-gradient(
			from calc((var(--start) - (20 * 1.1)) * 1deg),
			#ffffff1f 0deg,
			white,
			#ffffff00 100deg
		);
	mask-composite: intersect;
	mask-clip: padding-box, border-box;
	opacity: 0;
	transition: 1s ease;
}
</style>
