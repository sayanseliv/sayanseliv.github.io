// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	nitro: { compressPublicAssets: true },
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/styles/_mixins.scss" as *;',
				},
			},
		},
		build: {
			cssCodeSplit: false,
		},
	},
	css: ['assets/styles/reset.scss', 'assets/styles/global.scss'],
});
