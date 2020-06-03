import { Machine } from "xstate";

export default Machine({
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
