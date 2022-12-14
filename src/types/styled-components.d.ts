import "styled-components";

declare module "styled-components" {
  export interface Buttons {
    size: ButtonsSize;
  }

  export interface ButtonsSize {
    md: PurpleLg;
    lg: PurpleLg;
  }

  export interface PurpleLg {
    height: string;
    padding: string;
  }

  export interface Colors {
    background: string;
    disabled: Disabled;
    error: string;
    errorHover: string;
    primary: string;
    primaryLight: string;
    primaryHover: string;
    icon: string;
    inputField: string;
    overlay: Overlay;
    pendingTagHover: string;
    placeHolder: string;
    secondary: string;
    secondaryLight: string;
    secondaryHover: string;
    separator: string;
    tag: string;
    text: string;
    shadow: Shadow;
    white: string;
  }

  export interface Disabled {
    opacity: number;
  }

  export interface Overlay {
    color: string;
    opacity: number;
  }

  export interface Shadow {
    blur: string;
    color: string;
    opacity: number;
  }

  export interface Fonts {
    fontFamily: string;
    fontFamilyCode: string;
  }

  export interface Icon {
    size: IconTextSize;
  }

  export interface IconTextSize {
    sm: null | string;
    md: null | string;
  }

  export interface Loader {
    size: LoaderSize;
  }

  export interface LoaderSize {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  }

  export interface Text {
    size: TextSize;
  }

  export interface TextSize {
    sm: SmClass;
    md: SmClass;
    lg: SmClass;
    xl: SmClass;
    xs?: SmClass;
  }

  export interface SmClass {
    fontSize: string;
    lineHeight: string;
  }

  export interface DefaultTheme {
    buttons: Buttons;
    colors: Colors;
    fonts: Fonts;
    icons: Icon;
    iconText: Icon;
    loader: Loader;
    text: Text;
    title: Text;
  }
}
