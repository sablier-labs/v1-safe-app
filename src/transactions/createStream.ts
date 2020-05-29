import Web3 from "web3";

import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { web3Provider } from "../config/config";

import getSablierAddress from "../config/sablier";
import sablierAbi from "../abis/sablier";

const web3: any = new Web3(web3Provider);

const createStreamTxs = (
  network: Networks,
  recipient: string,
  deposit: string,
  tokenInstance: any,
  startTime: string,
  stopTime: string,
): Array<object> => {
  const sablierAddress = getSablierAddress(network);
  const sablierContract = new web3.eth.Contract(sablierAbi, sablierAddress);
  const txs = [
    {
      to: tokenInstance.options.address,
      value: 0,
      data: tokenInstance.methods.approve(sablierContract.options.address, deposit).encodeABI(),
    },
    {
      to: sablierContract.options.address,
      value: 0,
      data: sablierContract.methods
        .createStream(recipient, deposit, tokenInstance.options.address, startTime, stopTime)
        .encodeABI(),
    },
  ];

  return txs;
};

export default createStreamTxs;
