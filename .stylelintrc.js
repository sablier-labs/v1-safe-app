const properties = require("known-css-properties").all;

module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-prettier/recommended", "stylelint-config-styled-components"],
  plugins: ["stylelint-order"],
  processors: ["stylelint-processor-styled-components"],
  rules: {
    /* See https://github.com/hudochenkov/stylelint-order/issues/63 */
    "order/properties-order": ["-styled-mixin0", ...properties],
  },
};
