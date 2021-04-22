import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module "@material-ui/core/styles/overrides" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}
