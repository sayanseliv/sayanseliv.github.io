<template>
	<main class="photo-examples">
		<div class="container">
			<section class="photo-examples__hero">
				<h1 class="photo-examples__title-main text-gradient">Image Optimization</h1>
				<p class="photo-examples__subtitle">
					Using local assets: WebP, Srcset, and fallback formats.
				</p>
			</section>

			<section class="photo-examples__section">
				<h2 class="photo-examples__section-title">1. Resolution Switching</h2>
				<p class="photo-examples__section-desc">
					The browser automatically selects the best file (Small, Medium, or Large)
					depending on screen width and pixel density (DPR). Aspect ratio
					<code>3/2</code>
					prevents layout shifts.
				</p>

				<div class="photo-examples__grid">
					<div v-for="i in 3" :key="i" class="photo-examples__card block-wrapper">
						<div class="photo-examples__image-wrapper ratio-3-2">
							<img
								src="/examples/medium.webp"
								srcset="
									/examples/small.webp     320w,
									/examples/medium.webp    768w,
									/examples/large.webp    1200w,
									/examples/original.webp 1536w
								"
								sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
								alt="Srcset demonstration"
								loading="lazy"
								decoding="async"
								class="photo-examples__image fit-cover" />
						</div>
						<div class="photo-examples__info">
							<span class="photo-examples__badge">WebP</span>
							<span class="photo-examples__size">Auto Selection</span>
						</div>
					</div>
				</div>
			</section>

			<section class="photo-examples__section">
				<h2 class="photo-examples__section-title">2. Picture Tag (Format Fallback)</h2>
				<p class="photo-examples__section-desc">
					The
					<code>&lt;picture&gt;</code>
					tag provides explicit format selection. If the browser cannot display WebP, the
					fallback JPG will be loaded. You can also define different images for mobile
					devices.
				</p>

				<div class="photo-examples__art block-wrapper">
					<picture class="photo-examples__art-picture">
						<source
							type="image/webp"
							srcset="
								/examples/small.webp     320w,
								/examples/medium.webp    768w,
								/examples/large.webp    1200w,
								/examples/original.webp 1536w
							"
							sizes="(min-width: 769px) 80vw, 100vw" />

						<img
							src="/examples/original.jpg"
							alt="Landscape Fallback"
							class="photo-examples__image photo-examples__art-image"
							loading="lazy" />
					</picture>

					<div class="photo-examples__art-overlay">
						<p>WebP with JPG fallback</p>
					</div>
				</div>
			</section>

			<section class="photo-examples__section">
				<h2 class="photo-examples__section-title">3. Visual Effects</h2>
				<p class="photo-examples__section-desc">
					Using
					<code>original.jpg</code>
					for higher-quality visual overlay effects.
				</p>

				<div class="photo-examples__creative-grid">
					<div class="photo-examples__creative-card">
						<img
							src="/examples/medium.webp"
							alt="Cyberpunk Style"
							class="photo-examples__creative-image" />
						<div class="photo-examples__glitch-overlay" />
						<div class="photo-examples__creative-content">
							<h3>Neon Filter</h3>
						</div>
					</div>

					<div
						class="photo-examples__creative-card photo-examples__creative-card--grayscale">
						<img
							src="/examples/medium.webp"
							alt="Gaming Setup"
							class="photo-examples__creative-image" />
						<div class="photo-examples__creative-content">
							<h3>Focus</h3>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
defineOptions({
	name: 'PhotoExamples',
});
</script>

<style scoped lang="scss">
.photo-examples {
	padding-top: 6rem;
	padding-bottom: 4rem;

	&__hero {
		margin-bottom: 3rem;
		text-align: center;
	}

	&__title-main {
		margin-bottom: 1rem;
		font-size: var(--fs-h1);
	}

	&__subtitle {
		color: var(--gray-300);
	}

	&__section {
		margin-bottom: 5rem;
	}

	&__section-title {
		font-size: var(--fs-h2);
		margin-bottom: 0.5rem;
		border-left: 4px solid var(--blue-300);
		padding-left: 1rem;
	}

	&__section-desc {
		color: var(--gray-200);
		margin-bottom: 2rem;
		max-width: 700px;

		code {
			background: rgba(255, 255, 255, 0.1);
			padding: 2px 5px;
			border-radius: 4px;
			color: var(--blue-200);
		}
	}

	&__grid {
		display: grid;
		gap: 20px;
		grid-template-columns: 1fr;

		@include media(600px, min-width) {
			grid-template-columns: repeat(2, 1fr);
		}

		@include media(1024px, min-width) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	&__card {
		transition: transform var(--transition-time);
		padding: 10px;

		@include hover-focus {
			transform: translateY(-5px);
		}
	}

	&__image-wrapper {
		position: relative;
		width: 100%;
		background-color: var(--gray-800);
		border-radius: var(--border-radius);
		overflow: hidden;

		&.ratio-3-2 {
			aspect-ratio: 3 / 2;
		}
	}

	&__image {
		width: 100%;
		height: 100%;
		display: block;

		&.fit-cover {
			object-fit: cover;
		}
	}

	&__info {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		font-size: var(--fs-small);
		color: var(--gray-300);
	}

	&__badge {
		background: var(--blue-600);
		padding: 2px 6px;
		border-radius: 4px;
	}

	&__art {
		position: relative;
		padding: 0;
		overflow: hidden;
		border: 1px solid var(--gray-600);
	}

	&__art-image {
		width: 100%;
		height: auto;
	}

	&__art-overlay {
		position: absolute;
		bottom: 20px;
		left: 20px;
		background: rgba(0, 0, 0, 0.7);
		padding: 10px 20px;
		border-radius: var(--border-radius);
		border-left: 3px solid var(--pink-500);
	}

	&__creative-grid {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	&__creative-card {
		position: relative;
		height: 300px;
		border-radius: var(--border-radius);
		overflow: hidden;
		cursor: pointer;
		@include hover-focus {
			.photo-examples__creative-image {
				transform: scale(1.1);
			}
			.photo-examples__glitch-overlay {
				opacity: 0.6;
			}
		}
		&--grayscale {
			.photo-examples__creative-image {
				filter: grayscale(100%);
			}

			@include hover-focus {
				.photo-examples__creative-image {
					filter: grayscale(0%);
				}
			}
		}
	}

	&__creative-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	&__glitch-overlay {
		position: absolute;
		inset: 0;
		background: var(--gradient-main);
		mix-blend-mode: color-dodge;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	&__creative-content {
		position: absolute;
		bottom: 20px;
		left: 20px;
		z-index: 2;

		h3 {
			background: var(--gray-900);
			padding: 5px 10px;
			display: inline-block;
			border-radius: 4px;
		}
	}
}
</style>
