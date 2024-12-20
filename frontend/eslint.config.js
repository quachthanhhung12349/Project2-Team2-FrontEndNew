// eslint.config.js
export default [
    {
        languageOptions: {
            parser: '@typescript-eslint/parser', // The parser for TypeScript
            parserOptions: {
                ecmaVersion: 2020, // Support for modern JavaScript syntax
                sourceType: 'module', // Support for ES modules
            },
        },
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended', // TypeScript rules
        ],
        plugins: ['@typescript-eslint'], // TypeScript plugin
        env: {
            browser: true,
            node: true,
            es6: true,
        },
        rules: {
            // You can define custom rules here
        },
    },
];
