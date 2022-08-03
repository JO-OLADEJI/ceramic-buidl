import React, { useEffect } from "react";
import { Connector } from "@web3-react/types";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { metaMaskHooks, metaMask, network, networkHooks } from "connectors";

const connectors: [Connector, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
];

interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider = ({ children }: Web3ProviderProps) => {
  // connect eagerly
  useEffect(() => {
    void network.activate(43113).catch((error) => console.debug(error));
    void metaMask.connectEagerly().catch((error) => console.debug(error));
  });

  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
};

export default Web3Provider;
