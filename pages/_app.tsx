import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import StateLogic from "../src/state";
import ConnectWallet from "../src/comp/ConnectWallet";
import Nav, { Footer } from "../src/comp/Nav";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateLogic>
      <ConnectWallet>
        <ToastContainer
          style={{
            minWidth: "450px",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
          enableMultiContainer={false}
        />
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
