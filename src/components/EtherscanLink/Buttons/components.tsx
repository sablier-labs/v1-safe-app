import Tooltip from "@material-ui/core/Tooltip";

import styled, { css } from "styled-components";

const xs = "4px";

export const LinkContainer = styled.a.attrs({
  rel: "noopener noreferrer",
  target: "_blank",
})`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin: 0 ${xs};
  padding: 0;
  transition: background-color .2s ease-in-out;
  &:hover {
    background-color: #F0EFEE;
  },
`;

export const StyledTooltip = styled(Tooltip)`
  ${({ increaseZindex }: { increaseZindex: boolean }) =>
    increaseZindex &&
    css`
      zindex: 2001;
    `}
`;
