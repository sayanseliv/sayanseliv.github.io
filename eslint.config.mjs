import { fileURLToPath } from 'url';
import { dirname } from 'path';
import withNuxt from './.nuxt/eslint.config.mjs';
import vue from 'eslint-plugin-vue';
import functional from 'eslint-plugin-functional';
import vueA11y from 'eslint-plugin-vuejs-accessibility';
import parser from 'vue-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default withNuxt({
	plugins: {
		vue,
		functional,
		'vuejs-accessibility': vueA11y,
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
		'functional/no-expression-statement': 'off',
		'functional/prefer-readonly-type': 'off',
		'functional/immutable-data': 'off',
		'vuejs-accessibility/click-events-have-key-events': 'error',

		'vuejs-accessibility/label-has-for': [
			'error',
			{
				required: {
					some: ['nesting', 'id'],
				},
			},
		],
		'vuejs-accessibility/form-control-has-label': 'error',
		'vuejs-accessibility/alt-text': 'error',
		'prefer-const': 'off',
	},
});
