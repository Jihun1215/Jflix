import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, Reset } from 'styles';
import { Theme } from 'styles/theme';

export const App = () => {
  const theme = Theme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Reset />
      <Outlet />
    </ThemeProvider>
  );
};
