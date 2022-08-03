import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import { useViewerConnection, useViewerRecord } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";

// components
import Nav from "components/Nav";
import { ButtonBase } from "components/UI-Elements";

const App = () => {
  const [connection, connect, disconnect] = useViewerConnection();
  const record = useViewerRecord("basicProfile");
  const { provider, account } = useWeb3React();
  const [name, setName] = useState("");

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

  const updateRecordName = async (name: string): Promise<void> => {
    await record.merge?.({ name });
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

      <div>
        {record.content ? (
          <>
            <p>Hello {record.content?.name}</p>
            <p>
              The above name was loaded from the Ceramic Network. Try updating
              it below :)
            </p>
          </>
        ) : (
          <p>
            You do not have a profile attached to your 3ID. Create a basic
            profile by setting a name below
          </p>
        )}
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <ButtonBase onClick={() => updateRecordName(name)}>
          Update 3ID Name
        </ButtonBase>
      </div>
    </div>
  );
};

export default App;
