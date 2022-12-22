import { ButtonColors, ButtonTypes, ModelButton } from "./Button";
import { BASIC_HOME_STYLE } from "./Home";
import { ModelInfo, ModelInfoProps, MODEL_INPUT_STYLE } from "./Models";
import { NAV_HEIGHT_OFFSET } from "./Nav";
import Text, { NavText, TextHeader, TextTypes } from "./Text";
import { TitleHeader } from "./Title";
import { isMobile } from "react-device-detect";

import StackReat from "./Models/StackReat";
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

export const StackingHistoryTile = () => {
  return (
    <div className="flex flex-row w-full  bg-lightBlack rounded-[20px] p-8">
      <StackingHisotryInfo title="Cycle" text="10" />
      <StackingHisotryInfo title="REAT Stacked" text="1,000,000" />
      <StackingHisotryInfo title="Start Date" text="11-11-2022" />
      <StackingHisotryInfo title="STX Earned" text="1,000,000" />
      <StackingHisotryInfo title="Completion" text="12%" />
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
  return (
    <div className="bg-black">
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
          {/* {isMobile && (
            <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
              <div className="flex w-full flex-col items-center gap-6">
                <div className="flex w-full flex-row items-center justify-between gap-10">
                  <TextHeader>Stacking History</TextHeader>
                </div>
                <div
                  style={{
                    border: "1px solid #F5F5F5",
                    width: "100%",
                    height: "0px",
                  }}
                />

                <div className="flex flex-col w-full gap-5 mt-6">
                  <StackingHistoryTile />
                </div>
              </div>
            </div>
          )} */}
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
