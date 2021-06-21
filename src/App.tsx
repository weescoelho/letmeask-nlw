import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components'
import usePersistedState from './utils/usePersistedState';
import light from './styles/theme/light'
import dark from './styles/theme/dark'
import GlobalStyle from './styles/global'

function App() {

  const [theme,setTheme] = usePersistedState<DefaultTheme>('theme',light)
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
    </ThemeProvider>
    </>
  );
}

export default App;
