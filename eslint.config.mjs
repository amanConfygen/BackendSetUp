// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: __dirname

            // tsconfigRootDir: import.meta.dirname
        }
    },
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, eslintConfigPrettier],
    rules: {
        // error ,off
        'no-console': 'error',
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        // '@typescript-eslint/no-redundant-type-constituents': 'off' // Disable the rule
    }
})

