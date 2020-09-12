import { createMuiTheme } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";
import theme from ".";

const { primary, primaryLight } = theme.colors;
const dateTimeTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: primaryLight,
      },
    },
    MuiPickerDTTabs: {
      tabs: {
        backgroundColor: primary,
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: primary,
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: primary,
      },
      noPoint: {
        backgroundColor: primary,
      },
      thumb: {
        backgroundColor: primary,
        borderColor: primary,
      },
    },
    MuiPickersDay: {
      day: {
        color: primaryLight,
      },
      daySelected: {
        backgroundColor: primary,
      },
      dayDisabled: {
        color: lightBlue["100"],
      },
      current: {
        color: primary,
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: primary,
      },
    },
    MuiButton: {
      textPrimary: {
        color: primary,
      },
    },
  },
});

export default dateTimeTheme;
