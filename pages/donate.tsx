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
} from "../src/utils/stx";
import { StacksMainnet } from "@stacks/network";
import { POOL_TYPE, useAppState } from "../src/state";
import { useEffect } from "react";

export const getStaticProps: GetStaticProps = async () => {
  // must be async
  const pools = await fetchPools();

  return {
    props: {
      pools: pools,
    },
  };
};

const fetchPools = async () => {
  console.log("did this run");
  try {
    const pools: POOL_TYPE[] = [];

    for (const pool of TOTAL_POOLS) {
      // fetch the pool info
      const fetchedPool = await fetchPool(pool);
      console.log("fetchedPool", fetchedPool);
      if (fetchedPool.value !== null) {
        // parse the pool name
        console.log("fetchedPool", fetchedPool.value.value);
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
      console.log("pools", pools);
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
