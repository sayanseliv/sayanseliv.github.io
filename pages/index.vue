<template>
	<main class="main-home">
		<div class="container-1440 home__container">
			<aside class="aside">
				<figure class="aside__avatar">
					<img src="/cv_photo.jpeg" alt="Lang Eugen avatar" class="aside__image" />
					<figcaption class="aside__figcaption">
						Lang Eugen
						<p class="aside__position">Front-end developer</p>
					</figcaption>
				</figure>
			</aside>
			<section><h1>Lang Eugen</h1></section>
		</div>
	</main>
</template>

<script>
export default {
	name: 'mainPage',
};
</script>

<style lang="scss" scoped>
.home__container {
	display: flex;
	padding-block: 4rem;
}
.aside {
	height: calc(100svh - 11rem);
	padding: 2rem 3rem;
	background-color: var(--grey-blue);
	border-radius: var(--border-radius);
	border: 0.0625rem solid var(--grey-hr);
}
.aside__avatar {
	width: 100%;
	height: 100%;
	max-width: 8rem;
	max-height: 8rem;
}
.aside__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 50%;
}
</style>
