import { useEffect, useState } from "react";
import useLogs from "../hooks/useLogs";
import { clamp, interpolate } from "../utils/math";
import { maybe, random, randomString } from "../utils/random";

const Clusters = ({ setPage }) => {
  const [selected, setSelected] = useState(0);
  const logs = useLogs(selected);

  useEffect(() => {
    const onKeyPress = (e) => {
      e.preventDefault();
      console.log(e.key);
      if (e.key === "p") setSelected((s) => clamp(s - 1, 0, 100));
      if (e.key === "n") setSelected((s) => clamp(s + 1, 0, 100));
      if (e.key === "Enter") setPage("server");
    };

    document.addEventListener("keypress", onKeyPress);

    return () => document.removeEventListener("keypress", onKeyPress);
  }, []);

  const [serverList, setServerList] = useState(
    () =>
      new Array(101).fill().map((server, index) => {
        return {
          label: `[${index.toString().length < 2 ? ` ${index}` : index}]`,
          name: `AMS2-${randomString(2).toUpperCase()}-${randomString(8)}`,
          memory: random(1000) / 10,
          cpu: random(1000) / 10,
        };
      }),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setServerList((sl) =>
        sl.map((server) => {
          if (maybe(5)) {
            return {
              ...server,
              memory: random(1000) / 10,
              cpu: random(1000) / 10,
            };
          }

          return server;
        })
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="panels__header">Server Cluster - AMS2</div>
      <div className="box box--selected">
        <div className="box-label">
          List<span style={{ width: "4rem" }}></span>
          <span style={{ marginLeft: "auto" }}>
            [n] Next [p] Previous [↵] Select
          </span>
        </div>
        <div className="box--scrollable">
          <table>
            <tbody>
              {serverList.map(({ label, name, memory, cpu }, index) => {
                const memoryColor = `hsl(${Math.round(
                  interpolate(50, 100, 130, 0, memory)
                )}, 100%, 50%)`;
                const cpuColor = `hsl(${Math.round(
                  interpolate(50, 100, 130, 0, cpu)
                )}, 100%, 50%)`;
                return (
                  <tr
                    onDoubleClick={() => setPage("server")}
                    key={index}
                    className={index === selected ? "selected" : ""}
                    onClick={() => setSelected(index)}
                  >
                    <td>
                      {label} {name}
                    </td>
                    <td>Mem:</td>
                    <td style={{ color: memoryColor }}>{memory.toFixed(1)}%</td>
                    <td>Cpu:</td>
                    <td style={{ color: cpuColor }}>{cpu.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="box">
        <div className="box-label">Cluster logs</div>
        <div
          className="box--scrollable"
          style={{
            flexDirection: "column-reverse",
            display: "flex",
            marginTop: "auto",
          }}
        >
          <table>
            <tbody>
              {logs.reverse().map((log, index) => {
                const color =
                  log.level > 5 ? "rgb(255, 13, 0)" : "var(--text-color)";

                return (
                  <tr key={index}>
                    <td
                      style={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        color: color,
                      }}
                    >
                      {log.label}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Clusters;
