import { ButtonColors, ButtonTypes, ModelButton } from "./Button";
import { BASIC_HOME_STYLE } from "./Home";
import { ModelInfo, ModelInfoProps, MODEL_INPUT_STYLE } from "./Models";
import { NAV_HEIGHT_OFFSET } from "./Nav";
import Text, { NavText, TextHeader, TextTypes } from "./Text";
import { TitleHeader } from "./Title";
import { isMobile } from "react-device-detect";

import StackReat from "./Models/StackReat";
import StakingHistory from "./StakingHisotry";
import { useEffect, useState } from "react";
import { useAppState } from "../state";
import { fetchPrincipalTokenBalance } from "../utils/stxHelperFuncs";
import { ToastContainer } from "react-toastify";
export const StackingHisotryInfo = ({ title, text }: ModelInfoProps) => {
  return (
    <div className="flex flex-col flex-1  items-start">
      <Text customClass="text-lightGray" type={TextTypes.SubText}>
        {title}
      </Text>
      <Text customClass="text-lightGray" type={TextTypes.SubText}>
        {text}
      </Text>
    </div>
  );
};

export type StackingType = {
  cycle: number;
  reatStacked: number;
  startDate: string;
  stxEarned: number;
  completion: number;
};
export const StackingHistoryTile = (props: StackingType) => {
  const { cycle, reatStacked, startDate, stxEarned, completion } = props;
  return (
    <div className="flex flex-row w-full  bg-lightBlack rounded-[20px] p-8">
      <StackingHisotryInfo title="Cycle" text={cycle} />
      <StackingHisotryInfo title="REAT Stacked" text={reatStacked} />
      <StackingHisotryInfo title="Start Date" text={startDate} />
      <StackingHisotryInfo title="STX Earned" text={stxEarned} />
      <StackingHisotryInfo title="Completion" text={completion} />
      <ModelButton
        customClass="px-10"
        type={ButtonTypes.Nav}
        color={ButtonColors.GreenGradient}
      >
        Claim STX
      </ModelButton>
    </div>
  );
};
const Stack = () => {
  const { senderAddress } = useAppState();
  const [totalToken, setTotalToken] = useState<null | number>(null);

  useEffect(() => {
    fetchPrincipalTotalToken();
  }, [senderAddress]);

  const fetchPrincipalTotalToken = async () => {
    try {
      if (senderAddress) {
        const totalBalance = await fetchPrincipalTokenBalance(senderAddress);
        console.log("totalBalance", totalBalance);
      }
    } catch (err) {
      console.log("fetchPrincipalTotalToken", err);
    }
  };
  return (
    <div className="bg-black">
      <ToastContainer
        style={{
          minWidth: isMobile ? "300px" : "450px",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        enableMultiContainer={false}
      />
      <div className="homeLanding" />
      <div className="landingOverlay" />
      <div
        style={{
          zIndex: 22,
          paddingTop: NAV_HEIGHT_OFFSET,
        }}
        className={`${BASIC_HOME_STYLE}`}
      >
        <TitleHeader customClass="text-center">STACK</TitleHeader>
        <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-row items-center justify-between gap-10">
              <TextHeader>Stack REAT. Earn STX.</TextHeader>
            </div>
            <div
              style={{
                border: "1px solid #F5F5F5",
                width: "100%",
                height: "0px",
              }}
            />
          </div>
          <StackReat />
          <StakingHistory />
        </div>
      </div>
      <div
        style={{
          height: "80vh",
          width: "100vw",
        }}
      >
        <div className="homeLanding" />
        <div className="landingOverlayFlip" />
      </div>
    </div>
  );
};

export default Stack;
