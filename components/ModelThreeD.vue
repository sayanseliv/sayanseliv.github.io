<template>
	<primitive :object="scene" />
</template>
<script setup lang="ts">
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

const startRotation = () => {
	isRotating.value = true;
};
const stopRotation = () => {
	isRotating.value = false;
};
defineExpose({ startRotation, stopRotation });

const { scene } = await useGLTF(modelPath, { draco: draco });

const isRotating = ref(true);
const rotationSpeed = 0.01;

useRenderLoop().onLoop(() => {
	if (scene && isRotating.value) {
		// eslint-disable-next-line functional/immutable-data
		scene.rotation.y += rotationSpeed;
	}
});
</script>
