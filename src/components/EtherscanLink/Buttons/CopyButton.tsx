/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import CopyIcon from "./copy.svg";
import { LinkContainer, StyledTooltip } from "./components";

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

  return (
    <StyledTooltip
      increaseZindex={increaseZindex}
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
      <LinkContainer className={className}>
        <CopyToClipboard text={content} onCopy={() => setClicked(true)}>
          <img alt="Copy to clipboard" height={20} src={CopyIcon} />
        </CopyToClipboard>
      </LinkContainer>
    </StyledTooltip>
  );
};

export default CopyBtn;
