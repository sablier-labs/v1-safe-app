import { Machine } from "xstate";

/* "Undefined" because there's no context */
export default Machine<undefined>({
  id: "durationPicker",
  initial: "idle",
  states: {
    idle: {
      on: {
        COLLAPSE: "collapsed",
      },
    },
    collapsed: {
      on: {
        IDLE: "idle",
      },
    },
  },
});
