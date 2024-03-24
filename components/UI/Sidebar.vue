<template>
	<aside class="aside">
		<figure class="aside__avatar">
			<img src="/cv_photo.jpeg" alt="Lang Eugen avatar" class="aside__image" />
			<figcaption class="aside__figcaption">
				Lang Eugen
				<p class="aside__position">Front-end developer</p>
			</figcaption>
		</figure>
		<section class="aside__scrollable">
			<ul class="aside__info">
				<li class="info__item">
					<h6>Residence:</h6>
					<span>Ukraine</span>
				</li>
				<li class="info__item">
					<h6>City:</h6>
					<span>Odesa</span>
				</li>
				<li class="info__item">
					<h6>Age:</h6>
					<span>{{ age }}</span>
				</li>
			</ul>
			<div class="aside__languages">
				<div>
					<CircleProgress
						:show-percent="true"
						:percent="100"
						:size="60"
						:borderBgWidth="2"
						:borderWidth="2"
						fill-color="#48abed"
						emptyColor="#191923" />
					<span class="aside__language">Ukranian</span>
				</div>
				<div>
					<CircleProgress
						:show-percent="true"
						:percent="55"
						:size="60"
						:borderBgWidth="2"
						:borderWidth="2"
						fill-color="#48abed"
						emptyColor="#191923" />
					<span class="aside__language">English</span>
				</div>
				<div>
					<CircleProgress
						:show-percent="true"
						:percent="45"
						:size="60"
						:borderBgWidth="2"
						:borderWidth="2"
						fill-color="#48abed"
						emptyColor="#191923" />
					<span class="aside__language">German</span>
				</div>
				<div>
					<CircleProgress
						:show-percent="true"
						:percent="39"
						:size="60"
						:borderBgWidth="2"
						:borderWidth="2"
						fill-color="#48abed"
						emptyColor="#191923" />
					<span class="aside__language">Italian</span>
				</div>
			</div>
			<div class="aside__skills">
				<ProgressBar label="Html" :targetProgress="100" />
				<ProgressBar label="Css" :targetProgress="100" />
				<ProgressBar label="Js" :targetProgress="75" />
				<ProgressBar label="Php" :targetProgress="45" />
				<ProgressBar label="Wordpress" :targetProgress="56" />
				<ProgressBar label="Nuxt" :targetProgress="100" />
				<ProgressBar label="React Native" :targetProgress="100" />
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
					<button @click="showCertificate('basic.png')" class="aside__btn">Basic</button>
					<button @click="showCertificate('pro.png')" class="aside__btn">Pro</button>
					<button @click="showCertificate('advance.jpg')" class="aside__btn">
						Advance
					</button>
				</div>
			</div>
		</section>
		<nav class="aside__footer">
			<ul>
				<li>
					<NuxtLink href="https://www.facebook.com/Evgenyyyi" external target="_blank">
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
						target="_blank">
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
					<NuxtLink to="https://github.com/sayanseliv" external target="_blank">
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
		</nav>
		<DialogModal v-model="isShowCertificate" animation="fade">
			<template v-slot="{ onClose }">
				<figure @click="onClose" class="aside__document-wrapper">
					<img class="aside__document" :src="'/certificates/' + docPath" />
				</figure>
			</template>
		</DialogModal>
	</aside>
</template>

<script>
export default {
	name: 'Sidebar',
	data() {
		return {
			birthDate: '1985-03-27',
			isShowCertificate: false,
			docPath: null,
		};
	},
	computed: {
		age() {
			const currentDate = new Date();
			const birthDateTime = new Date(this.birthDate);

			let age = currentDate.getFullYear() - birthDateTime.getFullYear();

			if (
				currentDate.getMonth() < birthDateTime.getMonth() ||
				(currentDate.getMonth() === birthDateTime.getMonth() &&
					currentDate.getDate() < birthDateTime.getDate())
			) {
				age--;
			}

			return age;
		},
	},
	methods: {
		showCertificate(docName) {
			this.isShowCertificate = true;
			this.docPath = docName;
		},
	},
};
</script>

<style lang="scss" scoped>
.aside {
	position: fixed;
	width: 18.125rem;
	height: calc(100svh - 5rem);
	padding: 13.05rem 0.9375rem 3rem;
	background-color: var(--bg-secondary-color);
	border-radius: var(--border-radius);
}
.aside__avatar {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	max-height: max-content;
	padding-block: 0.9375rem;
	background: linear-gradient(159deg, rgba(37, 37, 50, 0.98) 0%, rgba(35, 35, 45, 0.98) 100%);
}
.aside__image {
	width: 100%;
	height: 100%;
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
	height: 100%;
	padding: 0.9375rem;
	overflow: auto;
	-webkit-transform: translate3d(0, 0, 0);
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
	margin: 5rem;
	height: calc(100svh - 10rem);
	width: calc(100vw - 10rem);
}
.aside__document {
	width: 100%;
	height: 100%;
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
</style>
