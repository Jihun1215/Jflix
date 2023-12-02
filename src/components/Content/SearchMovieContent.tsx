// import { useRef, useCallback } from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId } from 'state/atoms';

// import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { getSerachMovieContent } from 'utils/api';

import { getImgPath } from 'utils/api';
import { IContent } from 'type/type';

import { toUp } from 'styles/animation';

import noimg from 'assets/noimg.png';
import { Spinner } from 'components/Spinner';

export const SearchMovieContent = ({ type, query }: { type: string; query: string }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    'searchMovies',
    ({ pageParam = 1 }) => getSerachMovieContent(pageParam, query),
    {
      getNextPageParam: (lastPage, allPages) => {
        // 만약 마지막 페이지의 데이터에서 다음 페이지가 있는지 확인하고 있다면 다음 페이지의 파라미터를 반환합니다.
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
      },
    }
  );

  const lists = data?.pages[0]?.data.results;

  console.log(data?.pages[0]?.data);
  console.log(fetchNextPage);
  console.log(hasNextPage);
  console.log(isLoading);
  console.log(isFetchingNextPage);

  // export const SearchMovieContent = ({ lists, type }: { lists: IContent[]; type: string }) => {
  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);
  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };

  if (isLoading) {
    return <Spinner />;
  }

  // console.log(scrollContainerRef);
  return (
    // <InfiniteScroll pageStart={1} loadMore={() => fetchNextPage().then(() => {})} hasMore={hasNextPage} loader={<Spinner />}>
    <ContentArea>
      {lists?.map((data: IContent, index: number) => {
        return (
          <Content
            key={index}
            onClick={() => {
              onClickModalOpen(data?.id);
            }}
          >
            <Poster src={data.poster_path ? getImgPath(data?.poster_path) : noimg} />
            <Info>
              <Title>{data.title}</Title>
              <Date>
                개봉일: <span>{data.release_date}</span>
              </Date>

              <Vote>
                평점: <span> {data.vote_average}</span>
              </Vote>
            </Info>
          </Content>
        );
      })}
    </ContentArea>
    // </InfiniteScroll>
  );
};

const ContentArea = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 479px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Content = styled.div`
  width: 200px;
  height: 300px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  cursor: pointer;
  animation: ${toUp} 0.45s ease-in-out;
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
  padding-top: 15px;
  gap: 0 10px;
`;

const Title = styled.h2`
  height: 40px;
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
