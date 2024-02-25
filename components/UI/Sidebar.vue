<template>
	<aside class="aside">
		<figure class="aside__avatar">
			<img src="/cv_photo.jpeg" alt="Lang Eugen avatar" class="aside__image" />
			<figcaption class="aside__figcaption">
				Lang Eugen
				<p class="aside__position">Front-end developer</p>
			</figcaption>
		</figure>
		<section>Scrollable</section>
	</aside>
</template>

<script>
export default {
	name: 'Sidebar',
};
</script>

<style lang="scss" scoped>
.aside {
	position: fixed;
	width: 18.125rem;
	height: calc(100svh - 11rem);
	padding: 2rem 0.9375rem;
	background-color: var(--bg-color);
	border-radius: var(--border-radius);
}
.aside__avatar {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}
.aside__image {
	width: 100%;
	height: 100%;
	max-width: 8rem;
	max-height: 8rem;
	object-fit: cover;
	border-radius: 50%;
}
</style>
