<template>
	<ClientOnly>
		<Teleport to="body">
			<transition :class="classTransition" :name="animation">
				<dialog
					v-if="modelValue"
					:open="modelValue"
					@click="closeNative"
					class="modal-dialog">
					<slot :onClose="close" />
				</dialog>
			</transition>
		</Teleport>
	</ClientOnly>
</template>

<script>
export default {
	name: 'DialogModal',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		animation: {
			type: String,
			default: 'slide',
		},
		animationSlideDirection: {
			type: String,
			default: 'right',
		},
	},
	watch: {
		modelValue: {
			handler() {
				const bodyOverflow = document.body.style.overflow;
				document.body.style.overflow = bodyOverflow === 'hidden' ? '' : 'hidden';
			},
		},
	},
	computed: {
		classTransition() {
			return { ['slide__' + this.animationSlideDirection]: true };
		},
	},
	methods: {
		close() {
			this.$emit('update:modelValue', false);
		},
		closeNative(e) {
			if (e.currentTarget === e.target) {
				this.close();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.modal-dialog {
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
