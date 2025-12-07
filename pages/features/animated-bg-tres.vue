<template>
	<main class="main-animated-bg-tres">
		<section class="animated-bg-tres__hero">
			<div class="container">
				<div class="hero__wrapper">
					<h1 class="text-gradient hero__title">Interactive Motion Backgrounds</h1>
					<p class="hero__description">
						Explore a collection of dynamic, animated backgrounds powered by TresJS and
						Three.js. From flowing particle fields and interactive wave surfaces to 3D
						shapes and shader effects, these examples demonstrate how modern web
						technologies can create immersive, real-time visual experiences directly in
						the browser.
					</p>
				</div>
			</div>
		</section>
		<section class="animated-bg-tres__backgrounds">
			<div class="container">
				<h2 class="backgrounds__title text-gradient">Interactive Particle Field</h2>
				<div class="backgrounds__grid">
					<div class="backgrounds__card">
						<h3 class="backgrounds__subtitle">Background Wave Surface</h3>
						<div class="neon-line-base neon-color-blue" />
						<BgWaveSurface />
					</div>
					<div class="backgrounds__card">
						<h3 class="backgrounds__subtitle">Background Flow Field 3D</h3>
						<div class="neon-line-base neon-color-blue" />
						<FlowField3D />
					</div>
					<div class="backgrounds__card">
						<h3 class="backgrounds__subtitle">Background Circuit WebGL</h3>
						<div class="neon-line-base neon-color-blue" />
						<BgCircuitWebGL :lines="20" />
					</div>
					<div class="backgrounds__card">
						<h3 class="backgrounds__subtitle">Background Wave Cube</h3>
						<div class="neon-line-base neon-color-blue" />
						<BgWaveCube />
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'PageAnimatedBgTres',
});
</script>
<style lang="scss" scoped>
.main-animated-bg-tres {
	position: relative;
	padding-block: 4rem 2rem;
	overflow: hidden;
}
.animated-bg-tres__hero {
	margin-bottom: 3rem;
}
.hero__wrapper {
	position: relative;
	padding: 2rem;
	background: linear-gradient(135deg, var(--gray-900) 0%, rgba(45, 45, 58, 0.8) 100%);
	border-radius: var(--border-radius);
	overflow: hidden;
	@include media(768px) {
		padding: 1rem;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			45deg,
			transparent 30%,
			rgba(var(--blue-rgb), 0.1) 50%,
			transparent 70%
		);
		opacity: 0;
		animation: shimmer 3s ease-in-out infinite;
		pointer-events: none;
	}
}
.hero__title {
	margin-bottom: 1rem;
	font-size: 2.5rem;
	font-weight: 700;
	@include media(768px) {
		text-align: center;
	}
}
.hero__description {
	font-size: var(--fs-secondary);
	line-height: 120%;
	color: var(--gray-300);
	@include media(768px) {
		max-width: 100%;
		padding-top: 1rem;
		border-top: 1px solid var(--gray-300);
	}
	@include media(768px) {
		font-size: 1rem;
	}
}

.backgrounds__title {
	position: relative;
	z-index: 1;
	margin-bottom: 2rem;
	font-size: var(--fs-h3);
	font-weight: var(--fw-semibold);

	@include media(768px) {
		padding: 1rem;
	}
}
.backgrounds__grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 100%;
	max-width: 100%;
	padding: 1rem 0.4rem;
	gap: 1rem;
	background-color: var(--gray-900);
	border-radius: var(--border-radius);
	@include media(768px) {
		grid-template-columns: 1fr;
	}
}
.backgrounds__card {
	height: 500px;
	padding-top: 1rem;
	border-radius: var(--border-radius);
	border: 1px solid var(--gray-300);
	overflow: hidden;
	@include media(768px) {
		height: 400px;
	}
}
.backgrounds__subtitle {
	margin-bottom: 1rem;
	padding-inline: 1rem;
	font-size: var(--fs-h6);
	font-weight: var(--fw-bold);
	line-height: 1.3;
}
</style>
