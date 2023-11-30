import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId } from 'state/atoms';

import { getImgPath } from 'utils/api';
import { ISearchContent } from 'type/type';

interface ISearcch {
  type: string;
  results: ISearchContent[];
}

export const SearchTvContent = ({ lists, type }: { lists: ISearcch; type: string }) => {
  const dataArr = lists?.results;

  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);

  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };

  return (
    <ContentArea>
      {dataArr.map((data: ISearchContent, index: number) => {
        return (
          <Content
            key={index}
            onClick={() => {
              onClickModalOpen(data?.id);
            }}
          >
            <Poster src={getImgPath(data.poster_path)} />
            <Info>
              <Title>{data.name}</Title>
              <Date>
                첫방영일: <span>{data.first_air_date}</span>
              </Date>

              <Vote>
                평점: <span> {data.vote_average}</span>
              </Vote>
            </Info>
          </Content>
        );
      })}
    </ContentArea>
  );
};

const ContentArea = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  height: 200px;
`;

const Info = styled.div`
  width: 100%;
  height: 100px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  padding-top: 5px;
  gap: 0 10px;
`;

const Title = styled.h2`
  height: 30px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const Date = styled.p`
  height: 20px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 15px;
  font-weight: 600;
  span {
    color: ${({ theme }) => theme.colors.greey};
  }
`;

const Vote = styled.p`
  height: 20px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 15px;
  font-weight: 600;
  span {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;
