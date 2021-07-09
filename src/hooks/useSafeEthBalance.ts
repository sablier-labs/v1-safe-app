import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { useEffect, useState } from "react";

export default function useSafeEthBalance(): string {
  const { safe, sdk } = useSafeAppsSDK();
  const [ethBalance, setEthBalance] = useState<string>("0");

  useEffect(() => {
    async function getBalance(): Promise<void> {
      if (!safe.safeAddress) {
        return;
      }

      const ethBalanceHex: string = await sdk.eth.getBalance([safe.safeAddress]);
      const ethBalanceBn: BigNumber = BigNumber.from(ethBalanceHex);
      setEthBalance(formatUnits(ethBalanceBn, "ether"));
    }

    void getBalance();
  }, [sdk, setEthBalance]);

  return ethBalance;
}
