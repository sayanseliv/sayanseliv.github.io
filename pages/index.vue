<template>
	<main class="main-home">
		<div class="container-1440 home__container">
			<Sidebar />
			<section class="home__content">
				<div class="content__wrapper">
					<figure class="content__img-wrapper">
						<img
							src="/images/thinking.webp"
							alt="Photo thinking"
							class="content__img" />
					</figure>
					<div class="content__thinking">
						<h1 class="content__title">Welcome to Lang Eugen's Digital Space</h1>
						<figure class="content__img-wrapper">
							<img
								src="/images/taking.webp"
								alt="Photo thinking"
								class="content__img" />
						</figure>
					</div>
				</div>
			</section>
		</div>
	</main>
</template>

<script>
export default {
	name: 'mainPage',
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.home__container {
	position: relative;
	display: flex;
	column-gap: 2rem;
	padding-block: 4rem;
}
.home__content {
	width: 100%;
	margin-left: 20.125rem;
	padding: 1rem;
	// background: linear-gradient(159deg, rgba(37, 37, 50, 0.98) 0%, rgba(35, 35, 45, 0.98) 100%);
	// background-color: var(--bg-color);
	border-radius: var(--border-radius);
	// border: 0.0625rem solid var(--grey-hr);
}
.content__wrapper {
	display: flex;
}
.content__img-wrapper {
	max-width: 25rem;
	max-height: 45rem;
	overflow: hidden;
}
.content__img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: left top;
	clip-path: polygon(42% 0, 100% 25%, 80% 100%, 0 96%);
}
.content__thinking {
	background-color: var(--bg-color);
	clip-path: polygon(0% 0%, 100% 0%, 94% 100%, 25% 100%);
	& > .content__img-wrapper {
		margin-left: auto;
		max-height: 35rem;
		& > .content__img {
			object-position: right top;
			clip-path: polygon(20% 11%, 80% 0, 100% 100%, 0 100%);
		}
	}
}
.content__title {
	margin-bottom: 2rem;
	background: 50% 100% / 50% 50% no-repeat
		radial-gradient(ellipse at bottom, var(--light-blue), transparent, transparent);
	background-clip: text;
	color: transparent;
	text-align: center;
	font-size: 3rem;
	font-weight: 400;
	animation: reveal 3000ms ease-in-out forwards 200ms, glow 2500ms linear infinite 4000ms;
	@keyframes reveal {
		80% {
			letter-spacing: 0.1rem;
		}
		100% {
			background-size: 300% 300%;
		}
	}
	@keyframes glow {
		40% {
			text-shadow: 0 0 0.1rem var(--light-blue);
		}
	}
}
</style>
