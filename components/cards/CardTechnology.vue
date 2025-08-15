<template>
	<div class="card__technology" @mousemove="handleMouseMove">
		<div class="glow" />
		<div class="card__header">
			<h3 class="card__title">{{ content.title }}</h3>
			<span
				:class="[
					'card__category',
					`card__category--${content.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
				]">
				{{ content.category }}
			</span>
		</div>

		<p class="card__description">{{ content.description }}</p>
		<NuxtLink :to="content.link" external target="_blank" class="card__link">
			Learn more
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type { Content } from '@types';
defineOptions({
	name: 'CardTechnology',
});
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
.card__technology {
	--start: 0;
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 1.5rem;
	border-radius: var(--border-radius);
	box-shadow: 0 3px 8px 0 rgba(15, 15, 20, 0.2);
	background-color: var(--gray-900);
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
		background: var(--gradient-main);
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
	& p {
		margin-bottom: 0.5rem;
		color: var(--gray-300);
	}
	& a {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		margin-top: auto;
		padding-right: 1.5rem;
		color: var(--blue-300);
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
	&:hover .glow::before {
		opacity: 1;
	}
	&:hover::before {
		opacity: 0.6;
	}
}
.card__header {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 0.75rem;
	min-height: 2rem;
}
.card__category {
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.25rem 0.75rem;
	font-size: var(--fs-small);
	font-weight: 600;
	border-radius: 20px;
	white-space: nowrap;
	z-index: 2;
	transition: all 0.3s ease;
	&--frontend-frameworks {
		background: linear-gradient(135deg, #10b981, #047857);
		color: white;
		box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
	}
	&--mobile-development {
		background: linear-gradient(135deg, #8b5cf6, #7c3aed);
		color: white;
		box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
	}
	&--frontend-core {
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		color: white;
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
	}
	&--state-management {
		background: linear-gradient(135deg, #f59e0b, #d97706);
		color: white;
		box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
	}
	&--css-frameworks {
		background: linear-gradient(135deg, #06b6d4, #0891b2);
		color: white;
		box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3);
	}
	&--css-preprocessors {
		background: linear-gradient(135deg, #c6538c, #a63d70);
		color: white;
		box-shadow: 0 2px 8px rgba(198, 83, 140, 0.3);
	}
	&--ui-libraries {
		background: linear-gradient(135deg, #ec4899, #db2777);
		color: white;
		box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
	}
	&--backend-runtime {
		background: linear-gradient(135deg, #64748b, #475569);
		color: white;
		box-shadow: 0 2px 8px rgba(100, 116, 139, 0.3);
	}
	&--cms-platforms {
		background: linear-gradient(135deg, #84cc16, #65a30d);
		color: white;
		box-shadow: 0 2px 8px rgba(132, 204, 22, 0.3);
	}
	&--cloud-infrastructure {
		background: linear-gradient(135deg, #f97316, #ea580c);
		color: white;
		box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
	}
}
.card__technology:hover .card__category {
	transform: scale(1.05);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
	background: var(--gradient-main);
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
