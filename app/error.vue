<template>
	<div class="error-page">
		<div class="orb orb--1" aria-hidden="true" />
		<div class="orb orb--2" aria-hidden="true" />

		<div class="scene">
			<div class="error-code" :data-code="statusCode">{{ statusCode }}</div>
			<div class="neon-line neon-line-base neon-color-blue" />
			<p class="message">{{ title }}</p>
			<p class="submessage">{{ description }}</p>
			<button
				class="back-btn"
				@click="handleBack"
				@keydown.enter="handleBack"
				@keydown.space.prevent="handleBack">
				<ArrowLeft :size="16" aria-hidden="true" />
				Back to Home
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';

const props = defineProps<{
	error: {
		statusCode: number;
		statusMessage?: string;
		message?: string;
	};
}>();

const statusCode = computed(() => props.error?.statusCode ?? 500);

const ERROR_MAP: Record<number, { title: string; description: string }> = {
	400: {
		title: 'Bad Request',
		description: 'The request could not be understood by the server.',
	},
	401: {
		title: 'Unauthorized',
		description: 'You need to be authenticated to access this page.',
	},
	403: {
		title: 'Forbidden',
		description: "You don't have permission to access this resource.",
	},
	404: {
		title: 'Page Not Found',
		description: "The page you're looking for doesn't exist or has been moved.",
	},
	408: {
		title: 'Request Timeout',
		description: 'The server timed out waiting for the request.',
	},
	429: {
		title: 'Too Many Requests',
		description: "You've sent too many requests. Please slow down and try again later.",
	},
	500: {
		title: 'Internal Server Error',
		description: 'Something went wrong on our end. Please try again later.',
	},
	502: {
		title: 'Bad Gateway',
		description: 'The server received an invalid response from an upstream server.',
	},
	503: {
		title: 'Service Unavailable',
		description: 'The service is temporarily unavailable. Please try again later.',
	},
	504: {
		title: 'Gateway Timeout',
		description: 'The upstream server failed to respond in time.',
	},
};

const title = computed(
	() =>
		ERROR_MAP[statusCode.value]?.title ?? props.error?.statusMessage ?? 'Something Went Wrong',
);

const description = computed(
	() =>
		ERROR_MAP[statusCode.value]?.description ??
		props.error?.message ??
		'An unexpected error occurred. Please try again later.',
);

function handleBack() {
	clearError({ redirect: '/' });
}
</script>

<style scoped lang="scss">
.error-page {
	font-family: 'Roboto', sans-serif;
	background-color: var(--gray-700);
	color: var(--white);
	min-height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(38, 132, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(38, 132, 255, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		animation: gridDrift 20s linear infinite;
	}
}

.orb {
	position: absolute;
	border-radius: 50%;
	filter: blur(80px);
	opacity: 0.15;
	animation: float 8s ease-in-out infinite;
	pointer-events: none;

	&--1 {
		width: 350px;
		height: 350px;
		background: var(--blue-700);
		top: -10%;
		left: -5%;
		animation-delay: 0s;
	}

	&--2 {
		width: 250px;
		height: 250px;
		background: var(--blue-200);
		bottom: -8%;
		right: -3%;
		animation-delay: -3s;
	}
}

.scene {
	position: relative;
	z-index: 1;
	text-align: center;
	padding: 2rem;
	max-width: 540px;
}

.error-code {
	font-size: clamp(7rem, 20vw, 12rem);
	font-weight: var(--fw-bold);
	line-height: 1;
	background: var(--gradient-text);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	position: relative;
	margin-bottom: 1rem;
	animation:
		fadeInUp 0.6s ease-out both,
		shimmerGlow 4s ease-in-out 1s infinite;

	&::after {
		content: attr(data-code);
		position: absolute;
		inset: 0;
		background: var(--gradient-text);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		filter: blur(20px);
		opacity: 0.4;
		z-index: -1;
	}
}

.neon-line {
	width: 120px;
	margin: 0 auto 1.5rem;
	animation: fadeInUp 0.6s ease-out 0.15s both;
}

.message {
	font-size: 1.15rem;
	font-weight: var(--fw-medium);
	color: rgba(255, 255, 255, 0.85);
	margin-bottom: 0.5rem;
	animation: fadeInUp 0.6s ease-out 0.25s both;
}

.submessage {
	font-size: var(--fs-primary);
	color: rgba(255, 255, 255, 0.45);
	margin-bottom: 2.5rem;
	line-height: 1.6;
	animation: fadeInUp 0.6s ease-out 0.35s both;
}

.back-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.75rem 1.75rem;
	font-size: var(--fs-primary);
	font-weight: var(--fw-medium);
	font-family: inherit;
	color: var(--blue-200);
	background: var(--gradient-btn);
	border: 1px solid rgba(var(--blue-rgb), 0.2);
	border-radius: var(--border-radius);
	cursor: pointer;
	transition: all var(--transition-time) ease;
	animation: fadeInUp 0.6s ease-out 0.45s both;

	:deep(svg) {
		transition: transform 0.3s ease;
	}

	&:hover,
	&:focus-visible {
		background: var(--gradient-btn-hover);
		border-color: rgba(var(--blue-rgb), 0.4);
		box-shadow: 0 0 20px rgba(var(--blue-rgb), 0.15);
		color: var(--white);

		:deep(svg) {
			transform: translateX(-3px);
		}
	}

	&:focus-visible {
		outline: 2px solid var(--blue-700);
		outline-offset: 2px;
	}
}

@keyframes gridDrift {
	0% {
		transform: translate(0, 0);
	}
	100% {
		transform: translate(60px, 60px);
	}
}

@keyframes float {
	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}
	33% {
		transform: translate(30px, -20px) scale(1.05);
	}
	66% {
		transform: translate(-20px, 15px) scale(0.95);
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes shimmerGlow {
	0%,
	100% {
		filter: brightness(1);
	}
	50% {
		filter: brightness(1.15);
	}
}
</style>
