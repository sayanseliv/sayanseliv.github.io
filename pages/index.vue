<template>
	<main class="main-home">
		<ClientOnly>
			<ParticleCanvas />
		</ClientOnly>
		<div class="container home__container">
			Changes
			<section class="home__hero">
				<div class="hero__profile-section">
					<div class="hero__avatar-wrapper">
						<figure class="hero__avatar">
							<img
								src="/images/thinking.webp"
								alt="Lang Eugen avatar"
								loading="lazy"
								class="hero__image" />
						</figure>
						<div class="hero__social-links">
							<NuxtLink
								to="https://www.facebook.com/Evgenyyyi"
								external
								target="_blank"
								aria-label="Facebook profile"
								class="social-link facebook">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 23">
									<path
										d="M 23.988281 11.496094 C 23.988281 5.144531 18.617188 0 11.992188 0 C 5.371094 0 0 5.144531 0 11.496094 C 0 16.886719 3.871094 21.40625 9.097656 22.648438 L 9.097656 15.007812 L 6.625 15.007812 L 6.625 11.496094 L 9.097656 11.496094 L 9.097656 9.980469 C 9.097656 6.070312 10.945312 4.253906 14.953125 4.253906 C 15.710938 4.253906 17.023438 4.398438 17.558594 4.539062 L 17.558594 7.726562 C 17.277344 7.695312 16.785156 7.683594 16.171875 7.683594 C 14.207031 7.683594 13.445312 8.394531 13.445312 10.253906 L 13.445312 11.496094 L 17.363281 11.496094 L 16.691406 15.007812 L 13.445312 15.007812 L 13.445312 22.90625 C 19.386719 22.21875 23.988281 17.371094 23.988281 11.496094 "
										fill="currentColor" />
								</svg>
							</NuxtLink>
							<NuxtLink
								to="https://www.linkedin.com/in/eugen-lang-18475b143/"
								external
								target="_blank"
								aria-label="LinkedIn profile"
								class="social-link linkedin">
								<svg height="20" viewBox="0 0 72 72" width="20">
									<path
										d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
										fill="var(--icon-bg)" />
									<path
										d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
										fill="var(--icon-fg)" />
								</svg>
							</NuxtLink>
							<NuxtLink
								to="https://github.com/sayanseliv"
								external
								target="_blank"
								aria-label="GitHub profile"
								class="social-link github">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="20"
									height="20">
									<path
										d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.262.82-.58 0-.288-.01-1.044-.015-2.05-3.338.724-4.042-1.61-4.042-1.61C4.46 18.46 3.68 18 3.68 18c-1.122-.766.086-.75.086-.75 1.242.086 1.896 1.28 1.896 1.28 1.104 1.895 2.902 1.344 3.62 1.026.112-.794.43-1.344.783-1.654-2.74-.31-5.606-1.37-5.606-6.1 0-1.348.48-2.448 1.28-3.307-.128-.31-.556-1.566.122-3.26 0 0 1.035-.33 3.4 1.26a11.61 11.61 0 0 1 3.06-.41c1.036.007 2.08.138 3.06.41 2.363-1.593 3.4-1.26 3.4-1.26.678 1.694.25 2.95.122 3.26.795.86 1.278 1.96 1.278 3.307 0 4.738-2.87 5.786-5.625 6.086.443.38.834 1.13.834 2.274 0 1.642-.015 2.96-.015 3.365 0 .32.216.696.825.577C20.565 21.798 24 17.303 24 12c0-6.627-5.373-12-12-12z"
										fill="currentColor" />
								</svg>
							</NuxtLink>
						</div>
					</div>
					<div class="hero__info">
						<h1 class="text-gradient hero__name">Lang Eugen</h1>
						<p class="hero__title-role">Front-end Developer</p>
						<div class="hero__location">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
									fill="var(--blue-300)" />
							</svg>
							<span>Odesa, Ukraine</span>
						</div>

						<p class="hero__description">
							Explore a portfolio showcasing Lang's expertise in HTML, CSS,
							JavaScript, and popular front-end frameworks like React and Vue. From
							responsive designs that adapt seamlessly to any device to interactive
							elements that engage users, Lang's work reflects a commitment to
							excellence and innovation.
						</p>
					</div>
				</div>
			</section>
			<AnimatedBlock>
				<section class="block-wrapper home__experience">
					<h2 class="text-gradient experience__title">Work Experience</h2>

					<div class="experience__timeline">
						<article class="experience__item">
							<header class="experience__header">
								<h3 class="experience__position">
									Web & Mobile Software Developer
								</h3>
								<div class="experience__company-period">
									<span class="experience__company">Zelh</span>
									<time class="experience__period" datetime="2021-04/2025-06">
										April 2021 – June 2025
									</time>
									<span class="experience__duration">4 years 2 months</span>
								</div>
							</header>

							<div class="experience__tasks">
								<h4 class="experience__tasks-title">Key Responsibilities:</h4>
								<ul class="experience__tasks-list">
									<li class="experience__task-item">
										Developed and maintained responsive web interfaces using
										modern frameworks including React, Vue, React Native and
										Wordpress
									</li>
									<li class="experience__task-item">
										Integrated REST APIs and implemented efficient client-side
										data management and state handling
									</li>
									<li class="experience__task-item">
										Optimized application performance for both web and mobile
										platforms, ensuring smooth user experiences across devices
									</li>
									<li class="experience__task-item">
										Collaborated closely with backend developers, UI/UX
										designers, and product managers in an agile development
										environment
									</li>
									<li class="experience__task-item">
										Implemented responsive design principles and cross-browser
										compatibility solutions
									</li>
									<li class="experience__task-item">
										Participated in code reviews and maintained high code
										quality standards using modern development tools
									</li>
								</ul>
							</div>
						</article>
					</div>
				</section>
			</AnimatedBlock>
			<AnimatedBlock>
				<section class="block-wrapper content__technologies">
					<h2 class="text-gradient technologies__title">My Technology Stack</h2>

					<div class="technologies__tags">
						<TagCloud
							v-for="(card, index) in cards"
							:key="'tag-technology-' + index"
							:content="card" />
					</div>
				</section>
			</AnimatedBlock>
			<AnimatedBlock>
				<section class="block-wrapper home__tools">
					<h2 class="text-gradient tools__title">Development Tools & Resources</h2>
					<div class="tools__grid">
						<CardTools
							v-for="categoryData in categorizedTools"
							:key="categoryData.name"
							:category-data="categoryData" />
					</div>
				</section>
			</AnimatedBlock>
			<AnimatedBlock>
				<section class="block-wrapper home__certificates">
					<h2 class="text-gradient certificates__title">Certificates</h2>
					<div class="certificates__content">
						<button
							class="certificates__btn"
							aria-label="View Basic Certificate"
							@click="showCertificate('basic.png')">
							<span>Basic</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<path
									d="M7 17L17 7M17 7H7M17 7V17"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</button>
						<button
							class="certificates__btn"
							aria-label="View Pro Certificate"
							@click="showCertificate('pro.png')">
							<span>Pro</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<path
									d="M7 17L17 7M17 7H7M17 7V17"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</button>
						<button
							class="certificates__btn"
							aria-label="View Advanced Certificate"
							@click="showCertificate('advance.jpg')">
							<span>Advanced</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<path
									d="M7 17L17 7M17 7H7M17 7V17"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</button>
					</div>
				</section>
			</AnimatedBlock>
			<AnimatedBlock>
				<section class="block-wrapper content__skills">
					<div class="skills__container">
						<h2 class="text-gradient languages__title">Languages</h2>
						<div class="languages__grid">
							<div v-for="(lang, i) in languages" :key="i" class="language__item">
								<CircleProgress v-bind="lang.progress" />
								<span class="language__label">{{ lang.label }}</span>
							</div>
						</div>
					</div>
				</section>
			</AnimatedBlock>
		</div>

		<AppModal v-model="isShowCertificate" animation="fade">
			<template #default="{ onClose }">
				<figure
					class="certificate__modal-wrapper"
					role="button"
					tabindex="0"
					aria-label="Click or press Enter, Space, or Escape to close the certificate modal"
					@click="onClose"
					@keydown="handleKeyDown($event, onClose)">
					<img
						class="certificate__modal-image"
						:src="'/certificates/' + docPath"
						alt="Certificate" />
				</figure>
			</template>
		</AppModal>
	</main>
</template>

<script setup lang="ts">
import cardsData from '@/static/data.json';
import type { Tool, CategoryData } from '@/types';

defineOptions({
	name: 'MainPage',
});

const personSchema = {
	'@context': 'https://schema.org/',
	'@type': 'Person',
	name: 'Lang Eugen',
	jobTitle: 'Front-end Developer',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Odesa',
		addressCountry: 'UA',
	},
	worksFor: {
		'@type': 'Organization',
		name: 'Zelh',
	},
	knowsAbout: [
		'React',
		'Vue.js',
		'JavaScript',
		'TypeScript',
		'React Native',
		'WordPress',
		'HTML5',
		'CSS3',
	],
	url: 'https://sayanseliv.github.io/',
	email: 'sayanseliv@gmail.com',
	sameAs: [
		'https://www.linkedin.com/in/eugen-lang-18475b143/',
		'https://github.com/sayanseliv',
		'https://www.facebook.com/Evgenyyyi',
	],
};

useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(personSchema),
		},
	],
});

const languages = cardsData.languages;

const cards = cardsData.technology.map((card) => ({
	...card,
	text: card.description,
}));

const tools: readonly Tool[] = cardsData.tools.map((tool) => ({
	...tool,
	usage: tool.usage ?? '',
}));
const groupToolsByCategory = (tools: readonly Tool[]): readonly CategoryData[] => {
	const grouped = tools.reduce((acc: Record<string, readonly Tool[]>, tool) => {
		const categoryTools = acc[tool.category] ?? [];
		return {
			...acc,
			[tool.category]: [...categoryTools, tool],
		};
	}, {});

	return Object.entries(grouped).map(([name, tools]) => ({
		name,
		tools: tools as readonly Tool[],
		count: tools.length,
	}));
};
const categorizedTools = computed(() => groupToolsByCategory(tools));

const isShowCertificate = ref(false);
const docPath = ref<string | null>(null);

const showCertificate = (docName: string) => {
	isShowCertificate.value = true;
	docPath.value = docName;
};
const handleKeyDown = (event: KeyboardEvent, onClose: () => void) => {
	if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
		event.preventDefault();
		onClose();
	}
};
</script>

<style lang="scss" scoped>
.main-home {
	padding-top: 3rem;
}

.home__container {
	position: relative;
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
	padding-block: 1rem 3rem;
}

/* Section Hero*/
.home__hero {
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

.hero__profile-section {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 2rem;
	align-items: start;

	@include media(768px) {
		grid-template-columns: 1fr;
		text-align: center;
		gap: 1.5rem;
	}
}

.hero__avatar-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}

.hero__avatar {
	position: relative;
}

.hero__image {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	border: 3px solid var(--blue-300);
	box-shadow: 0 0 20px rgba(var(--blue-rgb), 0.3);
	transition: all 0.3s ease;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 0 30px rgba(var(--blue-rgb), 0.5);
	}

	@include media(768px) {
		width: 100px;
		height: 100px;
	}
}

.hero__social-links {
	display: flex;
	gap: 1rem;
}

.social-link {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: linear-gradient(135deg, rgba(var(--blue-rgb), 0.2), rgba(var(--blue-rgb), 0.1));
	border: 1px solid rgba(var(--blue-rgb), 0.3);
	color: var(--blue-300);
	transition: all 0.3s ease;
	text-decoration: none;
	--icon-bg: var(--blue-300);
	--icon-fg: var(--gray-900);
	&:hover {
		background: var(--blue-300);
		color: var(--gray-900);
		box-shadow: 0 5px 15px rgba(var(--blue-rgb), 0.4);
	}

	&.linkedin:hover {
		--icon-bg: var(--gray-900);
		--icon-fg: var(--white);
	}
}

.hero__info {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.hero__name {
	margin: 0;
	font-size: 2.5rem;
	font-weight: 700;

	@include media(768px) {
		font-size: 2rem;
	}

	@include media(480px) {
		font-size: 1.75rem;
	}
}

.hero__title-role {
	margin: 0;
	font-size: 1.25rem;
	color: var(--blue-300);
	font-weight: 500;
}

.hero__location {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: var(--gray-300);
	font-size: 0.95rem;

	@include media(768px) {
		justify-content: center;
	}
}

.hero__description {
	max-width: none;
	margin-top: 0.5rem;
	font-size: var(--fs-secondary);
	line-height: 1.6;
	color: var(--gray-300);

	@include media(768px) {
		text-align: left;
	}
}

/* Section Experience */
.experience__title {
	margin-bottom: 2rem;
	font-size: var(--fs-h3);
	font-weight: var(--fw-semibold);
}

.experience__timeline {
	position: relative;
	padding-left: 1.5rem;

	@include media(480px) {
		padding-left: 0.5rem;
	}
}

.experience__timeline::before {
	content: '';
	position: absolute;
	left: 0.75rem;
	top: 0;
	bottom: 0;
	width: 2px;
	background: linear-gradient(
		to bottom,
		var(--blue-300) 0%,
		rgba(var(--blue-rgb), 0.5) 50%,
		transparent 100%
	);

	@include media(480px) {
		left: 0;
	}
}

.experience__item {
	padding-left: 2rem;
	@include media(768px) {
		padding-left: 1.5rem;
	}
}
.experience__header {
	margin-bottom: 1rem;
}
.experience__position {
	position: relative;
	font-size: var(--fs-h6);
	font-weight: var(--fw-semibold);
	color: var(--white);
	margin: 0 0 0.5rem 0;
	@include media(768px) {
		font-size: var(--fs-secondary);
	}
	&::before {
		content: '';
		position: absolute;
		left: -1.5rem;
		top: 50%;
		transform: translate(0, -50%);
		width: 12px;
		height: 12px;
		background: var(--blue-300);
		border-radius: 50%;
		border: 3px solid var(--gray-900);
		box-shadow: 0 0 10px rgba(var(--blue-rgb), 0.5);

		@include media(480px) {
			left: -1.2rem;
			width: 10px;
			height: 10px;
		}
	}
}

.experience__company-period {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	flex-wrap: wrap;
	@include media(768px) {
		gap: 0.5rem;
	}
}

.experience__company {
	font-weight: var(--fw-medium);
	color: var(--blue-300);
	font-size: var(--fs-secondary);
	@include media(480px) {
		width: 100%;
	}
}

.experience__period {
	color: var(--gray-300);
	font-size: var(--fs-primary);
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		content: '';
		width: 4px;
		height: 4px;
		background: var(--gray-300);
		border-radius: 50%;
	}
}

.experience__duration {
	padding: 0.25rem 0.75rem;
	background: rgba(var(--blue-rgb), 0.1);
	color: var(--blue-300);
	border-radius: 20px;
	font-size: var(--fs-small);
	font-weight: var(--fw-medium);
	border: 1px solid rgba(var(--blue-rgb), 0.3);
}

.experience__tasks-title {
	margin-bottom: 0.75rem;
	font-size: var(--fs-primary);
	font-weight: var(--fw-medium);
	color: var(--gray-200);
}

.experience__tasks-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.experience__task-item {
	position: relative;
	padding-left: 1.5rem;
	margin-bottom: 0.75rem;
	color: var(--gray-300);
	line-height: 1.5;
	font-size: var(--fs-primary);

	@include media(480px) {
		padding-left: 1rem;
	}

	&::before {
		content: '';
		position: absolute;
		left: 0.5rem;
		top: 0.6rem;
		width: 4px;
		height: 4px;
		background: var(--blue-300);
		border-radius: 50%;
		@include media(480px) {
			left: 0.3rem;
		}
	}

	&:last-child {
		margin-bottom: 0;
	}
}

/* Section Technologies */
.technologies__title {
	position: relative;
	z-index: 1;
	margin-bottom: 2rem;
	font-size: var(--fs-h3);
	font-weight: var(--fw-semibold);

	@include media(768px) {
		padding: 1rem;
	}
}
.technologies__tags {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 1rem;
}

/* Section Tools */
.tools__title {
	margin-bottom: 2rem;
	font-size: var(--fs-h3);
	font-weight: var(--fw-semibold);
}
.tools__grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.5rem;

	@include media(768px) {
		grid-template-columns: 1fr;
		gap: 1rem;
	}
}

/* Section Certificates */
.certificates__title {
	margin-bottom: 1rem;
	font-size: var(--fs-h3);
	font-weight: var(--fw-semibold);
}
.certificates__content {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}

.certificates__btn {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.75rem 1rem;
	background: var(--gradient-btn);
	border: 1px solid rgba(var(--blue-rgb), 0.3);
	border-radius: 8px;
	color: var(--white);
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
	@include media(480px) {
		flex: 1;
		justify-content: center;
	}

	&:hover {
		background: var(--gradient-btn-hover);
		border-color: var(--blue-300);
		box-shadow: 0 5px 15px rgba(var(--blue-rgb), 0.2);

		svg {
			transform: translate(2px, -2px);
		}
	}

	svg {
		transition: transform 0.3s ease;
	}
}

/* Section Languages */
.languages__title {
	margin-bottom: 1rem;
	font-size: var(--fs-h3);
	font-weight: var(--fw-semibold);
}
.languages__grid {
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
	justify-content: flex-start;

	@include media(768px) {
		justify-content: center;
	}
}

.language__item {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 0.5rem;
}

.language__label {
	font-size: var(--fs-caption);
	color: var(--gray-300);
}

/* Certificate Modal */
.certificate__modal-wrapper {
	margin: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	cursor: pointer;
	&:focus {
		outline: 2px solid var(--blue-300);
		outline-offset: 2px;
	}
}

.certificate__modal-image {
	max-width: 100%;
	max-height: 90vh;
	height: auto;
	border-radius: var(--border-radius);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
</style>
