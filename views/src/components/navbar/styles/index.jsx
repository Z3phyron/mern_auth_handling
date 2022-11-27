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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 0 5%;
 
`;

export const Logo = styled.div`
  font-weight: 400;
  font-size: 20px;
`;

export const Toggle = styled.div`
  font-size: 25px;
  display: none;
  @media screen and (max-width: 900px) {
    display: block;
  }
`;

export const Menu = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

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
  color: #333;
`;
