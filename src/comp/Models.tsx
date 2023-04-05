import { ColorRing } from "react-loader-spinner";
import { useAppState } from "../state";
import { MIN_BLOCK_CONFIRMS_TO_CLAIM_REWARD, STX_MULTIPLE } from "../utils/stx";
import { ModelButton, TileButton, ButtonColors, ButtonTypes } from "./Button";
import { PoolOpenType } from "./Models/PoolOpen";
import Text, { BodySubText, NavText, TextTypes } from "./Text";
import { ModelTitle } from "./Title";

export type ModelInfoProps = {
  title: string;
  text: string | number;
};

export const ModelInfo = ({ title, text }: ModelInfoProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <Text customClass="text-lightGray" type={TextTypes.SubText}>
        {title}
      </Text>
      <Text customClass="text-lightGray" type={TextTypes.SubText}>
        {text}
      </Text>
    </div>
  );
};

export type ModelProps = {
  closeToast?: () => void;
};

export const TOAST_CONFIG: any = {
  autoClose: false,
  hideProgressBar: true,
  style: {
    backgroundColor: "transparent",
  },
  draggable: false,
  closeOnClick: false,
  closeButton: true,
  position: "top-center",
};
export const MODEL_BASIC_STYLES =
  "m-auto flex flex-col h-auto  md:min-w-[320px] w-[4000px] max-w-[300px] md:max-w-[380px] bg-lightBlack rounded-[20px] p-9 gap-5 !max-h-[90vh] overflow-y-auto ";
export const TaxDisclaimer = ({ closeToast }: ModelProps) => {
  return (
    <div className={MODEL_BASIC_STYLES}>
      <ModelTitle>Tax Disclaimer</ModelTitle>
      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <div className="flex flex-col gap-3">
        <Text type={TextTypes.SubText}>
          Mining REAT is a charitable act & contributions are considered a
          donation to the REAT non profit.
        </Text>
        <Text type={TextTypes.SubText}>
          The responsibility is that of your account to file any receipts in a
          manner that details the charitable donations of your mining
          activities.
        </Text>
      </div>
      <div className="flex flex-row gap-2.5">
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "5px",
            backgroundColor: "#F5F5F5",
          }}
        />
        <Text type={TextTypes.TriText}>I have read the Tax Disclaimer</Text>
      </div>
      <div className="flex flex-col md:flex-row jusitfy-between items-center gap-y-2">
        <ModelButton
          onClick={() => (closeToast ? closeToast() : null)}
          type={ButtonTypes.Nav}
          color={ButtonColors.Gray}
        >
          BACK
        </ModelButton>
        <ModelButton type={ButtonTypes.Nav} color={ButtonColors.YelloGradient}>
          ACCEPT DISCLAIMER
        </ModelButton>
      </div>
    </div>
  );
};

export const FinancialDisclaimer = ({ closeToast }: ModelProps) => {
  return (
    <div className={MODEL_BASIC_STYLES}>
      <ModelTitle>Financial Disclaimer</ModelTitle>
      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <div className="flex flex-col gap-3">
        <Text type={TextTypes.SubText}>
          This token is not liquid. This token is NOT a representation of real
          estate whatsoever. REAT is a community token that represents your
          donation to REAT, which is an affordable housing project. Do not
          expect to profit whatsoever.
        </Text>
      </div>
      <div className="flex flex-row gap-2.5">
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "5px",
            backgroundColor: "#F5F5F5",
          }}
        />
        <Text type={TextTypes.TriText}>I have read the Tax Disclaimer</Text>
      </div>
      <div className="flex flex-col md:flex-row jusitfy-between items-center gap-y-2">
        <ModelButton
          onClick={() => (closeToast ? closeToast() : null)}
          type={ButtonTypes.Nav}
          color={ButtonColors.Gray}
        >
          BACK
        </ModelButton>
        <ModelButton type={ButtonTypes.Nav} color={ButtonColors.YelloGradient}>
          ACCEPT DISCLAIMER
        </ModelButton>
      </div>
    </div>
  );
};

/*
export const UnStackReat = ({ closeToast }: ModelProps) => {
  return (
    <div className={MODEL_BASIC_STYLES}>
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>Unstack REAT</ModelTitle>
      </div>
      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <div className="flex flex-col gap-4">
        <Text type={TextTypes.BoldSubText}>CONFIRM DETAILS</Text>
        <ModelInfo title="REAT to Stack" text="10,000" />
        <ModelInfo title="Stacking Start" text="11-15-2022" />
        <ModelInfo title="Claim Date" text="01-01-2023" />
      </div>
      <div className="flex flex-row jusitfy-between items-center">
        <ModelButton
          onClick={() => (closeToast ? closeToast() : null)}
          type={ButtonTypes.Nav}
          color={ButtonColors.Gray}
        >
          BACK
        </ModelButton>
        <ModelButton
          customClass="px-12"
          type={ButtonTypes.Nav}
          color={ButtonColors.GreenGradient}
        >
          CONFIRM UNSTACK
        </ModelButton>
      </div>
    </div>
  );
};
*/

export const BLOCKS_AFTER_START_TO_COMPLETE_MINE =
  MIN_BLOCK_CONFIRMS_TO_CLAIM_REWARD;

export const calculatCompletionProgress = (
  currentBlock: number,
  mineStartBlock: number
): string => {
  const completionBlock = mineStartBlock + BLOCKS_AFTER_START_TO_COMPLETE_MINE;
  const completionProgress = completionBlock - currentBlock;

  if (completionProgress < 0) {
    return "100%";
  } else {
    // get the percentage of completionProgress being equal to completionBlock
    const percentage = (
      (1 - completionProgress / BLOCKS_AFTER_START_TO_COMPLETE_MINE) *
      100
    ).toFixed(1);
    return `${percentage}%`;
  }
};
export const PoolInfo = ({ closeToast, pool }: PoolOpenType) => {
  const { currentBlockHeight } = useAppState();
  return (
    <div className={MODEL_BASIC_STYLES}>
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>{pool.name}</ModelTitle>

        <Text
          customClass="text-white font-large text-lg"
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <Text type={TextTypes.BoldSubText}>Pool Details</Text>
          <div className="text-xs text-lightGray ">
            {"Block #" + currentBlockHeight}
          </div>
        </div>
        <ModelInfo
          title="Donation Start"
          text={"#" + pool.contributionStartHeight}
        />

        <ModelInfo
          title="Donation Closed"
          text={"#" + pool.contributionEndHeight}
        />
        <ModelInfo
          title="Mine Start"
          text={pool.startedMineHeight ? "#" + pool.startedMineHeight : "N/A"}
        />

        <ModelInfo
          title="Claim Date"
          text={
            pool.startedMineHeight
              ? "#" +
                (pool.startedMineHeight + BLOCKS_AFTER_START_TO_COMPLETE_MINE)
              : "N/A"
          }
        />
        <ModelInfo title="Contributors" text={pool.poolMembers.length} />
        <ModelInfo
          title="STX Committed"
          text={pool.totalContributions / STX_MULTIPLE}
        />
        <ModelInfo title="Fee" text={pool.ownerFee + "%"} />
        <ModelInfo title="REAT Won" text={pool.totalCoinsWon} />
        <ModelInfo
          title="Completion"
          text={
            pool.startedMineHeight
              ? calculatCompletionProgress(
                  currentBlockHeight,
                  pool.startedMineHeight
                )
              : "N/A"
          }
        />
      </div>
      <div></div>
      <div className="flex flex-row jusitfy-between items-center">
        <ModelButton
          onClick={() => (closeToast ? closeToast() : null)}
          type={ButtonTypes.Nav}
          color={ButtonColors.Gray}
          customClass="!w-[200px] md:!w-[400px]"
        >
          BACK
        </ModelButton>
      </div>
    </div>
  );
};

export const MODEL_INPUT_STYLE =
  "flex-1 h-[45px] pl-2 text-white bg-transparent";

export const DonationReceipt = ({ closeToast }: ModelProps) => {
  return (
    <div className={MODEL_BASIC_STYLES}>
      <ModelTitle>Donation Receipt</ModelTitle>
      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <Text type={TextTypes.BoldSubText}>REAT NON-PROFIT</Text>
      <div className="flex flex-col gap-4">
        <ModelInfo title="Donation Contribution" text="$1000 USD" />
        <ModelInfo title="  Donation Date" text="01-01-2023" />
        <ModelInfo title="Gift Received" text="12,000 REAT" />
        <ModelInfo title="Donating Wallet" text=" STX" />
        <div
          style={{
            border: "1px solid #F5F5F5",
            width: "100%",
            height: "0px",
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Text customClass="text-lightGray" type={TextTypes.SubText}>
          Cause
        </Text>
        <Text customClass="text-lightGray" type={TextTypes.SubText}>
          Help provide affordable housing to the citizens of San Jose with
          capped rent increases.
        </Text>
      </div>

      <div className="flex flex-col md:flex-row jusitfy-between items-center gap-y-2">
        <ModelButton
          onClick={() => (closeToast ? closeToast() : null)}
          type={ButtonTypes.Nav}
          color={ButtonColors.Gray}
        >
          BACK
        </ModelButton>
        <ModelButton type={ButtonTypes.Nav} color={ButtonColors.YelloGradient}>
          DOWNLOAD RECEIPT
        </ModelButton>
      </div>
    </div>
  );
};

type TransactionSubmittedType = ModelProps & {
  txId: string;
};
export const TransactionSubmitted = ({
  closeToast,
  txId,
}: TransactionSubmittedType) => {
  const handleLinkTx = () => {
    window.open(
      `https://explorer.stacks.co/txid/0x${txId ?? ""}?chain=mainnet`
    );
  };

  return (
    <div className={MODEL_BASIC_STYLES}>
      <ModelTitle>Transaction Submitted </ModelTitle>
      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <div
        onClick={() => handleLinkTx()}
        className="flex flex-col gap-2 items-center cursor-pointer"
      >
        <ColorRing
          visible={true}
          height="180"
          width="180"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#E5BD4D", "#E5BD4D", "#E5BD4D", "#E5BD4D", "#E5BD4D"]}
        />
        <Text
          customClass="!text-lightYellow underline"
          type={TextTypes.BoldSubText}
        >
          View Status
        </Text>
      </div>

      <ModelButton
        onClick={() => (closeToast ? closeToast() : null)}
        type={ButtonTypes.Nav}
        color={ButtonColors.Gray}
        customClass="mt-4"
      >
        Close
      </ModelButton>
    </div>
  );
};
