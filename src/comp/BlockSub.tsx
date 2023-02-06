import * as stacks from "@stacks/blockchain-api-client";
import { StacksApiSocket } from "@stacks/blockchain-api-client";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { io } from "socket.io-client";
import { useAppState } from "../state";
import { blocksAPI } from "../utils/stx";

const socketUrl = "https://stacks-node-api.mainnet.stacks.co/";
const socket = io(socketUrl, {
  query: {
    subscriptions: Array.from(new Set(["block"])).join(","),
  },
  transports: ["websocket"],
});

const SubComp = () => {
  const { _currentBlockHeight } = useAppState();
  useEffect(() => {
    handleSubscibeWeb();
    fetchLatestBlock();
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
      console.log("connected");
      const engine = socket.io.engine;

      engine.on("packet", (thing) => {
        // called for each packet received

        console.log("type", thing.type);
        console.log("data", thing);
        if (thing.type !== "ping") {
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
    try {
      const blockList = await blocksAPI.getBlockList({});
      if (blockList.results.length > 0) {
        _currentBlockHeight(blockList.results[0].height);
        toast.success("Block height  #" + blockList.results[0].height);
      }
    } catch (err) {}
  };

  return null;
};

export default SubComp;
