import type { NextPage } from "next";
import Head from "next/head";
import styles from "../src/styles/Home.module.css";

import ClaimHome from "../src/comp/Claim";

const Stack: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Reat</title>
        <meta name="description" content="Reat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ClaimHome />
      </main>
    </div>
  );
};

export default Stack;
