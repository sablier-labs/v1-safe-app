import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};
