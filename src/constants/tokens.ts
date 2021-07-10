import cDaiIcon from "../assets/tokens/cdai.svg";
import chaiIcon from "../assets/tokens/chai.png";
import cusdcIcon from "../assets/tokens/cusdc.svg";
import cvpIcon from "../assets/tokens/cvp.png";
import daiIcon from "../assets/tokens/dai.svg";
import dhtIcon from "../assets/tokens/dht.png";
import ethIcon from "../assets/tokens/eth.svg";
import foxIcon from "../assets/tokens/fox.png";
import iagIcon from "../assets/tokens/iag.png";
import kmplIcon from "../assets/tokens/kmpl.png";
import linkIcon from "../assets/tokens/link.svg";
import mfiIcon from "../assets/tokens/mfi.png";
import mkrIcon from "../assets/tokens/mkr.svg";
import mplIcon from "../assets/tokens/mpl.svg";
import mtaIcon from "../assets/tokens/mta.svg";
import mUsdIcon from "../assets/tokens/musd.svg";
import museIcon from "../assets/tokens/muse.png";
import plaIcon from "../assets/tokens/pla.png";
import rlyIcon from "../assets/tokens/rly.svg";
import rnbwIcon from "../assets/tokens/rnbw.png";
import sUsdIcon from "../assets/tokens/susd.svg";
import sushiIcon from "../assets/tokens/sushi.jpg";
import udtIcon from "../assets/tokens/udt.png";
import usdcIcon from "../assets/tokens/usdc.svg";
import wbtcIcon from "../assets/tokens/wbtc.svg";
import xrnbwIcon from "../assets/tokens/xrnbw.png";
import xsushiIcon from "../assets/tokens/xsushi.jpg";
import { SablierChainId } from "../types";
import { GOERLI_ID, KOVAN_ID, MAINNET_ID, RINKEBY_ID, ROPSTEN_ID } from "./chains";

export type TokenItem = {
  address: string;
  decimals: number;
  id: string;
  iconUrl: string;
  label: string;
};

export type TokenMap = { [key in SablierChainId]: { [name: string]: string } };

export const TOKENS: TokenMap = {
  [GOERLI_ID]: {
    DAI: "0x97cb342Cf2F6EcF48c1285Fb8668f5a4237BF862",
    WETH: "0xef03ef2d709c2e9cc40d72f72eb357928f34acd5",
  },
  [KOVAN_ID]: {
    DAI: "0x79dfab686Ef87cd2c871D5182F08538589234189",
    WETH: "0x5eca15b12d959dfcf9c71c59f8b467eb8c6efd0b",
  },
  [MAINNET_ID]: {
    // Stablecoins
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    TUSD: "0x0000000000085d4780B73119b644AE5ecd22b376",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    mUSD: "0xe2f2a5C287993345a840Db3B0845fbC70f5935a5",
    sUSD: "0x57Ab1E02fEE23774580C119740129eAC7081e9D3",
    // Interest-bearing stablecoins
    CHAI: "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215",
    cDAI: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    cUSDC: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    // Miscellaneous
    CVP: "0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1",
    DHT: "0xca1207647Ff814039530D7d35df0e1Dd2e91Fa84",
    FOX: "0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d",
    kMPL: "0xe8D17542dfe79Ff4FBd4b850f2d39DC69c4489a2",
    IAG: "0x40EB746DEE876aC1E78697b7Ca85142D178A1Fc8",
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    MFI: "0xAa4e3edb11AFa93c41db59842b29de64b72E355B",
    MKR: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    MPL: "0x33349B282065b0284d756F0577FB39c158F935e6",
    MTA: "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2",
    MUSE: "0xB6Ca7399B4F9CA56FC27cBfF44F4d2e4Eef1fc81",
    PLA: "0x0198f46f520F33cd4329bd4bE380a25a90536CD5",
    RLY: "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b",
    RNBW: "0xE94B97b6b43639E238c851A7e693F50033EfD75C",
    SUSHI: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    UDT: "0x90DE74265a416e1393A450752175AED98fe11517",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    XRNBW: "0x47BE779De87de6580d0548cde80710a93c502405",
    XSUSHI: "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272",
  },
  [RINKEBY_ID]: {
    DAI: "0x5eD8BD53B0c3fa3dEaBd345430B1A3a6A4e8BD7C",
    WETH: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
  [ROPSTEN_ID]: {
    DAI: "0x3ac1c6ff50007ee705f36e40F7Dc6f393b1bc5e7",
    WETH: "0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5",
  },
};

export const getTokens = (chainId: SablierChainId): TokenItem[] => {
  const tokensByChainId: { [name: string]: string } = TOKENS[chainId];
  if (!tokensByChainId) {
    throw Error(`No token configuration for ${chainId}`);
  }

  // The order here should mirror the order in the mapping above.
  const tokens: TokenItem[] = [
    {
      address: tokensByChainId.DAI,
      decimals: 18,
      iconUrl: daiIcon,
      id: "DAI",
      label: "DAI",
    },
    {
      address: tokensByChainId.USDC,
      decimals: 6,
      iconUrl: usdcIcon,
      id: "USDC",
      label: "USDC",
    },
    {
      address: tokensByChainId.mUSD,
      decimals: 18,
      iconUrl: mUsdIcon,
      id: "mUSD",
      label: "mUSD",
    },
    {
      address: tokensByChainId.sUSD,
      decimals: 18,
      iconUrl: sUsdIcon,
      id: "sUSD",
      label: "sUSD",
    },
    {
      address: tokensByChainId.CHAI,
      decimals: 18,
      iconUrl: chaiIcon,
      id: "CHAI",
      label: "CHAI",
    },
    {
      address: tokensByChainId.cDAI,
      decimals: 8,
      iconUrl: cDaiIcon,
      id: "cDAI",
      label: "cDAI",
    },
    {
      address: tokensByChainId.cUSDC,
      decimals: 8,
      iconUrl: cusdcIcon,
      id: "cUSDC",
      label: "cUSDC",
    },
    {
      address: tokensByChainId.CVP,
      decimals: 18,
      iconUrl: cvpIcon,
      id: "CVP",
      label: "CVP",
    },
    {
      address: tokensByChainId.DHT,
      decimals: 18,
      iconUrl: dhtIcon,
      id: "DHT",
      label: "DHT",
    },
    {
      address: tokensByChainId.FOX,
      decimals: 18,
      iconUrl: foxIcon,
      id: "FOX",
      label: "FOX",
    },
    {
      address: tokensByChainId.kMPL,
      decimals: 9,
      iconUrl: kmplIcon,
      id: "kMPL",
      label: "kMPL",
    },
    {
      address: tokensByChainId.IAG,
      decimals: 18,
      iconUrl: iagIcon,
      id: "IAG",
      label: "IAG",
    },
    {
      address: tokensByChainId.LINK,
      decimals: 18,
      iconUrl: linkIcon,
      id: "LINK",
      label: "LINK",
    },
    {
      address: tokensByChainId.MFI,
      decimals: 18,
      iconUrl: mfiIcon,
      id: "MFI",
      label: "MFI",
    },
    {
      address: tokensByChainId.MKR,
      decimals: 18,
      iconUrl: mkrIcon,
      id: "MKR",
      label: "MKR",
    },
    {
      address: tokensByChainId.MPL,
      decimals: 18,
      iconUrl: mplIcon,
      id: "MPL",
      label: "MPL",
    },
    {
      address: tokensByChainId.MTA,
      decimals: 18,
      iconUrl: mtaIcon,
      id: "MTA",
      label: "MTA",
    },
    {
      address: tokensByChainId.MUSE,
      decimals: 18,
      iconUrl: museIcon,
      id: "MUSE",
      label: "MUSE",
    },
    {
      address: tokensByChainId.PLA,
      decimals: 18,
      iconUrl: plaIcon,
      id: "PLA",
      label: "PLA",
    },
    {
      address: tokensByChainId.RLY,
      decimals: 18,
      iconUrl: rlyIcon,
      id: "RLY",
      label: "RLY",
    },
    {
      address: tokensByChainId.RNBW,
      decimals: 18,
      iconUrl: rnbwIcon,
      id: "RNBW",
      label: "RNBW",
    },
    {
      address: tokensByChainId.SUSHI,
      decimals: 18,
      iconUrl: sushiIcon,
      id: "SUSHI",
      label: "SUSHI",
    },
    {
      address: tokensByChainId.UDT,
      decimals: 18,
      iconUrl: udtIcon,
      id: "UDT",
      label: "UDT",
    },
    {
      address: tokensByChainId.WBTC,
      decimals: 8,
      iconUrl: wbtcIcon,
      id: "WBTC",
      label: "WBTC",
    },
    {
      address: tokensByChainId.WETH,
      decimals: 18,
      iconUrl: ethIcon,
      id: "WETH",
      label: "WETH",
    },
    {
      address: tokensByChainId.XRNBW,
      decimals: 18,
      iconUrl: xrnbwIcon,
      id: "XRNBW",
      label: "XRNBW",
    },
    {
      address: tokensByChainId.XSUSHI,
      decimals: 18,
      iconUrl: xsushiIcon,
      id: "XSUSHI",
      label: "XSUSHI",
    },
  ];

  return tokens.filter(token => {
    return token.address !== undefined;
  });
};
