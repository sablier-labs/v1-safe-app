import { ethers } from "ethers";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const { ethereum } = window as any;
ethereum.enable();
const provider = new ethers.providers.Web3Provider(ethereum);

export default provider;
