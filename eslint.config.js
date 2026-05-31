import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist", "build", "node_modules", ".expo", "android", "ios"]),

  js.configs.recommended,

  prettier,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",

      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-native": reactNative,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],

      "no-debugger": "warn",

      eqeqeq: ["error", "always"],

      curly: ["warn", "all"],

      "prefer-const": "warn",
      "no-unused-vars": "off",

      "unused-imports/no-unused-imports": "warn",

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "warn",

      "simple-import-sort/exports": "warn",

      "react/react-in-jsx-scope": "off",

      "react/jsx-uses-react": "off",

      "react/jsx-uses-vars": "error",

      "react/prop-types": "off",

      "react/jsx-no-undef": "error",

      "react-hooks/rules-of-hooks": "error",

      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      "react-native/no-inline-styles": "warn",

      "react-native/no-unused-styles": "warn",

      "react-native/split-platform-components": "warn",

      "no-undef": "error",
    },
  },
]);
