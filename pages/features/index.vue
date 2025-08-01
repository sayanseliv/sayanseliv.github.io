<template>
	<main class="main-features">
		<section class="features-hero">
			<div class="container-1440">
				<div class="hero__wrapper">
					<h1 class="hero__title">Features</h1>

					<div class="hero__cards">
						<CardFeature
							v-for="(feature, index) in features"
							:key="'feature-' + index"
							:title="feature.title"
							:description="feature.description"
							:link="feature.link"
							:image="feature.image"
							:tags="feature.tags" />
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script lang="ts" setup>
import data from '@/static/data.json';
defineOptions({
	name: 'PageFeatures',
});
const features = data.features;
</script>
<style lang="scss" scoped>
.main-features {
	padding-top: 4rem;
}
.hero__wrapper {
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin-inline: auto;
	background-color: var(--bg-secondary-color);
	border-radius: var(--border-radius);
}
.hero__title {
	margin-bottom: 1rem;
	font-size: var(--fs-h1);
}
.hero__cards {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	gap: 1rem;
	@include media(640px) {
		grid-template-columns: 1fr;
	}
}
</style>
