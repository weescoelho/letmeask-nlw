import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import Home from "./pages/Home/Home";
import NewRoom from "./pages/NewRoom/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {

  const { theme } = React.useContext(ThemeContext)
 
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
