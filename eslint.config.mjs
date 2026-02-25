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
    rules: {
      // Proíbe importações relativas quando o alias @ está disponível
      "no-restricted-imports": [
        "warn",
        { patterns: ["../components/*", "../lib/*", "../types/*"] },
      ],
    },
  },
];

export default eslintConfig;
