import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    ignores: ['dist', '__tests__', '**.config.{js,mjs,cjs,ts}', 'coverage'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: [
      'js/recommended',
      tseslint.configs.recommendedTypeChecked,
      eslintPluginUnicorn.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },
]);
