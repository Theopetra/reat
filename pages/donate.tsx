import type { InferGetStaticPropsType, NextPage } from "next";
import App from "../src/comp/App";
import Head from "next/head";
import styles from "../src/styles/Home.module.css";
import { GetStaticProps } from "next";

import DonateHome from "../src/comp/donate";
import { callReadOnlyFunction, cvToJSON, uintCV } from "@stacks/transactions";
import {
  POOL_ADDRESS,
  POOL_NAME,
  TOTAL_POOLS,
  fetchPool,
  parseContractPoolData,
  fetchCurrentCycleIndex,
} from "../src/utils/stx";
import { StacksMainnet } from "@stacks/network";
import { POOL_TYPE, useAppState } from "../src/state";
import { useEffect } from "react";
import { fetchBlockDate, fetchLatestPool } from "../src/utils/stxHelperFuncs";

export const getStaticProps: GetStaticProps = async () => {
  // must be async
  const pools = await fetchPools();

  return {
    props: {
      pools: pools,
    },
    revalidate: 300,
  };
};

export const fetchPools = async () => {
  try {
    const fetchLatestPoolRes = await fetchLatestPool();

    let totalPools = [];
    if (fetchLatestPoolRes.value && fetchLatestPoolRes.value.poolIndex) {
      const LPI = parseInt(fetchLatestPoolRes.value.poolIndex.value);
      // for every whole number between 1 and LPI, push it to the totalPools array
      for (let i = 1; i <= LPI; i++) {
        totalPools.push(i);
      }
    }

    const pools: POOL_TYPE[] = [];

    for (const pool of totalPools) {
      // fetch the pool info
      const fetchedPool = await fetchPool(pool);

      if (fetchedPool.value !== null) {
        // parse the pool name

        const parsedPool = parseContractPoolData(fetchedPool, pool);

        if (parsedPool) {
          pools.push(parsedPool);
        }
      }
    }

    return pools;
  } catch (err) {
    console.log("err", err);
    return [];
  }
};
const Donate: NextPage = ({
  pools,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { _pools } = useAppState();
  useEffect(() => {
    if (pools) {
      _pools(pools);
    }
  }, [pools]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Reat</title>
        <meta name="description" content="Reat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DonateHome />
      </main>
    </div>
  );
};

export default Donate;
