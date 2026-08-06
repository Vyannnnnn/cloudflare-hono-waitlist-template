import eslintPluginAstro from "eslint-plugin-astro";

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["*.astro", "*.ts", "*.tsx"],
    rules: {
      // ...
      processor: "astro/client-side-ts",
      rules: {
        // add more rules here, such as:
        // "no-console": "warn",
      },
    },
  },
];
