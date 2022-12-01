import { TitleHeader } from "./Title";
import Text, { BodySubText, NavText, TextHeader, TextTypes } from "./Text";
import { NAV_HEIGHT_OFFSET } from "./Nav";
import { BASIC_HOME_STYLE } from "./Home";
import { ButtonColors, ButtonTypes, ModelButton } from "./Button";
import { ModelInfo, ModelInfoProps, MODEL_INPUT_STYLE } from "./Models";
import { PoolTile } from "./donate";
import { StackingHistoryTile } from "./Stack";

const Claim = () => {
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
        <TitleHeader customClass="text-center">CLAIM</TitleHeader>
        <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-row items-center justify-between gap-10">
              <TextHeader>Claim Donation Rewards</TextHeader>
              <TextHeader customClass="text-lightGreen">
                33,333 Unclaimed REAT
              </TextHeader>
            </div>
            <div
              style={{
                border: "1px solid #F5F5F5",
                width: "100%",
                height: "0px",
              }}
            />
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex w-full flex-row justify-between items-center gap-6">
              <PoolTile />
              <PoolTile />
              <PoolTile />
            </div>
          </div>
          <div className="flex self-start flex-row items-start">
            <BodySubText customClass="text-left curosr-pointer underline text-lightGray">
              Claim Stacking Rewards
            </BodySubText>
          </div>
          <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-row items-center justify-between gap-10">
                <TextHeader>Stacking History</TextHeader>
                <TextHeader customClass="text-lightGreen">
                  21,200 Unclaimed STX
                </TextHeader>
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
                <StackingHistoryTile />
              </div>
            </div>
          </div>
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

export default Claim;
