import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { useAppState } from "../state";
import {
  fetchPrincipalStakingHistory,
  fetchUserPoolsData,
} from "../utils/stxHelperFuncs";
import { StackingHistoryTile } from "./Stack";
import Text, { NavText, TextHeader, TextTypes } from "./Text";
import { ModelTitle, TitleHeader } from "./Title";

const StakingHistory = () => {
  const { authenticated, senderAddress, userStakingHistory } = useAppState();

  const renderStakingHistory = () => {
    return userStakingHistory.map((item, index) => {
      return (
        <StackingHistoryTile
          key={index}
          cycles={item.cycles}
          blockHeight={item.blockHeight}
          stackedAmount={item.stackedAmount}
          date={item.date}
        />
      );
    });
  };
  return (
    <>
      <div className="flex flex-col w-full max-w-[1240px] items-center gap-20">
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
            <>
              {renderStakingHistory()}
              {userStakingHistory.length === 0 && (
                <div className="flex flex-col w-full items-center text-center gap-5">
                  <ModelTitle>No Stacking History</ModelTitle>
                  <ModelTitle>Stack some REAT to get started</ModelTitle>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingHistory;
