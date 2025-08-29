<template>
	<div class="emoji-switching-interface">
		<div class="emoji__container">
			<h1 class="emoji__title">EMOJI SWITCHER</h1>
			<p class="emoji__instructions">Click on the emoji below or use the buttons to morph!</p>

			<div
				class="emoji__morph-area"
				role="button"
				tabindex="0"
				aria-label="Morph to a random emoji"
				@click="randomMorph"
				@keydown="handleKeyDown">
				<div
					class="emoji__shape-display"
					:style="{ background: currentGradient, transform: shapeTransform }">
					<div class="emoji">{{ currentEmoji }}</div>
				</div>
			</div>

			<div class="emoji__shapes-grid">
				<button
					v-for="(item, index) in shapes"
					:key="index"
					class="emoji__shape-btn"
					:class="{ active: currentIndex === index }"
					@click="morphTo(index)">
					{{ item.emoji }}
				</button>
			</div>

			<button class="emoji__auto-toggle" :class="{ active: autoMode }" @click="toggleAuto">
				Auto Mode: {{ autoMode ? 'ON' : 'OFF' }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'EmojiSwitchingInterface',
});

const autoMode = ref(false);
const autoInterval = ref<number | null>(null);
const currentIndex = ref(0);
const shapeTransform = ref('scale(1) rotateY(0deg)');

const shapes = [
	{ emoji: '❤️', color: 'var(--blue-300)' },
	{ emoji: '⭐', color: 'var(--blue-600)' },
	{ emoji: '🌙', color: 'var(--blue-700)' },
	{ emoji: '☀️', color: 'var(--gray-600)' },
	{ emoji: '🔥', color: 'var(--purple-700)' },
	{ emoji: '💎', color: 'var(--blue-400)' },
	{ emoji: '🌈', color: 'var(--blue-300)' },
	{ emoji: '⚡', color: 'var(--blue-500)' },
];

const currentEmoji = computed(() => shapes[currentIndex.value].emoji);

const currentGradient = computed(() => {
	const nextIndex = (currentIndex.value + 1) % shapes.length;
	return `linear-gradient(45deg, ${shapes[currentIndex.value].color}, ${
		shapes[nextIndex].color
	})`;
});

const morphTo = (index: number) => {
	if (autoMode.value) return;
	shapeTransform.value = 'scale(0.8) rotateY(90deg)';
	setTimeout(() => {
		currentIndex.value = index;
		shapeTransform.value = 'scale(1) rotateY(0deg)';
	}, 300);
};

const randomMorph = () => {
	if (!autoMode.value) {
		const randomIndex = Math.floor(Math.random() * shapes.length);
		morphTo(randomIndex);
	}
};

const handleKeyDown = (event: KeyboardEvent) => {
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		randomMorph();
	}
};

const toggleAuto = () => {
	autoMode.value = !autoMode.value;

	if (autoMode.value) {
		autoInterval.value = window.setInterval(() => {
			currentIndex.value = (currentIndex.value + 1) % shapes.length;
		}, 2000);
	} else {
		if (autoInterval.value) {
			clearInterval(autoInterval.value);
			autoInterval.value = null;
		}
		shapeTransform.value = 'scale(1) rotateY(0deg)';
	}
};
onUnmounted(() => {
	if (autoInterval.value) clearInterval(autoInterval.value);
});
</script>

<style scoped lang="scss">
.emoji-switching-interface {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100dvh;
	padding: 1rem;
	color: var(--white);
	background: linear-gradient(135deg, var(--gray-800) 0%, var(--blue-400) 100%);
}
.emoji__container {
	padding: 40px;
	text-align: center;
	background-color: var(--gray-900);
	backdrop-filter: blur(10px);
	border-radius: 30px;
	border: 1px solid rgba(var(--blue-rgb), 0.2);
	box-shadow: 0 8px 32px 0 rgba(var(--blue-rgb), 0.3);
}

.emoji__title {
	font-size: 2.5rem;
	margin-bottom: 30px;
	font-weight: 300;
	letter-spacing: 3px;
	text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.emoji__instructions {
	font-size: 1rem;
	opacity: 0.8;
	margin-bottom: 20px;
}

.emoji__morph-area {
	width: 200px;
	height: 200px;
	margin: 0 auto 2rem;
	position: relative;
	cursor: pointer;
	perspective: 1000px;
	@include media(768px) {
		width: 150px;
		height: 150px;
	}
}

.emoji__shape-display {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	font-size: 6rem;
	background: linear-gradient(45deg, var(--blue-300), var(--blue-600));
	border: 1px solid var(--gray-900);
	border-radius: 50%;
	box-shadow: 0 20px 40px rgba(var(--blue-rgb), 0.3);
	transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	overflow: hidden;
	@include media(768px) {
		font-size: 4rem;
	}
	&::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: conic-gradient(from 0deg, transparent, rgba(var(--blue-rgb), 0.3), transparent);
		animation: rotate 3s linear infinite;
		z-index: 1;
	}
	&:hover {
		transform: scale(1.1) rotateY(10deg);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
	}
	& .emoji {
		position: relative;
		z-index: 2;
	}
}

.emoji__shapes-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 15px;
	margin-bottom: 30px;
	@include media(768px) {
		grid-template-columns: repeat(3, 1fr);
	}
}

.emoji__shape-btn {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: 2px solid rgba(var(--blue-rgb), 0.3);
	background: rgba(var(--gray-900), 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.8rem;
	cursor: pointer;
	transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
	backdrop-filter: blur(5px);
	&:hover {
		background: rgba(var(--blue-rgb), 0.2);
		transform: translateY(-3px);
		box-shadow: 0 8px 16px rgba(var(--blue-rgb), 0.3);
	}
	&.active {
		background: rgba(var(--blue-rgb), 0.3);
		border-color: var(--blue-300);
		transform: scale(1.1);
	}
}

.emoji__auto-toggle {
	background: rgba(var(--gray-900), 0.6);
	border: 1px solid rgba(var(--blue-rgb), 0.3);
	color: var(--white);
	padding: 12px 24px;
	border-radius: 25px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.3s ease;
	backdrop-filter: blur(5px);
	&:hover {
		background: rgba(var(--blue-rgb), 0.2);
		transform: translateY(-2px);
	}
	&.active {
		background: rgba(var(--blue-300), 0.5);
		border-color: var(--blue-300);
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>
