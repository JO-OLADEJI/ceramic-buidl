import styled from "styled-components";

export const ButtonBase = styled.button<{ disabled?: boolean }>`
  border: none;
  cursor: pointer;
  padding: 1rem 1.5rem;
  font-family: "Fredoka", sans-serif;
  border-bottom: 6px solid #FFA45F;
  border-left: 2px solid #FFA45F;
  border-right: 2px solid #FFA45F;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #d5d2d1;
  transition: background-color 0.2s ease-out;
  width: 100%;
  max-width: 20rem;

  &:hover {
    background-color: ${({ disabled }) => (!!disabled ? "#D5D2D1" : "#FFFFFF")};
  }
`;
