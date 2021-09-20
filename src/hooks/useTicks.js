import { useEffect, useState } from "react";
import { clamp } from "../utils/math";

const random = () => Math.floor(Math.random() * 101);
const sparse = (s = 3, m = 61) => {
  if (Math.floor(Math.random() * s) !== 1) return 0;
  return Math.floor(Math.random() * m);
};
const overload = () => {
  return 80 + Math.floor(Math.random() * 21);
};

let last = random();

const following = () => {
  const next = clamp(last + (Math.floor(Math.random() * 21) - 10), 0, 100);
  last = next;
  return next;
};

const generateFuncs = {
  random: random,
  sparse: sparse,
  sparser: () => sparse(10, 81),
  overload: overload,
  following: following,
};

const useTicks = ({ length = 100, generation = "random", speed = 500 }) => {
  const generateFunc =
    typeof generation === "string" ? generateFuncs[generation] : generation;

  const [ticks, setTicks] = useState(() => {
    return new Array(length).fill().map(generateFunc);
  }, [length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((ticks) => {
        return [...ticks.filter((_, i) => i !== 0), generateFunc()];
      });
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [length, speed, generateFunc]);

  return [ticks, ticks[ticks.length - 1], ticks.reduce((a, b) => a + b, 0)];
};

export default useTicks;
