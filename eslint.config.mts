import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
    plugins: {
      js,
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      // custom style rules
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },

  },
  {
    ignores: ['src/generated/**/*', 'dist/**'],
  },

  tseslint.configs.recommended,
]);

