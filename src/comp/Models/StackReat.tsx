import { ButtonColors, ButtonTypes, ModelButton } from "../Button";
import { BASIC_HOME_STYLE } from "../Home";
import {
  ModelInfo,
  ModelInfoProps,
  ModelProps,
  MODEL_BASIC_STYLES,
  MODEL_INPUT_STYLE,
  TOAST_CONFIG,
  TransactionSubmitted,
} from "../Models";
import { NAV_HEIGHT_OFFSET } from "../Nav";
import Text, { NavText, TextHeader, TextTypes } from "../Text";
import { ModelTitle, TitleHeader } from "../Title";
import { useAppState } from "../../state";
import { useState } from "react";
import {
  AnchorMode,
  createAssetInfo,
  FungibleConditionCode,
  makeStandardFungiblePostCondition,
  uintCV,
} from "@stacks/transactions";
import {
  MINING_STAKING_ADDRESS,
  MINING_STAKING_NAME,
  STX_MULTIPLE,
  TOKEN_ADDRESS,
  TOKEN_ID,
  TOKEN_NAME,
} from "../../utils/stx";
import { StacksMainnet } from "@stacks/network";
import { toast } from "react-toastify";
import { openContractCall } from "@stacks/connect-react";

type StackInputTypes = {
  cycles: string;
  amount: string;
};

type ConfrimStackModel = ModelProps & {
  amount: string;
  cycles: string;
};

export const StackReatModel = ({
  amount,
  cycles,
  closeToast,
}: ConfrimStackModel) => {
  const { senderAddress, currentBlockHeight } = useAppState();

  const handleSuccessModel = (txId: string) => {
    toast(
      ({ closeToast }) => (
        <TransactionSubmitted txId={txId} closeToast={closeToast} />
      ),
      {
        autoClose: 10000,

        style: {
          backgroundColor: "transparent",
        },
        draggable: false,
        closeOnClick: false,
        closeButton: true,
        position: "top-center",
      }
    );
  };

  const handleSubmit = async () => {
    try {
      // ensure there are no errors in poolInputErrors

      const postConditionAmount = 100000 * parseInt(amount, 10);
      const fungibleAssetInfo = createAssetInfo(
        TOKEN_ADDRESS,
        TOKEN_NAME,
        TOKEN_ID
      );

      const pc = [
        makeStandardFungiblePostCondition(
          senderAddress || "",
          FungibleConditionCode.LessEqual,
          postConditionAmount,
          fungibleAssetInfo
        ),
      ];

      const args = [uintCV(amount), uintCV(cycles)];

      const txOptions: any = {
        contractAddress: MINING_STAKING_ADDRESS,
        contractName: MINING_STAKING_NAME,
        functionName: "stake-many-cycles",
        functionArgs: args,
        senderKey: senderAddress,
        validateWithAbi: true,
        network: new StacksMainnet(),
        postConditions: pc,
        anchorMode: AnchorMode.Any,
        onFinish: (data: any) => {
          //handleValidTrans();
          handleSuccessModel(data.txId);

          return;
        },
        onCancel: () => {
          console.log("TX was cancelled");
          //toast.error("Transaction cancelled");
        },
      };

      const transaction = await openContractCall(txOptions);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div className={MODEL_BASIC_STYLES}>
      <ModelTitle>Stack REAT</ModelTitle>

      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <Text type={TextTypes.BoldSubText}>CONFIRM DETAILS</Text>
      <div className="flex flex-col gap-4">
        <ModelInfo title="REAT to Stack" text={amount} />
        <ModelInfo title="Stacking Start" text={currentBlockHeight} />
        <ModelInfo title="Claim Date" text={currentBlockHeight + cycles} />
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
          onClick={() => handleSubmit()}
          type={ButtonTypes.Nav}
          color={ButtonColors.GreenGradient}
        >
          CONFIRM STACK
        </ModelButton>
      </div>
    </div>
  );
};

const StackReat = () => {
  const { senderAddress, currentBlockHeight } = useAppState();

  const [poolInput, setPoolInput] = useState<StackInputTypes>({
    amount: "",
    cycles: "",
  });

  // create a state of the PoolInputType that handles showing the error message
  const [poolInputErrors, setPoolInputErrors] = useState<StackInputTypes>({
    amount: "",
    cycles: "",
  });

  //create a state that keeps track of submit errors
  const [submitError, setSubmitError] = useState<string>("");

  const handleStackAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);

    console.log("amount: ", amount);
    // check if start is a number
    if (isNaN(amount)) {
      setPoolInputErrors({
        ...poolInputErrors,
        amount: "Amount must be a number",
      });
      return;
    } else if (amount < 20) {
      setPoolInputErrors({
        ...poolInputErrors,
        amount: "Amount must be greater than 21",
      });
      return;
    }

    setPoolInput({ ...poolInput, amount: e.target.value });
    setPoolInputErrors({
      ...poolInputErrors,
      amount: "",
    });
  };

  const handleStackCycleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);

    // check if start is a number
    if (isNaN(amount)) {
      setPoolInputErrors({
        ...poolInputErrors,
        cycles: "Amount must be a number",
      });
      return;
    } else if (amount <= 0) {
      setPoolInputErrors({
        ...poolInputErrors,
        cycles: "Amount must be greater than 0",
      });
      return;
    }

    setPoolInput({ ...poolInput, cycles: e.target.value });
    setPoolInputErrors({
      ...poolInputErrors,
      cycles: "",
    });
  };

  const handleSubmit = async () => {
    if (Object.values(poolInputErrors).some((error) => error !== "")) {
      setSubmitError("Please fix errors");
      return;
    }

    // ensure there are no empty values in poolInput
    if (Object.values(poolInput).some((value) => value === "")) {
      setSubmitError("Please fill out all fields");
      return;
    }

    toast(
      ({ closeToast }) => (
        <StackReatModel
          amount={poolInput.amount}
          cycles={poolInput.cycles}
          closeToast={closeToast}
        />
      ),
      TOAST_CONFIG
    );
    return null;
  };
  return (
    <div className="flex flex-col h-auto w-[340px] md:w-[400px] bg-lightBlack rounded-[20px] p-9 gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <NavText customClass="text-left text-lightGray">
            Amount of REAT to Stack
          </NavText>
        </div>

        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center gap-4">
          <input
            className={MODEL_INPUT_STYLE}
            placeholder="Min. 21 REAT"
            onChange={handleStackAmount}
          />
          <ModelButton
            type={ButtonTypes.Nav}
            color={ButtonColors.GreenGradient}
          >
            MAX
          </ModelButton>
        </div>
        {poolInputErrors.amount !== "" && (
          <Text customClass="text-red-500 text-sm" type={TextTypes.TriText}>
            {poolInputErrors.amount}
          </Text>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <NavText customClass="text-left text-lightGray">
            Number Of Cycles (2 Weeks Each)
          </NavText>
        </div>

        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center gap-4">
          <input
            className={MODEL_INPUT_STYLE}
            placeholder="Max. 20 Cycles"
            onChange={handleStackCycleAmount}
          />
          <ModelButton
            type={ButtonTypes.Nav}
            color={ButtonColors.GreenGradient}
          >
            MAX
          </ModelButton>
        </div>
        {poolInputErrors.cycles !== "" && (
          <Text customClass="text-red-500 text-sm" type={TextTypes.TriText}>
            {poolInputErrors.cycles}
          </Text>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <ModelInfo
          title="Stacking Start"
          text={currentBlockHeight ? currentBlockHeight + 5 : "N/A"}
        />
      </div>
      <div className="flex flex-col md:flex-row jusitfy-between items-center gap-y-2">
        <ModelButton
          type={ButtonTypes.Nav}
          customClass="px-16"
          color={ButtonColors.GreenGradient}
          onClick={handleSubmit}
        >
          STACK REAT
        </ModelButton>
      </div>
      {submitError !== "" && (
        <Text
          customClass="text-red-500 text-center text-sm"
          type={TextTypes.TriText}
        >
          {submitError}
        </Text>
      )}
    </div>
  );
};

export default StackReat;
