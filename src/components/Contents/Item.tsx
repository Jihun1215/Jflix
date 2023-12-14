import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId } from 'state/atoms';

import { getImgPath } from 'utils/api';
import { IContent } from 'type/type';
import { toUp } from 'styles/animation';

import noimg from 'assets/noimg.png';

export const Item = ({
  list,
  type,
}: {
  list: {
    results: IContent[];
  }[];
  type: string;
}) => {
  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);

  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };
  return (
    <>
      {list?.map((page) =>
        page.results.map((data: IContent) => {
          return (
            <Content
              key={data.id}
              onClick={() => {
                onClickModalOpen(data?.id);
              }}
            >
              <Poster src={data.poster_path ? getImgPath(data?.poster_path) : noimg} />
              <Info>
                <Title>{data.title || data.name} </Title>
                <Date>
                  개봉일: <span>{data.release_date || data.name}</span>
                </Date>

                <Vote>
                  평점: <span> {data.vote_average}</span>
                </Vote>
              </Info>
            </Content>
          );
        })
      )}
    </>
  );
};

const Content = styled.div`
  width: 200px;
  height: 300px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  cursor: pointer;
  animation: ${toUp} 0.45s ease-in-out;
  @media (max-width: 700px) {
    width: 150px;
    height: 200px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 225px;
  border-radius: 4px;
  background-image: cover;

  @media (max-width: 700px) {
    height: 150px;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 75px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  padding-top: 15px;
  gap: 5px 0;
  @media (max-width: 700px) {
    height: 50px;
  }
`;

const Title = styled.h2`
  height: 40px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 700px) {
    height: 20px;
  }
`;

const Date = styled.p`
  height: 20px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 15px;
  font-weight: 600;
  span {
    color: ${({ theme }) => theme.colors.greey};
  }
  @media (max-width: 700px) {
    height: 10px;
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
  @media (max-width: 700px) {
    height: 10px;
  }
`;
