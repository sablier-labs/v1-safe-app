import { Contract } from "@ethersproject/contracts";

import ERC20_ABI from "../abis/erc20";
import useContract from "./useContract";

export default function useTokenContract(tokenAddress?: string): Contract {
  return useContract(ERC20_ABI, tokenAddress);
}
