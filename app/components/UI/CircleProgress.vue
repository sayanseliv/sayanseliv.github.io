<template>
	<div class="circle-progress" v-bind="wrapAttr">
		<svg v-bind="svgAttr" class="circle-progress__svg">
			<circle v-bind="circleBgAttr" />
			<circle v-bind="circleFgAttr" />
		</svg>
		<div v-if="showPercent" class="circle-progress__percent" :style="{ color: fillColor }">
			<template v-if="$slots.content">
				<slot name="content" :percent="currentPercent" />
			</template>
			<template v-else>
				<span :style="{ color: contentColor }">{{ currentPercent }}%</span>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
// https://github.com/w2xi/vue3-circular-progress/tree/main
import type { CSSProperties } from 'vue';
defineOptions({
	name: 'CircleProgress',
});
const props = withDefaults(
	defineProps<{
		readonly size?: number;
		readonly borderWidth?: number;
		readonly borderBgWidth?: number;
		readonly fillColor?: string;
		readonly contentColor?: string;
		readonly emptyColor?: string;
		readonly percent?: number;
		readonly linecap?: 'round' | 'inherit' | 'butt' | 'square';
		readonly transition?: number;
		readonly showPercent?: boolean;
		readonly class?: string;
	}>(),
	{
		size: 180,
		borderWidth: 15,
		borderBgWidth: 15,
		fillColor: '#288feb',
		contentColor: '#cacace',
		emptyColor: '#dddddd',
		percent: 50,
		linecap: 'round',
		transition: 400,
		showPercent: false,
		class: '',
	}
);
const cx = props.size / 2;
const cy = props.size / 2;

const circleRadiusBg = (): number =>
	(props.size - props.borderBgWidth) * 0.5 -
	Math.max(props.borderWidth - props.borderBgWidth, 0) * 0.5;

const circleRadiusFg = (): number =>
	(props.size - props.borderWidth) * 0.5 -
	Math.max(props.borderBgWidth - props.borderWidth, 0) * 0.5;

const circumference = 2 * Math.PI * circleRadiusFg();
const offset = ref(circumference);
const currentPercent = ref(0);
const isVisible = ref(false);

const wrapStyle: CSSProperties = {
	height: `${props.size}px`,
	width: `${props.size}px`,
	position: 'relative',
};

const wrapAttr = {
	class: props.class,
	style: wrapStyle,
};

const svgAttr = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	height: props.size,
	width: props.size,
};

const circleBgAttr = {
	cx,
	cy,
	r: circleRadiusBg(),
	fill: 'none',
	stroke: props.emptyColor,
	'stroke-width': props.borderBgWidth,
};

const circleFgAttr = computed(() => ({
	cx,
	cy,
	r: circleRadiusFg(),
	fill: 'none',
	stroke: props.fillColor,
	'stroke-width': props.borderWidth,
	'stroke-dasharray': circumference,
	'stroke-dashoffset': offset.value,
	'stroke-linecap': props.linecap as 'round' | 'inherit' | 'butt' | 'square',
	...(props.transition && {
		style: {
			transition: `stroke-dashoffset ${props.transition}ms ease`,
		},
	}),
}));

const updatePercent = () => {
	if (!isVisible.value) return;
	const percent = Math.round(props.percent ?? 0);
	animateValue(percent);
};

function animateValue(to: number) {
	const step = to - currentPercent.value;
	const delay = props.transition / Math.abs(step);
	const counter = setInterval(() => {
		if (step > 0) {
			currentPercent.value += 1;
			if (currentPercent.value >= to) {
				clearInterval(counter);
			}
		} else {
			currentPercent.value -= 1;
			if (currentPercent.value <= to) {
				clearInterval(counter);
			}
		}
		offset.value = (circumference * (100 - currentPercent.value)) / 100;
	}, delay);
}

onMounted(() => {
	const element = document.querySelector('.circle-progress');
	if (!element) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					isVisible.value = true;
					updatePercent();
					observer.disconnect();
				}
			});
		},
		{ threshold: 0.1 }
	);

	observer.observe(element);
});

watch(
	() => props.percent,
	() => {
		updatePercent();
	}
);
</script>

<style lang="scss" scoped>
.circle-progress {
	position: relative;
	.circle-progress__svg {
		transform: rotate(-90deg);
	}
	.circle-progress__percent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
