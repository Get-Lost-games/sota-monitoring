import useTasks from "../hooks/useTasks";
import useTicks from "../hooks/useTicks";
import { clamp, interpolate } from "../utils/math";

const Server = () => {
  const [ticks, latest, total] = useTicks({
    length: 150,
    generation: "overload",
  });
  const [ticks2, latest2, total2] = useTicks({
    generation: "sparse",
    length: 150,
  });

  const [ticks5, latest5, total5] = useTicks({
    generation: "sparser",
    length: 150,
  });

  const [ticks4, latest4, total4] = useTicks({
    length: 150,
  });

  const [ticks3, latest3, total3] = useTicks({
    generation: "following",
    speed: 1000,
    length: 50,
  });

  const [ticks6, latest6, total6] = useTicks({
    generation: "following",
    speed: 1000,
    length: 50,
  });

  const [tasks] = useTasks({ length: 6 });

  return (
    <>
      <div className="panels__header">Server Cluster - AMS2</div>
      <div className="box">
        <div className="box-label">MEMORY [ {latest3.toFixed(1)}% ]</div>
        <div className="ticks">
          {ticks3.map((t, i) => {
            const color = `hsl(${Math.round(
              interpolate(50, 100, 130, 0, t)
            )}, 100%, 50%)`;
            return (
              <div
                key={i}
                className="tick-bar"
                style={{
                  height: `${t}%`,
                  background: color,
                }}
              ></div>
            );
          })}
        </div>
      </div>

      <div className="box">
        <div className="box-label">NETWORK</div>
        <div>
          ↑ [ {(latest * 1.27).toFixed(2)}MB ] tot: [{" "}
          {(total / 1000).toFixed(2)}GB ]
        </div>
        <div className="ticks">
          {ticks.map((t, i) => (
            <div
              key={i}
              className="tick-bar bg-pink"
              style={{ height: `${t}%` }}
            ></div>
          ))}
        </div>
        <div>
          ↓ [ {latest2.toFixed(2)}MB ] tot: [ {(total2 / 1000).toFixed(2)}GB ]
        </div>
        <div className="ticks">
          {ticks2.map((t, i) => (
            <div
              key={i}
              className="tick-bar bg-yellow"
              style={{ height: `${t}%` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="box">
        <div className="box-label">SWAP [ {latest3.toFixed(1)}% ]</div>
        <div className="ticks">
          {ticks3.map((t, i) => {
            const val = Math.round(t / 5);
            const color = `hsl(${Math.round(
              interpolate(50, 100, 130, 0, val)
            )}, 100%, 50%)`;
            return (
              <div
                key={i}
                className="tick-bar"
                style={{
                  height: `${val}%`,
                  background: color,
                }}
              ></div>
            );
          })}
        </div>
      </div>

      <div className="box">
        <div className="box-label">DISK</div>
        <div>
          R [ {(latest4 * 1.27).toFixed(2)}MB ] tot: [{" "}
          {(total4 / 1000).toFixed(2)}GB ]
        </div>
        <div className="ticks">
          {ticks4.map((t, i) => (
            <div
              key={i}
              className="tick-bar bg-pink"
              style={{ height: `${t}%` }}
            ></div>
          ))}
        </div>
        <div>
          W [ {latest5.toFixed(2)}MB ] tot: [ {(total5 / 1000).toFixed(2)}GB ]
        </div>
        <div className="ticks">
          {ticks5.map((t, i) => (
            <div
              key={i}
              className="tick-bar bg-yellow"
              style={{ height: `${t}%` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="box">
        <div className="box-label">TASKS</div>
        <div className="tasks-table">
          <table>
            <tbody>
              {tasks.map((t) => (
                <tr>
                  <td>{t.pid}</td>
                  <td>{t.user}</td>
                  <td>{t.core}</td>
                  <td>{t.cpu.toFixed(1)}%</td>
                  <td>{t.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Server;
