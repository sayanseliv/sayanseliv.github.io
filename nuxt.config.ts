// https://nuxt.com/docs/api/configuration/nuxt-config
const BASE_URL = 'https://sayanseliv.github.io';
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,
	components: {
		dirs: [
			{
				path: '~/components',
				pathPrefix: false,
			},
		],
	},
	nitro: {
		preset: 'github_pages',
		minify: true,
		compressPublicAssets: true,
		prerender: {
			routes: ['/'],
			crawlLinks: true,
		},
	},
	router: {
		options: {
			strict: false,
		},
	},
	experimental: {
		payloadExtraction: false,
	},
	features: { inlineStyles: false },
	modules: [
		'@nuxt/eslint',
		'@tresjs/nuxt',
		'@nuxtjs/sitemap',
		'@nuxt/test-utils/module',
		'nuxt-github-pages',
		'@nuxtjs/robots',
	],
	githubPages: {
		enabled: true,
		outputDirs: ['.output/public'],
		verbose: true,
		canonicalUrls: true,
		trailingSlash: false,
	},
	robots: {
		enabled: true,
		groups: [{ userAgent: ['*'], allow: ['/'], disallow: [] }],
		allow: ['/'],
		sitemap: ['https://sayanseliv.github.io/sitemap.xml'],
		header: false,
		metaTag: false,
		blockNonSeoBots: false,
		blockAiBots: false,
		mergeWithRobotsTxtPath: false,
		credits: false,
		debug: false,
	},
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
		optimizeDeps: {
			include: [
				'three',
				'@tresjs/cientos',
				'@vue/devtools-core',
				'@vue/devtools-kit',
				'gsap',
				'gsap/ScrollTrigger',
			],
		},
	},
	esbuild: {
		options: { drop: ['console', 'debugger'] },
	},
	app: {
		baseURL: '/',
		head: {
			htmlAttrs: { lang: 'en' },
			title: 'Lang Eugen – Front-End Developer | Vue, Nuxt & React',
			viewport: 'width=device-width, initial-scale=1.0, user-scalable=yes',
			meta: [
				{ 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' },
				{ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
				{ name: 'robots', content: 'index, follow' },
				{ name: 'author', content: 'Lang Eugen' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'theme-color', content: '#ffffff' },
				{
					key: 'description',
					name: 'description',
					content:
						'Front-end developer skilled in Vue, Nuxt, React, React Native & WordPress. Explore creative web and mobile solutions by Lang Eugen.',
				},
				{
					key: 'twitter-card',
					name: 'twitter:card',
					content: 'summary_large_image',
				},
				{
					key: 'twitter-image',
					name: 'twitter:image',
					content: '/cv_photo.jpeg',
				},
				{
					key: 'twitter:description',
					name: 'twitter:description',
					content:
						'Front-end developer skilled in Vue, Nuxt, React, React Native & WordPress. Explore creative web and mobile solutions by Lang Eugen.',
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
					content: 'Lang Eugen – Front-End Developer | Vue, Nuxt & React',
				},
				{
					key: 'og-desc',
					property: 'og:description',
					content:
						'Front-end developer skilled in Vue, Nuxt, React, React Native & WordPress. Explore creative web and mobile solutions by Lang Eugen.',
				},
				{
					key: 'og-image',
					property: 'og:image',
					content: '/cv_photo.jpeg',
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
				{ rel: 'canonical', href: `${BASE_URL}/` },
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/favicon.svg',
				},
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png',
				},
				{
					rel: 'manifest',
					href: '/site.webmanifest',
				},
			],
			script: [{ src: '/js/ParticleNetwork.js', defer: true }],
		},
	},
	css: ['assets/styles/reset.scss', 'assets/styles/global.scss'],
	site: {
		url: 'https://sayanseliv.github.io/',
		name: 'Lang Eugen - Front-End Developer',
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
	runtimeConfig: {
		public: {
			siteUrl: BASE_URL,
		},
	},
	tres: {
		glsl: true,
	},
	typescript: {
		typeCheck: true,
		strict: true,
		tsConfig: {
			compilerOptions: {
				types: ['vitest/globals'],
				paths: {
					'@types': ['../types/index.ts'],
					'@types/*': ['../types/*'],
				},
			},
			include: ['../types/**/*'],
		},
	},
	compatibilityDate: '2024-10-11',
});
