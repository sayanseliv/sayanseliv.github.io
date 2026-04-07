<template>
	<TresGroup>
		<TresGroup v-for="line in circuits" :key="line.id">
			<template v-if="line.positions && line.positions.length > 0">
				<TresLine>
					<TresBufferGeometry>
						<TresBufferAttribute
							attach="attributes-position"
							:count="line.positions.length / 3"
							:array="line.positions"
							:item-size="3" />
					</TresBufferGeometry>

					<TresLineBasicMaterial
						:color="line.color"
						:linewidth="2"
						:opacity="0.6"
						transparent
						:depth-test="false" />
				</TresLine>
			</template>
		</TresGroup>

		<TresInstancedMesh
			ref="nodesInstancedRef"
			:args="[undefined, undefined, totalNodesCount]"
			:position="[0, 0, 1]">
			<TresCircleGeometry :args="[2.5, 8]" />
			<TresMeshBasicMaterial color="#ffffff" :opacity="0.6" transparent />
		</TresInstancedMesh>

		<TresGroup v-for="(line, index) in circuits" :key="`mover-${line.id}`">
			<TresMesh :ref="(el: any) => registerMovingDot(el, index)" :position="[0, 0, 2]">
				<TresCapsuleGeometry :args="[2, 6, 4, 8]" />
				<TresMeshBasicMaterial :color="line.color" />
			</TresMesh>
		</TresGroup>
	</TresGroup>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import type { ComponentPublicInstance } from 'vue';

// --- Types ---
interface NodePoint {
	x: number;
	y: number;
}
interface PathSegment {
	start: THREE.Vector3;
	end: THREE.Vector3;
	length: number;
	accumulatedLength: number;
}
interface CircuitLine {
	id: string;
	color: string;
	nodes: NodePoint[];
	positions: Float32Array;
	segments: PathSegment[];
	totalLength: number;
	currentDistance: number;
	speed: number;
	dotMesh: THREE.Mesh | null;
}

const props = defineProps({
	width: { type: Number, required: true },
	height: { type: Number, required: true },
	lines: { type: Number, default: 20 },
	colors: { type: Array as () => string[], default: () => ['#48abed'] },
	duration: { type: Number, default: 8 },
	minSegments: { type: Number, default: 3 },
	maxSegments: { type: Number, default: 5 },
});

const circuits = shallowRef<CircuitLine[]>([]);
const nodesInstancedRef = shallowRef<THREE.InstancedMesh | null>(null);
const totalNodesCount = shallowRef(0);
const dummy = new THREE.Object3D();

const generatePathData = (startX: number, viewWidth: number, viewHeight: number) => {
	let currentX = startX;
	let currentY = viewHeight + 50;

	const points: number[] = [currentX, -currentY, 0];
	const nodes: NodePoint[] = [];
	const segments: PathSegment[] = [];
	let totalLength = 0;

	const numSegments =
		props.minSegments + Math.floor(Math.random() * (props.maxSegments - props.minSegments + 1));

	for (let i = 0; i < numSegments; i++) {
		const verticalLength = 40 + Math.random() * 100;
		const nextY = currentY - verticalLength;

		const p1 = new THREE.Vector3(currentX, -currentY, 0);
		const p2 = new THREE.Vector3(currentX, -nextY, 0);
		totalLength += verticalLength;
		segments.push({
			start: p1,
			end: p2,
			length: verticalLength,
			accumulatedLength: totalLength,
		});
		points.push(currentX, -nextY, 0);
		currentY = nextY;

		if (currentY > -50 && currentY < viewHeight + 50) nodes.push({ x: currentX, y: currentY });

		if (i < numSegments - 1) {
			const horizontalLength = 20 + Math.random() * 50;
			const direction = Math.random() > 0.5 ? 1 : -1;
			let nextX = currentX + horizontalLength * direction;
			nextX = Math.max(20, Math.min(viewWidth - 20, nextX));

			if (Math.abs(nextX - currentX) > 5) {
				const p3 = new THREE.Vector3(currentX, -currentY, 0);
				const p4 = new THREE.Vector3(nextX, -currentY, 0);
				const hLen = Math.abs(nextX - currentX);
				totalLength += hLen;
				segments.push({
					start: p3,
					end: p4,
					length: hLen,
					accumulatedLength: totalLength,
				});
				points.push(nextX, -currentY, 0);
				currentX = nextX;
				nodes.push({ x: currentX, y: currentY });
			}
		}
	}

	const finalY = -50;
	const pFinalStart = new THREE.Vector3(currentX, -currentY, 0);
	const pFinalEnd = new THREE.Vector3(currentX, -finalY, 0);
	const finalLen = Math.abs(finalY - currentY);
	totalLength += finalLen;
	segments.push({
		start: pFinalStart,
		end: pFinalEnd,
		length: finalLen,
		accumulatedLength: totalLength,
	});
	points.push(currentX, -finalY, 0);

	return { positions: new Float32Array(points), nodes, segments, totalLength };
};

const generateCircuits = () => {
	if (props.width <= 0 || props.height <= 0) return;

	const newCircuits: CircuitLine[] = [];
	const spacingDivisor = Math.max(1, props.lines);
	const allNodes: { x: number; y: number }[] = [];

	for (let i = 0; i < props.lines; i++) {
		const startX = (props.width / spacingDivisor) * i + (Math.random() * 20 - 10);
		const { positions, nodes, segments, totalLength } = generatePathData(
			startX,
			props.width,
			props.height
		);

		const randomColor = props.colors[Math.floor(Math.random() * props.colors.length)]!;
		const speedVariation = 0.8 + Math.random() * 0.7;
		const baseSpeed = totalLength / props.duration;

		newCircuits.push({
			id: `c-${i}`,
			color: randomColor,
			nodes,
			positions,
			segments,
			totalLength,
			currentDistance: -(Math.random() * totalLength),
			speed: baseSpeed * speedVariation,
			dotMesh: null,
		});

		nodes.forEach((n) => allNodes.push(n));
	}

	circuits.value = newCircuits;
	totalNodesCount.value = allNodes.length;

	setTimeout(() => {
		if (!nodesInstancedRef.value) return;
		allNodes.forEach((node, i) => {
			dummy.position.set(node.x, -node.y, 0);
			dummy.updateMatrix();
			nodesInstancedRef.value!.setMatrixAt(i, dummy.matrix);
		});
		nodesInstancedRef.value.instanceMatrix.needsUpdate = true;
	}, 50);
};

const registerMovingDot = (el: Element | ComponentPublicInstance | null, index: number) => {
	if (el && circuits.value[index]) {
		circuits.value[index].dotMesh = el as unknown as THREE.Mesh;
		(el as unknown as THREE.Mesh).visible = false;
	}
};

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
	const dt = Math.min(delta, 0.1);

	for (const circuit of circuits.value) {
		if (!circuit.dotMesh) continue;

		circuit.currentDistance += circuit.speed * dt;

		if (circuit.currentDistance > circuit.totalLength) {
			circuit.currentDistance = -(Math.random() * 200 + 50);
			circuit.dotMesh.visible = false;
		} else if (circuit.currentDistance < 0) {
			circuit.dotMesh.visible = false;
		} else {
			circuit.dotMesh.visible = true;
			const segment = circuit.segments.find(
				(seg) => circuit.currentDistance <= seg.accumulatedLength
			);

			if (segment) {
				const distOnSegment =
					segment.length - (segment.accumulatedLength - circuit.currentDistance);
				const alpha = distOnSegment / segment.length;

				circuit.dotMesh.position.lerpVectors(segment.start, segment.end, alpha);
				circuit.dotMesh.position.z = 2;

				const dx = segment.end.x - segment.start.x;
				const dy = segment.end.y - segment.start.y;
				const angle = Math.atan2(dy, dx);
				circuit.dotMesh.rotation.z = angle - Math.PI / 2;

				const pulse = 1 + Math.sin(circuit.currentDistance * 0.1) * 0.2;
				circuit.dotMesh.scale.setScalar(pulse);
			}
		}
	}
});

watch(
	() => [props.width, props.height],
	() => {
		if (props.width > 0) generateCircuits();
	},
	{ immediate: true }
);
</script>
