import { Switch } from "@nextui-org/react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
        transform: translateX(20px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }

`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 5% auto;
  grid-gap: 20px;
  align-items: center;
  height: 10vh;
  padding: 0 5%;
  background: ${(props) => props.theme.body};
`;

export const Logo = styled(Link)`
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  color: ${(props) => props.theme.text};
`;

export const Toggle = styled.div`
  font-size: 25px;
  display: none;
  color: ${(props) => props.theme.text};
   @media screen and
    (max-width: 900px) {
    display: block;
  }
`;

export const Menu = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: auto;

  @media screen and (max-width: 900px) {
    position: absolute;
    display: ${(p) => (p.toggle ? "flex" : "none")};
    left: 0;
    top: 10vh;
    padding: 5%;
    width: 100%;
    height: 100%;
    flex-direction: column;
    animation: ${fadeIn} 0.5s ease;
    align-items: flex-start;
    background: #fffefe;
    z-index: 999;
  }
`;
export const LinkEl = styled(Link)`
  color: ${(props) => props.theme.text};
`;
export const SwitchEl = styled(Switch)`
 margin-left: auto;
`;
