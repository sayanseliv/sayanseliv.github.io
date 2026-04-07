<script setup lang="ts">
import * as THREE from 'three';

import type { ShallowRef, Ref } from 'vue';
import type { WebGLRenderer, Scene, Camera } from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
interface SafeTresContext {
	renderer: ShallowRef<WebGLRenderer>;
	scene: ShallowRef<Scene>;
	camera: ShallowRef<Camera>;
	sizes: {
		width: Ref<number>;
		height: Ref<number>;
	};
}

const { renderer, scene, camera, sizes } = useTresContext() as unknown as SafeTresContext;
const composer = shallowRef<EffectComposer | null>(null);

watchEffect(() => {
	if (renderer.value && scene.value && camera.value) {
		const newComposer = new EffectComposer(renderer.value);

		const width = sizes.width.value;
		const height = sizes.height.value;
		newComposer.setSize(width, height);

		const renderPass = new RenderPass(scene.value, camera.value);
		newComposer.addPass(renderPass);

		const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.1);
		newComposer.addPass(bloomPass);

		composer.value = newComposer;
	}
});

watchEffect(() => {
	if (composer.value && sizes.width.value && sizes.height.value) {
		composer.value.setSize(sizes.width.value, sizes.height.value);
	}
});

const { onBeforeRender } = useLoop();

onBeforeRender(() => {
	if (composer.value) {
		composer.value.render();
	}
});

onUnmounted(() => {
	composer.value?.dispose();
});
</script>
