import { Networks } from "@gnosis.pm/safe-apps-sdk";

import daiIcon from "../assets/tokens/dai.svg";
import wethIcon from "../assets/tokens/weth.svg";

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
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
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

  return [
    {
      address: tokensByNetwork.DAI,
      decimals: 18,
      iconUrl: daiIcon,
      id: "DAI",
      label: "Dai",
    },
    {
      address: tokensByNetwork.ETH,
      decimals: 18,
      iconUrl: wethIcon,
      id: "ETH",
      label: "ETH",
    },
    {
      address: tokensByNetwork.WETH,
      decimals: 18,
      iconUrl: wethIcon,
      id: "WETH",
      label: "Weth",
    },
  ];
};

export default tokens;
