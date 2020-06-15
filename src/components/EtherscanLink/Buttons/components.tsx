import Tooltip from "@material-ui/core/Tooltip";

import styled, { css } from "styled-components";

const xs = "4px";

export const LinkContainer = styled.a.attrs({
  rel: "noopener noreferrer",
  target: "_blank",
})`
  alignItems: "center",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  margin: 0 ${xs},
  padding: "0",
  transition: "background-color .2s ease-in-out",
  "&:hover": {
    backgroundColor: "#F0EFEE",
  },
`;

export const StyledTooltip = styled(Tooltip)`
  ${({ increaseZindex }: { increaseZindex: boolean }) =>
    increaseZindex &&
    css`
      zindex: 2001;
    `}
`;
