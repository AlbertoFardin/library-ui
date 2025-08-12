module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:storybook/recommended",
  ],
  env: {
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "prettier",
    "react-hooks",
    "jsx-a11y",
    "react",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "detect",
    },
  },
  rules: {
    "import/named": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "react/no-children-prop": "off",
    "react/prop-types": "off",
    "react/jsx-no-bind": "warn",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "import/no-named-as-default": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/media-has-caption": "off",
    "react/react-in-jsx-scope": "off",
    "import/order": [
      "warn",
      {
        groups: ["external", "internal", "builtin"],
        "newlines-between": "never",
      },
    ],
  },
};
