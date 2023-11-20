import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalIsOpenState } from 'state/atoms';

import { Spinner } from './Spinner';

import { IContent } from 'type/type';
import { getImgPath } from 'utils/api';

interface ModalProps {
  type: string;
  contents?: IContent;
}

export const Modal = ({ type, contents }: ModalProps) => {
  const [isModalOpen, setISModalOpen] = useRecoilState(modalIsOpenState);
  console.log(type);
  console.log(contents);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetTagName = e.currentTarget.tagName;
    if (targetTagName === 'SECTION') {
      setISModalOpen(false);
    }
  };

  const BackGroundImg = getImgPath(contents?.backdrop_path);
  const BackGroundposter = getImgPath(contents?.poster_path);

  return (
    <>
      {isModalOpen && (
        <Container onClick={onClick}>
          {contents === undefined ? (
            <Spinner />
          ) : (
            <ModalCard>
              <ModalImg src={BackGroundImg} />
              <Poster src={BackGroundposter} />
            </ModalCard>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  /* height: 100vh; */
  border: 1px solid red;
  ${({ theme }) => theme.BoxCenter};
`;

const ModalCard = styled.div`
  width: min(90%, 900px);
  height: 90vh;
  background-color: white;
  border-radius: 12px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.BoxCenter};
  gap: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 12px;
`;

const Poster = styled.img`
  width: 400px;
  height: 400px;
`;
