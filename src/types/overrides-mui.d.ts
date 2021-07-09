import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";

type OverridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module "@material-ui/core/styles/overrides" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ComponentNameToClassKey extends OverridesNameToClassKey {}
}
