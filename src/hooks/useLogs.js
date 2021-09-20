import { useEffect, useState } from "react";
import { random, randomItem } from "../utils/random";
import randomLogs from "../assets/randomlogs.json";

const getRandomLog = () => {
  const item = randomItem(randomLogs);
  return {
    label: item.message
      //   .replace("<timestamp>", new Date().toString())
      .replace("<timestamp>", "")
      //   .replace("<seq_num>", `${item.cn1} `),
      .replace("<seq_num>", ""),
    level: parseInt(item.severity),
  };
};

const useLogs = (selected) => {
  const [logs, setLogs] = useState(() => [getRandomLog()]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLogs([...logs, getRandomLog()]);
    }, 50 + random(450));

    return () => clearTimeout(timeout);
  }, [logs]);

  useEffect(() => setLogs([]), [selected]);

  return logs;
};

export default useLogs;
