import { openContractCall } from "@stacks/connect-react";
import { StacksMainnet } from "@stacks/network";
import {
  AnchorMode,
  uintCV,
  stringAsciiCV,
  standardPrincipalCV,
  contractPrincipalCV,
  bufferCVFromString,
  someCV,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
} from "@stacks/transactions";

import { useState } from "react";
import { toast } from "react-toastify";
import { POOL_TYPE, useAppState } from "../../state";
import { POOL_ADDRESS, POOL_NAME } from "../../utils/stx";
import { ModelButton, TileButton, ButtonColors, ButtonTypes } from "../Button";
import {
  ModelInfo,
  ModelProps,
  MODEL_BASIC_STYLES,
  MODEL_INPUT_STYLE,
  TransactionSubmitted,
} from "../Models";
import Text, { BodySubText, NavText, TextTypes } from "../Text";
import { ModelTitle } from "../Title";

export type PoolOpenType = ModelProps & {
  pool: POOL_TYPE;
};
type PoolInputType = {
  stxAmount: string;
};

const PoolOpen = ({ closeToast, pool }: PoolOpenType) => {
  const { senderAddress } = useAppState();

  const [poolInput, setPoolInput] = useState<PoolInputType>({
    stxAmount: "",
  });

  // create a state of the PoolInputType that handles showing the error message
  const [poolInputErrors, setPoolInputErrors] = useState<PoolInputType>({
    stxAmount: "",
  });

  //create a state that keeps track of submit errors
  const [submitError, setSubmitError] = useState<string>("");

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
        onOpen: () => {
          if (closeToast) {
            closeToast();
          }
        },
      }
    );
  };

  const handleStxAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);

    console.log("amount: ", amount);
    // check if start is a number
    if (isNaN(amount)) {
      setPoolInputErrors({
        ...poolInputErrors,
        stxAmount: "Amount must be a number",
      });
      return;
    } else if (amount < 20) {
      setPoolInputErrors({
        ...poolInputErrors,
        stxAmount: "stxAmount must be greater than 21",
      });
      return;
    }

    setPoolInput({ ...poolInput, stxAmount: e.target.value });
    setPoolInputErrors({
      ...poolInputErrors,
      stxAmount: "",
    });
  };

  // handle submit items
  const handleSubmit = async () => {
    try {
      // ensure there are no errors in poolInputErrors
      if (Object.values(poolInputErrors).some((error) => error !== "")) {
        setSubmitError("Please fix errors");
        return;
      }

      // ensure there are no empty values in poolInput
      if (Object.values(poolInput).some((value) => value === "")) {
        setSubmitError("Please fill out all fields");
        return;
      }

      const stxPostConditionCode = FungibleConditionCode.LessEqual;
      const postConditionAmount = 1000000 * parseInt(poolInput.stxAmount, 10);

      const postConditions = [
        makeStandardSTXPostCondition(
          senderAddress || "",
          stxPostConditionCode,
          postConditionAmount
        ),
      ];

      const args = [uintCV(pool.id), uintCV(postConditionAmount)];

      const txOptions: any = {
        contractAddress: POOL_ADDRESS,
        contractName: POOL_NAME,
        functionName: "contribute-pool",
        functionArgs: args,
        senderKey: senderAddress,
        validateWithAbi: true,
        network: new StacksMainnet(),
        postConditions: postConditions,
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
      console.log("handleCreatePool", err);
    }
  };

  return (
    <div className={MODEL_BASIC_STYLES}>
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>{pool.name}</ModelTitle>
        <Text
          customClass="text-darkGreen font-large text-lg"
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

      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <NavText customClass="text-left text-lightGray">
            Amount of STX to Commit
          </NavText>
        </div>

        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
          <input
            className={MODEL_INPUT_STYLE}
            placeholder="Min. 21 STX"
            onChange={handleStxAmount}
          />
          <ModelButton
            type={ButtonTypes.Nav}
            color={ButtonColors.YelloGradient}
          >
            MAX
          </ModelButton>
        </div>
        {poolInputErrors.stxAmount !== "" && (
          <Text customClass="text-red-500 text-sm" type={TextTypes.TriText}>
            {poolInputErrors.stxAmount}
          </Text>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <ModelInfo
          title="Donation Closes"
          text={pool.contributionEndHeight + ""}
        />
        <ModelInfo title="Claim Block" text={pool.startedMineHeight || "N/A"} />
        <ModelInfo title="Contributors" text={pool.totalContributions} />
        <ModelInfo title="STX Committed" text={pool.totalContributions} />
        <ModelInfo title="Fee" text={pool.ownerFee + "%"} />
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
          onClick={() => handleSubmit()}
        >
          START MINNING
        </ModelButton>
      </div>
    </div>
  );
};

export default PoolOpen;
