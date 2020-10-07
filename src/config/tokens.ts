import cdaiIcon from "../assets/tokens/cdai.svg";
import chaiIcon from "../assets/tokens/chai.png";
import cusdcIcon from "../assets/tokens/cusdc.svg";
import daiIcon from "../assets/tokens/dai.svg";
import ethIcon from "../assets/tokens/eth.svg";
import linkIcon from "../assets/tokens/link.svg";
import mkrIcon from "../assets/tokens/mkr.svg";
import mtaIcon from "../assets/tokens/mta.svg";
import musdIcon from "../assets/tokens/musd.svg";
import rlyIcon from "../assets/tokens/rly.svg";
import susdIcon from "../assets/tokens/susd.svg";
import usdcIcon from "../assets/tokens/usdc.svg";
import wbtcIcon from "../assets/tokens/wbtc.svg";
import { SablierNetworks } from "../types";

export type TokenItem = {
  address: string;
  decimals: number;
  id: string;
  iconUrl: string;
  label: string;
};

export type TokenMap = { [key in SablierNetworks]: { [name: string]: string } };

const tokens: TokenMap = {
  mainnet: {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    TUSD: "0x0000000000085d4780B73119b644AE5ecd22b376",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    mUSD: "0xe2f2a5C287993345a840Db3B0845fbC70f5935a5",
    sUSD: "0x57Ab1E02fEE23774580C119740129eAC7081e9D3",
    CHAI: "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215",
    cDAI: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    cUSDC: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    MKR: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    MTA: "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2",
    RLY: "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  rinkeby: {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    DAI: "0xc3dbf84abb494ce5199d5d4d815b10ec29529ff8",
    WETH: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
  ropsten: {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    DAI: "0x2D69aD895797C880abce92437788047BA0Eb7fF6",
    WETH: "0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5",
  },
  kovan: {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    DAI: "0x7d669a64deb8a4a51eea755bb0e19fd39ce25ae9",
    WETH: "0x5eca15b12d959dfcf9c71c59f8b467eb8c6efd0b",
  },
  goerli: {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    DAI: "0xF2D1F94310823FE26cFa9c9B6fD152834b8E7849",
    WETH: "0xef03ef2d709c2e9cc40d72f72eb357928f34acd5",
  },
};

export const getTokenList = (network: SablierNetworks): TokenItem[] => {
  const tokensByNetwork: { [name: string]: string } = tokens[network];
  if (!tokensByNetwork) {
    throw Error(`No token configuration for ${network}`);
  }

  const tokenList: TokenItem[] = [
    {
      address: tokensByNetwork.ETH,
      decimals: 18,
      iconUrl: ethIcon,
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
      address: tokensByNetwork.mUSD,
      decimals: 18,
      iconUrl: musdIcon,
      id: "mUSD",
      label: "mUSD",
    },
    {
      address: tokensByNetwork.sUSD,
      decimals: 18,
      iconUrl: susdIcon,
      id: "sUSD",
      label: "sUSD",
    },
    {
      address: tokensByNetwork.CHAI,
      decimals: 18,
      iconUrl: chaiIcon,
      id: "CHAI",
      label: "CHAI",
    },
    {
      address: tokensByNetwork.cDAI,
      decimals: 8,
      iconUrl: cdaiIcon,
      id: "cDAI",
      label: "cDAI",
    },
    {
      address: tokensByNetwork.cUSDC,
      decimals: 8,
      iconUrl: cusdcIcon,
      id: "cUSDC",
      label: "cUSDC",
    },
    {
      address: tokensByNetwork.LINK,
      decimals: 18,
      iconUrl: linkIcon,
      id: "LINK",
      label: "LINK",
    },
    {
      address: tokensByNetwork.MKR,
      decimals: 18,
      iconUrl: mkrIcon,
      id: "MKR",
      label: "MKR",
    },
    {
      address: tokensByNetwork.MTA,
      decimals: 18,
      iconUrl: mtaIcon,
      id: "MTA",
      label: "MTA",
    },
    {
      address: tokensByNetwork.RLY,
      decimals: 18,
      iconUrl: rlyIcon,
      id: "RLY",
      label: "RLY",
    },
    {
      address: tokensByNetwork.WBTC,
      decimals: 8,
      iconUrl: wbtcIcon,
      id: "WBTC",
      label: "WBTC",
    },
    {
      address: tokensByNetwork.WETH,
      decimals: 18,
      iconUrl: ethIcon,
      id: "WETH",
      label: "WETH",
    },
  ];
  return tokenList.filter(token => token.address !== undefined);
};

export default tokens;
