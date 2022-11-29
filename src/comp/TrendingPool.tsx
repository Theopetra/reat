import { useAppState } from "../state";
import Text, { BodySubText, TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { TitleHeader } from "./Title";
import { NAV_HEIGHT, NAV_HEIGHT_OFFSET } from "./Nav";

import { BASIC_HOME_STYLE } from "./Home";
import { NavButton } from "./Button";
import { Tile } from "./donate";

const TrendingPool = () => {
  return (
    <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-row items-center justify-between gap-10">
          <TextHeader>Trending Pools - San Jose</TextHeader>
          <TextHeader customClass="text-lightYellow">
            3,763 Available STX
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
      <div className="flex w-full flex-row justify-between items-center gap-6">
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
              San Jose
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
              Help provide affordable rental housing to the citizens of San Jose
              through capped rents.
            </Text>
          </div>
          <div />
          <NavButton customClass="px-12">Join Mining Pool</NavButton>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row flex-wrap gap-10">
            <Tile icon="/images/community.svg" title="Contributors" text="28" />
            <Tile
              icon="/images/padlock.svg"
              title="Contributions Close"
              text="11-11-2023"
            />
            <Tile
              icon="/images/block.svg"
              title="Starting Date"
              text="01-11-2023"
            />
          </div>
          <div className="flex flex-row flex-wrap gap-10">
            <Tile
              icon="/images/StxLogo.png"
              title="Total STX Raised"
              text="300"
            />
            <Tile
              icon="/images/user.svg"
              title="Your Contribution"
              text="0 STX"
            />
            <Tile icon="/images/tags.svg" title="Pool Fee" text="1%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPool;
