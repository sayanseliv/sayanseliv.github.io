<template>
	<div ref="animatedBlock" class="animated-block" :class="wrapperClass">
		<slot />
	</div>
</template>
<script setup lang="ts">
const { $gsap } = useNuxtApp();
defineOptions({
	name: 'AnimatedBlock',
});
const props = withDefaults(
	defineProps<{
		readonly wrapperClass?: string;
		readonly direction?: 'top' | 'bottom' | 'left' | 'right';
		readonly delay?: number;
		readonly duration?: number;
	}>(),
	{
		direction: 'bottom',
		wrapperClass: '',
		delay: 0,
		duration: 0.8,
	}
);

const animatedBlock = ref<HTMLElement | null>(null);

onMounted(() => {
	if (animatedBlock.value) {
		const yValue = props.direction === 'top' ? -50 : props.direction === 'bottom' ? 50 : 0;
		const xValue = props.direction === 'left' ? -50 : props.direction === 'right' ? 50 : 0;
		$gsap.from(animatedBlock.value, {
			x: xValue,
			y: yValue,
			opacity: 0,
			duration: props.duration || 0.8,
			delay: props.delay || 0,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: animatedBlock.value,
				start: 'top 100%',
				toggleActions: 'play none none none',
				once: true,
			},
		});
	}
});
</script>
<style scoped>
.animated-block {
	position: relative;
}
</style>
