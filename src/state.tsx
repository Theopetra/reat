import React, { createContext, useContext, useEffect, useState } from "react";
import { BLOCKS_AFTER_START_TO_COMPLETE_MINE } from "./comp/Models";
import { START_CYCLE_BLOCK } from "./utils/stx";
import { fetchPoolHisotry } from "./utils/stxHelperFuncs";

export type StackingType = {
  cycle: number;
  stacked: number;
  startBlock: number | null;
  completionBlock: number | null;
  stxEarned: number | null;
};

const MOCKED_STACKING_HISTORY: StackingType[] = [
  {
    cycle: 1,
    stacked: 100,
    startBlock: null,
    completionBlock: null,
    stxEarned: null,
  },
  {
    cycle: 2,
    stacked: 300,
    startBlock: null,
    completionBlock: null,
    stxEarned: null,
  },
];

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
  userMiningHistory: MINING_HISTORY[];

  _senderAddress: (address: string | undefined) => void;
  _authenticated: (authenticated: boolean) => void;
  _totalStx(stx: number): void;
  _pools: (pool: POOL_TYPE[]) => void;
  _currentBlockHeight: (currentBlockHeight: number) => void;
  _currentBlockHeightIsoDate: (currentBlockHeightIsoDate: string) => void;
  _userMiningHistory: (userMiningHistory: MINING_HISTORY[]) => void;
};
export enum POOL_STATUS {
  MINING = "MINING",
  OPEN = "OPEN",
  READY = "READY",
  COMPLETE = "COMPLETE",
  UNKNOWN = "UNKNOWN",
  PENDING = "PENDING",
  CLAIMED = "CLAIMED",
}
const INIT_STATE = {
  senderAddress: undefined,
  authenticated: false,
  pools: [],
  stakingHistory: [],
};

export type MINING_HISTORY = {
  poolId: number;
  date: string;
  amount: number;
};

export type MINING_HISTORY_TYPE = MINING_HISTORY & {
  pool: POOL_TYPE;
};

export const StateContext = createContext<INIT_STATE_TYPE>(null!);

const StateLogic = (props: React.PropsWithChildren<{}>) => {
  const [senderAddress, _senderAddress] = useState<string | undefined>(
    INIT_STATE.senderAddress
  );
  const [authenticated, _authenticated] = useState<boolean>(false);

  const [pools, _poolsHelper] = useState<POOL_TYPE[]>(INIT_STATE.pools);

  const [currentBlockHeight, _currentBlockHeight] = useState<number>(0);
  const [currentBlockHeightIsoDate, _currentBlockHeightIsoDate] = useState<
    null | string
  >(null);

  const [totalStx, _totalStx] = useState<number>(0);

  const [stakingHistory, _stakingHistory] = useState<StackingType[]>([]);

  const [userMiningHistory, _userMiningHistory] = useState<MINING_HISTORY[]>(
    []
  );

  useEffect(() => {
    if (stakingHistory.length > 0 && currentBlockHeight !== 0) {
      const stackingInfo = stakingHistory.map((d, i) => {
        // get the start block
        // start block is the cycle index * 2100 + START_CYCLE_BLOCK
        const startBlock = d.cycle * 2100 + START_CYCLE_BLOCK;
        const completionBlock = (d.cycle + 1) * 2100 + START_CYCLE_BLOCK;

        return {
          ...d,
          startBlock: startBlock,
          completionBlock: completionBlock,
        };
      });

      _stakingHistory(stackingInfo);
    }
  }, [currentBlockHeight]);

  useEffect(() => {
    if (senderAddress) {
      if (userMiningHistory.length === 0 && pools.length > 0) {
        // hanldeFetchingTHings();
      }
    }
  }, [senderAddress, pools, userMiningHistory]);

  const hanldeFetchingTHings = async () => {
    try {
      if (senderAddress) {
        const shems = await fetchPoolHisotry(senderAddress);

        _userMiningHistory(shems);
      } else {
        console.log("No Princiapl Address");
      }
    } catch (err) {
      console.log("hanldeFetchingTHings - err", err);
    }
  };

  const _pools = (pools: POOL_TYPE[]) => {
    if (currentBlockHeight !== 0) {
      const updatedPools = poolBlockStatusHelper(pools);
      _poolsHelper(updatedPools);
    } else {
      _poolsHelper(pools);
    }
  };
  const poolBlockStatusHelper = (poolsPre: POOL_TYPE[]): POOL_TYPE[] => {
    const updatedPools = poolsPre.map((pool) => {
      // started mining

      if (
        pool.startedMineHeight &&
        currentBlockHeight <=
          pool.startedMineHeight + BLOCKS_AFTER_START_TO_COMPLETE_MINE
      ) {
        return {
          ...pool,
          poolStatus: POOL_STATUS.MINING,
        };
      } else if (
        pool.contributionStartHeight <= currentBlockHeight &&
        currentBlockHeight <= pool.contributionEndHeight
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
        pool.totalCoinsWon !== null &&
        currentBlockHeight >=
          pool.startedMineHeight + BLOCKS_AFTER_START_TO_COMPLETE_MINE
      ) {
        //CLAIMED
        return {
          ...pool,
          poolStatus: POOL_STATUS.CLAIMED,
        };
      } else if (
        pool.startedMineHeight &&
        currentBlockHeight >
          pool.startedMineHeight + BLOCKS_AFTER_START_TO_COMPLETE_MINE
      ) {
        //completed
        return {
          ...pool,
          poolStatus: POOL_STATUS.COMPLETE,
        };
      } else if (pool.contributionStartHeight > currentBlockHeight) {
        return {
          ...pool,
          poolStatus: POOL_STATUS.PENDING,
        };
      } else {
        return pool;
      }
    });

    return updatedPools;
  };
  useEffect(() => {
    if (currentBlockHeight) {
      const updatedPools = poolBlockStatusHelper(pools);
      _poolsHelper(updatedPools);
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

    userMiningHistory,
    _userMiningHistory,
  };

  console.log("pools", pools);

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
