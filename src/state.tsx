import React, { createContext, useContext, useEffect, useState } from "react";
import { StackingType } from "./comp/Stack";

export type POOL_TYPE = {
  name: string;
  contributionStartHeight: number;
  contributionEndHeight: number;
  startedMineHeight: number | null;
  poolOwner: string;
  ownerFee: number;
  poolMembers: string[];
  poolMinMembers: number;
  claimHeights: number[];
  totalContributions: number;
  totalCoinsWon: number;
  id: number;
  poolStatus: POOL_STATUS;
};

type INIT_STATE_TYPE = {
  senderAddress?: string;
  authenticated: boolean;
  totalStx: number;
  pools: POOL_TYPE[];
  currentBlockHeight: number;
  stakingHistory: StackingType[];
  currentBlockHeightIsoDate: string | null;

  _senderAddress: (address: string | undefined) => void;
  _authenticated: (authenticated: boolean) => void;
  _totalStx(stx: number): void;
  _pools: (pool: POOL_TYPE[]) => void;
  _currentBlockHeight: (currentBlockHeight: number) => void;
  _currentBlockHeightIsoDate: (currentBlockHeightIsoDate: string) => void;
};
export enum POOL_STATUS {
  MINING = "MINING",
  OPEN = "OPEN",
  READY = "READY",
  COMPLETE = "COMPLETE",
  UNKNOWN = "UNKNOWN",
  PENDING = "PENDING",
}
const INIT_STATE = {
  senderAddress: undefined,
  authenticated: false,
  pools: [],
  stakingHistory: [],
};

export const StateContext = createContext<INIT_STATE_TYPE>(null!);

const StateLogic = (props: React.PropsWithChildren<{}>) => {
  const [senderAddress, _senderAddress] = useState<string | undefined>(
    INIT_STATE.senderAddress
  );
  const [authenticated, _authenticated] = useState<boolean>(false);

  const [pools, _pools] = useState<POOL_TYPE[]>(INIT_STATE.pools);

  const [currentBlockHeight, _currentBlockHeight] = useState<number>(0);
  const [currentBlockHeightIsoDate, _currentBlockHeightIsoDate] = useState<
    null | string
  >(null);

  const [totalStx, _totalStx] = useState<number>(0);

  const [stakingHistory, _stakingHistory] = useState<StackingType[]>([]);

  useEffect(() => {
    if (currentBlockHeight) {
      const updatedPools = pools.map((pool) => {
        // started mining

        if (
          pool.startedMineHeight &&
          currentBlockHeight <= pool.startedMineHeight + 200
        ) {
          return {
            ...pool,
            poolStatus: POOL_STATUS.MINING,
          };
        } else if (
          pool.contributionStartHeight < currentBlockHeight &&
          currentBlockHeight < pool.contributionEndHeight
        ) {
          // collecting
          return {
            ...pool,
            poolStatus: POOL_STATUS.OPEN,
          };
        } else if (
          currentBlockHeight > pool.contributionEndHeight &&
          pool.startedMineHeight === null
        ) {
          return {
            ...pool,
            poolStatus: POOL_STATUS.READY,
          };
        } else if (
          pool.startedMineHeight &&
          currentBlockHeight > pool.startedMineHeight + 200
        ) {
          //completed
          return {
            ...pool,
            poolStatus: POOL_STATUS.COMPLETE,
          };
        } else if (pool.contributionStartHeight > currentBlockHeight) {
          console.log("nada");
          return {
            ...pool,
            poolStatus: POOL_STATUS.PENDING,
          };
        } else {
          console.log("wtf", pool);
          console.log("pool,", pool.contributionStartHeight);
          return pool;
        }
      });
      console.log("does this run");
      _pools(updatedPools);
    }
  }, [currentBlockHeight]);

  let contextValue = {
    senderAddress,
    _senderAddress,

    authenticated,
    _authenticated,

    pools,
    _pools,

    currentBlockHeight,
    _currentBlockHeight,

    totalStx,
    _totalStx,

    stakingHistory,
    _stakingHistory,

    currentBlockHeightIsoDate,
    _currentBlockHeightIsoDate,
  };

  return (
    <StateContext.Provider value={{ ...contextValue }}>
      {props.children}
    </StateContext.Provider>
  );
};
export default StateLogic;

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider");
  }
  return context;
};
