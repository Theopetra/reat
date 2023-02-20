import { ModelTitle, TitleHeader } from "./Title";
import Text, { BodySubText, NavText, TextHeader, TextTypes } from "./Text";
import { NAV_HEIGHT_OFFSET } from "./Nav";
import { BASIC_HOME_STYLE } from "./Home";

import { CSVLink, CSVDownload } from "react-csv";

import { StackingHistoryTile } from "./Stack";
import PoolTile, { DonateHistoryTile } from "./PoolTile";
import StakingHistory from "./StakingHisotry";
import { useEffect, useState } from "react";
import { POOL_STATUS, POOL_TYPE, useAppState } from "../state";
import { fetchPools } from "../../pages/donate";
import { toast, ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import {
  fetchPoolHisotry,
  fetchPrincipalStakingHistory,
  fetchUserPoolsData,
} from "../utils/stxHelperFuncs";
import { STX_MULTIPLE } from "../utils/stx";

type DonationHisotry = {
  amountStx: number;
  blockHeight: number;
};

export type MINING_HISTORY = {
  poolId: number;
  date: string;
  amount: number;
};

export type MINING_HISTORY_TYPE = MINING_HISTORY & {
  pool: POOL_TYPE;
};
const Claim = () => {
  const [donationHistory, setDonationHistory] = useState<DonationHisotry[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);

  const { pools, _pools, senderAddress, stakingHistory, authenticated } =
    useAppState();

  const [userMiningHistory, _userMiningHistory] = useState<MINING_HISTORY[]>(
    []
  );

  useEffect(() => {
    if (authenticated) {
      //fetchStakingHistory();
      //fetchUserDonationHistory();
    }
  }, []);

  useEffect(() => {
    if (senderAddress) {
      if (userMiningHistory.length === 0 && pools.length > 0) {
        hanldeFetchingTHings();
      }
    }
  }, [senderAddress]);

  const hanldeFetchingTHings = async () => {
    try {
      if (senderAddress) {
        const shems = await fetchPoolHisotry(senderAddress);

        _userMiningHistory(shems);
      } else {
        console.log("No Princiapl Address");
      }
    } catch (err) {
      console.log("hanldeFetchingTHings - err", err);
    }
  };
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

  const fetchUserDonationHistory = async () => {
    try {
      if (senderAddress) {
        const donationHistory = await fetchUserPoolsData(senderAddress);

        if (donationHistory && donationHistory.success === true) {
          const unparsedHistory = donationHistory.value.value as any[];
          const parsedHistory: DonationHisotry[] = unparsedHistory.map(
            (item) => {
              const amountStx = parseInt(item.value.amountUstx.value, 10);
              console.log("item.value.block.value", item.value.block.value);
              const blockHeight = +item.value.block.value;

              return {
                amountStx: amountStx / STX_MULTIPLE,
                blockHeight: blockHeight,
              };
            }
          );
          //console.log("parsedHistory", parsedHistory);
          setDonationHistory(parsedHistory);

          const csvData = parsedHistory.map((item) => {
            return [senderAddress, item.amountStx, item.blockHeight];
          });
          const csvHeaders = [
            ["Principal", "Amount Stx", "Block Height"],
            ...csvData,
          ];
          setCsvData(csvHeaders);
        }
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
    return userMiningHistory.map((item, index) => {
      const pool = pools.find((pool) => pool.id === item.poolId);
      if (pool) {
        const dataForComp = {
          ...item,
          pool: pool,
        };
        return <DonateHistoryTile key={index} {...dataForComp} />;
      } else {
        return null;
      }
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
            <div className="flex w-full flex-row px-5 lg:px-0 items-center justify-between gap-10">
              <TextHeader>Claim Donation Rewards</TextHeader>
              {/* <TextHeader customClass="text-lightGreen">
                Fetch total unclaim TEAR
              </TextHeader> */}
            </div>
            <div
              style={{
                border: "1px solid #F5F5F5",
                width: "100%",
                height: "0px",
              }}
            />
            <div className="flex w-full flex-col lg:flex-row flex-wrap justify-center items-center gap-y-6 gap-x-5 ">
              {renderClaimPoolTiles()}
              {pools.length === 0 && (
                <div className="flex flex-col w-full items-center text-center gap-5">
                  <ModelTitle>No Donation History</ModelTitle>
                  <ModelTitle>Donate some STX to get started</ModelTitle>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex w-full flex-row justify-between items-center gap-6"></div>
          </div>
          <div className="flex self-start flex-row items-start">
            {donationHistory.length > 0 && (
              <CSVLink
                data={csvData}
                filename={`donation-history:${new Date().toDateString()}.csv`}
                onClick={() => toast.success("Downloaded Started!")}
              >
                <NavText customClass="text-left cursor-pointer underline text-lightGray">
                  View my Donation Receipts
                </NavText>
              </CSVLink>
            )}
          </div>
          <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-row items-center justify-between gap-10">
                <TextHeader>Claim Stacking Rewards</TextHeader>
                {/* <TextHeader customClass="text-lightGreen">
                  Fetch Total able to claim
                </TextHeader> */}
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
