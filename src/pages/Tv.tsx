import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getTopRatedtv, getUpdatetv, getAiringTodaytv } from 'utils/api';

import { Banner } from 'components/Banner';

export const Tv = () => {
  const { data: topRatedTvList, isLoading: loadingTopRated, isError } = useQuery('getTopRatedtv', getTopRatedtv);
  const { data: upDateTvList, isLoading: loadingUpDate } = useQuery('getUpdatetv', getUpdatetv);
  const { data: airingTodayTvList, isLoading: loadingAiringToday } = useQuery('getAiringTodaytv', getAiringTodaytv);

  const isLoading = loadingTopRated || loadingUpDate || loadingAiringToday;

  // console.log('최고평점 TV', topRatedTvList);
  // console.log('업데이트 예정 TV', upDateTvList);
  // console.log('오늘 방영 TV', airingTodayTvList);

  if (isLoading) {
    return <div>1isLoading</div>;
  }
  if (isError) {
    return <div>1isError</div>;
  }
  const randomNumber = Math.floor(Math.random() * 5);
  return (
    <Container>
      <Banner type="tv" content={topRatedTvList?.results?.[randomNumber]} ranking={randomNumber} />
      {/* <TopMovies /> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  border: 1px solid red;
`;
