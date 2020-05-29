import { Networks } from "@gnosis.pm/safe-apps-sdk";

import batIcon from "../assets/tokens/bat.svg";
import daiIcon from "../assets/tokens/dai.svg";
import ethIcon from "../assets/tokens/eth.svg";
import repIcon from "../assets/tokens/rep.svg";
import tokens from "./tokens";
import usdcIcon from "../assets/tokens/usdc.svg";
import wbtcIcon from "../assets/tokens/wbtc.svg";
import zrxIcon from "../assets/tokens/zrx.svg";

export type TokenItem = {
  id: string;
  label: string;
  iconUrl: string;
  decimals: number;
  tokenAddr: string;
};

export const web3Provider = process.env.REACT_APP_WEB3_PROVIDER_URL || "";

export const getTokenList = (network: Networks): Array<TokenItem> => {
  const tokensByNetwork = tokens[network];
  if (!tokensByNetwork) {
    throw Error(`No token configuration for ${network}`);
  }

  return [
    {
      id: "DAI",
      label: "Dai",
      iconUrl: daiIcon,
      decimals: 18,
      tokenAddr: tokensByNetwork.DAI,
    },
    {
      id: "BAT",
      label: "BAT",
      iconUrl: batIcon,
      decimals: 18,
      tokenAddr: tokensByNetwork.BAT,
    },
    {
      id: "ETH",
      label: "ETH",
      iconUrl: ethIcon,
      decimals: 18,
      tokenAddr: tokensByNetwork.ETH,
    },
    {
      id: "REP",
      label: "REP",
      iconUrl: repIcon,
      decimals: 18,
      tokenAddr: tokensByNetwork.REP,
    },
    {
      id: "USDC",
      label: "USDC",
      iconUrl: usdcIcon,
      decimals: 6,
      tokenAddr: tokensByNetwork.USDC,
    },
    {
      id: "WBTC",
      label: "WBTC",
      iconUrl: wbtcIcon,
      decimals: 8,
      tokenAddr: tokensByNetwork.WBTC,
    },
    {
      id: "ZRX",
      label: "ZXR",
      iconUrl: zrxIcon,
      decimals: 18,
      tokenAddr: tokensByNetwork.ZRX,
    },
  ];
};
