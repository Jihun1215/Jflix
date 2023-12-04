import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalIsOpenState, AlertModalState } from 'state/atoms';

import { Header } from './Header';
import { Modal, Alertmodal } from 'components';

export const Layout = () => {
  const [isModalOpen] = useRecoilState(modalIsOpenState);
  const [alertModla] = useRecoilState(AlertModalState);

  return (
    <LayoutContiner>
      <Header />
      <Outlet />
      {isModalOpen && <Modal />}
      {alertModla && <Alertmodal />}
    </LayoutContiner>
  );
};
const LayoutContiner = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.color};
`;
