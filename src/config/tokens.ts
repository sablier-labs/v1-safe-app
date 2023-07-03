import sortBy from "lodash.sortby";

import {
  ARBITRUM_MAINNET_ID,
  AVALANCHE_MAINNET_ID,
  BSC_MAINNET_ID,
  ETHEREUM_MAINNET_ID,
  GOERLI_ID,
  OPTIMISM_MAINNET_ID,
  POLYGON_MAINNET_ID,
} from "../constants/chains";
import type { SablierChainId, TokenItem } from "../types";

type TokenMap = { [key in SablierChainId]: TokenItem[] };

// It's okay to leave the "iconUrl" property empty at this step
const TOKENS: TokenMap = {
  [ARBITRUM_MAINNET_ID]: [
    { address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", decimals: 18, iconUrl: "", id: "DAI", label: "DAI" },
    { address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4", decimals: 18, iconUrl: "", id: "LINK", label: "LINK" },
    {
      address: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
      decimals: 18,
      iconUrl: "",
      id: "MAI",
      label: "MAI",
    },
    { address: "0x51318B7D00db7ACc4026C88c3952B66278B6A67F", decimals: 18, iconUrl: "", id: "PLS", label: "PLS" },
    { address: "0xb9c8f0d3254007ee4b98970b94544e473cd610ec", decimals: 18, iconUrl: "", id: "QI", label: "QI" },
    { address: "0x0C4681e6C0235179ec3D4F4fc4DF3d14FDD96017", decimals: 18, iconUrl: "", id: "RDNT", label: "RDNT" },
    { address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", decimals: 6, iconUrl: "", id: "USDC", label: "USDC" },
    { address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", decimals: 6, iconUrl: "", id: "USDT", label: "USDT" },
    { address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", decimals: 8, iconUrl: "", id: "WBTC", label: "WBTC" },
    { address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", decimals: 18, iconUrl: "", id: "WETH", label: "WETH" },
  ],
  [AVALANCHE_MAINNET_ID]: [
    { address: "0x9366d30FeBA284E62900f6295BC28c9906f33172", decimals: 6, iconUrl: "", id: "BioFi", label: "BioFi" },
    { address: "0x80B010450fDAf6a3f8dF033Ee296E92751D603B3", decimals: 18, iconUrl: "", id: "JADE", label: "JADE" },
    {
      address: "0x5c49b268c9841aff1cc3b0a418ff5c3442ee3f3b",
      decimals: 18,
      iconUrl: "",
      id: "MAI",
      label: "MAI",
    },
    { address: "0xA56F9A54880afBc30CF29bB66d2D9ADCdcaEaDD6", decimals: 18, iconUrl: "", id: "QI", label: "QI" },
    {
      address: "0x416494bD4FbEe227313b76a07A1e859928D7bA47",
      decimals: 18,
      iconUrl: "",
      id: "USDCe-TIC-SLP.e",
      label: "USDCe-TIC-SLP.e",
    },
  ],
  [BSC_MAINNET_ID]: [
    { address: "0x111111111117dC0aa78b770fA6A738034120C302", decimals: 18, iconUrl: "", id: "1INCH", label: "1INCH" },
    { address: "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B", decimals: 18, iconUrl: "", id: "BOB", label: "BOB" },
    { address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18, iconUrl: "", id: "BUSD", label: "BUSD" },
    { address: "0xe20b9e246db5a0d21bf9209e4858bc9a3ff7a034", decimals: 18, iconUrl: "", id: "bWBAN", label: "bWBAN" },
    { address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", decimals: 18, iconUrl: "", id: "CAKE", label: "CAKE" },
    { address: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8", decimals: 18, iconUrl: "", id: "COMP", label: "COMP" },
    { address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3", decimals: 18, iconUrl: "", id: "DAI", label: "DAI" },
    { address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", decimals: 18, iconUrl: "", id: "ETH", label: "ETH" },
    { address: "0x1935C03bB7DbC3623bD992CE599bC26bD30A43EB", decimals: 18, iconUrl: "", id: "FS", label: "FS" },
    {
      address: "0x4FA7163E153419E0E1064e418dd7A99314Ed27b6",
      decimals: 18,
      iconUrl: "",
      id: "HOTCROSS",
      label: "HOTCROSS",
    },
    { address: "0x7ad7242A99F21aa543F9650A56D141C57e4F6081", decimals: 18, iconUrl: "", id: "JADE", label: "JADE" },
    { address: "0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350", decimals: 18, iconUrl: "", id: "MKR", label: "MKR" },
    { address: "0x4265af66537F7BE1Ca60Ca6070D97531EC571BDd", decimals: 18, iconUrl: "", id: "mzeLLP", label: "mzeLLP" },
    { address: "0xb7F8Cd00C5A06c0537E2aBfF0b58033d02e5E094", decimals: 18, iconUrl: "", id: "PAX", label: "PAX" },
    { address: "0x595c8481c48894771CE8FaDE54ac6Bf59093F9E8", decimals: 18, iconUrl: "", id: "POLK", label: "POLK" },
    { address: "0xB5C42F84Ab3f786bCA9761240546AA9cEC1f8821", decimals: 18, iconUrl: "", id: "snrLLP", label: "snrLLP" },
    { address: "0xe2a59D5E33c6540E18aAA46BF98917aC3158Db0D", decimals: 18, iconUrl: "", id: "UFI", label: "UFI" },
    { address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1", decimals: 18, iconUrl: "", id: "UNI", label: "UNI" },
    { address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18, iconUrl: "", id: "USDC", label: "USDC" },
    { address: "0xb3c11196A4f3b1da7c23d9FB0A3dDE9c6340934F", decimals: 18, iconUrl: "", id: "USDP", label: "USDP" },
    { address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18, iconUrl: "", id: "USDT", label: "USDT" },
    { address: "0x23396cF899Ca06c4472205fC903bDB4de249D6fC", decimals: 18, iconUrl: "", id: "UST", label: "UST" },
    { address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", decimals: 18, iconUrl: "", id: "WBNB", label: "WBNB" },
    { address: "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e", decimals: 18, iconUrl: "", id: "YFI", label: "YFI" },
    {
      address: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
      decimals: 18,
      iconUrl: "",
      id: "MAI",
      label: "MAI",
    },
  ],
  [ETHEREUM_MAINNET_ID]: [
    { address: "0x3301Ee63Fb29F863f2333Bd4466acb46CD8323E6", decimals: 18, iconUrl: "", id: "AKITA", label: "AKITA" },
    { address: "0x6C16119B20fa52600230F074b349dA3cb861a7e3", decimals: 18, iconUrl: "", id: "ALK", label: "ALK" },
    { address: "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF", decimals: 18, iconUrl: "", id: "ALCX", label: "ALCX" },
    { address: "0xa117000000f279D81A1D3cc75430fAA017FA5A2e", decimals: 18, iconUrl: "", id: "ANT", label: "ANT" },
    { address: "0xAaAAAA20D9E0e2461697782ef11675f668207961", decimals: 18, iconUrl: "", id: "AURORA", label: "AURORA" },
    { address: "0x1321f1f1aa541A56C31682c57b80ECfCCd9bB288", decimals: 18, iconUrl: "", id: "ARCX", label: "ARCX" },
    { address: "0xba100000625a3754423978a60c9317c58a424e3D", decimals: 18, iconUrl: "", id: "BAL", label: "BAL" },
    { address: "0x24A6A37576377F63f194Caa5F518a60f45b42921", decimals: 18, iconUrl: "", id: "BANK-1", label: "BANK" },
    { address: "0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198", decimals: 18, iconUrl: "", id: "BANK-2", label: "BANK" },
    { address: "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B", decimals: 18, iconUrl: "", id: "BOB", label: "BOB" },
    {
      address: "0x9E3c6575f674BdeE85731d23259971Aa6ddA7b9b",
      decimals: 18,
      iconUrl: "",
      id: "BREWSKI",
      label: "BREWSKI",
    },
    { address: "0x4E672e34B6db16dD5307a6bFD4f343998Aac55E1", decimals: 18, iconUrl: "", id: "BTP", label: "BTP" },
    { address: "0x56d811088235F11C8920698a204A5010a788f4b3", decimals: 18, iconUrl: "", id: "BZRX", label: "BZRX" },
    { address: "0x08ba718F288c3b12B01146816bef9FA03cC635bc", decimals: 18, iconUrl: "", id: "CENT", label: "CENT" },
    { address: "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215", decimals: 18, iconUrl: "", id: "CHAI", label: "CHAI" },
    { address: "0xA01199c61841Fce3b3daFB83FeFC1899715c8756", decimals: 18, iconUrl: "", id: "CIRUS", label: "CIRUS" },
    { address: "0xC926F9a6521879D30696101F2e1A8cf5da91818B", decimals: 18, iconUrl: "", id: "COLL", label: "COLL" },
    { address: "0xfFffFffF2ba8F66D4e51811C5190992176930278", decimals: 18, iconUrl: "", id: "COMBO", label: "COMBO" },
    { address: "0xaa61D5dec73971CD4a026ef2820bB87b4a4Ed8d6", decimals: 18, iconUrl: "", id: "CRE8R", label: "CRE8R" },
    { address: "0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1", decimals: 18, iconUrl: "", id: "CVP", label: "CVP" },
    { address: "0xd55236D48606c295adEbF129dAD04Fc74BFaA708", decimals: 18, iconUrl: "", id: "CW", label: "CW" },
    { address: "0xE74dC43867E0cbEB208F1a012fc60DcBbF0E3044", decimals: 18, iconUrl: "", id: "CWAP", label: "CWAP" },
    { address: "0x43D4A3cd90ddD2F8f4f693170C9c8098163502ad", decimals: 18, iconUrl: "", id: "D2D", label: "D2D" },
    { address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18, iconUrl: "", id: "DAI", label: "DAI" },
    { address: "0xca1207647Ff814039530D7d35df0e1Dd2e91Fa84", decimals: 18, iconUrl: "", id: "DHT", label: "DHT" },
    { address: "0x0AbdAce70D3790235af448C88547603b945604ea", decimals: 18, iconUrl: "", id: "DNT", label: "DNT" },
    { address: "0xBAac2B4491727D78D2b78815144570b9f2Fe8899", decimals: 18, iconUrl: "", id: "DOG", label: "DOG" },
    { address: "0xad32A8e6220741182940c5aBF610bDE99E737b2D", decimals: 18, iconUrl: "", id: "DOUGH", label: "DOUGH" },
    { address: "0x605D26FBd5be761089281d5cec2Ce86eeA667109", decimals: 18, iconUrl: "", id: "DSU", label: "DSU" },
    { address: "0x92915c346287DdFbcEc8f86c8EB52280eD05b3A3", decimals: 18, iconUrl: "", id: "EEFI", label: "EEFI" },
    { address: "0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d", decimals: 18, iconUrl: "", id: "ELFI", label: "ELFI" },
    { address: "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72", decimals: 18, iconUrl: "", id: "ENS", label: "ENS" },
    { address: "0x59E9261255644c411AfDd00bD89162d09D862e38", decimals: 18, iconUrl: "", id: "ETHA", label: "ETHA" },
    { address: "0xa0246c9032bC3A600820415aE600c6388619A14D", decimals: 18, iconUrl: "", id: "FARM", label: "FARM" },
    { address: "0xb05097849BCA421A3f51B249BA6CCa4aF4b97cb9", decimals: 18, iconUrl: "", id: "FLOAT", label: "FLOAT" },
    { address: "0x6243d8CEA23066d098a15582d81a598b4e8391F4", decimals: 18, iconUrl: "", id: "FLX-1", label: "FLX" },
    { address: "0x3Ea8ea4237344C9931214796d9417Af1A1180770", decimals: 18, iconUrl: "", id: "FLX-2", label: "FLX" },
    { address: "0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d", decimals: 18, iconUrl: "", id: "FOX", label: "FOX" },
    { address: "0x1f81f8f262714cc932141c7C79495B481eF27258", decimals: 18, iconUrl: "", id: "FRAK", label: "FRAK" },
    { address: "0x6307b25a665efc992ec1c1bc403c38f3ddd7c661", decimals: 4, iconUrl: "", id: "GCR", label: "GCR" },
    { address: "0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F", decimals: 18, iconUrl: "", id: "GTC", label: "GTC" },
    {
      address: "0x4297394c20800E8a38A619A243E9BbE7681Ff24E",
      decimals: 18,
      iconUrl: "",
      id: "HOTCROSS",
      label: "HOTCROSS",
    },
    { address: "0x4b9278b94a1112cAD404048903b8d343a810B07e", decimals: 18, iconUrl: "", id: "HIFI", label: "HIFI" },
    { address: "0x40EB746DEE876aC1E78697b7Ca85142D178A1Fc8", decimals: 18, iconUrl: "", id: "IAG", label: "IAG" },
    { address: "0x111111517e4929D3dcbdfa7CCe55d30d4B6BC4d6", decimals: 18, iconUrl: "", id: "ICHI", label: "ICHI" },
    { address: "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF", decimals: 18, iconUrl: "", id: "IMX", label: "IMX" },
    { address: "0xf5f06fFa53Ad7F5914F493F16E57B56C8dd2eA80", decimals: 18, iconUrl: "", id: "JELLY", label: "JELLY" },
    { address: "0xE80C0cd204D654CEbe8dd64A4857cAb6Be8345a3", decimals: 18, iconUrl: "", id: "JPEG", label: "JPEG" },
    { address: "0x3af33bEF05C2dCb3C7288b77fe1C8d2AeBA4d789", decimals: 18, iconUrl: "", id: "KROM", label: "KROM" },
    { address: "0xA6586E19EF681b1AC0ED3D46413D199a555dBB95", decimals: 18, iconUrl: "", id: "LETSGO", label: "LETSGO" },
    { address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", decimals: 18, iconUrl: "", id: "LINK", label: "LINK" },
    { address: "0x6DEA81C8171D0bA574754EF6F8b412F2Ed88c54D", decimals: 18, iconUrl: "", id: "LQTY", label: "LQTY" },
    { address: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0", decimals: 18, iconUrl: "", id: "LUSD", label: "LUSD" },
    { address: "0xAa4e3edb11AFa93c41db59842b29de64b72E355B", decimals: 18, iconUrl: "", id: "MFI", label: "MFI" },
    { address: "0x88ACDd2a6425c3FaAE4Bc9650Fd7E27e0Bebb7aB", decimals: 18, iconUrl: "", id: "MIST", label: "MIST" },
    { address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", decimals: 18, iconUrl: "", id: "MKR", label: "MKR" },
    { address: "0x33349B282065b0284d756F0577FB39c158F935e6", decimals: 18, iconUrl: "", id: "MPL", label: "MPL" },
    { address: "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2", decimals: 18, iconUrl: "", id: "MTA", label: "MTA" },
    { address: "0xB6Ca7399B4F9CA56FC27cBfF44F4d2e4Eef1fc81", decimals: 18, iconUrl: "", id: "MUSE", label: "MUSE" },
    { address: "0x333A4823466879eeF910A04D473505da62142069", decimals: 18, iconUrl: "", id: "NATION", label: "NATION" },
    { address: "0x2F109021aFe75B949429fe30523Ee7C0D5B27207", decimals: 18, iconUrl: "", id: "OCC", label: "OCC" },
    { address: "0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26", decimals: 18, iconUrl: "", id: "OGN", label: "OGN" },
    { address: "0x9c354503C38481a7A7a51629142963F98eCC12D0", decimals: 18, iconUrl: "", id: "OGV", label: "OGV" },
    { address: "0x2A8e1E676Ec238d8A992307B495b45B3fEAa5e86", decimals: 18, iconUrl: "", id: "OUSD", label: "OUSD" },
    { address: "0x60bE1e1fE41c1370ADaF5d8e66f07Cf1C2Df2268", decimals: 18, iconUrl: "", id: "PERC", label: "PERC" },
    { address: "0x429881672b9ae42b8eba0e26cd9c73711b891ca5", decimals: 18, iconUrl: "", id: "PICKLE", label: "PICKLE" },
    { address: "0x0198f46f520F33cd4329bd4bE380a25a90536CD5", decimals: 18, iconUrl: "", id: "PLA", label: "PLA" },
    { address: "0xD478161C952357F05f0292B56012Cd8457F1cfbF", decimals: 18, iconUrl: "", id: "POLK", label: "POLK" },
    { address: "0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e", decimals: 18, iconUrl: "", id: "POOL", label: "POOL" },
    { address: "0x4dd28568D05f09b02220b09C2cb307bFd837cb95", decimals: 18, iconUrl: "", id: "PRINTS", label: "PRINTS" },
    { address: "0x466a756E9A7401B5e2444a3fCB3c2C12FBEa0a54", decimals: 18, iconUrl: "", id: "PUSd", label: "PUSd" },
    { address: "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919", decimals: 18, iconUrl: "", id: "RAI", label: "RAI" },
    { address: "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b", decimals: 18, iconUrl: "", id: "RLY", label: "RLY" },
    { address: "0xE94B97b6b43639E238c851A7e693F50033EfD75C", decimals: 18, iconUrl: "", id: "RNBW", label: "RNBW" },
    { address: "0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a", decimals: 18, iconUrl: "", id: "ROOK", label: "ROOK" },
    { address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", decimals: 18, iconUrl: "", id: "SHIB", label: "SHIB" },
    { address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2", decimals: 18, iconUrl: "", id: "SUSHI", label: "SUSHI" },
    { address: "0x9e10f61749c4952C320412A6B26901605Ff6Da1d", decimals: 18, iconUrl: "", id: "THEOS", label: "THEOS" },
    { address: "0x869d1b8610c038A6C4F37bD757135d4C29ae8917", decimals: 18, iconUrl: "", id: "TIME-2", label: "TIME" },
    { address: "0x0000000000085d4780B73119b644AE5ecd22b376", decimals: 18, iconUrl: "", id: "TUSD", label: "TUSD" },
    { address: "0x4e38D89362f7e5db0096CE44ebD021c3962aA9a0", decimals: 18, iconUrl: "", id: "UBQ", label: "UBQ" },
    { address: "0x90DE74265a416e1393A450752175AED98fe11517", decimals: 18, iconUrl: "", id: "UDT", label: "UDT" },
    { address: "0xcDa4e840411C00a614aD9205CAEC807c7458a0E3", decimals: 18, iconUrl: "", id: "UFI", label: "UFI" },
    { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, iconUrl: "", id: "USDC", label: "USDC" },
    { address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6, iconUrl: "", id: "USDT", label: "USDT" },
    { address: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD", decimals: 18, iconUrl: "", id: "UST", label: "UST" },
    { address: "0x249cA82617eC3DfB2589c4c17ab7EC9765350a18", decimals: 18, iconUrl: "", id: "VERSE", label: "VERSE" },
    { address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, iconUrl: "", id: "WBTC", label: "WBTC" },
    { address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18, iconUrl: "", id: "WETH", label: "WETH" },
    { address: "0xD2af830E8CBdFed6CC11Bab697bB25496ed6FA62", decimals: 18, iconUrl: "", id: "wOUSD", label: "wOUSD" },
    { address: "0x436dA116249044E8B4464F0Cf21Dd93311d88190", decimals: 18, iconUrl: "", id: "ZEUM", label: "ZEUM" },
    { address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643", decimals: 8, iconUrl: "", id: "cDAI", label: "cDAI" },
    { address: "0x39AA39c021dfbaE8faC545936693aC917d5E7563", decimals: 8, iconUrl: "", id: "cUSDC", label: "cUSDC" },
    { address: "0x53dfEa0A8CC2A2A2e425E1C174Bc162999723ea0", decimals: 18, iconUrl: "", id: "jCHF", label: "jCHF" },
    { address: "0x0f17BC9a994b87b5225cFb6a2Cd4D667ADb4F20B", decimals: 18, iconUrl: "", id: "jEUR", label: "jEUR" },
    { address: "0x7409856CAE628f5d578B285B45669b36E7005283", decimals: 18, iconUrl: "", id: "jGBP", label: "jGBP" },
    { address: "0xe8D17542dfe79Ff4FBd4b850f2d39DC69c4489a2", decimals: 9, iconUrl: "", id: "kMPL", label: "kMPL" },
    { address: "0xe2f2a5C287993345a840Db3B0845fbC70f5935a5", decimals: 18, iconUrl: "", id: "mUSD", label: "mUSD" },
    { address: "0x57Ab1E02fEE23774580C119740129eAC7081e9D3", decimals: 18, iconUrl: "", id: "sUSD", label: "sUSD" },
    { address: "0x0F644658510c95CB46955e55D7BA9DDa9E9fBEc6", decimals: 18, iconUrl: "", id: "uAD", label: "uAD" },
    { address: "0x5894cFEbFdEdBe61d01F20140f41c5c49AedAe97", decimals: 18, iconUrl: "", id: "uAR", label: "uAR" },
    { address: "0x24265E2976571Be945FBBC6d7Ddda024Ad377c60", decimals: 18, iconUrl: "", id: "vFOX", label: "vFOX" },
    { address: "0x0d438F3b5175Bebc262bF23753C1E53d03432bDE", decimals: 18, iconUrl: "", id: "wNXM", label: "wNXM" },
    { address: "0xebF2096E01455108bAdCbAF86cE30b6e5A72aa52", decimals: 6, iconUrl: "", id: "XIDR", label: "XIDR" },
    { address: "0x70e8de73ce538da2beed35d14187f6959a8eca96", decimals: 6, iconUrl: "", id: "XSGD", label: "XSGD" },
    { address: "0x47BE779De87de6580d0548cde80710a93c502405", decimals: 18, iconUrl: "", id: "xRNBW", label: "xRNBW" },
    { address: "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272", decimals: 18, iconUrl: "", id: "xSUSHI", label: "xSUSHI" },
    { address: "0x0AaCfbeC6a24756c20D41914F2caba817C0d8521", decimals: 18, iconUrl: "", id: "YAM", label: "YAM" },
    { address: "0x69bBC3F8787d573F1BBDd0a5f40C7bA0Aee9BCC9", decimals: 18, iconUrl: "", id: "YUP", label: "YUP" },
    { address: "0x597ad1e0c13bfe8025993d9e79c69e1c0233522e", decimals: 6, iconUrl: "", id: "yUSDC", label: "yUSDC" },
  ],
  [GOERLI_ID]: [
    { address: "0x97cb342Cf2F6EcF48c1285Fb8668f5a4237BF862", decimals: 18, iconUrl: "", id: "DAI", label: "DAI" },
    { address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", decimals: 18, iconUrl: "", id: "WETH", label: "WETH" },
  ],
  [OPTIMISM_MAINNET_ID]: [
    { address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", decimals: 18, iconUrl: "", id: "DAI", label: "DAI" },
    { address: "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B", decimals: 18, iconUrl: "", id: "BOB", label: "BOB" },
  ],
  [POLYGON_MAINNET_ID]: [
    { address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", decimals: 18, iconUrl: "", id: "AAVE", label: "AAVE" },
    { address: "0xD7F3aaC7557c213b035C19Bd89bd693396accCD6", decimals: 18, iconUrl: "", id: "ART", label: "ART" },
    { address: "0xDB7Cb471dd0b49b29CAB4a1C14d070f27216a0Ab", decimals: 18, iconUrl: "", id: "BANK-2", label: "BANK" },
    { address: "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B", decimals: 18, iconUrl: "", id: "BOB", label: "BOB" },
    { address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7", decimals: 18, iconUrl: "", id: "BUSD", label: "BUSD" },
    { address: "0x15818fEcC63980Df26D3a369bdD860d92A265b69", decimals: 18, iconUrl: "", id: "CBL", label: "CBL" },
    { address: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c", decimals: 18, iconUrl: "", id: "COMP", label: "COMP" },
    { address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", decimals: 18, iconUrl: "", id: "DAI", label: "DAI" },
    { address: "0xfdF80c001f182E76894DEA7dD10e52D9Fb0F9715", decimals: 18, iconUrl: "", id: "DANK", label: "DANK" },
    { address: "0x8C92e38eCA8210f4fcBf17F0951b198Dd7668292", decimals: 18, iconUrl: "", id: "DHT", label: "DHT" },
    { address: "0xbAe28251B2a4E621aA7e20538c06DEe010Bc06DE", decimals: 18, iconUrl: "", id: "DUSD", label: "DUSD" },
    { address: "0x59E9261255644c411AfDd00bD89162d09D862e38", decimals: 18, iconUrl: "", id: "ETHA", label: "ETHA" },
    { address: "0x525b43A49bE2Ed530e3516C22bd7ECbcF1586AD4", decimals: 18, iconUrl: "", id: "FS", label: "FS" },
    { address: "0xD8D9Ce0E4574028EA265cf4eB71d051337979d5A", decimals: 18, iconUrl: "", id: "GC", label: "GC" },
    { address: "0xa69d14d6369E414a32a5C7E729B7afbAfd285965", decimals: 4, iconUrl: "", id: "GCR", label: "GCR" },
    { address: "0x747033ea841324d3e8295bc31CcdBeC58E76165f", decimals: 18, iconUrl: "", id: "METAS", label: "METAS" },
    { address: "0x6f7C932e7684666C9fd1d44527765433e01fF61d", decimals: 18, iconUrl: "", id: "MKR", label: "MKR" },
    { address: "0xF501dd45a1198C2E1b5aEF5314A68B9006D842E0", decimals: 18, iconUrl: "", id: "MTA", label: "MTA" },
    { address: "0x580A84C73811E1839F75d86d75d88cCa0c241fF4", decimals: 18, iconUrl: "", id: "QI", label: "QI" },
    { address: "0x63a81936F9B9081Fac97506188e7ed9c7359ca9E", decimals: 18, iconUrl: "", id: "SHF", label: "SHF" },
    { address: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a", decimals: 18, iconUrl: "", id: "SUSHI", label: "SUSHI" },
    { address: "0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756", decimals: 18, iconUrl: "", id: "TUSD", label: "TUSD" },
    { address: "0xf7E78d9C4c74df889A83C8C8d6D05BF70fF75876", decimals: 18, iconUrl: "", id: "UDT", label: "UDT" },
    { address: "0x3c205C8B3e02421Da82064646788c82f7bd753B9", decimals: 18, iconUrl: "", id: "UFI", label: "UFI" },
    { address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f", decimals: 18, iconUrl: "", id: "UNI", label: "UNI" },
    { address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6, iconUrl: "", id: "USDC", label: "USDC" },
    { address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6, iconUrl: "", id: "USDT", label: "USDT" },
    { address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", decimals: 8, iconUrl: "", id: "WBTC", label: "WBTC" },
    { address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", decimals: 18, iconUrl: "", id: "WETH", label: "WETH" },
    { address: "0x8ca194A3b22077359b5732DE53373D4afC11DeE3", decimals: 18, iconUrl: "", id: "jCAD", label: "jCAD" },
    { address: "0xbD1463F02f61676d53fd183C2B19282BFF93D099", decimals: 18, iconUrl: "", id: "jCHF", label: "jCHF" },
    { address: "0x4e3Decbb3645551B8A19f0eA1678079FCB33fB4c", decimals: 18, iconUrl: "", id: "jEUR", label: "jEUR" },
    { address: "0x767058F11800FBA6A682E73A6e79ec5eB74Fac8c", decimals: 18, iconUrl: "", id: "jGBP", label: "jGBP" },
    { address: "0xa926db7a4CC0cb1736D5ac60495ca8Eb7214B503", decimals: 18, iconUrl: "", id: "jSGD", label: "jSGD" },
    {
      address: "0xa3fa99a148fa48d14ed51d610c367c61876997f1",
      decimals: 18,
      iconUrl: "",
      id: "MAI",
      label: "MAI",
    },
    { address: "0xE840B73E5287865EEc17d250bFb1536704B43B21", decimals: 18, iconUrl: "", id: "mUSD", label: "mUSD" },
    { address: "0xe20b9e246db5a0d21bf9209e4858bc9a3ff7a034", decimals: 18, iconUrl: "", id: "pWBAN", label: "pWBAN" },
    { address: "0x086373fad3447f7f86252fb59d56107e9e0faafa", decimals: 18, iconUrl: "", id: "YUP", label: "YUP" },
    { address: "0x5eC03C1f7fA7FF05EC476d19e34A22eDDb48ACdc", decimals: 18, iconUrl: "", id: "ZED", label: "ZED" },
  ],
};

const CUSTOM_TOKEN_ICONS: string[] = [
  "ALK",
  "ALCX",
  "AURORA",
  "ART",
  "ARCX",
  "BANK-1",
  "BANK-2",
  "BioFi",
  "BOB",
  "BREWSKI",
  "BTP",
  "BUSD",
  "bWBAN",
  "CBL",
  "CENT",
  "CIRUS",
  "COLL",
  "COMBO",
  "COMP",
  "CRE8R",
  "CW",
  "CWAP",
  "D2D",
  "DAI",
  "DANK",
  "DHT",
  "DNT",
  "DOG",
  "DOUGH",
  "DSU",
  "DUSD",
  "EEFI",
  "ELFI",
  "ETHA",
  "HOTCROSS",
  "FLX-1",
  "FLX-2",
  "FRAK",
  "FS",
  "GC",
  "GCR",
  "GTC",
  "HIFI",
  "IAG",
  "ICHI",
  "IMX",
  "jCAD",
  "jCHF",
  "JELLY",
  "jEUR",
  "jJPY",
  "jGBP",
  "JPEG",
  "jSGD",
  "JADE",
  "KROM",
  "kMPL",
  "LETSGO",
  "LINK",
  "LQTY",
  "LUSD",
  "MAI",
  "METAS",
  "MFI",
  "MIST",
  "MKR",
  "MPL",
  "MTA",
  "mUSD",
  "MUSE",
  "mzeLLP",
  "NATION",
  "OGV",
  "OUSD",
  "PERC",
  "PICKLE",
  "PLS",
  "POLK",
  "POOL",
  "PRINTS",
  "PUSd",
  "pWBAN",
  "QI",
  "RAI",
  "RDNT",
  "RNBW",
  "ROOK",
  "SHF",
  "snrLLP",
  "THEOS",
  "TIME-1",
  "TIME-2",
  "TUSD",
  "uAD",
  "uAR",
  "UBQ",
  "UDT",
  "UFI",
  "USDCe-TIC-SLP.e",
  "USDP",
  "VERSE",
  "vFOX",
  "XIDR",
  "XSGD",
  "xRNBW",
  "WBTC",
  "wOUSD",
  "YAM",
  "YUP",
  "yUSDC",
  "ZEUM",
  "ZED",
];

const SYMBOL_COLLISIONS: { [chainId: number]: { [address: string]: string } } = {
  [AVALANCHE_MAINNET_ID]: {
    "0xb54f16fB19478766A268F172C9480f8da1a7c9C3": "TIME-1",
  },
  [ETHEREUM_MAINNET_ID]: {
    "0x24A6A37576377F63f194Caa5F518a60f45b42921": "BANK-1",
    "0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198": "BANK-2",
    "0x6243d8CEA23066d098a15582d81a598b4e8391F4": "FLX-1",
    "0x3Ea8ea4237344C9931214796d9417Af1A1180770": "FLX-2",
    "0x869d1b8610c038A6C4F37bD757135d4C29ae8917": "TIME-2",
  },
  [POLYGON_MAINNET_ID]: {
    "0xDB7Cb471dd0b49b29CAB4a1C14d070f27216a0Ab": "BANK-2",
  },
};

function getIconUrl(chainId: SablierChainId, address: string, symbol: string): string {
  // Some tokens share the same symbol, e.g. Flex Ungovernance Token and Flux Token.
  let untangledSymbol = symbol;
  if (SYMBOL_COLLISIONS[chainId] && SYMBOL_COLLISIONS[chainId][address]) {
    untangledSymbol = SYMBOL_COLLISIONS[chainId][address];
  }

  // Some tokens are not part of the "trustwallet/assets" repository, we load them from "sablier-labs/assets".
  if (CUSTOM_TOKEN_ICONS.includes(untangledSymbol)) {
    return "https://raw.githubusercontent.com/sablier-labs/assets/main/tokens/" + untangledSymbol + ".png";
  }

  let chain = "";
  switch (chainId) {
    case ARBITRUM_MAINNET_ID:
      chain = "arbitrum";
      break;
    case AVALANCHE_MAINNET_ID:
      chain = "avalanche";
      break;
    case BSC_MAINNET_ID:
      chain = "smartchain";
      break;
    case OPTIMISM_MAINNET_ID:
      chain = "optimism";
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

export function getTokens(chainId: SablierChainId): TokenItem[] {
  const tokensByChainId: TokenItem[] = TOKENS[chainId];
  if (!tokensByChainId) {
    throw Error(`No token configuration for ${chainId}`);
  }

  // Add the icon URL as a property to each token in the array.
  const tokensWithIcons = tokensByChainId.map((token) => {
    const tokenWithIcon = token;
    tokenWithIcon.iconUrl = getIconUrl(chainId, token.address, token.label);
    return tokenWithIcon;
  });

  // Sort the tokens alphabetically.
  const sortedTokens = sortBy(tokensWithIcons, "label");

  return sortedTokens;
}
