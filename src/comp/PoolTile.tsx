import { POOL_STATUS, POOL_TYPE, useAppState } from "../state";
import Text, { BodySubText, TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { TitleHeader } from "./Title";
import { NAV_HEIGHT, NAV_HEIGHT_OFFSET } from "./Nav";

import { BASIC_HOME_STYLE } from "./Home";
import {
  ButtonColors,
  ButtonTypes,
  ModelButton,
  NavButton,
  TileButton,
} from "./Button";
import TrendingPool from "./TrendingPool";
import { toast } from "react-toastify";
import {
  TaxDisclaimer,
  DonationReceipt,
  PoolMining,
  FinancialDisclaimer,
  PoolInfo,
  TOAST_CONFIG,
} from "./Models";

import CreatePool from "./Models/CreatePool";
import PoolOpen from "./Models/PoolOpen";
import StartPool from "./Models/StartPool";

const PoolTile = (
  pool: POOL_TYPE & { handleTileClick: (pool: POOL_TYPE) => void }
) => {
  const { senderAddress } = useAppState();

  const isOwner = pool.poolOwner === senderAddress;

  return (
    <div className="flex flex-col  min-h-[300px] max-h-[456px] min-w-[320px] md:min-w-[340px] max-w-[380px] bg-lightBlack rounded-[28px] p-5 md:p-9 gap-5">
      <div className="flex w-full items-center flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <Text customClass="text-lightGray" type={TextTypes.SubText}>
            Pool
          </Text>
          <Text
            customClass="text-white  text-2xl "
            type={TextTypes.BoldSubText}
          >
            {pool.name}
          </Text>
        </div>
        <Text
          customClass="text-darkGreen font-large text-lg"
          type={TextTypes.SubText}
        >
          {pool.poolStatus + ""}
        </Text>
      </div>
      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Donation Start
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              {pool.contributionStartHeight}
            </Text>
          </div>
          <div className="flex  pr-6 flex-col items-end">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Claim Date
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              {pool.startedMineHeight ? pool.startedMineHeight : "N/A"}
            </Text>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Contributors
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              {pool.poolMembers.length}
            </Text>
          </div>
          <div className="flex pr-6 flex-col items-end">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Fee
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              {`${pool.ownerFee}%`}
            </Text>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Committed STX
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              {pool.totalContributions / 1000000}
            </Text>
          </div>
          <div className="flex pr-6 flex-col items-end">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              REAT Won
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              {pool.totalCoinsWon}
            </Text>
          </div>
        </div>
      </div>
      {pool.poolStatus === POOL_STATUS.READY && isOwner && (
        <TileButton
          onClick={() => pool.handleTileClick(pool)}
          customClass="px-12"
        >
          Start Mining
        </TileButton>
      )}

      {pool.poolStatus === POOL_STATUS.OPEN && (
        <TileButton
          onClick={() => pool.handleTileClick(pool)}
          customClass="px-12"
        >
          Join Mining Pool
        </TileButton>
      )}

      {pool.poolStatus === POOL_STATUS.COMPLETE && (
        <TileButton
          onClick={() => pool.handleTileClick(pool)}
          customClass="px-12"
        >
          Claim
        </TileButton>
      )}

      {pool.poolStatus === POOL_STATUS.UNKNOWN ||
        pool.poolStatus === POOL_STATUS.MINING ||
        (pool.poolStatus === POOL_STATUS.PENDING && (
          <ModelButton
            onClick={() => pool.handleTileClick(pool)}
            type={ButtonTypes.Nav}
            color={ButtonColors.Gray}
          >
            View Details
          </ModelButton>
        ))}
    </div>
  );
};
export default PoolTile;
