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
  const { authenticated, senderAddress, stakingHistory } = useAppState();
  useEffect(() => {
    if (authenticated) {
      fetchStakingHistory();
      fetchDonationHistory();
    }
  }, []);

  const fetchStakingHistory = async () => {
    try {
      if (senderAddress) {
        const stakingHistory = await fetchPrincipalStakingHistory(
          senderAddress
        );
      } else {
        console.log("No Princiapl Address");
      }
    } catch (err) {
      console.log(err);
      toast.error("Could not fetch Staking Hisotry");
    }
  };

  const fetchDonationHistory = async () => {
    try {
      if (senderAddress) {
        const donationHistory = await fetchUserPoolsData(senderAddress);
        console.log("donationHistory", donationHistory);
      } else {
        console.log("No Princiapl Address");
      }
    } catch (err) {
      console.log(err);
      toast.error("Could not fetch Donation Hisotry");
    }
  };

  const renderStakingHistory = () => {
    return stakingHistory.map((item, index) => {
      return (
        <StackingHistoryTile
          key={index}
          cycle={item.cycle}
          stacked={item.stacked}
          startBlock={item.startBlock}
          stxEarned={item.stxEarned}
          completionBlock={item.completionBlock}
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
              {stakingHistory.length === 0 && (
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
