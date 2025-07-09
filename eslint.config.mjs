import withNuxt from './.nuxt/eslint.config.mjs';
import vue from 'eslint-plugin-vue';

export default withNuxt({
	plugins: {
		vue,
	},
	rules: {
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always', // <img /> → разрешить
					normal: 'always', // <div />
					component: 'always', // <MyComponent />
				},
				svg: 'always',
				math: 'always',
			},
		],
	},
});
