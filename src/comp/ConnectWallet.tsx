import { Connect } from "@stacks/connect-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppState } from "../state";
import { STACKS_USER_SESSION } from "../utils/stx";

import {
  standardPrincipalCV,
  callReadOnlyFunction,
  cvToJSON,
  uintCV,
} from "@stacks/transactions";

type BasicNFTHoldingResType = {
  limit: number;
  offset: number;
  total: number;
  results: any[];
};

const STACKS_API = "https://stacks-node-api.mainnet.stacks.co/";

type what = {};
type ConnectWalletType = {
  children: React.ReactNode;
};
const ConnectWallet = ({ children }: ConnectWalletType) => {
  const { _authenticated, _senderAddress, senderAddress } = useAppState();

  const [loading, _Loading] = useState<boolean>(false);

  useEffect(() => {
    //const senderAddy = localStorage.getItem("principal");

    const senderAddy = "SP45EDJKSKGCZVDPN14210Y5RBRWV4MYKT3K6NVX";
    if (senderAddy) {
      _authenticated(true);
      _senderAddress(senderAddy);
    }
  }, []);

  const AUTH_OPTIONS: any = {
    appDetails: {
      name: "REAT",
      icon: "https://cdn.discordapp.com/attachments/898235553978417232/1058463664811823235/Captura_de_Pantalla_2022-12-30_a_las_2.16.06_p.m..png",
    },
    username: "test",
    redirectTo: "/",
    onFinish: async () => {
      try {
        _Loading(true);
        let userData = STACKS_USER_SESSION.loadUserData();

        const senderAddress = userData.profile.stxAddress.mainnet;
        //const senderAddress = "SP31WTJ415SNJM9H6202S3WK9AFQXQZMT48PESBQE";
        _authenticated(true);
        _senderAddress(senderAddress);

        _Loading(false);

        localStorage.setItem("principal", senderAddress);
      } catch (err) {
        toast.error("Could Not Authenticate");
        _Loading(false);
      }
    },
    userSession: STACKS_USER_SESSION,
  };

  return <Connect authOptions={AUTH_OPTIONS}>{children}</Connect>;
};

export default ConnectWallet;
