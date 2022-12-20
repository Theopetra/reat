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

export const PoolTile = (
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
              {pool.totalContributions}
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
      {pool.poolStatus === POOL_STATUS.UNKNOWN && (
        <ModelButton
          onClick={() => pool.handleTileClick(pool)}
          type={ButtonTypes.Nav}
          color={ButtonColors.Gray}
        >
          View Details
        </ModelButton>
      )}
      {pool.poolStatus === POOL_STATUS.MINING && (
        <TileButton
          onClick={() => pool.handleTileClick(pool)}
          customClass="px-12"
        >
          View Details
        </TileButton>
      )}
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

    if (pool.poolStatus === POOL_STATUS.UNKNOWN) {
      toast(
        ({ closeToast }) => <PoolInfo pool={pool} closeToast={closeToast} />,
        TOAST_CONFIG
      );
      return null;
    } else if (pool.poolStatus === POOL_STATUS.OPEN) {
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
