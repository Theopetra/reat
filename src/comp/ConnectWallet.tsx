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

type ConnectWalletType = {
  children: React.ReactNode;
};
const ConnectWallet = ({ children }: ConnectWalletType) => {
  const { _authenticated, _senderAddress, senderAddress } = useAppState();

  const [loading, _Loading] = useState<boolean>(false);

  useEffect(() => {
    const senderAddy = localStorage.getItem("walletID");
    //const senderAddy = "SP329G766AV8Z01X9EEAHPDQ4WDJXT2A0XB383MGP";

    if (senderAddy) {
      _authenticated(true);
      _senderAddress(senderAddy);
    }
  }, []);

  const AUTH_OPTIONS: any = {
    appDetails: {
      name: "Mutant Monkeys",
      icon: "https://cdn.discordapp.com/attachments/973373774101618778/978172941802029096/SLIME.png",
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

        //fetchBreedingTools(senderAddress);

        localStorage.setItem("walletID", senderAddress);
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
