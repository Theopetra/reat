import { POOL_STATUS, POOL_TYPE, useAppState } from "../state";
import Text, { BodySubText, TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { TitleHeader } from "./Title";
import { NAV_HEIGHT, NAV_HEIGHT_OFFSET } from "./Nav";

import { BASIC_HOME_STYLE } from "./Home";
import { NavButton } from "./Button";
import { Tile } from "./donate";

const TrendingPool = () => {
  const { pools, currentBlockHeight } = useAppState();
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

  return (
    <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-row items-center justify-between gap-10">
          <TextHeader>{`Trending Pools - ${pool.name}`}</TextHeader>
        </div>
        <div
          style={{
            border: "1px solid #F5F5F5",
            width: "100%",
            height: "0px",
          }}
        />
      </div>
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col  min-h-[300px] h-[1000px] max-h-[456px] min-w-[300px] max-w-[380px] bg-lightBlack rounded-[28px] p-9 gap-5">
          <div className="w-full flex-col flex gap-2.5">
            <div className="flex flex-row items-center justify-between ">
              <Text customClass="text-lightGray" type={TextTypes.SubText}>
                Pool
              </Text>
              <Text
                customClass="text-darkGreen font-large text-lg"
                type={TextTypes.SubText}
              >
                {pool.poolStatus === POOL_STATUS.OPEN ? "OPEN" : "CLOSED"}
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
          <NavButton customClass="px-12">Join Mining Pool</NavButton>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col md:flex-row flex-wrap gap-10">
            <Tile
              icon="/images/community.svg"
              title="Contributors"
              text={pool.poolMembers.length}
            />
            <Tile
              icon="/images/padlock.svg"
              title="Contributions Close"
              text={pool.contributionEndHeight}
            />
            <Tile
              icon="/images/block.svg"
              title="Starting Date"
              text={pool.contributionStartHeight}
            />
          </div>
          <div className="flex  flex-col md:flex-row flex-wrap gap-10">
            <Tile
              icon="/images/StxLogo.png"
              title="Total STX Raised"
              text={`${pool.totalContributions} STX`}
            />
            <Tile
              icon="/images/user.svg"
              title="Your Contribution"
              text={`${pool.totalContributions} STX`}
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
