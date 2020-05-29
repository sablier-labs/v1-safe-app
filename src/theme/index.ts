import { DefaultTheme } from "styled-components";
import { theme as gnosisTheme } from "@gnosis.pm/safe-react-components";

const theme: DefaultTheme = gnosisTheme;
theme.colors = {
  ...theme.colors,
  primary: "#02d396",
  primaryHover: "#00c58a",
  primaryLight: "#d5f6ed",
  secondary: "#966aed",
  secondaryHover: "#8253dd",
  secondaryLight: "#ebe1fb",
};

export default theme;
