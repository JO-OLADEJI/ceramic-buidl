import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

export const [network, networkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: {
        43113: "https://api.avax-test.network/ext/bc/C/rpc",
        43114: "https://api.avax.network/ext/bc/C/rpc",
      },
    })
);
