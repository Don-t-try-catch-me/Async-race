import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: [
      'js/recommended',
      tseslint.configs.recommended,
      eslintPluginUnicorn.configs.recommended,
    ],
    languageOptions: { globals: globals.browser },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
  },
]);
