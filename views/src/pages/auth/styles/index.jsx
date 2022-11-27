import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translatY(100px);
  }

  50% {
     opacity: 0.5;
    transform: translatY(40px);
  }
  100% {
     opacity: 1;
    transform: translatY(0);
  }

`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${fadeIn} 0.3s ease;
`;
export const Wrapper = styled.div``;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .user {
    display: flex;

    margin-bottom: 20px;

    .info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: center;
      justify-content: center;

      .image {
        display: flex;
        justify-content: center;
      }
    }
  }
`;
export const FormCtrl = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;
export const LinkEl = styled.div``;
