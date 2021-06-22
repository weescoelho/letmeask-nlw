import React, { createContext } from "react";
import { DefaultTheme } from "styled-components";
import dark from "../styles/theme/dark";
import light from "../styles/theme/light";
import usePersistedState from "../hooks/usePersistedState";

type ThemeContextType = {
  toggleTheme: () => void;
  theme: DefaultTheme
};
export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider: React.FC = ({ children }) => {
  
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
