import { useEffect, useState } from "react";

const getTime = () => {
  const now = new Date();
  const fixed = (int) => {
    if (int.toString().length === 1) return `0${int}`;
    return int;
  };
  return `${fixed(now.getHours())}:${fixed(now.getMinutes())}`;
};

const Remote = ({ setPage }) => {
  const [time, setTime] = useState(() => getTime());
  const [fixedTime, setFixedTime] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKeyPress = (e) => {
      e.preventDefault();
      if (e.key === "Enter") setPage("clusters");
      if (e.key === "f") setFixedTime((f) => !f);
    };

    document.addEventListener("keypress", onKeyPress);

    return () => document.removeEventListener("keypress", onKeyPress);
  }, []);

  return (
    <div className="wallpaper">
      <div className="wallpaper__logo">
        <img src="/logo-white.svg" />
      </div>
      <div className="wallpaper__corner">
        <span>{fixedTime ? "18:20" : time}</span>
        <span>Press enter so sign in</span>
      </div>
    </div>
  );
};

export default Remote;
