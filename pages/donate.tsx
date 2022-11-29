import type { NextPage } from "next";
import App from "../src/comp/App";
import Head from "next/head";
import styles from "../src/styles/Home.module.css";

import DonateHome from "../src/comp/donate";

const Donate: NextPage = () => {
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
