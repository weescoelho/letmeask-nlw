import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import Home from "./pages/Home/Home";
import NewRoom from "./pages/NewRoom/NewRoom";
import Room from "./pages/Room/Room";
import { BrowserRouter, Route, Switch as Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContext } from "./contexts/ThemeContext";
import AdminRoom from "./pages/AdminRoom/AdminRoom";

function App() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Routes>
              <Route path="/" exact component={Home} />
              <Route path="/rooms/new" component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />
              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Routes>
          </ThemeProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
