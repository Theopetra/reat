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
  TileButtonGray,
} from "./Button";
import TrendingPool from "./TrendingPool";
import { toast } from "react-toastify";
import { PoolInfo, TOAST_CONFIG } from "./Models";

import CreatePool from "./Models/CreatePool";
import PoolOpen from "./Models/PoolOpen";
import StartPool from "./Models/StartPool";
import { useConnect } from "@stacks/connect-react";
import { STX_MULTIPLE } from "../utils/stx";
import ClaimPool from "./Models/ClaimPool";

const PoolTile = (pool: POOL_TYPE) => {
  const { senderAddress, authenticated } = useAppState();
  const { doOpenAuth } = useConnect();

  const isOwner = pool.poolOwner === senderAddress;

  const handleAuth = () => {
    doOpenAuth();
  };

  const handleTileClick = (pool: POOL_TYPE) => {
    const isOwner = pool.poolOwner === senderAddress;

    // check senderAddress can be found in pool.poolMembers
    const isMember = pool.poolMembers.find(
      (member) => member === senderAddress
    );

    if (pool.poolStatus === POOL_STATUS.OPEN) {
      toast(
        ({ closeToast }) => <PoolOpen pool={pool} closeToast={closeToast} />,
        TOAST_CONFIG
      );
      return null;
    } else if (pool.poolStatus === POOL_STATUS.READY && isOwner) {
      toast(
        ({ closeToast }) => <StartPool pool={pool} closeToast={closeToast} />,
        TOAST_CONFIG
      );
      return null;
    } else if (
      pool.poolStatus === POOL_STATUS.COMPLETE &&
      (isMember || isOwner)
    ) {
      console.log("pool.poolStatus", pool);
      toast(
        ({ closeToast }) => <ClaimPool pool={pool} closeToast={closeToast} />,
        TOAST_CONFIG
      );
    } else {
      toast(
        ({ closeToast }) => <PoolInfo pool={pool} closeToast={closeToast} />,
        TOAST_CONFIG
      );
    }
  };

  return (
    <div className="flex flex-col w-[300px] md:w-[360px]  bg-lightBlack rounded-[28px] p-5 md:p-9 gap-5">
      <div className="flex w-full items-center flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <Text customClass="text-lightGray" type={TextTypes.SubText}>
            Pool
          </Text>
          <Text
            customClass="text-white  text-2xl !font-black "
            type={TextTypes.BoldSubText}
          >
            {pool.name}
          </Text>
        </div>
        <Text
          customClass="text-darkGreen font-large text-lg"
          type={TextTypes.SubText}
        >
          {pool.poolStatus}
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
            <Text
              customClass="text-lightGray font-bold"
              type={TextTypes.SubText}
            >
              Donation Start
            </Text>
            <Text
              customClass="text-lightGray font-light"
              type={TextTypes.SubText}
            >
              {"#" + pool.contributionStartHeight}
            </Text>
          </div>
          <div className="flex flex-1 flex-col pl-16 items-start">
            <Text
              customClass="text-lightGray font-bold"
              type={TextTypes.SubText}
            >
              Donation End
            </Text>
            <Text
              customClass="text-lightGray font-light"
              type={TextTypes.SubText}
            >
              {"#" + pool.contributionEndHeight}
            </Text>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col items-start">
            <Text
              customClass="text-lightGray font-bold"
              type={TextTypes.SubText}
            >
              Contributors
            </Text>
            <Text
              customClass="text-lightGray font-light"
              type={TextTypes.SubText}
            >
              {pool.poolMembers.length}
            </Text>
          </div>
          <div className="flex flex-1 flex-col pl-16 items-start">
            <Text
              customClass="text-lightGray font-bold"
              type={TextTypes.SubText}
            >
              Fee
            </Text>
            <Text
              customClass="text-lightGray font-light"
              type={TextTypes.SubText}
            >
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
              {pool.totalContributions / STX_MULTIPLE}
            </Text>
          </div>

          <div className="flex flex-1 flex-col pl-16 items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              REAT Won
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              {pool.totalCoinsWon || "N/A"}
            </Text>
          </div>
        </div>

        {/*
        pool.startedMineHeight && (
          <div className="flex flex-row">
            <div className="flex flex-1    flex-col items-start">
              <Text customClass="text-lightGray" type={TextTypes.SubText}>
                Mine Start
              </Text>
              <Text customClass="text-lightGray" type={TextTypes.SubText}>
                {"#" + pool.startedMineHeight}
              </Text>
            </div>

            <div className="flex flex-1 flex-col pl-16 items-start">
              <Text customClass="text-lightGray" type={TextTypes.SubText}>
                Claim Block
              </Text>
              <Text customClass="text-lightGray" type={TextTypes.SubText}>
                {"#" +
                  (pool.startedMineHeight +
                    BLOCKS_AFTER_START_TO_COMPLETE_MINE)}
              </Text>
            </div>
          </div>
        )
                  */}
      </div>
      {authenticated ? (
        <>
          {pool.poolStatus === POOL_STATUS.READY && isOwner && (
            <TileButton
              onClick={() => handleTileClick(pool)}
              customClass="px-12"
            >
              Start Mining
            </TileButton>
          )}

          {pool.poolStatus === POOL_STATUS.OPEN && (
            <TileButton
              onClick={() => handleTileClick(pool)}
              customClass="px-12"
            >
              Join Mining Pool
            </TileButton>
          )}

          {pool.poolStatus === POOL_STATUS.COMPLETE && (
            <TileButton
              onClick={() => handleTileClick(pool)}
              customClass="px-12"
            >
              Claim
            </TileButton>
          )}

          {(pool.poolStatus === POOL_STATUS.UNKNOWN ||
            pool.poolStatus === POOL_STATUS.MINING ||
            pool.poolStatus === POOL_STATUS.PENDING ||
            (pool.poolStatus === POOL_STATUS.READY && !isOwner)) && (
            <TileButtonGray
              onClick={() => handleTileClick(pool)}
              customClass=""
            >
              View Details
            </TileButtonGray>
          )}
        </>
      ) : (
        <>
          <TileButton onClick={() => handleAuth()} customClass="px-12">
            Connect Wallet
          </TileButton>
        </>
      )}
    </div>
  );
};
export default PoolTile;
function doOpenAuth() {
  throw new Error("Function not implemented.");
}
