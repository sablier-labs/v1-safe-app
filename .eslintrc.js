module.exports = {
  extends: "airbnb-typescript-prettier",
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
      },
    ],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "prefer-destructuring": "off",
    "prefer-template": "off",
    "react/destructuring-assignment": "off",
    "spaced-comment": ["error", "always", { markers: ["/", "**"] }],
  },
};
