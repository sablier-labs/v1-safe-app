import Web3 from "web3";

import { Contract } from "web3-eth-contract";
import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { web3Provider } from "../config/config";

import getSablierAddress from "../config/sablier";
import sablierAbi from "../abis/sablier";

const web3: any = new Web3(web3Provider);

const cancelStreamTxs = (network: Networks, streamId: string): Array<object> => {
  const sablierAddress: string = getSablierAddress(network);
  const sablierContract: Contract = new web3.eth.Contract(sablierAbi, sablierAddress);
  const txs: { [key: string]: string | number }[] = [
    {
      to: sablierContract.options.address,
      value: 0,
      data: sablierContract.methods.cancelStream(streamId).encodeABI(),
    },
  ];

  return txs;
};

export default cancelStreamTxs;
