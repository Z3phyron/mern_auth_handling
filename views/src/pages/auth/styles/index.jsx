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
  color: ${(props) => props.theme.text};
`;
export const Wrapper = styled.div`
  width: 30%;
  @media screen and (max-width: 900px) {
    width: 70%;
  }
  @media screen and (max-width: 400px) {
    width: 80%;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 20px;
  }

  p {
    font-size: 15px;
  }

  .user {
    color: ${(props) => props.theme.text};
    display: flex;
margin: auto;
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


  input {
     color: ${(props) => props.theme.text};
     /* border: 1px solid   ${(props) => props.theme.text}; */
  }
 

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;
export const LinkEl = styled.div`
color: ${ p => p.theme.content};
`;
export const Card = styled.div`
text-align: center;
line-height: 250%;

button {
  margin: auto;
}
`;
