module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "eslint:recommended", // -
    "airbnb", // +
    "airbnb-typescript", // +
    "airbnb/hooks", // +
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: "./tsconfig.json", // +
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": 0, // +   use for React 18
    "eslint-disable react/jsx-key": 0, // + save if enclosed by React.Children.toArray
    "react-hooks/exhaustive-deps": 0, // + for zero dependency, only trigger when mounted
  },
};
