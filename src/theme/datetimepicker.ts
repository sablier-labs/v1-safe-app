import { adaptV4Theme, createTheme } from "@mui/material/styles";

import theme from ".";

const { primary, primaryLight, primaryHover, secondary, secondaryLight, secondaryHover } = theme.colors;
const dateTimeTheme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        light: primaryLight,
        main: primary,
        dark: primaryHover,
      },
      secondary: {
        light: secondaryLight,
        main: secondary,
        dark: secondaryHover,
      },
    },
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: primaryLight,
        },
      },
      MuiPickerDTTabs: {
        tabs: {
          backgroundColor: primaryLight,
        },
        indicator: {
          backgroundColor: secondary,
        },
      },
    },
  }),
);

export default dateTimeTheme;
