<template>
	<aside class="aside">
		<transition name="fade-scale">
			<div v-show="modelValue" class="aside__overlay" @click="toggle" />
		</transition>
		<div :class="['aside__toggle', isHidden]">
			<input id="checkboxAside" :checked="modelValue" type="checkbox" />
			<label for="checkboxAside" @click="toggle" />
		</div>
		<div class="aside__container">
			<figure class="aside__avatar">
				<img
					src="/images/thinking.webp"
					alt="Lang Eugen avatar"
					loading="lazy"
					class="aside__image" />
				<figcaption class="aside__figcaption">
					Lang Eugen
					<p class="aside__position">Front-end developer</p>
				</figcaption>
			</figure>
			<section class="aside__scrollable">
				<div>
					<ul class="aside__info">
						<li class="info__item">
							<h6>Country:</h6>
							<span>Ukraine</span>
						</li>
						<li class="info__item">
							<h6>City:</h6>
							<span>Odesa</span>
						</li>
					</ul>

					<div class="aside__languages">
						<div v-for="(lang, i) in languages" :key="i">
							<CircleProgress v-bind="lang.progress" />
							<span class="aside__language">{{ lang.label }}</span>
						</div>
					</div>

					<div class="aside__skills">
						<ProgressBar
							v-for="(skill, i) in skills"
							:key="i"
							:label="skill.label"
							:target-progress="skill.percent" />
					</div>
					<ul class="aside__technologies">
						<li>Bootstrap, Vuetify</li>
						<li>Sass, SCSS</li>
						<li>Webpack, Vite</li>
						<li>GIT knowledge</li>
						<li>Android Studio, Xcode</li>
					</ul>
					<div class="aside__certificates">
						<h6>Certificates:</h6>
						<div class="aside__btns">
							<button class="aside__btn" @click="showCertificate('basic.png')">
								Basic
							</button>
							<button class="aside__btn" @click="showCertificate('pro.png')">
								Pro
							</button>
							<button class="aside__btn" @click="showCertificate('advance.jpg')">
								Advance
							</button>
						</div>
					</div>
				</div>
			</section>

			<nav class="aside__footer">
				<ul>
					<li>
						<NuxtLink
							href="https://www.facebook.com/Evgenyyyi"
							external
							target="_blank"
							aria-label="Facebook profile">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								width="15"
								height="15"
								viewBox="0 0 24 23"
								version="1.1"
								class="aside__social">
								<g id="surface1">
									<path
										style="
											stroke: none;
											fill-rule: nonzero;
											fill: rgb(3.137255%, 40%, 100%);
											fill-opacity: 1;
										"
										d="M 23.988281 11.496094 C 23.988281 5.144531 18.617188 0 11.992188 0 C 5.371094 0 0 5.144531 0 11.496094 C 0 16.886719 3.871094 21.40625 9.097656 22.648438 L 9.097656 15.007812 L 6.625 15.007812 L 6.625 11.496094 L 9.097656 11.496094 L 9.097656 9.980469 C 9.097656 6.070312 10.945312 4.253906 14.953125 4.253906 C 15.710938 4.253906 17.023438 4.398438 17.558594 4.539062 L 17.558594 7.726562 C 17.277344 7.695312 16.785156 7.683594 16.171875 7.683594 C 14.207031 7.683594 13.445312 8.394531 13.445312 10.253906 L 13.445312 11.496094 L 17.363281 11.496094 L 16.691406 15.007812 L 13.445312 15.007812 L 13.445312 22.90625 C 19.386719 22.21875 23.988281 17.371094 23.988281 11.496094 " />
									<path
										style="
											stroke: none;
											fill-rule: nonzero;
											fill: rgb(100%, 100%, 100%);
											fill-opacity: 1;
										"
										d="M 16.691406 15.007812 L 17.363281 11.496094 L 13.445312 11.496094 L 13.445312 10.253906 C 13.445312 8.394531 14.207031 7.683594 16.171875 7.683594 C 16.785156 7.683594 17.277344 7.695312 17.558594 7.726562 L 17.558594 4.539062 C 17.023438 4.398438 15.710938 4.253906 14.953125 4.253906 C 10.945312 4.253906 9.097656 6.070312 9.097656 9.980469 L 9.097656 11.496094 L 6.625 11.496094 L 6.625 15.007812 L 9.097656 15.007812 L 9.097656 22.648438 C 10.023438 22.871094 10.996094 22.988281 11.992188 22.988281 C 12.484375 22.988281 12.96875 22.960938 13.445312 22.90625 L 13.445312 15.007812 Z M 16.691406 15.007812 " />
								</g>
							</svg>
						</NuxtLink>
					</li>
					<li>
						<NuxtLink
							href="https://www.linkedin.com/in/eugen-lang-18475b143/"
							external
							target="_blank"
							aria-label="LinkedIn profile">
							<svg
								height="15"
								viewBox="0 0 72 72"
								width="15"
								class="aside__social"
								xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fill-rule="evenodd">
									<path
										d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
										fill="#007EBB" />
									<path
										d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
										fill="#FFF" />
								</g>
							</svg>
						</NuxtLink>
					</li>
					<li>
						<NuxtLink
							href="https://github.com/sayanseliv"
							external
							target="_blank"
							aria-label="GitHub profile">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#FFF"
								width="15"
								height="15"
								class="aside__social">
								<path
									d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.262.82-.58 0-.288-.01-1.044-.015-2.05-3.338.724-4.042-1.61-4.042-1.61C4.46 18.46 3.68 18 3.68 18c-1.122-.766.086-.75.086-.75 1.242.086 1.896 1.28 1.896 1.28 1.104 1.895 2.902 1.344 3.62 1.026.112-.794.43-1.344.783-1.654-2.74-.31-5.606-1.37-5.606-6.1 0-1.348.48-2.448 1.28-3.307-.128-.31-.556-1.566.122-3.26 0 0 1.035-.33 3.4 1.26a11.61 11.61 0 0 1 3.06-.41c1.036.007 2.08.138 3.06.41 2.363-1.593 3.4-1.26 3.4-1.26.678 1.694.25 2.95.122 3.26.795.86 1.278 1.96 1.278 3.307 0 4.738-2.87 5.786-5.625 6.086.443.38.834 1.13.834 2.274 0 1.642-.015 2.96-.015 3.365 0 .32.216.696.825.577C20.565 21.798 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
							</svg>
						</NuxtLink>
					</li>
				</ul>
				<div class="aside__scroll">
					<p class="aside__scroll-text">Scroll down</p>
				</div>
			</nav>
		</div>

		<AppModal v-model="isShowCertificate" animation="fade">
			<template #default="{ onClose }">
				<figure class="aside__document-wrapper" @click="onClose">
					<img class="aside__document" :src="'/certificates/' + docPath" />
				</figure>
			</template>
		</AppModal>
	</aside>
</template>

<script setup lang="ts">
import data from '@/static/data.json';
import { computed, ref } from 'vue';
defineOptions({
	name: 'AppSidebar',
});

const languages = data.languages;
const skills = data.skills;

const props = defineProps<{
	readonly modelValue: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

const getAsideClass = (visible: boolean): Record<string, boolean> => {
	return {
		aside__hidden: !visible,
	};
};

const isHidden = computed(() => getAsideClass(props.modelValue));

const toggle = () => {
	emit('update:modelValue', !props.modelValue);
};

const isShowCertificate = ref(false);
const docPath = ref<string | null>(null);

const showCertificate = (docName: string) => {
	isShowCertificate.value = true;
	docPath.value = docName;
};
</script>

<style lang="scss" scoped>
.aside {
	position: fixed;
	z-index: 999;
}
.aside__overlay {
	position: fixed;
	inset: 0;
	height: 100dvh;
	width: 100vw;
	background: rgba(17, 25, 39, 0.2);
	backdrop-filter: blur(3px);
}
.fade-scale-enter-active,
.fade-scale-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
	opacity: 0;
	transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
	opacity: 1;
	transform: scale(1);
}

.aside__container {
	position: absolute;
	left: 0;
	width: 18.125rem;
	height: calc(100svh - 5rem);
	padding: 13.05rem 0.9375rem 3rem;
	background-color: var(--bg-secondary-color);
	border-radius: var(--border-radius);
	overflow: hidden;
	transition: left 0.3s;
	@include media(640px) {
		width: calc(100vw - 32px);
	}
}

.aside__toggle {
	z-index: 1;
	position: absolute;
	top: 0;
	right: -0.1rem;
	display: none;
	width: 1.3rem;
	height: 1.3rem;
	transition: right 0.3s;
	@include media(992px) {
		display: block;
	}
	@include media(640px) {
		position: fixed;
		top: 0.9rem;
		left: 16px;
		right: auto;
	}
	& > input {
		display: none;
		visibility: hidden;
	}
	& > label {
		display: flex;
		border-radius: 50%;
		width: 100%;
		height: 100%;
		cursor: pointer;
		background: linear-gradient(159deg, #2d2d3a 0%, #2b2b35 100%);
		@include media(640px) {
			background: var(--white);
		}
		&::after {
			content: '\2026';
			position: absolute;
			top: 5%;
			left: 45.7%;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: rotate(90deg);
			width: min-content;
			height: min-content;
			@include media(640px) {
				color: var(--bg-secondary-color);
			}
		}
	}
	&:not(.aside__hidden) {
		right: -20.125rem;
	}
}
.aside__hidden {
	& + .aside__container {
		@include media(992px) {
			left: -20.125rem;
		}
		@include media(640px) {
			left: -100vw;
		}
	}
}
.aside__avatar {
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	max-height: max-content;
	padding-block: 0.9375rem;
	background: var(--bg-secondary-color);
	border-bottom: 1px solid var(--white);
}
.aside__image {
	width: 100%;
	height: auto;
	aspect-ratio: 1 / 1;
	max-width: 8rem;
	max-height: 8rem;
	margin-bottom: 0.5rem;
	object-fit: cover;
	border-radius: 50%;
}
.aside__position {
	margin-top: var(--insent-sm);
	color: var(--tc-secondary);
}
.aside__scrollable {
	position: relative;
	z-index: 2;
	height: 100%;
	padding: 0.9375rem;
	overflow: auto;
	-webkit-transform: translate3d(0, 0, 0);

	touch-action: pan-y;
	overscroll-behavior: contain;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
}
.aside__info {
	padding-block: 0.9375rem;
	border-bottom: 1px solid var(--tc-secondary);
}
.info__item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: var(--fs-caption);
	&:not(:last-child) {
		margin-bottom: var(--insent-sm);
	}
	& > h6 {
		font-size: var(--fs-caption);
		font-weight: var(--fw-medium);
	}
	& > span {
		color: var(--tc-secondary);
	}
}
.aside__languages {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-block: 0.9375rem;
	gap: 1rem 2rem;
	text-align: center;
	border-bottom: 1px solid var(--tc-secondary);
}
.aside__language {
	padding-top: var(--insent-sm);
	font-size: var(--fs-caption);
}
.aside__skills {
	padding-block: 0.9375rem;
	border-bottom: 1px solid var(--tc-secondary);
}
.aside__technologies {
	padding-block: 0.9375rem;
	color: var(--tc-secondary);
	border-bottom: 1px solid var(--tc-secondary);
	& > li {
		margin-block: 0.2rem;
		&::before {
			content: '\2713';
			color: var(--light-blue);
			padding-right: 5px;
		}
	}
}
.aside__certificates {
	padding-block: 0.9375rem;
	& > h6 {
		font-size: var(--fs-primary);
		font-weight: var(--fw-medium);
	}
}
.aside__document-wrapper {
	margin: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100svh;
}
.aside__document {
	max-width: 100%;
	height: auto;
	display: block;
	object-fit: cover;
	margin: 0 auto;
}
.aside__btns {
	margin-top: 0.9375rem;
	display: flex;
	justify-content: space-around;
}
.aside__btn {
	display: flex;
	height: 2rem;
	padding-inline: 0.5rem;
	align-items: center;
	position: relative;
	border: none;
	background-color: transparent;
	cursor: pointer;
	outline: none;
	color: var(--white);
	&::after,
	&::before {
		content: '';
		display: block;
		position: absolute;
		width: 20%;
		height: 20%;
		border: 0.001rem solid;
		border-radius: 2px;
		transition: width 0.6s ease, height 0.6s ease, background-color 0.6s ease 0.3s;
		z-index: -1;
	}
	&::after {
		bottom: 0;
		right: 0;
		border-top-color: transparent;
		border-left-color: transparent;
		border-bottom-color: var(--light-blue);
		border-right-color: var(--light-blue);
	}
	&::before {
		top: 0;
		left: 0;
		border-bottom-color: transparent;
		border-right-color: transparent;
		border-top-color: var(--light-blue);
		border-left-color: var(--light-blue);
	}
	&:hover::after,
	&:hover::before {
		width: 100%;
		height: 100%;
		background-color: var(--light-blue);
	}
}
.aside__footer {
	position: relative;
	& > ul {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		height: 3rem;
		width: 100%;
	}
}
.aside__social {
	width: 20px;
	height: 20px;
	transition: transform 0.3s;
	&:hover {
		transform: scale(1.1);
	}
}
.aside__scroll {
	position: absolute;
	bottom: 500%;
	right: calc(-0.9375rem / 2);
	width: 100%;
}
.aside__scroll-text {
	margin-left: auto;
	font-size: var(--fs-caption);
	writing-mode: vertical-rl;
	text-orientation: upright;
	white-space: nowrap;
	pointer-events: none;
}
.aside__scroll-text::after {
	content: '\2193';
	display: inline-block;
	animation: bounce 1s ease-in-out infinite;
}
@keyframes bounce {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(5px);
	}
}
</style>
