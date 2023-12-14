import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

import { GlobalStyle, Reset } from 'styles';
import { Theme } from 'styles/theme';

const queryClient = new QueryClient();

export const App = () => {
  const theme = Theme;

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} position="bottom-left" /> */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Reset />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
