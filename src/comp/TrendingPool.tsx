import { POOL_STATUS, POOL_TYPE, useAppState } from "../state";
import Text, { BodySubText, TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { TitleHeader } from "./Title";
import { NAV_HEIGHT, NAV_HEIGHT_OFFSET } from "./Nav";

import { BASIC_HOME_STYLE } from "./Home";
import { NavButton, TileButton, TileButtonGray } from "./Button";
import { Tile } from "./donate";
import { useConnect } from "@stacks/connect-react";
import { toast } from "react-toastify";
import PoolOpen from "./Models/PoolOpen";
import { PoolInfo, TOAST_CONFIG } from "./Models";
import StartPool from "./Models/StartPool";
import ClaimPool from "./Models/ClaimPool";
import { STX_MULTIPLE } from "../utils/stx";

type TrendingPoolsType = {
  totalStx: number | null;
};
const TrendingPool = ({ totalStx }: TrendingPoolsType) => {
  const { senderAddress, authenticated, pools } = useAppState();
  const { doOpenAuth } = useConnect();

  const handleAuth = () => {
    doOpenAuth();
  };
  const handleTileClick = (pool: POOL_TYPE | undefined) => {
    if (!pool || pool === undefined) {
      return;
    }
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

  if (pools.length === 0) {
    return (
      <div className="flex flex-col h-[456px] w-[380px] bg-lightBlack rounded-[28px] p-9 gap-5">
        <div className="w-full flex-col flex gap-2.5">
          <div className="flex flex-row items-center justify-between ">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Pool
            </Text>
            <Text
              customClass="text-darkGreen font-large text-lg"
              type={TextTypes.SubText}
            >
              OPEN
            </Text>
          </div>
          <Text
            customClass="text-white  text-2xl "
            type={TextTypes.BoldSubText}
          >
            Fetching Pools
          </Text>
        </div>
        <div className="w-full flex-col flex gap-2.5">
          <Text customClass="text-lightGray" type={TextTypes.SubText}>
            Cause
          </Text>

          <Text
            customClass="text-white  text-2xl "
            type={TextTypes.BoldSubText}
          >
            Donate STX with others to increase the pool’s chance of winning
            blocks & help improve housing affordability across America
          </Text>
        </div>
        <div />
      </div>
    );
  }

  // revers order of pools then loop through them to find the first open pool
  const flipped = pools.reverse();
  let pool = flipped.find((pool) => {
    return pool.poolStatus === POOL_STATUS.OPEN;
  });

  if (!pool) {
    pool = pools[0];
  }
  if (pool === undefined) {
    return null;
  }
  const isOwner = pool.poolOwner === senderAddress;

  return (
    <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-row items-center justify-between gap-10">
          <TextHeader>{`Trending Pools - ${pool.name}`}</TextHeader>
          {totalStx && (
            <TextHeader customClass="text-lightYellow">
              {`${totalStx} Available STX`}
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
      <div className="flex w-full flex-col xl:flex-row justify-between items-center gap-6">
        <div className="flex flex-col  min-h-[300px] h-[1000px] max-h-[480px] min-w-[300px] max-w-[380px] bg-lightBlack rounded-[28px] p-9 gap-5">
          <div className="w-full flex-col flex gap-2.5">
            <div className="flex flex-row items-center justify-between ">
              <Text customClass="text-lightGray" type={TextTypes.SubText}>
                Pool
              </Text>
              <Text
                customClass="text-darkGreen font-large text-lg"
                type={TextTypes.SubText}
              >
                {pool.poolStatus}
              </Text>
            </div>
            <Text
              customClass="text-white  text-2xl "
              type={TextTypes.BoldSubText}
            >
              {pool.name}
            </Text>
          </div>
          <div className="w-full flex-col flex gap-2.5">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Cause
            </Text>

            <Text
              customClass="text-white  text-2xl "
              type={TextTypes.BoldSubText}
            >
              Donate STX with others to increase the pool’s chance of winning
              blocks & help improve housing affordability across America
            </Text>
          </div>
          <div />

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
        <div className=" m-auto flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center  md:flex-row lg:px-20 xl:px-0 flex-wrap gap-4 md:gap-10 ">
            <Tile
              icon="/images/community.svg"
              title="Contributors"
              text={pool.poolMembers.length}
            />
            <Tile
              icon="/images/padlock.svg"
              title="Contributions Close"
              text={"#" + pool.contributionEndHeight}
            />
            <Tile
              icon="/images/block.svg"
              title="Starting Block"
              text={"#" + pool.contributionStartHeight}
            />
            <Tile
              icon="/images/StxLogo.png"
              title="Total STX Raised"
              text={`${pool.totalContributions / STX_MULTIPLE} STX`}
            />
            <Tile
              icon="/images/user.svg"
              title="Your Contribution"
              text={`0 STX`}
            />
            <Tile
              icon="/images/tags.svg"
              title="Pool Fee"
              text={`${pool.ownerFee}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPool;
