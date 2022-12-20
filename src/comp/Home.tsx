//Home.tsx;

import { useAppState } from "../state";

import { useState } from "react";
//import { openContractCall } from "@stacks/connect";
import Text, { BodySubText, TextTypes } from "./Text";
import Image from "next/image";
import { toast } from "react-toastify";

import {
  AnchorMode,
  uintCV,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  NonFungibleConditionCode,
} from "@stacks/transactions";

import { StacksMainnet } from "@stacks/network";
import { RaxHeader } from "./Title";
import { NAV_HEIGHT } from "./Nav";

type ValidTransactionToastProps = {
  txId: string;
};

export const BASIC_HOME_STYLE =
  "w-screen flex flex-col items-center  relative p-4 2xl:px-40 gap-20 m-auto ";
export const ValidTransactionToast = ({ txId }: ValidTransactionToastProps) => {
  const handleLinkTx = () => {
    window.open(`https://explorer.stacks.co/txid/${txId ?? ""}?chain=testnet`);
  };
  return (
    <div className="flex flex-col bg-green gap-2.5">
      <div className="flex flex-row items-center gap-2.5">
        <Text type={TextTypes.SubText}>Transaction went through</Text>
      </div>

      <div
        style={{ paddingBottom: "10px" }}
        className="underline"
        onClick={() => handleLinkTx()}
      >
        <Text type={TextTypes.SubText}>View transaction in explorer</Text>
      </div>
    </div>
  );
};

const Home = () => {
  const { senderAddress } = useAppState();

  const handleValidTrans = (txId: string) => {
    toast.success("Valid Transaction");
  };

  return (
    <div className="bg-black">
      <div className="homeLanding" />
      <div className="landingOverlay" />
      <div
        style={{
          zIndex: 22,
          paddingTop: NAV_HEIGHT,
        }}
        className={`${BASIC_HOME_STYLE}`}
      >
        <RaxHeader customClass="text-center">REAT</RaxHeader>

        <div className="max-w-4xl">
          <BodySubText customClass="text-center text-lightGray">
            Donate STX with others to increase the pool’s chance of winning
            blocks & help improve housing affordability across America
          </BodySubText>
        </div>
        <div
          style={{ marginBottom: "140px" }}
          className="flex flex-col md:flex-row items-center gap-10 "
        >
          <div className="border flex border-warmGray-300 p-6 justify-center rounded-lg relative gap-2.5">
            <div className="flex flex-row">
              <Image
                src={"/images/StxLogo.png"}
                alt="STX Logo"
                height={20}
                width={40}
              />
              <div className="flex items-center">
                <h2 className="flex  items-center w-32 pl-[15px] text-[#FBFBFB] text-[14px] leading-[18px]">
                  Total STX raised for Pool
                </h2>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className=" bg-[#727272] w-1 h-full"></div>
              <h1 className="h-[42px]  text-lightYellow text-2xl font-regular font-bold leading-[42px] leading-[-0.025em]">
                10.3 MILLION
              </h1>
            </div>
          </div>
          <div className="border flex border-[#504E4E] bg-gradient-to-b from-lightGreen to-darkGreen h-[88px] w-[354px] rounded-lg relative">
            <div className="flex items-center ">
              <h2 className="flex pl-[25px] h-[42px] w-[110px] items-center text-trueGray-50 text-[14px] font-regular">
                Total REAT <br></br>Tokens Won
              </h2>
            </div>
            <div className="flex items-center">
              <div className="border border-trueGray-500 pl-[13px] w-[65px] left-[413px] top-[911px] rotate-90"></div>
              <h1 className="w-[187px] h-[42px] left-[428px] top-[858px] text-2xl font-regular font-bold leading-[42px] leading-[-0.025em]">
                150 MILLION
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
