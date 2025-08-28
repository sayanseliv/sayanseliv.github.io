import { fileURLToPath } from 'url';
import { dirname } from 'path';
import withNuxt from './.nuxt/eslint.config.mjs';
import vue from 'eslint-plugin-vue';
import functional from 'eslint-plugin-functional';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import parser from 'vue-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default withNuxt({
	plugins: {
		vue,
		functional,
		'jsx-a11y': jsxA11y,
	},
	languageOptions: {
		parser,
		parserOptions: {
			project: ['./tsconfig.json'],
			tsconfigRootDir: __dirname,
			sourceType: 'module',
			ecmaVersion: 'latest',
		},
	},
	rules: {
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always', // <img />
					normal: 'always', // <div />
					component: 'always', // <MyComponent />
				},
				svg: 'always',
				math: 'always',
			},
		],
		'functional/no-let': [
			'warn',
			{
				allowInForLoopInit: true,
			},
		],
		'functional/no-expression-statement': 'off',
		'functional/prefer-readonly-type': 'off',
		'functional/immutable-data': [
			'warn',
			{
				ignoreAccessorPattern: ['**.value'],
			},
		],
		'jsx-a11y/anchor-has-content': 'error',
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['NuxtLink'],
				specialLink: ['to'],
				aspects: ['noHref', 'invalidHref', 'preferButton'],
			},
		],
		'jsx-a11y/click-events-have-key-events': 'warn',
		'jsx-a11y/no-static-element-interactions': 'warn',
	},
});
