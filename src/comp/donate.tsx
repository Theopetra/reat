import { POOL_STATUS, POOL_TYPE, useAppState } from "../state";
import Text, { TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { TitleHeader } from "./Title";
import { NAV_HEIGHT_OFFSET } from "./Nav";

import { BASIC_HOME_STYLE } from "./Home";
import { TileButton } from "./Button";
import TrendingPool from "./TrendingPool";
import { toast } from "react-toastify";
import { TaxDisclaimer, PoolInfo, TOAST_CONFIG } from "./Models";

import CreatePool from "./Models/CreatePool";
import PoolOpen from "./Models/PoolOpen";
import StartPool from "./Models/StartPool";
import PoolTile from "./PoolTile";
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

type ToastShowProp = {
  ToastComp: React.FC<{ closeToast?: () => void }>;
};
const Donate = () => {
  const { pools, senderAddress } = useAppState();

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
    return pools.map((pool) => {
      return (
        <PoolTile handleTileClick={handleTileClick} key={pool.name} {...pool} />
      );
    });
  };

  const handleTileClick = (pool: POOL_TYPE) => {
    console.log("selected pool pool", pool);
    const isOwner = pool.poolOwner === senderAddress;

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
    } else {
      toast(
        ({ closeToast }) => <PoolInfo pool={pool} closeToast={closeToast} />,
        TOAST_CONFIG
      );
    }
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
          Create Pool Pool
        </TileButton>
        <TrendingPool />
        <div className="flex flex-col w-full max-w-[1140px] items-center gap-20">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-row items-center justify-between gap-10">
              <TextHeader>Mining Pools</TextHeader>
              <div className="flex flex-row items-center gap-3">
                <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: TaxDisclaimer,
                    })
                  }
                >
                  Tax Disclaimer
                </Text>
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
