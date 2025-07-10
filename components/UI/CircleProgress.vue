<template>
	<div class="vue-circle-progress" v-bind="wrapAttr">
		<svg v-bind="svgAttr" class="svg-wrapper">
			<circle v-bind="circleBgAttr" />
			<circle v-bind="circleFgAttr" />
		</svg>
		<div v-if="showPercent" class="current-percent" :style="{ color: fillColor }">
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
//CircleProgress
const props = defineProps({
	size: {
		type: Number,
		default: 180,
	},
	borderWidth: {
		type: Number,
		default: 15,
	},
	borderBgWidth: {
		type: Number,
		default: 15,
	},
	fillColor: {
		type: String,
		default: '#288feb',
	},
	contentColor: { type: String, default: '#cacace' },
	emptyColor: {
		type: String,
		default: '#dddddd',
	},
	percent: {
		type: Number,
		default: 50,
	},
	linecap: {
		type: String as () => 'round' | 'inherit' | 'butt' | 'square',
		default: 'round',
	},
	transition: {
		type: Number,
		default: 400,
	},
	showPercent: {
		type: Boolean,
		default: false,
	},
	class: {
		type: String,
		default: '',
	},
});
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
	if ((props.percent ?? 0) !== 0) {
		updatePercent();
	}
});

watch(
	() => props.percent,
	() => {
		updatePercent();
	}
);
</script>

<style lang="scss" scoped>
.vue-circle-progress {
	position: relative;
	.svg-wrapper {
		transform: rotate(-90deg);
	}
	.current-percent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
