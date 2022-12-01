import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  height: 100vh;
  padding: 5%;
  width: 100%;
`;
export const Wrapper = styled.div`
  width: 100%;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
 
  .image {
    display: flex;
    justify-content: center;
  }
`;
export const Media = styled.div`

  position: relative;
  width: 80px;

  @media screen and (max-width: 900px) {
    /* flex-direction: column; */
    /* justify-content: center; */
  }

  .input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: #2a8bed;
    box-shadow: 0 16px 40px 20% #7090b0;
    overflow: hidden;
    border-radius: 8px;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #ffffff;
    transition: all 0.5s ease;

    .icon {
     
      transition: all 0.5s ease;
    }

    &:hover {
      background: rgba(121, 121, 121, 0.106);

      .icon {
         color: #2a8bed;
        transform: scale(1.08);
      }
    }

    input {
      position: absolute;
      height: 100%;
      width: 100%;
      cursor: pointer;
      opacity: 0;
      z-index: 8;
    }
  }

  .image {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: auto;
    flex-wrap: wrap;
    gap: 30px;
    z-index: 8;

    .img {
      position: relative;

      .image {
        z-index: 1;
      }

      .del {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #c80734;
        border-radius: 50px;
        color: #fff;
        z-index: 3;
      }
    }

    @media screen and (max-width: 900px) {
      margin: auto;
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
    /* flex-direction: column; */
    gap: 20px;
  }
`;
export const LinkEl = styled.div``;
