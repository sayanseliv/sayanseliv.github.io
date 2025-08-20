<template>
	<div class="pure-css-morphing">
		<h1 class="morfing__title">MORPHING</h1>
		<div class="morphing__container">
			<div class="morphing__shape" />
			<div class="morphing__floating-particles">
				<div class="morphing__particle" />
				<div class="morphing__particle" />
				<div class="morphing__particle" />
				<div class="morphing__particle" />
				<div class="morphing__particle" />
				<div class="morphing__particle" />
			</div>
		</div>
		<p class="morphing__subtitle">Pure CSS Animation</p>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'PureCssMorphing',
});
</script>

<style scoped lang="scss">
.pure-css-morphing {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100dvh - 4rem);
	background: linear-gradient(-45deg, #7e3a26, #821c43, #115670, #11705a);
	background-size: 400% 400%;
	animation: gradientBG 15s ease infinite;
}
.morfing__title {
	position: absolute;
	top: 5rem;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	font-size: 2.5rem;
	font-weight: 300;
	text-align: center;
	text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	letter-spacing: 3px;
	animation: titlePulse 3s ease-in-out infinite;
	@include media(768px) {
		font-size: 2rem;
	}
}
.morphing__container {
	position: relative;
	width: 400px;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	@include media(768px) {
		width: 300px;
		height: 300px;
	}
}
.morphing__shape {
	position: relative;
	width: 200px;
	height: 200px;
	background: linear-gradient(45deg, var(--blue-300), var(--purple-700));
	border: 2px solid var(--gray-900);
	border-radius: 50px;
	animation: morphing 6s ease-in-out infinite;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	transform-origin: center center;
	@include media(768px) {
		width: 150px;
		height: 150px;
	}
	&::before {
		content: '';
		position: absolute;
		z-index: -1;
		top: -10px;
		left: -10px;
		right: -10px;
		bottom: -10px;
		background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5);
		background-size: 300% 300%;
		border-radius: 60px;
		filter: blur(10px);
		opacity: 0.7;
		animation: gradientRotate 3s ease infinite;
	}
}
.morphing__floating-particles {
	position: absolute;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.morphing__particle {
	position: absolute;
	width: 4px;
	height: 4px;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 50%;
	animation: float 4s ease-in-out infinite;
	&:nth-child(1) {
		top: 10%;
		left: 20%;
		animation-delay: 0s;
	}
	&:nth-child(2) {
		top: 20%;
		right: 30%;
		animation-delay: 0.5s;
	}
	&:nth-child(3) {
		bottom: 30%;
		left: 10%;
		animation-delay: 1s;
	}
	&:nth-child(4) {
		bottom: 10%;
		right: 20%;
		animation-delay: 1.5s;
	}
	&:nth-child(5) {
		top: 50%;
		left: 5%;
		animation-delay: 2s;
	}
	&:nth-child(6) {
		top: 30%;
		right: 10%;
		animation-delay: 2.5s;
	}
}

.morphing__subtitle {
	position: absolute;
	bottom: 50px;
	left: 50%;
	transform: translateX(-50%);
	color: rgba(255, 255, 255, 0.8);
	font-size: 1rem;
	text-align: center;
	letter-spacing: 2px;
}

/* Animations */
@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}

	50% {
		background-position: 100% 50%;
	}

	100% {
		background-position: 0% 50%;
	}
}
@keyframes morphing {
	0% {
		border-radius: 50px;
		background: linear-gradient(45deg, var(--blue-300), var(--blue-600));
		transform: rotate(0deg) scale(1);
	}

	16.66% {
		border-radius: 0px;
		background: linear-gradient(45deg, var(--blue-600), var(--blue-400));
		transform: rotate(45deg) scale(1.05);
	}

	33.33% {
		border-radius: 50%;
		background: linear-gradient(45deg, var(--blue-400), var(--purple-700));
		transform: rotate(90deg) scale(0.95);
	}

	50% {
		border-radius: 20px;
		background: linear-gradient(45deg, var(--purple-700), var(--violet-500));
		transform: rotate(135deg) scale(1.1);
	}

	66.66% {
		border-radius: 50px 0px 50px 0px;
		background: linear-gradient(45deg, var(--violet-500), var(--blue-500));
		transform: rotate(180deg) scale(0.9);
	}

	83.33% {
		border-radius: 0px 50px 0px 50px;
		background: linear-gradient(45deg, var(--blue-500), var(--blue-300));
		transform: rotate(225deg) scale(1.05);
	}

	100% {
		border-radius: 50px;
		background: linear-gradient(45deg, var(--blue-300), var(--blue-600));
		transform: rotate(360deg) scale(1);
	}
}
@keyframes float {
	0%,
	100% {
		transform: translateY(0) scale(1);
		opacity: 0.7;
	}

	50% {
		transform: translateY(-20px) scale(1.2);
		opacity: 1;
	}
}
@keyframes titlePulse {
	0%,
	100% {
		opacity: 0.8;
		transform: translateX(-50%) scale(1);
	}

	50% {
		opacity: 1;
		transform: translateX(-50%) scale(1.05);
	}
}
</style>
