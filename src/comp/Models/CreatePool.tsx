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
import { useAppState } from "../../state";
import { POOL_ADDRESS, POOL_NAME } from "../../utils/stx";
import { ModelButton, TileButton, ButtonColors, ButtonTypes } from "../Button";
import {
  ModelProps,
  MODEL_BASIC_STYLES,
  MODEL_INPUT_STYLE,
  TransactionSubmitted,
} from "../Models";
import Text, { BodySubText, NavText, TextTypes } from "../Text";
import { ModelTitle } from "../Title";

type PoolInputType = {
  name: string;
  fee: string;
  start: string;
};

const CreatePool = ({ closeToast }: ModelProps) => {
  const { senderAddress, currentBlockHeight } = useAppState();

  const [poolInput, setPoolInput] = useState<PoolInputType>({
    name: "",
    fee: "",
    start: "",
  });

  // create a state of the PoolInputType that handles showing the error message
  const [poolInputErrors, setPoolInputErrors] = useState<PoolInputType>({
    name: "",
    fee: "",
    start: "",
  });

  //create a state that keeps track of submit errors
  const [submitError, setSubmitError] = useState<string>("");

  // TODO: make a func that checks that the block submitted is x amount more than the current block

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

  const handleCreatePool = async () => {
    setSubmitError("");

    // ensure that there are not errors in poolInputErrors before submitting
    if (
      poolInputErrors.name !== "" ||
      poolInputErrors.fee !== "" ||
      poolInputErrors.start !== ""
    ) {
      setSubmitError("Please fix errors");
      return;
    }

    // ensure that all keys for poolInput are not empty
    if (
      poolInput.name === "" ||
      poolInput.fee === "" ||
      poolInput.start === ""
    ) {
      setSubmitError("Please fill out all fields");
      return;
    }
    const args = [
      someCV(stringAsciiCV(poolInput.name)),
      uintCV(poolInput.start),
      uintCV(30),
      someCV(uintCV(10)),
      someCV(uintCV(poolInput.fee)),
    ];
    try {
      const txOptions: any = {
        contractAddress: POOL_ADDRESS,
        contractName: POOL_NAME,
        functionName: "create-pool",
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
          console.log(" was cancelled");
          //toast.error("Transaction cancelled");
        },
      };

      const transaction = await openContractCall(txOptions);
    } catch (err) {
      console.log("handleCreatePool", err);
    }
  };
  // create a function to handle the input change of pool name verify that is less than 12 characters and not empty
  const handlePoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(" did this run");
    if (e.target.value.length <= 12 && e.target.value.length > 0) {
      setPoolInput({ ...poolInput, name: e.target.value });
      setPoolInputErrors({
        ...poolInputErrors,
        name: "",
      });
    } else {
      console.log("this is the error message");
      setPoolInputErrors({
        ...poolInputErrors,
        name: "name must be between 1 and 12 characters",
      });
    }
  };

  // create a function that handles the input change of pool fee verify that is less than 5% and not empty
  const handlePoolFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ensure that input string can be converted to a number and that the number is between 0 and 5

    // check if input value is a number
    // convert input value to a number

    const fee = Number(e.target.value);

    if (isNaN(Number(e.target.value))) {
      setPoolInputErrors({
        ...poolInputErrors,
        fee: "fee must be a number",
      });
      return;
    } else if (fee > 5 || fee < 0) {
      setPoolInputErrors({
        ...poolInputErrors,
        fee: "fee must be between 0 and 5",
      });
      return;
    } else if (fee % 1 !== 0) {
      setPoolInputErrors({
        ...poolInputErrors,
        fee: "Fee must be an integer",
      });
      return;
    } else {
      // update the fee state
      setPoolInput({ ...poolInput, fee: e.target.value });
      setPoolInputErrors({
        ...poolInputErrors,
        fee: "",
      });
    }
  };

  // create a function that handles the input change of pool start verify that is not empty
  const handlePoolStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ensure that input string can be converted to a number and that the number is between 87178 and 90000

    // check if input value is a number
    // convert input value to a number

    const start = Number(e.target.value);

    // check if start is a number
    if (isNaN(start)) {
      setPoolInputErrors({
        ...poolInputErrors,
        start: "start must be a number",
      });
      return;
    } else if (start % 1 !== 0) {
      setPoolInputErrors({
        ...poolInputErrors,
        start: "start must be an integer",
      });
      return;
    } else if (start > 90000 || start < 87178) {
      setPoolInputErrors({
        ...poolInputErrors,
        start: "start must be between 87178 and 90000",
      });
      return;
    }
    // update the start state
    setPoolInput({ ...poolInput, start: e.target.value });
    setPoolInputErrors({
      ...poolInputErrors,
      start: "",
    });
  };
  return (
    <div className={MODEL_BASIC_STYLES}>
      <div className="flex flex-row justify-between items-center">
        <ModelTitle>Create Pool</ModelTitle>
        <div className="text-xs text-lightGray ">
          {"Block #" + currentBlockHeight}
        </div>
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
            Set Pool Name
          </NavText>
          {poolInputErrors.name !== "" && (
            <Text customClass="text-red-500 text-sm" type={TextTypes.TriText}>
              {poolInputErrors.name}
            </Text>
          )}
        </div>

        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
          <input
            className={MODEL_INPUT_STYLE}
            placeholder="Max. 12 Characters"
            onChange={handlePoolNameChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <NavText customClass="text-left text-lightGray">
            Set Pool % Fee
          </NavText>
          {poolInputErrors.fee !== "" && (
            <Text customClass="text-red-500 text-sm" type={TextTypes.TriText}>
              {poolInputErrors.fee}
            </Text>
          )}
        </div>
        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
          <input
            onChange={handlePoolFeeChange}
            className={MODEL_INPUT_STYLE}
            type="number"
            placeholder="Max. 5%"
          />
          <NavText customClass="text-left text-lightGray">%</NavText>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <NavText customClass="text-left text-lightGray">
            Set Pool Start
          </NavText>
          {poolInputErrors.start !== "" && (
            <Text customClass="text-red-500 text-sm" type={TextTypes.TriText}>
              {poolInputErrors.start}
            </Text>
          )}
        </div>
        <div className="w-full flex flex-row bg-midGray rounded-xl px-4 py-2 justify-between items-center">
          <input
            onChange={handlePoolStartChange}
            className={MODEL_INPUT_STYLE}
            placeholder="Enter Block #"
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
          onClick={() => handleCreatePool()}
        >
          CREATE POOL
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

export default CreatePool;
