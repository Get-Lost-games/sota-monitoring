import { useState } from "react";
import Server from "./pages/server";
import Clusters from "./pages/clusters";
import Remote from "./pages/remote";
import { useEffect } from "react/cjs/react.development";

const App = () => {
  const [page, setPage] = useState("clusters");

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "1") setPage("clusters");
      if (e.key === "2") setPage("connections");
      if (e.key === "3") setPage("remote");
    };

    document.addEventListener("keypress", onKeyPress);

    return () => document.removeEventListener("keypress", onKeyPress);
  }, []);

  return (
    <div className="panels" data-page={page}>
      {page === "server" && <Server />}
      {page === "remote" && <Remote setPage={setPage} />}
      {page === "clusters" && <Clusters setPage={setPage} />}
      <div className="panels__footer">
        <div className="cluster">
          Pages:
          <button className="button" onClick={() => setPage("clusters")}>
            [1] Server clusters
          </button>
          <button className="button" onClick={() => setPage("connections")}>
            [2] Global connections
          </button>
          <button className="button" onClick={() => setPage("remote")}>
            [3] Remote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
