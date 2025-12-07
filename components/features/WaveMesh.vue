<template>
	<TresPoints :geometry="geometry" :material="material" />
</template>

<script setup lang="ts">
import * as THREE from 'three';

defineOptions({
	name: 'WaveMesh',
});

// --- Config ---
const cols = 120;
const rows = 60;
const spacing = 10;
const speed = 1.0;

const baseColor = new THREE.Color(0.282, 0.671, 0.929);

const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;

const positions = new Float32Array(cols * rows * 3);
let index = 0;
for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
		positions[index * 3] = j * spacing - (cols * spacing) / 2;
		positions[index * 3 + 1] = i * spacing - (rows * spacing) / 2;
		positions[index * 3 + 2] = 0;
		index++;
	}
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vZ;

  void main() {
    vec3 pos = position;

    float wave1 = sin(pos.x * 0.015 + uTime * 2.0) * 80.0;
    float wave2 = cos(pos.y * 0.02 + uTime * 1.5) * 60.0;
    float wave3 = sin((pos.x + pos.y) * 0.01 + uTime * 2.5) * 50.0;
    float wave4 = cos(pos.x * 0.008 - pos.y * 0.012 + uTime) * 40.0;

    pos.z = wave1 + wave2 + wave3 + wave4;
    vZ = pos.z;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = 2.0 * uPixelRatio;
  }
`;

const fragmentShader = `
  uniform vec3 uBaseColor;
  varying float vZ;

  void main() {
    float brightness = clamp((vZ + 150.0) / 250.0, 0.0, 1.0);
    vec3 finalColor = mix(uBaseColor, vec3(1.0), brightness);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const uniforms = {
	uTime: { value: 0 },
	uBaseColor: { value: baseColor },
	uPixelRatio: { value: pixelRatio },
};

const material = new THREE.ShaderMaterial({
	uniforms,
	vertexShader,
	fragmentShader,
	transparent: true,
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
	uniforms.uTime.value += delta * speed;
});
</script>
