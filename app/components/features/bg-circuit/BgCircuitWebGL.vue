<template>
	<div ref="wrapperRef" :class="['bg-circuit-webgl', wrapperClass]">
		<TresCanvas
			v-if="isMounted && width > 0 && height > 0"
			clear-color="#000000"
			:dpr="[1, 2]"
			disable-render>
			<TresOrthographicCamera
				:args="[0, width, 0, -height, 0.1, 1000]"
				:position="[0, 0, 100]"
				:manual="false" />

			<CircuitScene
				:width="width"
				:height="height"
				:lines="lines"
				:colors="colors"
				:duration="duration"
				:min-segments="minSegments"
				:max-segments="maxSegments" />

			<Suspense>
				<CircuitBloom />
			</Suspense>
		</TresCanvas>
	</div>
</template>

<script setup lang="ts">
defineProps({
	lines: { type: Number, default: 25 },
	colors: {
		type: Array as () => string[],
		default: () => ['#48abed', '#fa2a6f', '#2684ff'],
	},
	duration: { type: Number, default: 10 },
	minSegments: { type: Number, default: 4 },
	maxSegments: { type: Number, default: 12 },
});

const uid = useId();
const wrapperRef = ref<HTMLElement | null>(null);
const wrapperClass = ref(`circuit-${uid}`);
const width = ref(0);
const height = ref(0);
const isMounted = ref(false);

let resizeObserver: ResizeObserver | null = null;
let resizeTimeout: ReturnType<typeof setTimeout>;

const handleResize = (entry: ResizeObserverEntry) => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		width.value = Math.floor(entry.contentRect.width);
		height.value = Math.floor(entry.contentRect.height);
	}, 100);
};

onMounted(() => {
	isMounted.value = true;
	if (!wrapperRef.value) return;
	resizeObserver = new ResizeObserver((entries) => {
		if (entries[0]) handleResize(entries[0]);
	});
	resizeObserver.observe(wrapperRef.value);
});

onUnmounted(() => {
	if (resizeObserver) resizeObserver.disconnect();
	clearTimeout(resizeTimeout);
});
</script>
<style scoped lang="scss">
.bg-circuit-webgl {
	height: 100%;
	width: 100%;
}
</style>
