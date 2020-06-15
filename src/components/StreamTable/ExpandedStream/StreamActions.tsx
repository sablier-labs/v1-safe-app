import React, { ReactElement, useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import { Button } from "@gnosis.pm/safe-react-components";
import { makeStyles } from "@material-ui/core";

import { StreamStatus, getStreamStatus } from "../Status";
import { ProxyStream } from "../../../typings";

const lg: string = "24px";
const md: string = "16px";

const useStyles = makeStyles(() => ({
  actionsContainer: {
    alignContent: "space-around",
    alignItems: "space-around",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: `${lg} ${md}`,
  },
}));

const StyledButton = styled(Button).attrs({
  color: "primary",
  size: "md",
  variant: "contained",
})`
  min-width: 120px;
`;

const StyledAnchor = styled.a.attrs({
  rel: "noopener noreferrer",
  target: "_blank",
})`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
`;

const StreamActions = ({
  cancelStream,
  proxyStream,
}: {
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  proxyStream: ProxyStream;
}): ReactElement => {
  const classes = useStyles();

  const sablierStreamUrl = useMemo(() => `https://app.sablier.finance/stream/${proxyStream.id}`, [proxyStream]);

  return (
    <div className={classes.actionsContainer}>
      <CopyToClipboard text={sablierStreamUrl}>
        <StyledButton>Copy Stream Link</StyledButton>
      </CopyToClipboard>
      <StyledButton>
        <StyledAnchor href={sablierStreamUrl}>View Stream</StyledAnchor>
      </StyledButton>
      <StyledButton disabled={getStreamStatus(proxyStream) !== StreamStatus.Active} onClick={cancelStream}>
        Cancel
      </StyledButton>
    </div>
  );
};

export default StreamActions;
