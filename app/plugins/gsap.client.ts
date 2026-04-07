import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (import.meta.client) {
	gsap.registerPlugin(ScrollTrigger);
}

export default defineNuxtPlugin(() => {
	return {
		provide: {
			gsap: gsap,
			ScrollTrigger: ScrollTrigger,
		},
	};
});
declare module 'nuxt/app' {
	interface NuxtApp {
		readonly $gsap: typeof gsap;
		readonly $ScrollTrigger: typeof ScrollTrigger;
	}
}
