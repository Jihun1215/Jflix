import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalIsOpenState } from 'state/atoms';

import { Header } from './Header';
import { Modal } from 'components';

export const Layout = () => {
  const [isModalOpen] = useRecoilState(modalIsOpenState);

  return (
    <LayoutContiner>
      <Header />
      <Outlet />
      {isModalOpen && <Modal />}
    </LayoutContiner>
  );
};
const LayoutContiner = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.color};
`;
