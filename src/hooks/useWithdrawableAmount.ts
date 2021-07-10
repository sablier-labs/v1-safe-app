import { BigNumber } from "@ethersproject/bignumber";
import { AddressZero, Zero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { useEffect, useState } from "react";

import { CUTOFF_STREAM_ID } from "../constants";
import useSablierContract from "./useSablierContract";

export default function useWithdrawableAmount(streamId: number, recipient: string): BigNumber {
  const sablierContract: Contract = useSablierContract();
  const [withdrawableAmount, setWithdrawableAmount] = useState<BigNumber>(Zero);

  useEffect(() => {
    const controller: AbortController = new AbortController();

    async function getWithdrawableAmount(): Promise<void> {
      if (sablierContract.address === AddressZero) {
        return;
      }

      try {
        let newWithdrawableAmount: BigNumber;

        if (BigNumber.from(streamId).gte(CUTOFF_STREAM_ID)) {
          newWithdrawableAmount = await sablierContract.balanceOf(streamId, recipient);
        } else {
          newWithdrawableAmount = Zero;
          // TODO: figure out how to calculate this ...
        }

        if (!controller.signal.aborted) {
          setWithdrawableAmount(newWithdrawableAmount);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error while getting the withdrawable amount", error);
        }
      }
    }

    void getWithdrawableAmount();

    return () => {
      controller.abort();
    };
  }, [recipient, sablierContract, setWithdrawableAmount, streamId]);

  return withdrawableAmount;
}
