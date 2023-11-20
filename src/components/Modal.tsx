import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalIsOpenState } from 'state/atoms';

import { IContent } from 'type/type';

interface ModalProps {
  type: string;
  contents?: IContent;
}

export const Modal = ({ type, contents }: ModalProps) => {
  const [isModalOpen, setISModalOpen] = useRecoilState(modalIsOpenState);
  console.log(type);
  console.log(contents);

  const onClick = (e: any) => {
    console.log(e.target.tagName);
    if (e.target.tagName === 'SECTION') {
      setISModalOpen(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Container onClick={onClick}>
          <ModalCard>123</ModalCard>
        </Container>
      )}
    </>
  );
};

const Container = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9998; // Wrapper 밑에 위치
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  /* height: 100vh; */
  border: 1px solid red;
  ${({ theme }) => theme.BoxCenter};
`;

const ModalCard = styled.div`
  width: 500px;
  min-height: 700px;
  background-color: white;
`;
