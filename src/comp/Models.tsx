import { ModelButton, TileButton, ButtonColors, ButtonTypes } from "./Button";
import Text, { BodySubText, NavText, TextTypes } from "./Text";
import { ModelTitle } from "./Title";

export type ModelInfoProps = {
  title: string;
  text: string;
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

type ModelProps = {
  closeToast?: () => void;
};

export const TaxDisclaimer = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[380px] bg-lightBlack rounded-[20px] p-9 gap-5">
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
          donation to the REAT non-profit.
        </Text>
        <Text type={TextTypes.SubText}>
          The responsibility is that of your account to file any receipts in a
          manner that details the charitable donations of your mining activities
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
      <div className="flex flex-row jusitfy-between items-center">
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
    <div className="flex flex-col h-auto w-[380px] bg-lightBlack rounded-[20px] p-9 gap-5">
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
          In no way does the REAT token represent any physical real estate or
          the value of real estate held by any of the subsidiaries connected to
          the REAT non-profit. Any token purchases should not be taken with the
          expectation of an increase in value.
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
      <div className="flex flex-row jusitfy-between items-center">
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

export const PoolMining = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>San Jose</ModelTitle>
        <Text
          customClass="text-darkYellow font-large text-lg"
          type={TextTypes.SubText}
        >
          MINING
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
        <Text type={TextTypes.BoldSubText}>Pool Details</Text>
        <ModelInfo title="Donation Closed" text="11-15-2022" />
        <ModelInfo title="Claim Date" text="01-01-2023" />
        <ModelInfo title="Contributors" text="12" />
        <ModelInfo title="STX Committed" text="800" />
        <ModelInfo title="REAT Won" text="15,000" />
        <ModelInfo title="Completion" text="72%" />
        <ModelInfo title="Fee" text="1.5%" />
      </div>
      <ModelButton
        onClick={() => (closeToast ? closeToast() : null)}
        type={ButtonTypes.Nav}
        color={ButtonColors.Gray}
        customClass="px-20"
      >
        BACK
      </ModelButton>
    </div>
  );
};

export const StackReat = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>Stack REAT</ModelTitle>
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
          CONFIRM STACK
        </ModelButton>
      </div>
    </div>
  );
};

export const UnStackReat = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
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
export const PoolCompleted = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>San Jose</ModelTitle>
        <Text
          customClass="text-white font-large text-lg"
          type={TextTypes.SubText}
        >
          COMPLETE
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
        <Text type={TextTypes.BoldSubText}>Pool Details</Text>
        <ModelInfo title="Donation Closed" text="11-15-2022" />
        <ModelInfo title="Claim Date" text="01-01-2023" />
        <ModelInfo title="Contributors" text="12" />
        <ModelInfo title="STX Committed" text="800" />
        <ModelInfo title="REAT Won" text="15,000" />
        <ModelInfo title="Completion" text="72%" />
        <ModelInfo title="Fee" text="1.5%" />
      </div>
      <div></div>
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
          color={ButtonColors.YelloGradient}
        >
          CLAIM REAT
        </ModelButton>
      </div>
    </div>
  );
};

export const MODEL_INPUT_STYLE =
  "flex-1 h-[45px] pl-2 text-white bg-transparent";
export const CreatePool = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
      <ModelTitle>San Jose</ModelTitle>
      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <div className="flex flex-col gap-2">
        <NavText customClass="text-left text-lightGray">
          Amount of STX to Commit
        </NavText>
        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
          <input
            className={MODEL_INPUT_STYLE}
            placeholder="978 STX Available"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <NavText customClass="text-left text-lightGray">
          Amount of STX to Commit
        </NavText>
        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
          <input
            className={MODEL_INPUT_STYLE}
            placeholder="978 STX Available"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <NavText customClass="text-left text-lightGray">
          Amount of STX to Commit
        </NavText>
        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
          <input
            className={MODEL_INPUT_STYLE}
            placeholder="978 STX Available"
          />
        </div>
      </div>

      <div className="flex flex-row mt-4 jusitfy-between items-center">
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
          color={ButtonColors.YelloGradient}
        >
          CREATE POOL
        </ModelButton>
      </div>
    </div>
  );
};
export const PoolOpen = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>San Jose</ModelTitle>
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
      <NavText customClass="text-left text-lightGray">
        Amount of STX to Commit
      </NavText>
      <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
        <input className={MODEL_INPUT_STYLE} placeholder="978 STX Available" />
        <ModelButton type={ButtonTypes.Nav} color={ButtonColors.YelloGradient}>
          MAX
        </ModelButton>
      </div>
      <div className="flex flex-col gap-4">
        <ModelInfo title="Donation Closes" text="11-15-2022" />
        <ModelInfo title="Claim Date" text="  01-01-2023" />
        <ModelInfo title="Contributors" text="12" />
        <ModelInfo title="STX Committed" text="800" />
        <ModelInfo title="Fee" text=" 1.5%" />
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
          type={ButtonTypes.Nav}
          customClass="px-10"
          color={ButtonColors.YelloGradient}
        >
          START MINNING
        </ModelButton>
      </div>
    </div>
  );
};

export const DonationReceipt = ({ closeToast }: ModelProps) => {
  return (
    <div className="flex flex-col h-auto w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
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

      <div className="flex flex-row jusitfy-between items-center">
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
