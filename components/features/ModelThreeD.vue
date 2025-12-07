<template>
	<primitive v-if="model?.scene" :object="model.scene" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import { useGLTF } from '@tresjs/cientos';

defineOptions({
	name: 'ModelThreeD',
});

const props = withDefaults(
	defineProps<{
		readonly modelPath: string;
		readonly draco?: boolean;
	}>(),
	{ draco: true }
);

const { modelPath, draco } = props;

const isRotating = ref(true);
const rotationSpeed = 0.01;

const startRotation = () => {
	isRotating.value = true;
};
const stopRotation = () => {
	isRotating.value = false;
};

defineExpose({ startRotation, stopRotation });

const { state } = await useGLTF(modelPath, { draco });
const model = computed(() => state.value);

const { onBeforeRender } = useLoop();

onBeforeRender(() => {
	if (model.value?.scene && isRotating.value) {
		model.value.scene.rotation.y += rotationSpeed;
	}
});
</script>
