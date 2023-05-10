import {
  callReadOnlyFunction,
  standardPrincipalCV,
  cvToJSON,
} from "@stacks/transactions";
import { toast } from "react-toastify";
import {
  CORE_CONTRACT_ADDRESS,
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

    //toast.error(`${principal} has no Mining history`);
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

export const fetchWalletTxs = async (principal: string, offset: number) => {
  try {
    const walletTxs = await fetch(
      `${DEFAULT_MAINNET_SERVER}/extended/v1/address/${principal}/transactions?offset=${offset}&unanchored=true`
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
    return walletTxs;
  } catch (err: any) {
    console.log("fetchWalletTxs", err);
    throw new Error(err);
  }
};

export const fetchPoolHisotry = async (principal: string) => {
  try {
    const walletTxs = (await fetchWalletTxs(principal, 0)) as any;
    let totalFetchedTx = [...walletTxs.results];
    const totalAssetsInWallet = walletTxs.total;

    if (totalAssetsInWallet >= 50) {
      while (totalAssetsInWallet > totalFetchedTx.length) {
        const nextWalletFetchHolding = (await fetchWalletTxs(
          principal,
          totalFetchedTx.length
        )) as any;

        totalFetchedTx = [...totalFetchedTx, ...nextWalletFetchHolding.results];
      }
    }

    const filteredTX = totalFetchedTx
      .filter((tx: any) => {
        return tx.tx_type === "contract_call";
      })
      .filter((tx: any) => {
        //return tx.contract_call.contract_id === `${POOL_ADDRESS}.${POOL_NAME}`;
        const contractAddress = tx.contract_call.contract_id.split(".")[0];
        if (CORE_CONTRACT_ADDRESS === contractAddress) {
          return true;
        } else return false;
      });

    const poolHistory = filteredTX.filter((tx: any) => {
      const txContractName = tx.contract_call.contract_id.split(".")[1];

      if (txContractName === POOL_NAME) {
        return true;
      } else return false;
    });

    const listOfPoolsContributedTo = poolHistory
      .filter((tx: any) => {
        console.log(
          "tx.contract_call.function_name-",
          tx.contract_call.function_name
        );
        if (
          tx.contract_call.function_name === "contribute-pool" &&
          tx.tx_status === "success"
        ) {
          return true;
        }
      })
      .map((d, i) => {
        const poolId = d.contract_call.function_args[0].repr;
        const amount = d.contract_call.function_args[1].repr;

        // remove all non number from string and convert to number
        const poolIdClean = parseInt(poolId.replace(/\D/g, ""));
        const amountWithoutCommas = parseInt(amount.replace(/\D/g, ""));

        return {
          poolId: poolIdClean,
          amount: amountWithoutCommas,
          date: d.burn_block_time_iso,
        };
      });

    const listOfStakingHistory = filteredTX
      .filter((tx: any) => {
        if (
          tx.contract_call.function_name === "stack-many-cycles" &&
          tx.tx_status === "success"
        ) {
          console.log("tx", tx);
          return true;
        }
      })
      .map((d, i) => {
        console.log("listOfStakingHistory - d", d);

        const cycles = d.contract_call.function_args[1].repr;
        const amount = d.contract_call.function_args[0].repr;

        // remove all non number from string and convert to number
        const cycleClean = parseInt(cycles.replace(/\D/g, ""));
        const amountWithoutCommas = parseInt(amount.replace(/\D/g, ""));

        return {
          stackedAmount: amountWithoutCommas,
          date: d.burn_block_time_iso,
          blockHeight: d.block_height,
          cycles: cycleClean,
        };
      });
    //console.log("listOfPoolsContributedTo", listOfPoolsContributedTo);
    console.log("listOfStakingHistory", listOfStakingHistory);
    return {
      listOfStakingHistory,
      listOfPoolsContributedTo,
    };
  } catch (err) {
    console.log("fetchPoolHisotry err :(", err);
    return {
      listOfStakingHistory: [],
      listOfPoolsContributedTo: [],
    };
  }
};
