module.exports = {
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};
