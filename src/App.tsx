import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import { useViewerConnection } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";

// components
import Nav from "components/Nav";
import { ButtonBase } from "components/UI-Elements";

const App = () => {
  const [connection, connect, disconnect] = useViewerConnection();
  const { provider, account } = useWeb3React();

  const getEthereumAuthProvider = async (): Promise<
    EthereumAuthProvider | undefined
  > => {
    return provider && account
      ? new EthereumAuthProvider(provider.provider, account)
      : undefined;
  };

  const connectToSelfId = async (): Promise<void> => {
    try {
      console.log("connectToSelfId");
      const ethereumAuthProvider = await getEthereumAuthProvider();
      if (ethereumAuthProvider) {
        connect(ethereumAuthProvider);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Nav />
      <ButtonBase
        onClick={connectToSelfId}
        disabled={provider === undefined || account === undefined}
      >
        Connection: {connection.status}
      </ButtonBase>
      {connection.status === "connected" ? (
        <p>Your 3ID is {connection.selfID.id}</p>
      ) : null}
    </div>
  );
};

export default App;
