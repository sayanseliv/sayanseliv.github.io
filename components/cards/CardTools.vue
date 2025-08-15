<template>
	<div class="tools__category">
		<div class="category__header">
			<component :is="categoryIcon" class="category__icon" />
			<h3 class="category__name">{{ categoryData.name }}</h3>
			<span class="category__count">{{ categoryData.count }}</span>
		</div>
		<ul class="tools__list">
			<li v-for="tool in categoryData.tools" :key="tool.id">
				<NuxtLink
					:to="tool.link"
					class="tool__item"
					target="_blank"
					external
					rel="noopener noreferrer">
					<div class="tool__info">
						<div class="tool__name">{{ tool.title }}</div>
						<div class="tool__usage">{{ tool.usage }}</div>
					</div>
					<ExternalLinkIcon class="tool__link-icon" />
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import type { CategoryData } from '@types';
import {
	Zap as PerformanceIcon,
	Search as SEOIcon,
	Monitor as CompatibilityIcon,
	Code as DevelopmentIcon,
	Image as OptimizationIcon,
	UserCheck as AccessibilityIcon,
	MessageSquare as DebuggingIcon,
	CheckCircle as CodeQualityIcon,
	Share2 as APITestingIcon,
	Palette as DesignIcon,
	Lightbulb as AIToolsIcon,
	ExternalLink as ExternalLinkIcon,
} from 'lucide-vue-next';

defineOptions({
	name: 'CardTools',
});

interface Props {
	readonly categoryData: CategoryData;
}

const props = defineProps<Props>();

const categoryIconMap = {
	Performance: PerformanceIcon,
	SEO: SEOIcon,
	Compatibility: CompatibilityIcon,
	Development: DevelopmentIcon,
	Optimization: OptimizationIcon,
	Accessibility: AccessibilityIcon,
	Debugging: DebuggingIcon,
	'Code Quality': CodeQualityIcon,
	'API Testing': APITestingIcon,
	Design: DesignIcon,
	'AI Tools': AIToolsIcon,
};

const categoryIcon = computed(() => {
	return (
		categoryIconMap[props.categoryData.name as keyof typeof categoryIconMap] || DevelopmentIcon
	);
});
</script>
<style lang="scss" scoped>
.tools__category {
	position: relative;
	padding: 1.5rem;
	background: linear-gradient(
		135deg,
		rgba(var(--blue-rgb), 0.05) 0%,
		rgba(var(--blue-rgb), 0.1) 100%
	);
	border: 1px solid rgba(var(--blue-rgb), 0.15);
	border-radius: var(--border-radius);
	transition: all 0.3s ease;
	overflow: hidden;

	&:hover {
		background: linear-gradient(
			135deg,
			rgba(var(--blue-rgb), 0.1) 0%,
			rgba(var(--blue-rgb), 0.15) 100%
		);
		border-color: rgba(var(--blue-rgb), 0.3);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--blue-300), var(--blue-700));
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&:hover::before {
		opacity: 1;
	}

	@include media(768px) {
		padding: 1rem;
	}
}

.category__header {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1rem;
	padding-bottom: 0.75rem;
	border-bottom: 1px solid rgba(var(--blue-rgb), 0.1);

	@include media(768px) {
		margin-bottom: 0.75rem;
	}
}

.category__icon {
	width: 24px;
	height: 24px;
	flex-shrink: 0;
	color: var(--blue-300);
}

.category__name {
	font-size: var(--fs-secondary);
	font-weight: var(--fw-medium);
	color: var(--blue-300);
}

.category__count {
	margin-left: auto;
	padding: 0.2rem 0.5rem;
	background: rgba(var(--blue-rgb), 0.2);
	color: var(--blue-300);
	border-radius: 12px;
	font-size: var(--fs-small);
	font-weight: var(--fw-medium);
}

.tools__list {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	list-style: none;

	@include media(768px) {
		gap: 0.5rem;
	}
}

.tool__item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 0.75rem;
	background: rgba(var(--blue-rgb), 0.05);
	color: inherit;
	border: 1px solid rgba(var(--blue-rgb), 0.1);
	border-radius: calc(var(--border-radius) - 2px);
	transition: all 0.3s ease;
	text-decoration: none;

	&:hover {
		transform: translateX(5px);
		background: rgba(var(--blue-rgb), 0.1);
		border-color: rgba(var(--blue-rgb), 0.3);

		.tool__link-icon {
			transform: translate(2px, -2px);
			color: var(--blue-300);
		}
	}

	@include media(768px) {
		padding: 0.5rem;
	}
}

.tool__info {
	flex: 1;
	min-width: 0;
}

.tool__name {
	margin-bottom: 0.25rem;
	font-size: var(--fs-primary);
	font-weight: var(--fw-medium);
	color: var(--white);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@include media(768px) {
		font-size: var(--fs-caption);
	}
}

.tool__usage {
	font-size: var(--fs-caption);
	color: var(--gray-300);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@include media(768px) {
		font-size: var(--fs-small);
	}
}

.tool__link-icon {
	width: 16px;
	height: 16px;
	flex-shrink: 0;
	color: var(--gray-300);
	transition: all 0.3s ease;
}
</style>
