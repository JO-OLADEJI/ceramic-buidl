import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Web3Provider from "components/Web3Provider";
import { Provider as CeramicProvider } from "@self.id/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3Provider>
      <CeramicProvider client={{ ceramic: "testnet-clay" }}>
        <App />
      </CeramicProvider>
    </Web3Provider>
  </React.StrictMode>
);
