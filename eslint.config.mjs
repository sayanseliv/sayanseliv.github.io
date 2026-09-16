import withNuxt from './.nuxt/eslint.config.mjs';
import functional from 'eslint-plugin-functional';
import vueA11y from 'eslint-plugin-vuejs-accessibility';

export default withNuxt(
	// app/games/space-defender: ported PixiJS game engine, kept close to its original source — not held to project lint conventions
	{ ignores: ['eslint.config.mjs', 'app/games/space-defender/**'] },
	{
		plugins: {
			functional,
			'vuejs-accessibility': vueA11y,
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
	},
);
