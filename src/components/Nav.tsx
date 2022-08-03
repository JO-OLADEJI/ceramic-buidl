import React from "react";
import styled from "styled-components";
import { metaMask } from "connectors";
import { useWeb3React } from "@web3-react/core";

// components
import { ButtonBase } from "./UI-Elements";

// utils
import { shortenAddress } from "utils";

const NavContainer = styled.nav`
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConnectButton = styled(ButtonBase)``;

const Nav = () => {
  const { account } = useWeb3React();

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
        <ConnectButton onClick={async (e) => tryActivation(e)}>Connect Wallet</ConnectButton>
      ) : (
        <ConnectButton>{shortenAddress(account)}</ConnectButton>
      )}
    </NavContainer>
  );
};

export default Nav;
