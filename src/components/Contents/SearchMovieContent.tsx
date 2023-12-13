import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useInfiniteQuery } from 'react-query';
import { getSerachMovieContent } from 'utils/api';

import { Spinner } from 'components/Spinner';
import { useIntersection } from 'hooks/useIntersection';

import { Item } from './Item';

export const SearchMovieContent = ({ query }: { query: string }) => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { data, isSuccess, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['searchMovie', { pageParam: 1, query }],
    ({ pageParam = 1 }) => getSerachMovieContent({ pageParam, query }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
      },

      staleTime: 100000, // 예: 10초
      // enabled를 사용하여 쿼리값이 변경될 때마다 데이터를 다시 불러오도록 설정
      enabled: !!query,
    }
  );
  const dataLength = data?.pages[0].results.length;

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [intersecting]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ContentArea>
      {dataLength === 0 ? (
        <ErrorArea>
          <h3>검색된 콘텐츠가 없습니다.</h3>
        </ErrorArea>
      ) : (
        <Item list={data?.pages || []} type="movie" />
      )}
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

const ErrorArea = styled.div`
  width: 95vw;
  height: 300px;
  ${({ theme }) => theme.BoxCenter};
  text-align: center;
  h3 {
    font-size: 24px;
    font-weight: 800;
  }
`;
