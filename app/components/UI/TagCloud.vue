<template>
	<NuxtLink
		:to="link"
		external
		target="_blank"
		class="tech-tag"
		:style="{
			transform: `translate(${transformX}px, ${transformY}px)`,
			transition: animationFrame ? 'none' : 'transform 0.2s ease',
		}"
		@mousemove="handleMouseMove"
		@mouseleave="handleMouseLeave">
		{{ title }}
	</NuxtLink>
</template>

<script setup lang="ts">
import type { Content } from '@/types';

defineOptions({
	name: 'TagCloud',
});
const props = defineProps<{
	readonly content: Content;
}>();

const { content } = props;
const { title, link } = content;

const transformX = ref(0);
const transformY = ref(0);

const animationFrame = ref<number | null>(null);

const handleMouseMove = (e: MouseEvent) => {
	if (window.innerWidth <= 768) return;

	const el = e.currentTarget as HTMLElement;
	const rect = el.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const move = 8;
	const xMove = (x / rect.width) * (move * 2) - move;
	const yMove = (y / rect.height) * (move * 2) - move;

	if (animationFrame.value) cancelAnimationFrame(animationFrame.value);

	animationFrame.value = requestAnimationFrame(() => {
		transformX.value = xMove;
		transformY.value = yMove;
	});
};

const handleMouseLeave = () => {
	if (animationFrame.value) cancelAnimationFrame(animationFrame.value);

	transformX.value = 0;
	transformY.value = 0;
};
</script>

<style scoped lang="scss">
.tech-tag {
	position: relative;
	background: linear-gradient(135deg, rgba(var(--blue-rgb), 0.1), rgba(var(--blue-rgb), 0.05));
	border: 1px solid rgba(var(--blue-rgb), 0.3);
	color: var(--white);
	padding: 0.6rem 1.2rem;
	border-radius: 30px;
	font-weight: 500;
	cursor: pointer;
	text-decoration: none;

	transition: transform 0.3s, background 0.3s, color 0.3s;
	will-change: transform;
	@include media(480px) {
		flex: 1;
		white-space: nowrap;
	}
}

.tech-tag:hover {
	background-color: var(--blue-300);
	color: var(--gray-900);
	transform: scale(1.05);
	box-shadow: 0 4px 12px rgba(var(--blue-rgb), 0.3);
}
</style>
