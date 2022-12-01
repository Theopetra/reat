import { useAppState } from "../state";
import Text, { BodySubText, TextHeader, TextTypes } from "./Text";
import Image from "next/image";
import { TitleHeader } from "./Title";
import { NAV_HEIGHT, NAV_HEIGHT_OFFSET } from "./Nav";

import { BASIC_HOME_STYLE } from "./Home";
import { NavButton, TileButton } from "./Button";
import TrendingPool from "./TrendingPool";
import { toast } from "react-toastify";
import {
  TaxDisclaimer,
  DonationReceipt,
  PoolOpen,
  PoolMining,
  PoolCompleted,
  CreatePool,
  FinancialDisclaimer,
} from "./Models";

type Tile = {
  icon: any;
  title: string;
  text: string;
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

export const PoolTile = () => {
  return (
    <div className="flex flex-col h-[456px] w-[380px] bg-lightBlack rounded-[28px] p-9 gap-5">
      <div className="flex w-full items-center flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <Text customClass="text-lightGray" type={TextTypes.SubText}>
            Pool
          </Text>
          <Text
            customClass="text-white  text-2xl "
            type={TextTypes.BoldSubText}
          >
            San Jose
          </Text>
        </div>
        <Text
          customClass="text-darkGreen font-large text-lg"
          type={TextTypes.SubText}
        >
          OPEN
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
              11-15-2022
            </Text>
          </div>
          <div className="flex  pr-6 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Claim Date
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              11-15-2022
            </Text>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Contributors
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              10
            </Text>
          </div>
          <div className="flex pr-6 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Fee
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              10 STX
            </Text>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              Committed STX
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              1,000
            </Text>
          </div>
          <div className="flex flex pr-6 flex-col items-start">
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              REAT Won
            </Text>
            <Text customClass="text-lightGray" type={TextTypes.SubText}>
              0
            </Text>
          </div>
        </div>
      </div>
      <TileButton customClass="px-12">Join Mining Pool</TileButton>
    </div>
  );
};

type ToastShowProp = {
  ToastComp: React.FC<{ closeToast?: () => void }>;
};
const Donate = () => {
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
                <Text
                  customClass="text-gray font-large text-lg"
                  type={TextTypes.SubText}
                  onClick={() =>
                    handleToast({
                      ToastComp: FinancialDisclaimer,
                    })
                  }
                >
                  Financial Disclaimer
                </Text>
                <Text
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
                </Text>
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
          <div className="flex flex-col gap-12">
            <div className="flex w-full flex-row justify-between items-center gap-6">
              <PoolTile />
              <PoolTile />
              <PoolTile />
            </div>
            <div className="flex w-full flex-row justify-between items-center gap-6">
              <PoolTile />
              <PoolTile />
              <PoolTile />
            </div>
            <div className="flex w-full flex-row justify-between items-center gap-6">
              <PoolTile />
              <PoolTile />
              <PoolTile />
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
