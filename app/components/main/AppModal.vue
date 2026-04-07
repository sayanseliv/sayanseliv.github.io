<template>
	<ClientOnly>
		<Teleport to="body">
			<transition :class="classTransition.value" :name="animation">
				<dialog
					v-if="modelValue"
					ref="dialogRef"
					:open="modelValue"
					class="app-modal"
					aria-label="Modal dialog, press Escape, Enter, or Space to close"
					@click="closeNative"
					@keydown="handleKeyDown">
					<slot :on-close="close" />
				</dialog>
			</transition>
		</Teleport>
	</ClientOnly>
</template>

<script setup lang="ts">
defineOptions({
	name: 'AppModal',
});

const props = defineProps<{
	readonly modelValue: boolean;
	readonly animation?: string;
	readonly animationSlideDirection?: string;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

const animation = props.animation ?? 'slide';
const animationSlideDirection = props.animationSlideDirection ?? 'right';

const classTransition = computed(() => ({
	[`slide__${animationSlideDirection}`]: true,
}));

const setBodyOverflow = (isLocked: boolean) => {
	if (isLocked) {
		document.body.classList.add('scroll-lock');
	} else {
		document.body.classList.remove('scroll-lock');
	}
};

watch(
	() => props.modelValue,
	(newVal) => {
		setBodyOverflow(newVal);
		if (newVal) {
			nextTick(() => {
				dialogRef.value?.focus();
			});
		}
	}
);

function close() {
	emit('update:modelValue', false);
}

function closeNative(e: MouseEvent) {
	if (e.currentTarget === e.target) {
		close();
	}
}

function handleKeyDown(e: KeyboardEvent) {
	if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
		e.preventDefault();
		close();
	}
}
</script>

<style lang="scss" scoped>
.app-modal {
	all: initial;
	position: fixed;
	inset: 0;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100dvh;
	z-index: 99999;
	background: rgba(4, 14, 47, 0.2);
	backdrop-filter: blur(4px);
	overflow: hidden;
}
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.3s;
}
.slide-enter-active,
.slide-leave-active {
	background: transparent;
	backdrop-filter: initial;
}
.slide__right.slide-enter-from,
.slide__right.slide-leave-to {
	transform: translateX(100%);
}

.slide__right.slide-enter-to,
.slide__right.slide-leave {
	transform: translateX(0);
}

.slide__up.slide-enter-from,
.slide__up.slide-leave-to {
	transform: translateY(-100%);
}

.slide__up.slide-enter-to,
.slide__up.slide-leave {
	transform: translateY(0);
}

.bounce-enter-active {
	animation: bounce-in 0.7s;
}
.bounce-leave-active {
	animation: bounce-in 0.7s reverse;
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.25);
	}
	100% {
		transform: scale(1);
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
