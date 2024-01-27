/** @type {import("eslint").Linter.Config} */
module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'eslint-config-turbo'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	ignorePatterns: ['./node_modules/**', './dist/**'],
	plugins: ['@typescript-eslint', 'turbo'],
	rules: {
		'indent': [
			'error',
			'tab',
			{
				SwitchCase: 1
			}
		],
		'linebreak-style': ['error', 'windows'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'no-unused-vars': 'off',
		'curly': 'warn',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'max-len': [
			'warn',
			{
				code: 120,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
				tabWidth: 4
			}
		],
		'comma-dangle': 'error',
		'comma-style': ['error', 'last'],
		'comma-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'object-curly-spacing': ['error', 'always'],
		'object-curly-newline': ['error', { consistent: true }],
		'array-bracket-spacing': ['error', 'never'],
		'array-bracket-newline': ['error', 'consistent'],
		'quote-props': ['error', 'consistent-as-needed'],
		'turbo/no-undeclared-env-vars': ['error', {
			allowList: ['TELEGRAM_TOKEN']
		}]
	}
}
