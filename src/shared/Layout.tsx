import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalContentData } from 'state/atoms';

import { Header } from './Header';
import { Modal } from 'components';
import { useEffect } from 'react';

export const Layout = () => {
  const [isModalOpen] = useRecoilState(modalIsOpenState);
  const [data] = useRecoilState(ModalContentData);

  useEffect(() => {
    // console.log('Modal_Data', data);
  }, [data]);

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
  background-color: black;
  /* background-color: #333; */
  color: ${({ theme }) => theme.color};
`;
