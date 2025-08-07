// https://nuxt.com/docs/api/configuration/nuxt-config
const BASE_URL = 'https://sayanseliv.github.io';
export default defineNuxtConfig({
	devtools: { enabled: true },

	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],

	nitro: {
		compressPublicAssets: true,
		// prerender: {
		// 	crawlLinks: false,
		// },
	},
	router: {
		options: {
			strict: true,
		},
	},
	experimental: {
		payloadExtraction: false,
	},
	ssr: true,
	features: { inlineStyles: false },
	modules: ['@nuxt/eslint', '@tresjs/nuxt', '@nuxtjs/sitemap', '@nuxt/test-utils/module'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/styles/_mixins.scss" as *;',
					silenceDeprecations: ['legacy-js-api'],
				},
			},
		},
		build: {
			cssCodeSplit: true,
		},
	},
	app: {
		baseURL: '/',
		head: {
			htmlAttrs: { lang: 'en' },
			title: 'Lang Eugen - Front-End Developer | Vue, Nuxt, React Native, React, WordPress',
			viewport: 'width=device-width, initial-scale=1.0, user-scalable=yes',
			meta: [
				{ 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' },
				{ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
				{ name: 'robots', content: 'index, follow' },
				{ name: 'author', content: 'Lang Eugen' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'msapplication-TileColor', content: '#da532c' },
				{ name: 'msapplication-config', content: '/browserconfig.xml' },
				{ name: 'theme-color', content: '#ffffff' },
				{
					key: 'description',
					name: 'description',
					content:
						'Welcome to the digital showcase of Lang Eugen, a passionate front-end developer specializing in Vue.js, Nuxt.js, React, React Native, and WordPress. Explore innovative web and mobile solutions. Crafted with creativity and expertise in Vue, Nuxt, React Native, and WordPress development.',
				},
				{
					key: 'twitter-card',
					name: 'twitter:card',
					content: 'summary_large_image',
				},
				{
					key: 'twitter-image',
					name: 'twitter:image',
					content: `${BASE_URL + '/cv_photo.jpeg'}`,
				},
				{
					key: 'twitter:description',
					name: 'twitter:description',
					content:
						'Welcome to the digital showcase of Lang Eugen, a passionate front-end developer specializing in Vue.js, Nuxt.js, React, React Native, and WordPress. Explore innovative web and mobile solutions. Crafted with creativity and expertise in Vue, Nuxt, React Native, and WordPress development.',
				},
				{
					key: 'og:site-name',
					property: 'og:site_name',
					content: 'Lang Eugen - Front-End',
				},
				{
					key: 'og-url',
					property: 'og:url',
					content: BASE_URL,
				},
				{ key: 'og-type', property: 'og:type', content: 'website' },
				{
					key: 'og-title',
					property: 'og:title',
					content:
						'Lang Eugen - Front-End Developer | Vue, Nuxt, React Native, React, WordPress',
				},
				{
					key: 'og-desc',
					property: 'og:description',
					content:
						'Welcome to the digital showcase of Lang Eugen, a passionate front-end developer specializing in Vue.js, Nuxt.js, React, React Native, and WordPress. Explore innovative web and mobile solutions. Crafted with creativity and expertise in Vue, Nuxt, React Native, and WordPress development.',
				},
				{
					key: 'og-image',
					property: 'og:image',
					content: `${BASE_URL + '/cv_photo.jpeg'}`,
				},
				{ key: 'og-image-width', property: 'og:image:width', content: '200' },
				{ key: 'og-image-height', property: 'og:image:height', content: '200' },
				{
					name: 'google-site-verification',
					content: 'BQqA4VYhaSJbBufRXh5jChqq02fRj7_2JxnKQJTSCII',
				},
			],
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Barlow&family=Roboto:wght@400;500;700&display=swap',
					media: 'print',
					onload: "this.media='all'",
				},
				{ rel: 'canonical', href: BASE_URL },
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					type: 'image/x-icon',
					href: '/apple-touch-icon.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: '/favicon-32x32.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: '/favicon-16x16.png',
				},
				{
					rel: 'manifest',
					href: '/site.webmanifest',
				},
				{
					rel: 'mask-icon',
					href: '/safari-pinned-tab.svg',
					color: '#5bbad5',
				},
			],
			script: [{ src: '/js/ParticleNetwork.js', defer: true }],
		},
	},
	css: ['assets/styles/reset.scss', 'assets/styles/global.scss'],
	site: {
		url: 'https://sayanseliv.github.io',
		name: 'Lang Eugen - Front-End Developer',
		trailingSlash: false,
	},
	sitemap: {
		enabled: true,
		autoLastmod: true,
		sortEntries: true,
		debug: false,
		credits: false,
		xsl: false,
		discoverImages: true,
		defaults: {
			changefreq: 'monthly',
			priority: 0.8,
		},
	},

	compatibilityDate: '2024-10-11',
});
