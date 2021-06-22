import React from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import usePersistedState from "./utils/usePersistedState";
import light from "./styles/theme/light";
import dark from "./styles/theme/dark";
import GlobalStyle from "./styles/global";
import Home from "./pages/Home/Home";
import NewRoom from "./pages/NewRoom/NewRoom";

import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
          </ThemeProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
