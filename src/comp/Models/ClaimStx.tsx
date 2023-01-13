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
} from "@stacks/transactions";

import { useState } from "react";
import { toast } from "react-toastify";
import { POOL_TYPE, StackingType, useAppState } from "../../state";
import {
  MINING_STAKING_ADDRESS,
  MINING_STAKING_NAME,
  POOL_ADDRESS,
  POOL_NAME,
  START_CYCLE_BLOCK,
  STX_MULTIPLE,
} from "../../utils/stx";
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

export type ClaimStxType = ModelProps & StackingType & {};

const ClaimStx = ({
  closeToast,
  cycle,
  stacked,
  startBlock,
  stxEarned,
  completionBlock,
}: ClaimStxType) => {
  const { senderAddress } = useAppState();
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

      const args = [uintCV(cycle)];

      const txOptions: any = {
        contractAddress: MINING_STAKING_ADDRESS,
        contractName: MINING_STAKING_NAME,
        functionName: "claim-reward-cycle",
        functionArgs: args,
        senderKey: senderAddress,
        validateWithAbi: true,
        network: new StacksMainnet(),
        postConditions: [],
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
      <ModelTitle>Claim STX</ModelTitle>

      <div
        style={{
          border: "1px solid #F5F5F5",
          width: "100%",
          height: "0px",
        }}
      />
      <Text type={TextTypes.BoldSubText}>CONFIRM DETAILS</Text>
      <div className="flex flex-col gap-4">
        <ModelInfo title="REAT Stacked" text={stacked} />
        <ModelInfo title="STX Earned" text={stxEarned || "N/A"} />

        <ModelInfo title="Stacking Start" text={"#" + startBlock} />
        <ModelInfo
          title="Stacking End"
          text={"#" + (startBlock ? startBlock + 2100 : 0)}
        />
      </div>

      <div></div>
      <div className="flex flex-col md:flex-row jusitfy-between items-center gap-y-2">
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
          CLAIM STX
        </ModelButton>
      </div>
    </div>
  );
};

export default ClaimStx;
