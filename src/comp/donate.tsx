import { POOL_STATUS, POOL_TYPE, useAppState } from "../state";
import Text, { TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { ModelTitle, TitleHeader } from "./Title";
import { NAV_HEIGHT_OFFSET } from "./Nav";
import { io } from "socket.io-client";

import { BASIC_HOME_STYLE } from "./Home";
import { FilterButton, TileButton } from "./Button";
import TrendingPool from "./TrendingPool";
import { toast, ToastContainer } from "react-toastify";
import { TaxDisclaimer, PoolInfo, TOAST_CONFIG } from "./Models";

import CreatePool from "./Models/CreatePool";
import PoolOpen from "./Models/PoolOpen";
import StartPool from "./Models/StartPool";
import PoolTile from "./PoolTile";
import { useEffect, useState } from "react";
import { fetchPrincipalStxBalance } from "../utils/stxHelperFuncs";
import { blocksAPI, STX_MULTIPLE } from "../utils/stx";
import { isMobile } from "react-device-detect";
import MineNextBlock from "./Models/MineBlocks";
import SubComp from "./BlockSub";
type Tile = {
  icon: any;
  title: string;
  text: string | number;
};

export const Tile = ({ icon, title, text }: Tile) => {
  return (
    <div className="flex flex-col justify-between h-[188px] w-[158px] md:min-h-[218px] md:w-[218px] bg-lightBlack rounded-[28px] p-5  md:p-7 gap-1">
      <div className="flex flex-col items-start gap-4 md:gap-5">
        <Image src={icon} alt="Icon" width={40} height={40} />
        <Text customClass="text-lightGray" type={TextTypes.SubText}>
          {title}
        </Text>
      </div>

      <Text customClass="text-white  text-3xl " type={TextTypes.BoldSubText}>
        {text}
      </Text>
    </div>
  );
};

enum POOL_FILTER {
  ALL = "All",
  OPEN = "Open",
  CURRENTLY_MINING = "Currently Mining",
  COMPLETED = "Completed",
}
type DonateType = {
  control: boolean;
};
const Donate = (props: DonateType) => {
  const { pools, senderAddress, _currentBlockHeight, currentBlockHeight } =
    useAppState();
  const { control } = props;
  const [stxBalance, setStxBalance] = useState<null | number>(null);

  const [selectedPoolFilter, setSelectedPoolFilter] = useState<POOL_FILTER>(
    POOL_FILTER.ALL
  );

  useEffect(() => {
    handleFetchingPrincipalBalance();
    fetchLatestBlock();
  }, [senderAddress]);

  const fetchLatestBlock = async () => {
    try {
      const blockList = await blocksAPI.getBlockList({});
      if (blockList.results.length > 0) {
        _currentBlockHeight(blockList.results[0].height);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleFetchingPrincipalBalance = async () => {
    try {
      if (senderAddress) {
        const totalStx = await fetchPrincipalStxBalance(senderAddress);

        const stx = Math.trunc(totalStx / STX_MULTIPLE);
        setStxBalance(stx);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  /*
  const handleToast = (props: ToastShowProp) => {
    toast(({ closeToast }) => <props.ToastComp closeToast={closeToast} />, {
      autoClose: false,
      hideProgressBar: true,
      style: {
        backgroundColor: "transparent",
      },
      draggable: false,
      closeOnClick: false,
      closeButton: true,
      position: "top-center",
    });
  };
  */

  const mineNextBlock = () => {
    toast(({ closeToast }) => <MineNextBlock closeToast={closeToast} />, {
      autoClose: false,
      hideProgressBar: true,
      style: {
        backgroundColor: "transparent",
      },
      draggable: false,
      closeOnClick: false,
      closeButton: true,
      position: "top-center",
    });
  };

  const createPool = () => {
    toast(({ closeToast }) => <CreatePool closeToast={closeToast} />, {
      autoClose: false,
      hideProgressBar: true,
      style: {
        backgroundColor: "transparent",
      },
      draggable: false,
      closeOnClick: false,
      closeButton: true,
      position: "top-center",
    });
  };

  const renderPools = () => {
    //console.log("render pools", pools);
    const filterPools = pools.filter((pool) => {
      if (selectedPoolFilter === POOL_FILTER.ALL) {
        return true;
      } else if (
        selectedPoolFilter === POOL_FILTER.OPEN &&
        pool.poolStatus === POOL_STATUS.OPEN
      ) {
        return true;
      } else if (
        selectedPoolFilter === POOL_FILTER.CURRENTLY_MINING &&
        pool.poolStatus === POOL_STATUS.MINING
      ) {
        return true;
      } else if (
        selectedPoolFilter === POOL_FILTER.COMPLETED &&
        pool.poolStatus === POOL_STATUS.COMPLETE
      ) {
        return true;
      } else {
        return false;
      }
    });

    return filterPools.map((pool) => {
      //console.log("pool", pool);
      return <PoolTile key={pool.id} {...pool} />;
    });
  };

  const handleFilterButtons = (filter: POOL_FILTER) => {
    setSelectedPoolFilter(filter);
  };

  const renderPoolFilterButtons = () => {
    // loop through each item in POOL_FILTER and return a component
    return Object.values(POOL_FILTER).map((filter) => {
      return (
        <FilterButton
          onClick={() => handleFilterButtons(filter)}
          active={selectedPoolFilter === filter}
          key={filter}
        >
          {filter}
        </FilterButton>
      );
    });
  };
  console.log("pools", pools);
  console.log("current block height", currentBlockHeight);
  const [isAdmin, setIsAdmin] = useState(props.control);

  return (
    <>
      <SubComp />

      <div className="bg-black">
        <ToastContainer
          style={{
            minWidth: isMobile ? "300px" : "450px",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
          enableMultiContainer={false}
        />
        <div className="donateLanding" />
        <div className="landingOverlay" />
        <div
          style={{
            zIndex: 22,
            paddingTop: NAV_HEIGHT_OFFSET,
          }}
          className={`${BASIC_HOME_STYLE}`}
        >
          <TitleHeader customClass="text-center">DONATE</TitleHeader>
          {control && isAdmin && (
            <div className="flex flex-col gap-6">
              <TileButton onClick={() => createPool()} customClass="px-12">
                Admin Create Pool
              </TileButton>
              <TileButton onClick={() => mineNextBlock()} customClass="px-12">
                Admin Mine Blocks
              </TileButton>
            </div>
          )}

          {/* <TrendingPool totalStx={stxBalance} /> */}
          <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex flex-row w-80 items-center justify-between ">
                  <TextHeader>Mining Pools</TextHeader>
                  <div
                    style={{
                      height: "40px",
                      width: "1px",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                    }}
                  />
                </div>

                <div className="flex md:px-10 flex-1 flex-row items-center  text-center justify-between gap-3 ">
                  {renderPoolFilterButtons()}
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #F5F5F5",
                  width: "100%",
                  height: "0px",
                }}
              />
            </div>
            <div className="flex flex-col justify-center gap-12">
              <div className="flex w-full flex-col lg:flex-row flex-wrap justify-center items-center gap-y-6 gap-x-5">
                {renderPools()}
                {pools.length === 0 && (
                  <div className="flex flex-col w-full items-center text-center gap-5">
                    <ModelTitle>No Pools Created</ModelTitle>
                    <ModelTitle>Create a Pool above</ModelTitle>
                  </div>
                )}
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
          <div className="donateLanding" />
          <div className="landingOverlayFlip" />
        </div>
      </div>
    </>
  );
};

export default Donate;
