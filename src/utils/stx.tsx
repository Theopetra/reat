import {
  AccountsApi,
  AddressNftListResponse,
  BlocksApi,
  Configuration,
  Middleware,
  SmartContractsApi,
  TransactionsApi,
} from "@stacks/blockchain-api-client";
import { AppConfig, UserSession } from "@stacks/connect";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

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

export const TEST_NETWORK = new StacksTestnet();
export const LIVE_NETWORKD = new StacksMainnet();

export const NETWORK = true ? LIVE_NETWORKD : TEST_NETWORK;

export const DEFAULT_TESTNET_SERVER =
  "https://stacks-node-api.testnet.stacks.co";
export const DEFAULT_MAINNET_SERVER = "https://stacks-node-api.stacks.co";

export const CONFIG_BC_S = createConfig(DEFAULT_MAINNET_SERVER);

export const MONKEY_COIN_REDEEM_ADDRESS =
  "SPMWNPDCQMCXANG6BYK2TJKXA09BTSTES0VVBXVR";
export const MONKEY_COIN_REDEEM_NAME = "monkey-coin-redeem";
export const MONKEY_COIN_REDEEM_NFT_ID = "";

export const MONKEY_COIN_ADDRESS = "SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S";
export const MONKEY_COIN_NAME = "monkey-coin";
export const MONKEY_COIN_ID = "monkey-coin";
export const MONKEY_COIN_NFT_ID = `${MONKEY_COIN_ADDRESS}.${MONKEY_COIN_NAME}::${MONKEY_COIN_ID}`;

export const THE_MONKZ_ADDRESS = "SPMWNPDCQMCXANG6BYK2TJKXA09BTSTES0VVBXVR";
export const THE_MONKZ_NAME = "the-monkz";
export const THE_MONKZ_ID = "the-monkz";
export const THE_MONKZ_NFT_ID = `${THE_MONKZ_ADDRESS}.${THE_MONKZ_NAME}::${THE_MONKZ_ID}`;
