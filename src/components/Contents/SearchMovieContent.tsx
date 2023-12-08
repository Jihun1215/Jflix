import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useInfiniteQuery } from 'react-query';
import { getSerachMovieContent } from 'utils/api';

import { useIntersection } from 'hooks/useIntersection';

import { Spinner } from 'components/Spinner';

import { Item } from './Item';

export const SearchMovieContent = ({ query }: { query: string }) => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { data, isSuccess, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    'searchMovie',
    ({ pageParam = 1 }) => getSerachMovieContent({ pageParam, query }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
      },
    }
  );

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [intersecting]);

  if (isLoading) {
    return <Spinner />;
  }

  /* 
  무한 스크롤 적용 시 데이터 나오는 형식
    data: {
      pages: {
        {results: [...]}
        {results: [...]}
        {results: [...]}
        {results: [...]}
        {results: [...]}
        {results: [...]}
      }
    }
  */

  return (
    <ContentArea>
      <Item list={data?.pages || []} type="movie" />
      <div ref={fetchMoreRef} />
    </ContentArea>
  );
};

const ContentArea = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
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
  @media (max-width: 570px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
