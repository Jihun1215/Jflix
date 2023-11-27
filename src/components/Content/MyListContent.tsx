import styled from 'styled-components';
import { getImgPath } from 'utils/api';

import { IContent } from 'type/type';

import noimg from 'assets/noimg.png';

export const MyListContent = ({ data }: IContent) => {
  return (
    <Lists>
      {data?.map((data: IContent, index: number) => {
        return (
          <Content key={index}>
            <Poster src={data.poster_path ? getImgPath(data?.poster_path) : noimg} />
            <Info>
              <Name>{data?.title}</Name>
            </Info>
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
  width: 150px;
  height: 200px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

const Poster = styled.img`
  width: 100%;
  height: 140px;
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
