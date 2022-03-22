import { theme as gnosisTheme } from "@gnosis.pm/safe-react-components";
import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = gnosisTheme;
theme.colors = {
  ...theme.colors,
  primary: "#f77423",
  primaryHover: "#ec6816",
  primaryLight: "#ff7f28",
  secondary: "#1469ff",
  secondaryHover: "#2357ec",
  secondaryLight: "#0099ff",
};

export default theme;
