import {
  callReadOnlyFunction,
  standardPrincipalCV,
  cvToJSON,
} from "@stacks/transactions";
import { toast } from "react-toastify";
import {
  DEFAULT_MAINNET_SERVER,
  MINING_STAKING_ADDRESS,
  MINING_STAKING_NAME,
  NETWORK,
  POOL_ADDRESS,
  POOL_NAME,
  TOKEN_ADDRESS,
  TOKEN_NAME,
} from "./stx";

/* 
Fetch the staking history of a principal
*/
export const fetchPrincipalStakingHistory = async (principal: string) => {
  try {
    const readOnlyCall = await callReadOnlyFunction({
      contractName: MINING_STAKING_NAME,
      contractAddress: MINING_STAKING_ADDRESS,
      functionName: "get-pool",
      functionArgs: [standardPrincipalCV(principal)],
      senderAddress: principal,
      network: NETWORK,
    });

    //console.log("readOnlyCall", readOnlyCall);
    const contractCallResult = cvToJSON(readOnlyCall);

    return contractCallResult;
  } catch (err) {
    const cleanAddy = `${principal.substring(0, 4)}...${principal.substring(
      principal.length - 4
    )}`;
    console.log(` ${cleanAddy} has no Staking history`);
    //toast.error(` ${cleanAddy} has no Staking history`);
    return null;
  }
};

/*
Fetch the mining history of a principal 
*/
export const fetchUserPoolsData = async (principal: string) => {
  try {
    const readOnlyCall = await callReadOnlyFunction({
      contractName: MINING_STAKING_NAME,
      contractAddress: MINING_STAKING_ADDRESS,
      functionName: "get-user-mining",
      functionArgs: [standardPrincipalCV(principal)],
      senderAddress: principal,
      network: NETWORK,
    });

    const contractCallResult = cvToJSON(readOnlyCall);

    return contractCallResult;
  } catch (err) {
    const cleanAddy = `${principal.substring(0, 4)}...${principal.substring(
      principal.length - 4
    )}`;

    toast.error(`${principal} has no Mining history`);
    return null;
  }
};

/* 
  Fetch the latest pool
*/
export const fetchLatestPool = async () => {
  try {
    const readOnlyCall = await callReadOnlyFunction({
      contractName: POOL_NAME,
      contractAddress: POOL_ADDRESS,
      functionName: "get-latest-pool",
      functionArgs: [],
      senderAddress: "ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA",
      network: NETWORK,
    });

    const contractCallResult = cvToJSON(readOnlyCall);

    return contractCallResult;
  } catch (err) {
    console.log("fetchLatestPool err :(", err);
    return null;
  }
};

/* 
Fetch the amount of Reat in the user wallet 
*/
export const fetchPrincipalTokenBalance = async (principal: string) => {
  try {
    const readOnlyCall = await callReadOnlyFunction({
      contractName: TOKEN_NAME,
      contractAddress: TOKEN_ADDRESS,
      functionName: "get-balance-of",
      functionArgs: [standardPrincipalCV(principal)],
      senderAddress: principal,
      network: NETWORK,
    });

    const contractCallResult = cvToJSON(readOnlyCall);

    return contractCallResult;
  } catch (err) {
    console.log("fetchPrincipalTokenBalance err :(", err);
    return null;
  }
};
/*
Fetch the block Date
*/
export const fetchBlockDate = async (blockHeight: number) => {
  try {
    const blockData = await fetch(
      `${DEFAULT_MAINNET_SERVER}/extended/v1/block/by_height/${blockHeight}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        return data;
      });

    console.log("blockData", blockData);

    return blockData.block_time_iso;
  } catch (err) {
    console.log("fetchBlockDate err :(", err);
    return null;
  }
};

/* 
Fetch the user STX balance
*/

export const fetchPrincipalStxBalance = async (principal: string) => {
  try {
    const stxBalance = await fetch(
      `${DEFAULT_MAINNET_SERVER}/extended/v1/address/${principal}/stx`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        return data;
      });

    return stxBalance.balance;
  } catch (err) {
    console.log("fetchPrincipalStxBalance err :(", err);
    return null;
  }
};
