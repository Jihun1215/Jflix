import styled from 'styled-components';
import { getImgPath } from 'utils/api';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId } from 'state/atoms';

import { IModalContent } from 'type/type';
import { toLeft } from 'styles/animation';

import noimg from 'assets/noimg.png';

interface IMyList {
  poster_path?: string;
  title: string;
  id: number;
  name?: string;
}

export const MyListContent = ({ lists, type }: { lists: IModalContent[]; type: string }) => {
  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);

  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };

  return (
    <>
      <Title>{type}</Title>
      <Lists>
        {lists?.map((data: IMyList, index: number) => {
          return (
            <Content key={index} onClick={() => onClickModalOpen(data.id)}>
              <Poster src={data.poster_path ? getImgPath(data?.poster_path) : noimg} />
              <Info>{type === 'movie' ? <Name>{data?.title}</Name> : <Name>{data?.name}</Name>}</Info>
            </Content>
          );
        })}
      </Lists>
    </>
  );
};

const Title = styled.h2`
  font-size: 30px;
  font-weight: 700;
  padding: 10px 0 20px 0;
`;

const Lists = styled.div`
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  row-gap: 40px;

  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1180px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 635px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Content = styled.div`
  width: 200px;
  height: 300px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  background-color: #333;
  cursor: pointer;
  animation: ${toLeft} 0.45s ease-in-out;
  @media (max-width: 700px) {
    width: 175px;
    height: 225px;
  }

  @media (max-width: 430px) {
    width: 150px;
    height: 200px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 250px;
  background-image: cover;
  @media (max-width: 700px) {
    height: 185px;
  }
  @media (max-width: 430px) {
    height: 170px;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;

  @media (max-width: 700px) {
    height: 40px;
  }

  @media (max-width: 430px) {
    height: 30px;
  }
`;

const Name = styled.h2`
  padding: 6px;
  ${({ theme }) => theme.WH100};
  ${({ theme }) => theme.BoxCenter};
  font-weight: 700;
`;
