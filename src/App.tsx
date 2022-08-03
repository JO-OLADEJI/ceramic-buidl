import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useViewerConnection, useViewerRecord } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";
import styled from "styled-components";

// components
import Nav from "components/Nav";
import { ButtonBase } from "components/UI-Elements";

const AppWrapper = styled.div`
  width: 20rem;
  border-radius: 1.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #202128;
  padding: 0.5rem;
`;

const Paragraph = styled.div`
  margin: 1rem 0;
`;

const Title = styled.p`
  font-size: 1.8rem;
`;

const GradientText = styled.span`
  background-image: linear-gradient(90deg, #6f61f2, #d4d2d1);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Input = styled.input`
  height: 3rem;
  width: 100%;
  max-width: 20rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.7rem;
  border: 1px solid #ffffff;
  outline: none;
  font-weight: 500;

  &:focus {
    border: 1px solid #ffa45f;
  }
`;

const CopyIcon = styled.i`
  cursor: pointer;
  margin: 0.5rem;
  transition: color 0.2s ease-out;

  &:hover {
    color: #ffa45f;
  }
`;

const IdInfo = styled.p`
  text-align: center;
  margin-top: 0.5rem;
`;

const App = () => {
  const [connection, connect] = useViewerConnection();
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
    <AppWrapper>
      <Nav />
      <ButtonBase
        onClick={connectToSelfId}
        disabled={provider === undefined || account === undefined}
      >
        Connection: {connection.status}
      </ButtonBase>
      {connection.status === "connected" ? (
        <IdInfo>
          3ID: {connection.selfID.id?.substring(0, 10)}...$
          {connection.selfID.id?.substring(65)}{" "}
          <CopyIcon
            title="copy 3ID to clipboard"
            className="fa-solid fa-copy"
            onClick={() => navigator.clipboard.writeText(connection.selfID.id)}
          />
        </IdInfo>
      ) : null}

      <div>
        {record.content ? (
          <Paragraph>
            <Title>
              Hello <GradientText>{record.content?.name}</GradientText>
            </Title>
            <p>
              The above name is loaded from the Ceramic Network. Try updating it
              below ✌️
            </p>
          </Paragraph>
        ) : (
          <Paragraph>
            <p>
              You do not have a profile attached to your 3ID. Create a basic
              profile by setting a name below
            </p>
          </Paragraph>
        )}
        <Input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "0.5rem" }}
        />
        <ButtonBase
          onClick={() => updateRecordName(name)}
          disabled={connection.status !== "connected" || name.length === 0}
        >
          Update 3ID Name
        </ButtonBase>
      </div>
    </AppWrapper>
  );
};

export default App;
