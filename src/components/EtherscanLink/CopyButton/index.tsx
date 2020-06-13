/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import CopyIcon from "./copy.svg";

const xs = "4px";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: `0 ${xs}`,
    borderRadius: "50%",
    transition: "background-color .2s ease-in-out",
    "&:hover": {
      backgroundColor: "#F0EFEE",
    },
  },
  increasedPopperZindex: {
    zIndex: 2001,
  },
});

const CopyBtn = ({
  content,
  className = "",
  increaseZindex = false,
}: {
  content: string;
  className?: string;
  increaseZindex?: boolean;
}) => {
  const [clicked, setClicked] = useState(false);
  const classes = useStyles();
  const customClasses = increaseZindex ? { popper: classes.increasedPopperZindex } : {};

  return (
    <Tooltip
      classes={customClasses}
      onClose={() => {
        // this is fired before tooltip is closed
        // added setTimeout so the user doesn't see the text changing/jumping
        setTimeout(() => {
          if (clicked) {
            setClicked(false);
          }
        }, 300);
      }}
      placement="top"
      title={clicked ? "Copied" : "Copy to clipboard"}
    >
      <div className={`${classes.container} ${className}`}>
        <CopyToClipboard text={content} onCopy={() => setClicked(true)}>
          <img alt="Copy to clipboard" height={20} src={CopyIcon} />
        </CopyToClipboard>
      </div>
    </Tooltip>
  );
};

export default CopyBtn;
