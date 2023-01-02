import { useEffect, useState } from "react";
import { fetchBlockDate } from "../utils/stxHelperFuncs";

const BlockDate = function (block: number): string {
  const [blockDate, setBlockDate] = useState<string>("");

  useEffect(() => {
    fetchThing();
  }, [block]);

  const fetchThing = async () => {
    if (block === 0) return null;

    const date = await fetchBlockDate(block);
    console.log("date", date);
    if (date) {
      const local = new Date(date).toLocaleDateString();
      console.log("local", local);
      setBlockDate(local);
    }
  };
  if (block === 0) {
    return "";
  } else if (blockDate) {
    return blockDate;
  } else {
    return "" + block;
  }
};

export default BlockDate;
