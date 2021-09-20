import { useEffect, useState } from "react";
import { clamp } from "../utils/math";

const basePath = ["/Applications", "/System", "/User", "System/Library"];
// const applications = ["iTerm2", "pm2", "node", "py_next", "py_0.93"];

var randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const random = (length) => Math.floor(Math.random() * (length + 1));

const randomPath = () => {
  return randomItem(basePath);
};

const updateCpu = (current) => clamp(current + (random(100) / 10 - 5), 0, 100);

const randomTask = () => {
  return {
    pid: random(0, 93940),
    user: "D1_ISL938v",
    core: random(0, 8),
    cpu: random(0, 1000) / 100,
    path: randomPath(),
  };
};

const useTasks = ({ length = 20, speed = 2000 }) => {
  const [tasks, setTasks] = useState(() =>
    new Array(length).fill().map(randomTask)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((tasks) => tasks.map((t) => ({ ...t, cpu: updateCpu(t.cpu) })));
    }, speed);

    return () => clearInterval(interval);
  });

  return [tasks.sort((a, b) => a.cpu - b.cpu)];
};

export default useTasks;
