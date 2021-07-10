/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import CopyIcon from "../../../assets/copy.svg";
import { LinkContainer, StyledTooltip } from "./common";

type CopyButtonProps = {
  content: string;
  className?: string;
  increaseZindex?: boolean;
};

function CopyButton({ content, className = "", increaseZindex = false }: CopyButtonProps): JSX.Element {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <StyledTooltip
      increaseZindex={increaseZindex}
      onClose={() => {
        // This is fired before tooltip is closed.
        // Added setTimeout so the user doesn't see the text changing/jumping.
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
}

export default CopyButton;
