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
import {
  MINING_STAKING_ADDRESS,
  MINING_STAKING_NAME,
  POOL_ADDRESS,
  POOL_NAME,
  STX_MULTIPLE,
} from "../../utils/stx";
import { ModelButton, TileButton, ButtonColors, ButtonTypes } from "../Button";
import {
  BLOCKS_AFTER_START_TO_COMPLETE_MINE,
  ModelInfo,
  ModelProps,
  MODEL_BASIC_STYLES,
  MODEL_INPUT_STYLE,
  TransactionSubmitted,
} from "../Models";
import Text, { BodySubText, NavText, TextTypes } from "../Text";
import { ModelTitle } from "../Title";
import { PoolOpenType } from "./PoolOpen";

const CancelPool = ({ closeToast, pool }: PoolOpenType) => {
  const { senderAddress, userMiningHistory } = useAppState();
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

  // handle submit items
  const handleSubmit = async () => {
    const currentHistory = userMiningHistory.find(
      (history) => history.poolId === pool.id
    );

    const stxPostConditionCode = FungibleConditionCode.Equal;
    //const postConditionAmount = currentHistory ? currentHistory.amount : 0;
    const postConditionAmount = 21 * STX_MULTIPLE;
    console.log("postConditionAmount", postConditionAmount);
    const pc = [
      makeStandardSTXPostCondition(
        senderAddress || "",
        stxPostConditionCode,
        postConditionAmount
      ),
    ];

    //return;
    try {
      const args = [uintCV(pool.id)];

      const txOptions: any = {
        contractAddress: POOL_ADDRESS,
        contractName: POOL_NAME,
        functionName: "cancel-pool",
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
      console.log("handleCreatePool", err);
    }
  };
  return (
    <div className={MODEL_BASIC_STYLES}>
      <div className="flex flex-row items-center justify-between">
        <ModelTitle>Cancel Pool </ModelTitle>
      </div>
      <Text
        customClass="text-red font-large text-lg"
        type={TextTypes.BodySubText}
      >
        {pool.name}
      </Text>

      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />

      <div className="flex flex-col md:flex-row jusitfy-between items-center gap-y-2">
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
          CANCEL POOL
        </ModelButton>
      </div>
    </div>
  );
};

export default CancelPool;
