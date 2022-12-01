import type { NextPage } from "next";
import Head from "next/head";
import styles from "../src/styles/Home.module.css";

import StackHome from "../src/comp/Stack";

const Stack: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Reat</title>
        <meta name="description" content="Reat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <StackHome />
      </main>
    </div>
  );
};

export default Stack;
