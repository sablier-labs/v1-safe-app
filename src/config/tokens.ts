import { Networks } from "@gnosis.pm/safe-apps-sdk";

import daiIcon from "../assets/tokens/dai.svg";
import wethIcon from "../assets/tokens/weth.svg";
import batIcon from "../assets/tokens/bat.svg";
import usdcIcon from "../assets/tokens/usdc.svg";
import repIcon from "../assets/tokens/rep.svg";
import btcIcon from "../assets/tokens/wbtc.svg";

export type TokenItem = {
  address: string;
  decimals: number;
  id: string;
  iconUrl: string;
  label: string;
};

export type TokenMap = {
  mainnet: {
    [name: string]: string;
  };
  rinkeby: {
    [name: string]: string;
  };
};

const tokens: TokenMap = {
  mainnet: {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    BAT: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
    cDAI: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    CHAI: "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215",
    cUSDC: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    KNC: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    MKR: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    REP: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
    SNX: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    sUSD: "0x57Ab1E02fEE23774580C119740129eAC7081e9D3",
    TUSD: "0x0000000000085d4780B73119b644AE5ecd22b376",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  rinkeby: {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    DAI: "0xc3dbf84abb494ce5199d5d4d815b10ec29529ff8",
    WETH: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
};

export const getTokenList = (network: Networks): TokenItem[] => {
  const tokensByNetwork: { [name: string]: string } = tokens[network];
  if (!tokensByNetwork) {
    throw Error(`No token configuration for ${network}`);
  }

  const tokenList: TokenItem[] = [
    {
      address: tokensByNetwork.ETH,
      decimals: 18,
      iconUrl: wethIcon,
      id: "ETH",
      label: "ETH",
    },
    {
      address: tokensByNetwork.DAI,
      decimals: 18,
      iconUrl: daiIcon,
      id: "DAI",
      label: "DAI",
    },
    {
      address: tokensByNetwork.USDC,
      decimals: 6,
      iconUrl: usdcIcon,
      id: "USDC",
      label: "USDC",
    },
    {
      address: tokensByNetwork.cDAI,
      decimals: 8,
      iconUrl: daiIcon,
      id: "cDAI",
      label: "cDAI",
    },
    {
      address: tokensByNetwork.cUSDC,
      decimals: 8,
      iconUrl: usdcIcon,
      id: "cUSDC",
      label: "cUSDC",
    },
    {
      address: tokensByNetwork.CHAI,
      decimals: 18,
      iconUrl: daiIcon,
      id: "CHAI",
      label: "CHAI",
    },
    {
      address: tokensByNetwork.sUSD,
      decimals: 18,
      iconUrl: wethIcon,
      id: "sUSD",
      label: "sUSD",
    },
    {
      address: tokensByNetwork.TUSD,
      decimals: 18,
      iconUrl: wethIcon,
      id: "TUSD",
      label: "TUSD",
    },
    {
      address: tokensByNetwork.BAT,
      decimals: 18,
      iconUrl: batIcon,
      id: "BAT",
      label: "BAT",
    },
    {
      address: tokensByNetwork.MKR,
      decimals: 18,
      iconUrl: wethIcon,
      id: "MKR",
      label: "MKR",
    },
    {
      address: tokensByNetwork.LINK,
      decimals: 18,
      iconUrl: wethIcon,
      id: "LINK",
      label: "LINK",
    },
    {
      address: tokensByNetwork.KNC,
      decimals: 18,
      iconUrl: wethIcon,
      id: "KNC",
      label: "KNC",
    },
    {
      address: tokensByNetwork.REP,
      decimals: 18,
      iconUrl: repIcon,
      id: "REP",
      label: "REP",
    },
    {
      address: tokensByNetwork.WBTC,
      decimals: 8,
      iconUrl: btcIcon,
      id: "WBTC",
      label: "WBTC",
    },
    {
      address: tokensByNetwork.WETH,
      decimals: 18,
      iconUrl: wethIcon,
      id: "WETH",
      label: "WETH",
    },
  ];
  return tokenList.filter(token => token.address !== undefined);
};

export default tokens;
