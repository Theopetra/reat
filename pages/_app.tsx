import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import StateLogic from "../src/state";
import ConnectWallet from "../src/comp/ConnectWallet";
import Nav, { Footer } from "../src/comp/Nav";
import NextNProgress from "nextjs-progressbar";
import "react-toastify/dist/ReactToastify.css";
import SubComp from "../src/comp/BlockSub";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateLogic>
      <NextNProgress color="#95C95B" />
      <ConnectWallet>
        <SubComp />
        <div className="w-screen flex flex-col items-center bg-[##0B0B0B]  m-auto">
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </div>
      </ConnectWallet>
    </StateLogic>
  );
}

export default MyApp;
