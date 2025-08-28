<template>
	<main class="main-photo-examples">
		<div class="photo">
			<div class="container photo__container">
				<picture>
					<source
						media="(min-width: 769px)"
						srcset="/examples/large.webp 1200w, /examples/medium.webp 768w"
						type="image/webp"
						sizes="33.33vw" />
					<source
						media="(min-width: 321px)"
						srcset="/examples/medium.webp 768w, /examples/small.webp 320w"
						type="image/webp"
						sizes="50vw" />
					<img
						src="/examples/original.jpg"
						srcset="/examples/medium.webp 768w, /examples/small.webp 320w"
						sizes="100vw"
						alt="Description of image"
						class="photo__image" />
				</picture>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
defineOptions({
	name: 'PhotoExamples',
});
</script>

<style scoped lang="scss">
.main-photo-examples {
	padding-top: 4rem;
	overflow: hidden;
}
.photo__container {
	display: grid;
	grid-template-columns: 1fr;
	gap: 10px;
	@include media(321px, min-width) {
		grid-template-columns: 1fr 1fr;
	}
	@include media(769px, min-width) {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

.photo__image {
	width: 100%;
	height: auto;
}
</style>
