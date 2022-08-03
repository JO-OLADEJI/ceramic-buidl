import React from "react";
import styled from "styled-components";
import { metaMask } from "connectors";
import { useWeb3React } from "@web3-react/core";

// components
import { ButtonBase } from "./UI-Elements";

// utils
import { shortenAddress } from "utils";

const NavContainer = styled.nav`
  border-bottom: 2px solid white;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

const Pointer = styled.span<{ connected: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  background-color: ${({ connected }) => (connected ? "#36946F" : "#731817")};
  transition: background-color 0.2s ease-out;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const ConnectButton = styled(ButtonBase)``;

const Nav = () => {
  const { account, chainId } = useWeb3React();
  const connected: boolean = chainId !== undefined && account !== undefined;

  const tryActivation = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!account) {
      try {
        void metaMask.activate();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <NavContainer>
      {!account ? (
        <ConnectButton onClick={async (e) => tryActivation(e)}>
          Connect Wallet
        </ConnectButton>
      ) : (
        <ConnectButton>{shortenAddress(account)}</ConnectButton>
      )}
      <StatusWrapper>
        <Pointer connected={connected} />
        {connected ? chainId : "unconnected"}
      </StatusWrapper>
    </NavContainer>
  );
};

export default Nav;
