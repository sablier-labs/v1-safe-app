import balIcon from "../assets/tokens/bal.png";
import bankIcon from "../assets/tokens/bank.png";
import btpIcon from "../assets/tokens/btp.png";
import bzrxIcon from "../assets/tokens/bzrx.png";
import cDaiIcon from "../assets/tokens/cdai.svg";
import chaiIcon from "../assets/tokens/chai.png";
import cirusIcon from "../assets/tokens/cirus.png";
import cre8rIcon from "../assets/tokens/cre8r.png";
import cusdcIcon from "../assets/tokens/cusdc.svg";
import cvpIcon from "../assets/tokens/cvp.png";
import cwIcon from "../assets/tokens/cw.png";
import cwapIcon from "../assets/tokens/cwap.png";
import daiIcon from "../assets/tokens/dai.svg";
import dhtIcon from "../assets/tokens/dht.png";
import doughIcon from "../assets/tokens/dough.png";
import dsuIcon from "../assets/tokens/dsu.png";
import ethIcon from "../assets/tokens/eth.svg";
import farmIcon from "../assets/tokens/farm.png";
import floatIcon from "../assets/tokens/float.png";
import foxIcon from "../assets/tokens/fox.png";
import hotcrossIcon from "../assets/tokens/hotcross.png";
import iagIcon from "../assets/tokens/iag.png";
import kmplIcon from "../assets/tokens/kmpl.png";
import linkIcon from "../assets/tokens/link.svg";
import mfiIcon from "../assets/tokens/mfi.png";
import mkrIcon from "../assets/tokens/mkr.svg";
import mplIcon from "../assets/tokens/mpl.svg";
import mtaIcon from "../assets/tokens/mta.svg";
import mUsdIcon from "../assets/tokens/musd.svg";
import museIcon from "../assets/tokens/muse.png";
import occIcon from "../assets/tokens/occ.png";
import percsIcon from "../assets/tokens/percs.png";
import plaIcon from "../assets/tokens/pla.png";
import rlyIcon from "../assets/tokens/rly.svg";
import rnbwIcon from "../assets/tokens/rnbw.png";
import sUsdIcon from "../assets/tokens/susd.svg";
import sushiIcon from "../assets/tokens/sushi.jpg";
import theosIcon from "../assets/tokens/theos.png";
import tusdIcon from "../assets/tokens/tusd.png";
import uadIcon from "../assets/tokens/uad.svg";
import uarIcon from "../assets/tokens/uar.svg";
import ubqIcon from "../assets/tokens/ubq.png";
import udtIcon from "../assets/tokens/udt.png";
import usdcIcon from "../assets/tokens/usdc.svg";
import ustIcon from "../assets/tokens/ust.png";
import wbtcIcon from "../assets/tokens/wbtc.svg";
import wnxmIcon from "../assets/tokens/wnxm.png";
import xrnbwIcon from "../assets/tokens/xrnbw.png";
import xsushiIcon from "../assets/tokens/xsushi.jpg";
import yUsdcIcon from "../assets/tokens/yusdc.png";
import zeumIcon from "../assets/tokens/zeum.png";
import { GOERLI_ID, KOVAN_ID, MAINNET_ID, RINKEBY_ID, ROPSTEN_ID } from "../constants/chains";
import { SablierChainId } from "../types";

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
    UST: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
    mUSD: "0xe2f2a5C287993345a840Db3B0845fbC70f5935a5",
    sUSD: "0x57Ab1E02fEE23774580C119740129eAC7081e9D3",
    yUSDC: "0x597ad1e0c13bfe8025993d9e79c69e1c0233522e",
    // Interest-bearing stablecoins
    CHAI: "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215",
    cDAI: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    cUSDC: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    // All others
    BANK: "0x24A6A37576377F63f194Caa5F518a60f45b42921",
    BTP: "0x4E672e34B6db16dD5307a6bFD4f343998Aac55E1",
    BZRX: "0x56d811088235F11C8920698a204A5010a788f4b3",
    CIRUS: "0xA01199c61841Fce3b3daFB83FeFC1899715c8756",
    CVP: "0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1",
    CRE8R: "0xaa61D5dec73971CD4a026ef2820bB87b4a4Ed8d6",
    CW: "0xd55236D48606c295adEbF129dAD04Fc74BFaA708",
    CWAP: "0xE74dC43867E0cbEB208F1a012fc60DcBbF0E3044",
    DHT: "0xca1207647Ff814039530D7d35df0e1Dd2e91Fa84",
    DOUGH: "0xad32A8e6220741182940c5aBF610bDE99E737b2D",
    FLOAT: "0xb05097849BCA421A3f51B249BA6CCa4aF4b97cb9",
    FOX: "0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d",
    HOTCROSS: "0x4297394c20800E8a38A619A243E9BbE7681Ff24E",
    IAG: "0x40EB746DEE876aC1E78697b7Ca85142D178A1Fc8",
    kMPL: "0xe8D17542dfe79Ff4FBd4b850f2d39DC69c4489a2",
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    MFI: "0xAa4e3edb11AFa93c41db59842b29de64b72E355B",
    MKR: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    MPL: "0x33349B282065b0284d756F0577FB39c158F935e6",
    MTA: "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2",
    MUSE: "0xB6Ca7399B4F9CA56FC27cBfF44F4d2e4Eef1fc81",
    OCC: "0x2F109021aFe75B949429fe30523Ee7C0D5B27207",
    PERCS: "0xf4A2fd9EC3923558bCA92FC8DdD9CDCAad373068",
    PLA: "0x0198f46f520F33cd4329bd4bE380a25a90536CD5",
    RLY: "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b",
    RNBW: "0xE94B97b6b43639E238c851A7e693F50033EfD75C",
    SUSHI: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    THEOS: "0x9e10f61749c4952C320412A6B26901605Ff6Da1d",
    UBQ: "0x4e38D89362f7e5db0096CE44ebD021c3962aA9a0",
    UDT: "0x90DE74265a416e1393A450752175AED98fe11517",
    uAD: "0x0F644658510c95CB46955e55D7BA9DDa9E9fBEc6",
    uAR: "0x5894cFEbFdEdBe61d01F20140f41c5c49AedAe97",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    wNXM: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    XRNBW: "0x47BE779De87de6580d0548cde80710a93c502405",
    XSUSHI: "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272",
    ZEUM: "0x436dA116249044E8B4464F0Cf21Dd93311d88190",
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
    // Stablecoins
    {
      address: tokensByChainId.DAI,
      decimals: 18,
      iconUrl: daiIcon,
      id: "DAI",
      label: "DAI",
    },
    {
      address: tokensByChainId.TUSD,
      decimals: 18,
      iconUrl: tusdIcon,
      id: "TUSD",
      label: "TUSD",
    },
    {
      address: tokensByChainId.USDC,
      decimals: 6,
      iconUrl: usdcIcon,
      id: "USDC",
      label: "USDC",
    },
    {
      address: tokensByChainId.UST,
      decimals: 18,
      iconUrl: ustIcon,
      id: "UST",
      label: "UST",
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
    // Interest-bearing stablecoins
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
    // All others
    {
      address: tokensByChainId.BAL,
      decimals: 18,
      iconUrl: balIcon,
      id: "BAL",
      label: "BAL",
    },
    {
      address: tokensByChainId.BANK,
      decimals: 18,
      iconUrl: bankIcon,
      id: "BANK",
      label: "BANK",
    },
    {
      address: tokensByChainId.BTP,
      decimals: 18,
      iconUrl: btpIcon,
      id: "BTP",
      label: "BTP",
    },
    {
      address: tokensByChainId.BZRX,
      decimals: 18,
      iconUrl: bzrxIcon,
      id: "BZRX",
      label: "BZRX",
    },
    {
      address: tokensByChainId.CIRUS,
      decimals: 18,
      iconUrl: cirusIcon,
      id: "CIRUS",
      label: "CIRUS",
    },
    {
      address: tokensByChainId.CRE8R,
      decimals: 18,
      iconUrl: cre8rIcon,
      id: "CRE8R",
      label: "CRE8R",
    },
    {
      address: tokensByChainId.CVP,
      decimals: 18,
      iconUrl: cvpIcon,
      id: "CVP",
      label: "CVP",
    },
    {
      address: tokensByChainId.CW,
      decimals: 18,
      iconUrl: cwIcon,
      id: "CW",
      label: "CW",
    },
    {
      address: tokensByChainId.CWAP,
      decimals: 18,
      iconUrl: cwapIcon,
      id: "CWAP",
      label: "CWAP",
    },
    {
      address: tokensByChainId.DHT,
      decimals: 18,
      iconUrl: dhtIcon,
      id: "DHT",
      label: "DHT",
    },
    {
      address: tokensByChainId.DOUGH,
      decimals: 18,
      iconUrl: doughIcon,
      id: "DOUGH",
      label: "DOUGH",
    },
    {
      address: tokensByChainId.DSU,
      decimals: 18,
      iconUrl: dsuIcon,
      id: "DSU",
      label: "DSU",
    },
    {
      address: tokensByChainId.FARM,
      decimals: 18,
      iconUrl: farmIcon,
      id: "FARM",
      label: "FARM",
    },
    {
      address: tokensByChainId.FLOAT,
      decimals: 18,
      iconUrl: floatIcon,
      id: "FLOAT",
      label: "FLOAT",
    },
    {
      address: tokensByChainId.FOX,
      decimals: 18,
      iconUrl: foxIcon,
      id: "FOX",
      label: "FOX",
    },
    {
      address: tokensByChainId.HOTCROSS,
      decimals: 18,
      iconUrl: hotcrossIcon,
      id: "HOTCROSS",
      label: "HOTCROSS",
    },
    {
      address: tokensByChainId.IAG,
      decimals: 18,
      iconUrl: iagIcon,
      id: "IAG",
      label: "IAG",
    },
    {
      address: tokensByChainId.kMPL,
      decimals: 9,
      iconUrl: kmplIcon,
      id: "kMPL",
      label: "kMPL",
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
      address: tokensByChainId.OCC,
      decimals: 18,
      iconUrl: occIcon,
      id: "OCC",
      label: "OCC",
    },
    {
      address: tokensByChainId.PERCS,
      decimals: 18,
      iconUrl: percsIcon,
      id: "PERCS",
      label: "PERCS",
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
      address: tokensByChainId.THEOS,
      decimals: 18,
      iconUrl: theosIcon,
      id: "THEOS",
      label: "THEOS",
    },
    {
      address: tokensByChainId.UBQ,
      decimals: 18,
      iconUrl: ubqIcon,
      id: "UBQ",
      label: "UBQ",
    },
    {
      address: tokensByChainId.UDT,
      decimals: 18,
      iconUrl: udtIcon,
      id: "UDT",
      label: "UDT",
    },
    {
      address: tokensByChainId.uAD,
      decimals: 18,
      iconUrl: uadIcon,
      id: "uAD",
      label: "uAD",
    },
    {
      address: tokensByChainId.uAR,
      decimals: 18,
      iconUrl: uarIcon,
      id: "uAR",
      label: "uAR",
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
      address: tokensByChainId.wNXM,
      decimals: 18,
      iconUrl: wnxmIcon,
      id: "wNXM",
      label: "wNXM",
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
    {
      address: tokensByChainId.yUSDC,
      decimals: 6,
      iconUrl: yUsdcIcon,
      id: "yUSDC",
      label: "yUSDC",
    },
    {
      address: tokensByChainId.ZEUM,
      decimals: 18,
      iconUrl: zeumIcon,
      id: "ZEUM",
      label: "ZEUM",
    },
  ];

  return tokens.filter(token => {
    return token.address !== undefined;
  });
};
