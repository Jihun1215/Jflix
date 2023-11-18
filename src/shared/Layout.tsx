import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export const Layout = () => {
  return (
    <LayoutContiner>
      <Header />
      <Outlet />
    </LayoutContiner>
  );
};
const LayoutContiner = styled.div`
  width: 100vw;
  /* background-color: black; */
  background-color: #e3e5eb;
  color: ${({ theme }) => theme.color};
`;
