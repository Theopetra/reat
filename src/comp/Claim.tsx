import { ModelTitle, TitleHeader } from "./Title";
import Text, { BodySubText, NavText, TextHeader, TextTypes } from "./Text";
import { NAV_HEIGHT_OFFSET } from "./Nav";
import { BASIC_HOME_STYLE } from "./Home";
import { ButtonColors, ButtonTypes, ModelButton } from "./Button";
import { ModelInfo, ModelInfoProps, MODEL_INPUT_STYLE } from "./Models";

import { StackingHistoryTile } from "./Stack";
import PoolTile from "./PoolTile";
import StakingHistory from "./StakingHisotry";
import { useEffect } from "react";
import { POOL_STATUS, useAppState } from "../state";
import { fetchPools } from "../../pages/donate";
import { toast, ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import {
  fetchPrincipalStakingHistory,
  fetchUserPoolsData,
} from "../utils/stxHelperFuncs";

const Claim = () => {
  const { pools, _pools, senderAddress, stakingHistory, authenticated } =
    useAppState();
  useEffect(() => {
    //fetchPoolsHelper();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchStakingHistory();
      fetchUserDonationHistory();
    }
  }, []);

  const fetchStakingHistory = async () => {
    try {
      if (senderAddress) {
        const stakingHistory = await fetchPrincipalStakingHistory(
          senderAddress
        );
        console.log("stakingHistory", stakingHistory);
      } else {
        console.log("No Princiapl Address");
      }
    } catch (err) {
      console.log(err);
      toast.error("Could not fetch Staking Hisotry");
    }
  };

  const fetchUserDonationHistory = async () => {
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

  const fetchPoolsHelper = async () => {
    try {
      const pools = await fetchPools();
      console.log("fetchPoolsHelper", pools);

      _pools(pools);
    } catch (err) {
      console.log("err", err);
      return [];
    }
  };

  const renderClaimPoolTiles = () => {
    return pools
      .filter((pool) => {
        if (senderAddress) {
          const isOwner = pool.poolOwner === senderAddress;

          // check senderAddress can be found in pool.poolMembers
          const isMember = pool.poolMembers.find(
            (member) => member === senderAddress
          );

          if (
            pool.poolStatus === POOL_STATUS.COMPLETE &&
            (isMember || isOwner)
          ) {
            return true;
          } else return false;
        } else return false;
      })
      .map((pool) => {
        return <PoolTile key={pool.id} {...pool} />;
      });
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
        <TitleHeader customClass="text-center">CLAIM</TitleHeader>
        <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-row items-center justify-between gap-10">
              <TextHeader>Claim Donation Rewards</TextHeader>
              <TextHeader customClass="text-lightGreen">
                Fetch total unclaim TEAR
              </TextHeader>
            </div>
            <div
              style={{
                border: "1px solid #F5F5F5",
                width: "100%",
                height: "0px",
              }}
            />
            <div className="flex px-10 flex-1 flex-row items-center justify-between gap-3 ">
              {renderClaimPoolTiles()}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex w-full flex-row justify-between items-center gap-6">
              {/* <PoolTile />
              <PoolTile />
              <PoolTile /> */}
            </div>
          </div>
          <div className="flex self-start flex-row items-start">
            <NavText customClass="text-left cursor-pointer underline text-lightGray">
              View my Donation Receipts
            </NavText>
          </div>
          <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-row items-center justify-between gap-10">
                <TextHeader>Claim Stacking Rewards</TextHeader>
                <TextHeader customClass="text-lightGreen">
                  Fetch Total able to claim
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
