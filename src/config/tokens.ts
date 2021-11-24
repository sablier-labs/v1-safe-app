import { BSC_MAINNET_ID, ETHEREUM_MAINNET_ID, POLYGON_MAINNET_ID, RINKEBY_ID } from "../constants/chains";
import type { SablierChainId, TokenItem } from "../types";

type TokenMap = { [key in SablierChainId]: TokenItem[] };

const CUSTOM_TOKEN_ICONS: string[] = [
  "BTP",
  "BUSD",
  "CBL",
  "CENT",
  "CIRUS",
  "COMBO",
  "COMP",
  "CRE8R",
  "CW",
  "CWAP",
  "DOG",
  "DOUGH",
  "DSU",
  "IAG",
  "JELLY",
  "kMPL",
  "MFI",
  "MKR",
  "MPL",
  "MTA",
  "mUSD",
  "MUSE",
  "PERCS",
  "RNBW",
  "THEOS",
  "TUSD",
  "uAD",
  "uAR",
  "UBQ",
  "UDT",
  "USDP",
  "xRNBW",
  "WBTC",
  "yUSDC",
  "ZEUM",
];

function getIconUrl(chainId: SablierChainId, address: string, symbol: string): string {
  // Some tokens are not part of the "trustwallet/assets" repository, we load them from "sablierhq/assets".
  if (CUSTOM_TOKEN_ICONS.includes(symbol)) {
    return "https://raw.githubusercontent.com/sablierhq/assets/main/tokens/" + symbol + ".png";
  }

  let chain = "";
  switch (chainId) {
    case BSC_MAINNET_ID:
      chain = "smartchain";
      break;
    case POLYGON_MAINNET_ID:
      chain = "polygon";
      break;
    default:
      chain = "ethereum";
  }

  return (
    "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/" +
    chain +
    "/assets/" +
    address +
    "/logo.png"
  );
}

const TOKENS: TokenMap = {
  [BSC_MAINNET_ID]: [
    {
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      decimals: 18,
      iconUrl: "",
      id: "BUSD",
      label: "BUSD",
    },
    {
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      decimals: 18,
      iconUrl: "",
      id: "DAI",
      label: "DAI",
    },
    {
      address: "0xb7F8Cd00C5A06c0537E2aBfF0b58033d02e5E094",
      decimals: 18,
      iconUrl: "",
      id: "PAX",
      label: "PAX",
    },
    {
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      decimals: 18,
      iconUrl: "",
      id: "USDC",
      label: "USDC",
    },
    {
      address: "0xb3c11196A4f3b1da7c23d9FB0A3dDE9c6340934F",
      decimals: 18,
      iconUrl: "",
      id: "USDP",
      label: "USDP",
    },
    {
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
      iconUrl: "",
      id: "USDT",
      label: "USDT",
    },
    {
      address: "0x23396cF899Ca06c4472205fC903bDB4de249D6fC",
      decimals: 18,
      iconUrl: "",
      id: "UST",
      label: "UST",
    },
    {
      address: "0x111111111117dC0aa78b770fA6A738034120C302",
      decimals: 18,
      iconUrl: "",
      id: "1INCH",
      label: "1INCH",
    },
    {
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      decimals: 18,
      iconUrl: "",
      id: "CAKE",
      label: "CAKE",
    },
    {
      address: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
      decimals: 18,
      iconUrl: "",
      id: "COMP",
      label: "COMP",
    },
    {
      address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      decimals: 18,
      iconUrl: "",
      id: "ETH",
      label: "ETH",
    },
    {
      address: "0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350",
      decimals: 18,
      iconUrl: "",
      id: "MKR",
      label: "MKR",
    },
    {
      address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
      decimals: 18,
      iconUrl: "",
      id: "UNI",
      label: "UNI",
    },
    {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimals: 18,
      iconUrl: "",
      id: "WBNB",
      label: "WBNB",
    },
    {
      address: "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e",
      decimals: 18,
      iconUrl: "",
      id: "YFI",
      label: "YFI",
    },
  ],
  [ETHEREUM_MAINNET_ID]: [
    // Vanilla stablecoins
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
      iconUrl: "",
      id: "DAI",
      label: "DAI",
    },
    {
      address: "0xe2f2a5C287993345a840Db3B0845fbC70f5935a5",
      decimals: 18,
      iconUrl: "",
      id: "mUSD",
      label: "mUSD",
    },
    {
      address: "0x57Ab1E02fEE23774580C119740129eAC7081e9D3",
      decimals: 18,
      iconUrl: "",
      id: "sUSD",
      label: "sUSD",
    },
    {
      address: "0x0000000000085d4780B73119b644AE5ecd22b376",
      decimals: 18,
      iconUrl: "",
      id: "TUSD",
      label: "TUSD",
    },
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6,
      iconUrl: "",
      id: "USDC",
      label: "USDC",
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
      iconUrl: "",
      id: "USDT",
      label: "USDT",
    },
    {
      address: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
      decimals: 18,
      iconUrl: "",
      id: "UST",
      label: "UST",
    },
    // Interest-bearing stablecoins
    {
      address: "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215",
      decimals: 18,
      iconUrl: "",
      id: "CHAI",
      label: "CHAI",
    },
    {
      address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
      decimals: 8,
      iconUrl: "",
      id: "cDAI",
      label: "cDAI",
    },
    {
      address: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
      decimals: 8,
      iconUrl: "",
      id: "cUSDC",
      label: "cUSDC",
    },
    {
      address: "0x597ad1e0c13bfe8025993d9e79c69e1c0233522e",
      decimals: 6,
      iconUrl: "",
      id: "yUSDC",
      label: "yUSDC",
    },
    // All others
    {
      address: "0xba100000625a3754423978a60c9317c58a424e3D",
      decimals: 18,
      iconUrl: "",
      id: "BAL",
      label: "BAL",
    },
    {
      address: "0x24A6A37576377F63f194Caa5F518a60f45b42921",
      decimals: 18,
      iconUrl: "",
      id: "BANK",
      label: "BANK",
    },
    {
      address: "0x4E672e34B6db16dD5307a6bFD4f343998Aac55E1",
      decimals: 18,
      iconUrl: "",
      id: "BTP",
      label: "BTP",
    },
    {
      address: "0x56d811088235F11C8920698a204A5010a788f4b3",
      decimals: 18,
      iconUrl: "",
      id: "BZRX",
      label: "BZRX",
    },
    {
      address: "0x08ba718F288c3b12B01146816bef9FA03cC635bc",
      decimals: 18,
      iconUrl: "",
      id: "CENT",
      label: "CENT",
    },
    {
      address: "0xA01199c61841Fce3b3daFB83FeFC1899715c8756",
      decimals: 18,
      iconUrl: "",
      id: "CIRUS",
      label: "CIRUS",
    },
    {
      address: "0xfFffFffF2ba8F66D4e51811C5190992176930278",
      decimals: 18,
      iconUrl: "",
      id: "COMBO",
      label: "COMBO",
    },
    {
      address: "0xaa61D5dec73971CD4a026ef2820bB87b4a4Ed8d6",
      decimals: 18,
      iconUrl: "",
      id: "CRE8R",
      label: "CRE8R",
    },
    {
      address: "0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1",
      decimals: 18,
      iconUrl: "",
      id: "CVP",
      label: "CVP",
    },
    {
      address: "0xd55236D48606c295adEbF129dAD04Fc74BFaA708",
      decimals: 18,
      iconUrl: "",
      id: "CW",
      label: "CW",
    },
    {
      address: "0xE74dC43867E0cbEB208F1a012fc60DcBbF0E3044",
      decimals: 18,
      iconUrl: "",
      id: "CWAP",
      label: "CWAP",
    },
    {
      address: "0xca1207647Ff814039530D7d35df0e1Dd2e91Fa84",
      decimals: 18,
      iconUrl: "",
      id: "DHT",
      label: "DHT",
    },
    {
      address: "0xBAac2B4491727D78D2b78815144570b9f2Fe8899",
      decimals: 18,
      iconUrl: "",
      id: "DOG",
      label: "DOG",
    },
    {
      address: "0xad32A8e6220741182940c5aBF610bDE99E737b2D",
      decimals: 18,
      iconUrl: "",
      id: "DOUGH",
      label: "DOUGH",
    },
    {
      address: "0x605D26FBd5be761089281d5cec2Ce86eeA667109",
      decimals: 18,
      iconUrl: "",
      id: "DSU",
      label: "DSU",
    },
    {
      address: "0xa0246c9032bC3A600820415aE600c6388619A14D",
      decimals: 18,
      iconUrl: "",
      id: "FARM",
      label: "FARM",
    },
    {
      address: "0xb05097849BCA421A3f51B249BA6CCa4aF4b97cb9",
      decimals: 18,
      iconUrl: "",
      id: "FLOAT",
      label: "FLOAT",
    },
    {
      address: "0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d",
      decimals: 18,
      iconUrl: "",
      id: "FOX",
      label: "FOX",
    },
    {
      address: "0x4297394c20800E8a38A619A243E9BbE7681Ff24E",
      decimals: 18,
      iconUrl: "",
      id: "HOTCROSS",
      label: "HOTCROSS",
    },
    {
      address: "0x40EB746DEE876aC1E78697b7Ca85142D178A1Fc8",
      decimals: 18,
      iconUrl: "",
      id: "IAG",
      label: "IAG",
    },
    {
      address: "0xf5f06fFa53Ad7F5914F493F16E57B56C8dd2eA80",
      decimals: 18,
      iconUrl: "",
      id: "JELLY",
      label: "JELLY",
    },
    {
      address: "0xe8D17542dfe79Ff4FBd4b850f2d39DC69c4489a2",
      decimals: 9,
      iconUrl: "",
      id: "kMPL",
      label: "kMPL",
    },
    {
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      decimals: 18,
      iconUrl: "",
      id: "LINK",
      label: "LINK",
    },
    {
      address: "0xAa4e3edb11AFa93c41db59842b29de64b72E355B",
      decimals: 18,
      iconUrl: "",
      id: "MFI",
      label: "MFI",
    },
    {
      address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
      decimals: 18,
      iconUrl: "",
      id: "MKR",
      label: "MKR",
    },
    {
      address: "0x33349B282065b0284d756F0577FB39c158F935e6",
      decimals: 18,
      iconUrl: "",
      id: "MPL",
      label: "MPL",
    },
    {
      address: "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2",
      decimals: 18,
      iconUrl: "",
      id: "MTA",
      label: "MTA",
    },
    {
      address: "0xB6Ca7399B4F9CA56FC27cBfF44F4d2e4Eef1fc81",
      decimals: 18,
      iconUrl: "",
      id: "MUSE",
      label: "MUSE",
    },
    {
      address: "0x2F109021aFe75B949429fe30523Ee7C0D5B27207",
      decimals: 18,
      iconUrl: "",
      id: "OCC",
      label: "OCC",
    },
    {
      address: "0xf4A2fd9EC3923558bCA92FC8DdD9CDCAad373068",
      decimals: 18,
      iconUrl: "",
      id: "PERCS",
      label: "PERCS",
    },
    {
      address: "0x0198f46f520F33cd4329bd4bE380a25a90536CD5",
      decimals: 18,
      iconUrl: "",
      id: "PLA",
      label: "PLA",
    },
    {
      address: "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b",
      decimals: 18,
      iconUrl: "",
      id: "RLY",
      label: "RLY",
    },
    {
      address: "0xE94B97b6b43639E238c851A7e693F50033EfD75C",
      decimals: 18,
      iconUrl: "",
      id: "RNBW",
      label: "RNBW",
    },
    {
      address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
      decimals: 18,
      iconUrl: "",
      id: "SUSHI",
      label: "SUSHI",
    },
    {
      address: "0x9e10f61749c4952C320412A6B26901605Ff6Da1d",
      decimals: 18,
      iconUrl: "",
      id: "THEOS",
      label: "THEOS",
    },
    {
      address: "0x4e38D89362f7e5db0096CE44ebD021c3962aA9a0",
      decimals: 18,
      iconUrl: "",
      id: "UBQ",
      label: "UBQ",
    },
    {
      address: "0x90DE74265a416e1393A450752175AED98fe11517",
      decimals: 18,
      iconUrl: "",
      id: "UDT",
      label: "UDT",
    },
    {
      address: "0x0F644658510c95CB46955e55D7BA9DDa9E9fBEc6",
      decimals: 18,
      iconUrl: "",
      id: "uAD",
      label: "uAD",
    },
    {
      address: "0x5894cFEbFdEdBe61d01F20140f41c5c49AedAe97",
      decimals: 18,
      iconUrl: "",
      id: "uAR",
      label: "uAR",
    },
    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      decimals: 8,
      iconUrl: "",
      id: "WBTC",
      label: "WBTC",
    },
    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      iconUrl: "",
      id: "WETH",
      label: "WETH",
    },
    {
      address: "0x0d438F3b5175Bebc262bF23753C1E53d03432bDE",
      decimals: 18,
      iconUrl: "",
      id: "wNXM",
      label: "wNXM",
    },
    {
      address: "0x47BE779De87de6580d0548cde80710a93c502405",
      decimals: 18,
      iconUrl: "",
      id: "xRNBW",
      label: "xRNBW",
    },
    {
      address: "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272",
      decimals: 18,
      iconUrl: "",
      id: "xSUSHI",
      label: "xSUSHI",
    },
    {
      address: "0x436dA116249044E8B4464F0Cf21Dd93311d88190",
      decimals: 18,
      iconUrl: "",
      id: "ZEUM",
      label: "ZEUM",
    },
  ],
  [POLYGON_MAINNET_ID]: [
    {
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      decimals: 18,
      iconUrl: "",
      id: "DAI",
      label: "DAI",
    },
    {
      address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
      decimals: 18,
      iconUrl: "",
      id: "BUSD",
      label: "BUSD",
    },
    {
      address: "0xf35a85C493c49f19bCC176E718865b148958a130",
      decimals: 18,
      iconUrl: "",
      id: "CBL",
      label: "CBL",
    },
    {
      address: "0xE840B73E5287865EEc17d250bFb1536704B43B21",
      decimals: 18,
      iconUrl: "",
      id: "mUSD",
      label: "mUSD",
    },
    {
      address: "0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756",
      decimals: 18,
      iconUrl: "",
      id: "TUSD",
      label: "TUSD",
    },
    {
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      decimals: 6,
      iconUrl: "",
      id: "USDC",
      label: "USDC",
    },
    {
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      decimals: 6,
      iconUrl: "",
      id: "USDT",
      label: "USDT",
    },
    {
      address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
      decimals: 18,
      iconUrl: "",
      id: "AAVE",
      label: "AAVE",
    },
    {
      address: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c",
      decimals: 18,
      iconUrl: "",
      id: "COMP",
      label: "COMP",
    },
    {
      address: "0xF501dd45a1198C2E1b5aEF5314A68B9006D842E0",
      decimals: 18,
      iconUrl: "",
      id: "MTA",
      label: "MTA",
    },
    {
      address: "0x6f7C932e7684666C9fd1d44527765433e01fF61d",
      decimals: 18,
      iconUrl: "",
      id: "MKR",
      label: "MKR",
    },
    {
      address: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a",
      decimals: 18,
      iconUrl: "",
      id: "SUSHI",
      label: "SUSHI",
    },
    {
      address: "0xf7E78d9C4c74df889A83C8C8d6D05BF70fF75876",
      decimals: 18,
      iconUrl: "",
      id: "UDT",
      label: "UDT",
    },
    {
      address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
      decimals: 18,
      iconUrl: "",
      id: "UNI",
      label: "UNI",
    },
    {
      address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
      decimals: 8,
      iconUrl: "",
      id: "WBTC",
      label: "WBTC",
    },
    {
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      decimals: 18,
      iconUrl: "",
      id: "WETH",
      label: "WETH",
    },
  ],
  [RINKEBY_ID]: [
    {
      address: "0x5eD8BD53B0c3fa3dEaBd345430B1A3a6A4e8BD7C",
      decimals: 18,
      iconUrl: "",
      id: "DAI",
      label: "DAI",
    },
    {
      address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
      decimals: 18,
      iconUrl: "",
      id: "WETH",
      label: "WETH",
    },
  ],
};

export function getTokens(chainId: SablierChainId): TokenItem[] {
  const tokensByChainId: TokenItem[] = TOKENS[chainId];
  if (!tokensByChainId) {
    throw Error(`No token configuration for ${chainId}`);
  }

  // Add the icon URL as a property to each token in the array.
  return tokensByChainId.map(token => {
    const tokeWithIcon = token;
    tokeWithIcon.iconUrl = getIconUrl(chainId, token.address, token.label);
    return tokeWithIcon;
  });
}
