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
import { POOL_TYPE, useAppState } from "../../state";
import { POOL_ADDRESS, POOL_NAME, STX_MULTIPLE } from "../../utils/stx";
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
import { PoolOpenType } from "./PoolOpen";

const StartPool = ({ closeToast, pool }: PoolOpenType) => {
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
    try {
      const args = [uintCV(pool.id)];

      const txOptions: any = {
        contractAddress: POOL_ADDRESS,
        contractName: POOL_NAME,
        functionName: "start-pool",
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
      console.log("handleCreatePool", err);
    }
  };

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
        <Text type={TextTypes.BoldSubText}>Pool Details</Text>
        <ModelInfo
          title="Donation Start"
          text={"#" + pool.contributionStartHeight}
        />
        <ModelInfo
          title="Donation Closed"
          text={"#" + pool.contributionEndHeight}
        />
        <ModelInfo
          title="Claim Date"
          text={pool.startedMineHeight ? pool.startedMineHeight + 200 : "N/A"}
        />
        <ModelInfo title="Contributors" text={pool.poolMembers.length + ""} />
        <ModelInfo
          title="STX Committed"
          text={pool.totalContributions / STX_MULTIPLE}
        />
        <ModelInfo title="Fee" text={pool.ownerFee + "%"} />
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
          customClass="px-12"
          type={ButtonTypes.Nav}
          color={ButtonColors.YelloGradient}
          onClick={() => handleSubmit()}
        >
          START POOL
        </ModelButton>
      </div>
    </div>
  );
};

export default StartPool;
