<template>
	<main class="main-home">
		<div class="container-1440 home__container">
			<Sidebar />
			<div class="home__content">
				<section class="content__hero">
					<div class="hero__text-bg">
						<h1 class="hero__title">Welcome to Lang Eugen's Digital Space</h1>
						<p class="hero__description">
							Explore a portfolio showcasing Lang's expertise in HTML, CSS,
							JavaScript, and popular front-end frameworks like React and Vue.js. From
							responsive designs that adapt seamlessly to any device to interactive
							elements that engage users, Lang's work reflects a commitment to
							excellence and innovation.
							<br />
							<br />
							Whether you're seeking a modern website for your business, an engaging
							web application, or advice on front-end development best practices, Lang
							Eugen is your trusted partner. Join the digital revolution and elevate
							your online presence with Lang Eugen's expertise.
						</p>
					</div>
				</section>
				<section class="content__technologies">
					<h2 class="technologies__title">Technologies</h2>
					<div class="technologies__grid">
						<div>
							<h6>HTML5</h6>
							<p>
								HTML5 serves as the foundation for structuring and presenting
								content on the web, offering enhanced semantics, multimedia support,
								and interactive elements.
							</p>
						</div>
						<div>
							<h6>CSS3</h6>
							<p>
								CSS3 plays a crucial role in styling and designing web pages,
								providing advanced layout options, animations, and responsive design
								capabilities for improved user interfaces.
							</p>
						</div>
						<div>
							<h6>JavaScript</h6>
							<p>
								JavaScript is essential for adding dynamic functionality to web
								applications, enabling DOM manipulation, event handling, and
								asynchronous communication with servers.
							</p>
						</div>
						<div>
							<h6>Nuxt 3</h6>
							<p>
								Nuxt 3 is a powerful framework built on Vue.js, used for creating
								modern and high-performance server-side rendered (SSR) and static
								websites with streamlined development workflows.
							</p>
						</div>
						<div>
							<h6>Vuetify 3</h6>
							<p>
								Vuetify 3 is a comprehensive UI library for Vue.js projects,
								offering pre-designed components, themes, and responsive design
								features to enhance user interfaces.
							</p>
						</div>
						<div>
							<h6>React Native</h6>
							<p>
								React Native is utilized for developing cross-platform mobile
								applications using JavaScript and React, enabling efficient code
								sharing and native app experiences on iOS and Android.
							</p>
						</div>
						<div>
							<h6>WordPress</h6>
							<p>
								WordPress serves as a versatile platform for creating dynamic
								websites and blogs, providing customizable themes, plugins, and
								content management tools for easy publishing and management.
							</p>
						</div>
						<div>
							<h6>GitHub</h6>
							<p>
								GitHub plays a pivotal role in code collaboration and version
								control, facilitating efficient code management, collaboration among
								developers, and project tracking.
							</p>
						</div>
						<div>
							<h6>Vuex/Pinia</h6>
							<p>
								Vuex and Pinia are state management libraries for Vue.js, offering
								centralized state management, data sharing, and reactive updates to
								streamline application development and maintain data consistency.
							</p>
						</div>
					</div>
				</section>
			</div>
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
	padding-block: 1rem;
}
.home__content {
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
	width: 100%;
	margin-left: 20.125rem;
	padding: 1rem;
	border-radius: var(--border-radius);
}
.content__hero {
	padding: 3rem 2rem;
	width: 100%;
	background-image: url('/images/pixlr-6.webp');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	border-radius: var(--border-radius);
}
.hero__text-bg {
	padding: 1rem;
	width: max-content;
	background-image: linear-gradient(
		90deg,
		rgba(45, 45, 58, 0.7) 15%,
		rgba(45, 45, 58, 0.5) 50%,
		rgba(43, 43, 53, 0.5) 100%
	);
	border-radius: var(--border-radius);
}
.hero__title {
	max-width: 33rem;
	margin-bottom: 2rem;
	background: 50% 100% / 50% 50% no-repeat
		radial-gradient(ellipse at bottom, var(--light-blue), transparent, transparent);
	background-clip: text;
	color: transparent;
	text-align: left;
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
.hero__description {
	max-width: 35rem;
	font-size: 1.1rem;
	line-height: 120%;
}
.content__technologies {
}
.technologies__grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
}
</style>
