import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "unused-imports": (await import("eslint-plugin-unused-imports")).default,
    },
    rules: {
      // Remove unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Prevent unused variables
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Warn about console.log in production
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Prevent empty functions
      "no-empty-function": "warn",
      // Require return types on functions
      "@typescript-eslint/explicit-function-return-type": "off",
      // Prevent any type
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow empty interfaces for theme extension
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

export default eslintConfig;
