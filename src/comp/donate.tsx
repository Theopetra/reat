import { POOL_STATUS, POOL_TYPE, useAppState } from "../state";
import Text, { TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { ModelTitle, TitleHeader } from "./Title";
import { NAV_HEIGHT_OFFSET } from "./Nav";

import { BASIC_HOME_STYLE } from "./Home";
import { FilterButton, TileButton } from "./Button";
import TrendingPool from "./TrendingPool";
import { toast } from "react-toastify";
import { TaxDisclaimer, PoolInfo, TOAST_CONFIG } from "./Models";

import CreatePool from "./Models/CreatePool";
import PoolOpen from "./Models/PoolOpen";
import StartPool from "./Models/StartPool";
import PoolTile from "./PoolTile";
import { useEffect, useState } from "react";
import { fetchPrincipalStxBalance } from "../utils/stxHelperFuncs";
import { STX_MULTIPLE } from "../utils/stx";
type Tile = {
  icon: any;
  title: string;
  text: string | number;
};

export const Tile = ({ icon, title, text }: Tile) => {
  return (
    <div className="flex flex-col justify-between min-h-[218px] w-[218px] bg-lightBlack rounded-[28px] p-7 gap-1">
      <div className="flex flex-col items-start gap-5">
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
const Donate = () => {
  const { pools, senderAddress } = useAppState();

  const [stxBalance, setStxBalance] = useState<null | number>(null);

  const [selectedPoolFilter, setSelectedPoolFilter] = useState<POOL_FILTER>(
    POOL_FILTER.ALL
  );

  console.log("selectedPoolFilter", selectedPoolFilter);
  useEffect(() => {
    handleFetchingPrincipalBalance();
  }, [senderAddress]);

  const handleFetchingPrincipalBalance = async () => {
    try {
      if (senderAddress) {
        const totalStx = await fetchPrincipalStxBalance(senderAddress);
        console.log("totalStx", totalStx);
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
    const filterPools = pools
      .filter((pool) => {
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
      })
      .map((pool) => {
        return <PoolTile key={pool.name} {...pool} />;
      });

    return filterPools;
  };

  const handleFilterButtons = (filter: POOL_FILTER) => {
    setSelectedPoolFilter(filter);
  };

  const renderPoolFilterButtons = () => {
    // loop through each item in POOL_FILTER and return a component
    return Object.values(POOL_FILTER).map((filter) => {
      console.log("fitle", filter);
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
  return (
    <div className="bg-black">
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
        <TileButton onClick={() => createPool()} customClass="px-12">
          Admin Create Pool
        </TileButton>
        <TrendingPool totalStx={stxBalance} />
        <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-row items-center justify-between gap-10">
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

              <div className="flex px-10 flex-1 flex-row items-center justify-between gap-3 ">
                {renderPoolFilterButtons()}
                {/* <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: FinancialDisclaimer,
                    })
                  }
                >
                  Financial Disclaimer
                </Text> */}

                {/* <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: PoolMining,
                    })
                  }
                >
                  Pool Mining
                </Text>
                <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: PoolCompleted,
                    })
                  }
                >
                  Pool Completed
                </Text>
                <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: CreatePool,
                    })
                  }
                >
                  Create Pool
                </Text>
                <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: PoolOpen,
                    })
                  }
                >
                  Pool Open
                </Text>
                <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: DonationReceipt,
                    })
                  }
                >
                  Donation Receipt
                </Text> */}
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
            <div className="flex w-full flex-col lg:flex-row flex-wrap justify-center items-center gap-y-6 gap-x-8">
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
  );
};

export default Donate;
