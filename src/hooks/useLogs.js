import { useEffect, useState } from "react";
import { randomItem } from "../utils/random";
import randomLogs from "../assets/randomlogs.json";
import useRandomInterval from "./useRandomInterval";

const getRandomLog = () => {
  const item = randomItem(randomLogs);
  return {
    label: item.message.replace("<timestamp>", "").replace("<seq_num>", ""),
    level: parseInt(item.severity),
  };
};

let _logs = [];

const useLogs = (selected) => {
  const [logs, setLogs] = useState([]);

  useRandomInterval(
    () => {
      const oldLogs =
        _logs.length > 100 ? _logs.filter((_, i) => i !== 0) : _logs;
      _logs = [...oldLogs, getRandomLog()];
      setLogs(_logs);
    },
    0,
    400
  );

  useEffect(() => setLogs([]), [selected]);

  return logs;
};

export default useLogs;
