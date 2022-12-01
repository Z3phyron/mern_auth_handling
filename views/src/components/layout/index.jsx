import Navbar from "../navbar";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "../../theme";

const Index = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar toggleTheme={themeToggler} />
      {children}
    </ThemeProvider>
  );
};

export default Index;
