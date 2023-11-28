import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useQueries } from 'react-query';

import { useRecoilState } from 'recoil';
import { MyListContentState } from 'state/atoms';

import { getModalContentData } from 'utils/api';

import { Spinner } from 'components';
import { MyListContent } from 'components/Content/MyListContent';

interface IMylist {
  id: number;
  type: string;
}

export const MyList = () => {
  const [mylistcontent] = useRecoilState(MyListContentState);
  const [movieList, setMovieList] = useState<IMylist[]>([]);
  const [tvList, setTvList] = useState<IMylist[]>([]);

  useEffect(() => {
    // 배열 필터링하여 각 유형에 따라 새로운 배열 생성
    const filteredMovieList = mylistcontent.filter((item: IMylist) => item.type === 'movie');
    const filteredTvList = mylistcontent.filter((item: IMylist) => item.type === 'tv');
    // 생성된 배열을 상태 변수에 할당
    setMovieList(filteredMovieList);
    setTvList(filteredTvList);
  }, [mylistcontent]);

  // console.log(movieList);
  // console.log(tvList);

  // data 불러오기
  const myMovieQueries = useQueries(
    movieList.map((data) => ({
      queryKey: ['myMovie', data.id], // 수정된 부분
      queryFn: () => getModalContentData('movie', data.id),
    }))
  );

  // data 불러오기
  const myTvQueries = useQueries(
    tvList.map((data) => ({
      queryKey: ['myMovie', data.id], // 수정된 부분
      queryFn: () => getModalContentData('movie', data.id),
    }))
  );

  const myMovieData = myMovieQueries?.map((myMovie) => myMovie.data);
  // console.log('Mylist 상데 데이터', myMovieData);
  const myTvData = myTvQueries?.map((myTv) => myTv.data);
  // console.log('MyTv 상데 데이터', myTvData);

  const isMyMovieLoading = myMovieQueries.some((myMovie) => myMovie.isLoading);
  const isMyTvLoading = myTvQueries.some((myTv) => myTv.isLoading);

  const isLoading = isMyMovieLoading || isMyTvLoading;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Title>
        <h1>내가 찜한 리스트</h1>
      </Title>
      <MyListCard>
        <Lists>{myMovieData?.length === 0 ? <p>찜된 영화가 없습니다.</p> : <MyListContent data={myMovieData} />}</Lists>
        <Lists>{myTvData?.length === 0 ? <p>찜된 tv가 없습니다.</p> : <MyListContent data={myTvData} />}</Lists>
      </MyListCard>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 200px;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
`;

const Title = styled.div`
  width: 90%;
  height: 100px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  h1 {
    font-size: 40px;
    font-weight: 600;
  }
`;

const MyListCard = styled.div`
  width: 90%;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 100px;
`;

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
