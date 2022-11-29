import type { NextPage } from "next";
import App from "../src/comp/App";
import Head from "next/head";
import styles from "../src/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Reat</title>
        <meta name="description" content="Reat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App />
      </main>
    </div>
  );
};

export default Home;
