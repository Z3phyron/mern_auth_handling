import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Fira Code';
    
 
    }

    body {
      background: ${(props) => props.theme.body};
    }
`;

export const darkTheme = {
  body: "#333",
  text: "#ffffff",
  content: "rgba(255, 255, 255, 0.373)",
  transition: "all .3s ease",
};


export const lightTheme = {
  body: "#fff",
  text: "#000",
  content: "rgba(31, 31, 31, 0.712)",
  transition: "all .3s ease",
};
