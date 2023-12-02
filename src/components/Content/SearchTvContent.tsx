import { useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId, SearchTvTotalCount } from 'state/atoms';

import InfiniteScroll from 'react-infinite-scroller';

import { useInfiniteQuery, InfiniteData } from 'react-query';
import { AxiosResponse } from 'axios';

import { getImgPath, getSerachtvContent } from 'utils/api';
import { IContent } from 'type/type';

import { Spinner } from 'components/Spinner';

import { toUp } from 'styles/animation';
import noimg from 'assets/noimg.png';

export const SearchTvContent = ({ type, query }: { type: string; query: string }) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    'searchMovies',
    ({ pageParam = 1 }) => getSerachtvContent(pageParam, query),
    {
      getNextPageParam: (lastPage: InfiniteData<AxiosResponse<IContent[]>>) => {
        return lastPage.data?.page < lastPage.data?.total_pages ? lastPage.data?.page + 1 : null;
      },
    }
  );

  const lists = data?.pages.flatMap((page) => page.data.results);
  const totalCount = data?.pages[0]?.data.total_results;
  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);
  const [, setTvcount] = useRecoilState(SearchTvTotalCount);
  // console.log(totalCount);

  // console.log(data?.pages[0].data.total_results);

  useEffect(() => {
    setTvcount(totalCount!);
  }, [totalCount]);

  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };

  if (isLoading) {
    return (
      // <ContentArea>
      <Spinner />
      //  </ContentArea>
    );
  }
  return (
    <InfiniteScroll
      pageStart={1} // 페이지의 시작값
      loadMore={(page) => fetchNextPage(page)} // 페이지를 불러오는 함수
      hasMore={hasNextPage} // 더 불러올 페이지가 있는지 여부
      loader={<Spinner key={0} />} // 로딩 중에 표시할 컴포넌트
    >
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
    </InfiniteScroll>
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
