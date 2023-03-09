import {
  AccountsApi,
  AddressNftListResponse,
  BlocksApi,
  Configuration,
  Middleware,
  SmartContractsApi,
  TransactionsApi,
} from "@stacks/blockchain-api-client";
import { callReadOnlyFunction, cvToJSON, uintCV } from "@stacks/transactions";

import { AppConfig, UserSession } from "@stacks/connect";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { POOL_STATUS, POOL_TYPE } from "../state";

export const STAICK_CLIENT_CONFIG = new AppConfig([
  "store_write",
  "publish_data",
]);
export const STACKS_USER_SESSION = new UserSession({
  appConfig: STAICK_CLIENT_CONFIG,
});

const hiroHeaders: HeadersInit = {
  "x-hiro-product": "bitcoin-monkeys-web",
  "x-hiro-version": "0.01",
};

export function fetchApi(input: RequestInfo, init: RequestInit = {}) {
  const initHeaders = init.headers || {};
  return fetch(input, {
    credentials: "omit",
    ...init,
    headers: { ...initHeaders, ...hiroHeaders },
  });
}

export async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit & { timeout?: number } = {}
) {
  const { timeout = 8000, ...options } = init;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetchApi(input, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

function createConfig(basePath: string, anchored?: boolean) {
  const middleware: Middleware[] = [];

  return new Configuration({
    basePath,
    fetchApi,
    middleware,
  });
}
// STX Helpers CONSTS
export const START_CYCLE_BLOCK = 68958;
export const STX_MULTIPLE = 1000000;
export const TEST_NETWORK = new StacksTestnet();
export const LIVE_NETWORKD = new StacksMainnet();
export const MIN_BLOCK_CONFIRMS_TO_CLAIM_REWARD = 400;
export const NETWORK = true ? LIVE_NETWORKD : TEST_NETWORK;

export const DEFAULT_TESTNET_SERVER =
  "https://stacks-node-api.testnet.stacks.co";
export const DEFAULT_MAINNET_SERVER = "https://stacks-node-api.stacks.co";

export const CONFIG_BC_S = createConfig(DEFAULT_MAINNET_SERVER);

export const blocksAPI = new BlocksApi(CONFIG_BC_S);

export const CORE_CONTRACT_ADDRESS = "SP68D5TNN9JH6G582VK824XR47VQABPAZSK9C1SD";
// Pool Contract
export const POOL_ADDRESS = CORE_CONTRACT_ADDRESS;
export const POOL_NAME = "tear-pool";

// Token Contract
export const TOKEN_ADDRESS = CORE_CONTRACT_ADDRESS;
export const TOKEN_NAME = "tear-token";
export const TOKEN_ID = "uTEAR";

// Mining Staking Contract
export const MINING_STAKING_ADDRESS = CORE_CONTRACT_ADDRESS;
export const MINING_STAKING_NAME = "tear-mining-staking";

export const fetchPool = async (poolId: number) => {
  try {
    const readOnlyCall = await callReadOnlyFunction({
      contractName: POOL_NAME,
      contractAddress: POOL_ADDRESS,
      functionName: "get-specific-pool",
      functionArgs: [uintCV(poolId)],
      senderAddress: "SP2ZQD9D4VGKJPCK2HD3YC78Q9J6PVK52HF1K1A9F",
      network: new StacksMainnet(),
    });

    //console.log("readOnlyCall", readOnlyCall);
    const contractCallResult = cvToJSON(readOnlyCall);

    return contractCallResult;
  } catch (err) {
    console.log("fetch pool err :(", err);
    return null;
  }
};

export const fetchCurrentCycleIndex = async () => {
  try {
    const readOnlyCall = await callReadOnlyFunction({
      contractName: MINING_STAKING_NAME,
      contractAddress: MINING_STAKING_ADDRESS,
      functionName: "get-current-cycle-index",
      functionArgs: [],
      senderAddress: "SP2ZQD9D4VGKJPCK2HD3YC78Q9J6PVK52HF1K1A9F",
      network: new StacksMainnet(),
    });
    const contractCallResult = cvToJSON(readOnlyCall);

    return contractCallResult;
  } catch (err) {
    console.log("fetchCurrentCycleIndex err :(", err);
    return null;
  }
};
export const parseContractPoolData = (
  fetchedPool: any,
  poolId: number
): POOL_TYPE | null => {
  try {
    // this func assume you are passing in data from the pool contract fetch-pool model
    const name = fetchedPool.value.value.name.value.value;
    const contributionStartHeight = parseInt(
      fetchedPool.value.value.contributionStartHeight.value
    );
    const contributionEndHeight = parseInt(
      fetchedPool.value.value.contributionEndHeight.value
    );

    let startedMineHeight = null;

    if (fetchedPool.value.value.startedMineHeight.type === "(optional uint)") {
      startedMineHeight = parseInt(
        fetchedPool.value.value.startedMineHeight.value.value
      );
    } else {
      startedMineHeight = null;
    }

    const poolOwner = fetchedPool.value.value.poolOwner.value;
    const ownerFee = fetchedPool.value.value.ownerFee.value;

    const poolMembers = fetchedPool.value.value.poolMembers.value
      .filter((d: any, i: number) => {
        if (d.value) {
          return d.value;
        }
      })
      .map((d: any, i: number) => {
        return d.value;
      });

    const poolMinMembers = fetchedPool.value.value.poolMinMembers.value;
    const claimHeights = fetchedPool.value.value.claimHeights.value;
    const totalContributions = fetchedPool.value.value.totalContributions.value;
    const totalCoinsWon = fetchedPool.value.value.totalCoinsWon.value;

    return {
      name,
      contributionStartHeight,
      contributionEndHeight,
      startedMineHeight,
      poolOwner,
      ownerFee,
      poolMembers,
      poolMinMembers,
      claimHeights,
      totalContributions,
      totalCoinsWon,
      poolStatus: POOL_STATUS.UNKNOWN,
      id: poolId,
    };
  } catch (err) {
    return null;
  }
};
