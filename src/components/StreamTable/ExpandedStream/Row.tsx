import React from "react";

import { makeStyles } from "@material-ui/core";

const xs: string = "4px";
const sm: string = "8px";
const md: string = "16px";
const lg: string = "24px";
const xl: string = "32px";

const useStyles = makeStyles(() => ({
  row: {
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  grow: {
    flex: "1 1 auto",
  },

  marginXs: {
    marginBottom: xs,
  },

  marginSm: {
    marginBottom: sm,
  },

  marginMd: {
    marginBottom: md,
  },

  marginLg: {
    marginBottom: lg,
  },

  marginXl: {
    marginBottom: xl,
  },

  alignStart: {
    alignItems: "flex-start",
  },

  alignEnd: {
    alignItems: "flex-end",
  },

  alignCenter: {
    alignItems: "center",
  },
}));

const upperFirst = (value: string): string => value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);

const capitalize = (value: any, prefix?: any) => {
  if (!value) {
    return undefined;
  }

  if (typeof value === "boolean") {
    return prefix || "";
  }

  if (typeof value === "number") {
    return prefix ? `${prefix}${value}` : value;
  }

  if (typeof value !== "string") {
    return false;
  }

  const capitalized = upperFirst(value);

  return prefix ? `${prefix}${capitalized}` : capitalized;
};

const Row = ({ align, children, className, grow, margin, testId = "", ...props }: any) => {
  const classes = useStyles();
  const rowClassNames = `${classes.row} ${margin ? capitalize(margin, "margin") : undefined} ${
    align ? capitalize(align, "align") : undefined
  } ${grow} ${className} `;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={rowClassNames} data-testid={testId} {...props}>
      {children}
    </div>
  );
};

export default Row;
