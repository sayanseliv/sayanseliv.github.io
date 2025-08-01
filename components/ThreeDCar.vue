<template>
	<div class="car-viewer">
		<div v-if="!hasFinishLoading" class="loading-overlay">
			Loading... {{ Math.round(progress) }}%
		</div>

		<div class="controls">
			<div>
				<button @click="start">Start Rotation</button>
				<button @click="stop">Stop Rotation</button>
			</div>
			<h1 class="controls__title">
				<NuxtLink to="https://docs.tresjs.org/" external target="_blank">
					TresJS create awesome 3D
				</NuxtLink>
			</h1>
		</div>

		<TresCanvas clear-color="#161313" shadows alpha>
			<!-- Camera -->
			<TresPerspectiveCamera
				ref="camera"
				:position="[8, 4, 8]"
				:fov="45"
				:look-at="[0, 0, 0]" />

			<!-- Lights -->
			<TresAmbientLight :intensity="0.4" />
			<TresDirectionalLight :position="[10, 10, 5]" :intensity="1" cast-shadow />
			<TresDirectionalLight :position="[-10, 5, -5]" :intensity="0.5" />

			<!-- Controls -->
			<OrbitControls
				:enable-damping="true"
				:damping-factor="0.05"
				:max-distance="20"
				:min-distance="3"
				:max-polar-angle="Math.PI / 2" />

			<!-- 3D Model -->
			<Suspense @resolve="onModelReady">
				<ModelThreeD ref="modelRef" model-path="/models/retro-futuristic-car.glb" />
			</Suspense>
			<TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />

			<!-- Floor -->
			<TresMesh :position="[0, -0.5, 0]" :rotation="[-Math.PI / 2, 0, 0]">
				<TresPlaneGeometry :args="[10, 10]" />
				<TresMeshLambertMaterial color="#2684ff" />
			</TresMesh>
		</TresCanvas>
	</div>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
const modelRef = ref();
const isModelReady = ref<boolean>(false);
const onModelReady = () => {
	isModelReady.value = true;
};

const start = () => {
	if (isModelReady.value && typeof modelRef.value?.startRotation === 'function') {
		modelRef.value.startRotation();
	}
};

const stop = () => {
	if (isModelReady.value && typeof modelRef.value?.stopRotation === 'function') {
		modelRef.value.stopRotation();
	}
};

const hasFinishLoading = ref<boolean>(false);
const progress = ref<number>(0);

const loadProgress = async () => {
	const { hasFinishLoading: finishLoading, progress: prog } = await useProgress();

	watchEffect(() => {
		progress.value = prog.value;
		hasFinishLoading.value = finishLoading.value;
	});
};

loadProgress();
</script>

<style scoped lang="scss">
.car-viewer {
	position: relative;
	width: 100%;
	height: 100dvh;
}

.loading-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #1a1a1a;
	color: white;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
	user-select: none;
}
.controls {
	position: absolute;
	top: 4rem;
	left: 20px;
	z-index: 20;
	display: flex;
	flex-direction: column;
	gap: 10px;
	& div {
		display: flex;
		gap: 10px;
	}
	& button {
		background-color: var(--dark-blue-2);
		color: white;
		border: none;
		border-radius: 4px;
		padding: 10px 16px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
	& button:hover {
		background-color: var(--light-blue);
	}
}

.controls__title {
	font-size: var(--fs-primary);
	& > a {
		position: relative;
		display: inline-block;
		color: var(--light-blue);
		text-decoration: underline;
		transition: color 0.3s;
		&:hover {
			color: var(--dark-blue-2);
		}
	}
	@include media(992px) {
		font-size: var(--fs-h2);
	}
}
</style>
