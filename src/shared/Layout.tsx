import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <LayoutContiner>
      <Outlet />
    </LayoutContiner>
  );
};
const LayoutContiner = styled.div`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
`;
