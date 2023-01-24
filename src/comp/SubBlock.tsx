import { io } from "socket.io-client";
import * as stacks from "@stacks/blockchain-api-client";
import { useAppState } from "../state";
import { useEffect } from "react";
import { StacksApiSocket } from "@stacks/blockchain-api-client";

const socketUrl = "https://stacks-node-api.mainnet.stacks.co/";
const socket = io(socketUrl, {
  query: {
    subscriptions: Array.from(new Set(["block"])).join(","),
  },
  transports: ["websocket"],
});

const SubComp = () => {
  const { currentBlockHeight, _currentBlockHeight } = useAppState();
  useEffect(() => {
    handleSubscibeWeb();
    //fetchLatestBlock();
  }, []);

  const handleSubscibeWeb = async () => {
    const sc = new stacks.StacksApiSocketClient(
      socket as unknown as StacksApiSocket
    );
    // //const wtf = new stacks.StacksApiWebSocketClient(socket);

    // const wsUrl = new URL('ws://stacks-node-api.mainnet.stacks.co/');
    // wsUrl.protocol = 'ws:';
    // let client: null | StacksApiWebSocketClient;

    // async function run() {
    //   client = await connectWebSocketClient(wsUrl.toString());

    // }

    //void run();

    sc.socket.on("connect", () => {
      const engine = socket.io.engine;

      engine.on("packet", ({ type, data }) => {
        // called for each packet received
        console.log("type", type);
        console.log(" socket data", data);
        if (type !== "ping") {
          // console.log("data", data);
          // console.log("data thigns", data[1]);
          // console.log("data[1].height", data[1].height);
          // console.log(JSON.parse(data));

          // const height = data[1].height || null;
          // console.log("height", height);

          //_latestBlock(height);
          fetchLatestBlock();
        }
      });

      engine.on("close", (reason) => {
        // called when the underlying connection is closed
      });
    });
  };

  const fetchLatestBlock = async () => {
    /*
    try {
     
      const blockList = await blocksAPI.getBlockList({});
      console.log("blockList", blockList);
      if (blockList.results.length > 0) {
        _latestBlock(blockList.results[0].height);
        toast(
          ({ closeToast }) => (
            <SomethingWentRight
              title={`Current Block ${blockList.results[0].height}`}
              text={""}
            />
          ),

          {
            position: "top-right",
            containerId: "selection",
            //  autoClose: true,
            hideProgressBar: false,
            toastId: "",
            style: {
              backgroundColor: Colors.brightPink,
              borderRadius: "12px",
              cursor: "auto",
            },
            draggable: false,
            closeOnClick: true,
            closeButton: true,
          }
        );
      }
    } catch (err) {}
    */
  };

  return null;
};

export default SubComp;
