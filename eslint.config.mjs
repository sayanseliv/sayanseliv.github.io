import { fileURLToPath } from 'url';
import { dirname } from 'path';
import withNuxt from './.nuxt/eslint.config.mjs';
import vue from 'eslint-plugin-vue';
import functional from 'eslint-plugin-functional';
import parser from 'vue-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default withNuxt({
	plugins: {
		vue,
		functional,
	},
	languageOptions: {
		parser,
		parserOptions: {
			project: ['./tsconfig.json'],
			tsconfigRootDir: __dirname,
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
	},
});
