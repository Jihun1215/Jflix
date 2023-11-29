import styled from 'styled-components';
import { getImgPath } from 'utils/api';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId } from 'state/atoms';

import { IModalContent } from 'type/type';

import noimg from 'assets/noimg.png';

interface IMyList {
  poster_path?: string;
  title: string;
  id: number;
  name?: string;
}

export const MyListContent = ({ data, type }: { data: IModalContent[]; type: string }) => {
  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);

  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };

  return (
    <Lists>
      {data?.map((data: IMyList, index: number) => {
        return (
          <Content key={index} onClick={() => onClickModalOpen(data.id)}>
            <Poster src={data.poster_path ? getImgPath(data?.poster_path) : noimg} />
            <Info>{type === 'movie' ? <Name>{data?.title}</Name> : <Name>{data?.name}</Name>}</Info>
          </Content>
        );
      })}
    </Lists>
  );
};

const Lists = styled.div`
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 479px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Content = styled.div`
  width: 200px;
  height: 300px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Poster = styled.img`
  width: 100%;
  height: 240px;
  border-radius: 4px;
  background-image: cover;
`;

const Info = styled.div`
  width: 100%;
  height: 60px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
`;

const Name = styled.h2`
  padding: 6px;
  ${({ theme }) => theme.WH100};
  ${({ theme }) => theme.BoxCenter};
  font-weight: 700;
`;
