const properties = require("known-css-properties").all;

module.exports = {
  customSyntax: "@stylelint/postcss-css-in-js",
  extends: ["stylelint-config-recommended", "stylelint-prettier/recommended", "stylelint-config-styled-components"],
  plugins: ["stylelint-order"],
  rules: {
    // See https://github.com/hudochenkov/stylelint-order/issues/63
    "order/properties-order": ["-styled-mixin0", ...properties],
  },
};
