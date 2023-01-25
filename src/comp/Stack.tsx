import {
  ButtonColors,
  ButtonTypes,
  ModelButton,
  StakingHistoryButton,
  TileButton,
} from "./Button";
import { BASIC_HOME_STYLE } from "./Home";
import { ModelInfo, ModelInfoProps, MODEL_INPUT_STYLE } from "./Models";
import { NAV_HEIGHT_OFFSET } from "./Nav";
import Text, { NavText, TextHeader, TextTypes } from "./Text";
import { TitleHeader } from "./Title";
import { isMobile } from "react-device-detect";

import StackReat from "./Models/StackReat";
import StakingHistory from "./StakingHisotry";
import { useEffect, useState } from "react";
import { StackingType, useAppState } from "../state";
import { fetchPrincipalTokenBalance } from "../utils/stxHelperFuncs";
import { toast, ToastContainer } from "react-toastify";
import ClaimStx from "./Models/ClaimStx";
import { STX_MULTIPLE } from "../utils/stx";

export const StackingHisotryInfo = ({ title, text }: ModelInfoProps) => {
  return (
    <div className="flex flex-col flex-1  items-start">
      <Text
        customClass="text-lightGray !text-xl !font-bold"
        type={TextTypes.SubText}
      >
        {title}
      </Text>
      <Text
        customClass="text-lightGray !text-xl  !font-medium"
        type={TextTypes.SubText}
      >
        {text}
      </Text>
    </div>
  );
};

const calculatStackingCompletionProgress = (
  startBlock: number,
  completionBlock: number,
  currentBlockHeight: number
): string => {
  let completion = 0;

  if (startBlock && completionBlock && currentBlockHeight) {
    if (completionBlock <= currentBlockHeight) {
      completion = 100;
    } else {
      completion = Math.floor(
        ((currentBlockHeight - startBlock) / (completionBlock - startBlock)) *
          100
      );
    }
  }
  return `${completion}%`;
};

export const StackingHistoryTile = (props: StackingType) => {
  const { currentBlockHeight } = useAppState();

  const { cycle, stacked, startBlock, stxEarned, completionBlock } = props;

  const renderCompletion = () => {
    if (startBlock && completionBlock && currentBlockHeight) {
      return calculatStackingCompletionProgress(
        startBlock,
        completionBlock,
        currentBlockHeight
      );
    } else {
      return "N/A";
    }
  };

  const handleClaimButton = () => {
    toast(({ closeToast }) => <ClaimStx closeToast={closeToast} {...props} />, {
      autoClose: false,
      hideProgressBar: true,
      style: {
        backgroundColor: "transparent",
      },
      draggable: false,
      closeOnClick: false,
      closeButton: true,
      position: "top-center",
    });
  };
  return (
    <div className="flex flex-row w-full  bg-lightBlack rounded-[20px] p-8">
      <StackingHisotryInfo title="Cycle" text={cycle} />
      {!isMobile && <StackingHisotryInfo title="REAT Stacked" text={stacked} />}

      {!isMobile && (
        <StackingHisotryInfo
          title="Start Block"
          text={"#" + startBlock || "N/A"}
        />
      )}
      {!isMobile && (
        <StackingHisotryInfo
          title="End Block"
          text={startBlock ? "#" + (startBlock + 2100) : "N/A"}
        />
      )}

      {!isMobile && (
        <StackingHisotryInfo title="Completion" text={renderCompletion()} />
      )}

      <div
        className="flex flex-row items-center justify-center"
        style={{
          width: "180px",
        }}
      >
        {completionBlock && completionBlock < currentBlockHeight ? (
          <Text
            customClass="!font-bold text-center"
            type={TextTypes.LargeButton}
          >
            Stacking In Progress
          </Text>
        ) : (
          <StakingHistoryButton
            onClick={() => handleClaimButton()}
            customClass="px-4"
          >
            Claim STX
          </StakingHistoryButton>
        )}
      </div>
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

        if (totalBalance && totalBalance.success) {
          const balance = +totalBalance.value.value;
          setTotalToken(Math.trunc(balance / STX_MULTIPLE));
        }
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
        <div className="flex w-full flex-row items-center justify-center gap-10">
          <TitleHeader customClass="text-center">STACK</TitleHeader>
        </div>

        <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-row items-center justify-between gap-10">
              <TextHeader>Stack REAT. Earn STX.</TextHeader>
              {totalToken && (
                <TextHeader customClass="text-darkGreen">
                  {`${totalToken} Available STX`}
                </TextHeader>
              )}
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
