import Tooltip from "@mui/material/Tooltip";
import styled, { css } from "styled-components";

export const LinkContainer = styled.a.attrs({
  rel: "noopener noreferrer",
  target: "_blank",
})`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin: 0 4px;
  padding: 0;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #f0efee;
  }
`;

export const StyledTooltip = styled(Tooltip)`
  ${({ increaseZindex }: { increaseZindex: boolean }) =>
    increaseZindex &&
    css`
      z-index: 2001;
    `}
`;
