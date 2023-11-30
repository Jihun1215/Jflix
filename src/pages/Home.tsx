import styled from 'styled-components';

import { getContents } from 'utils/api';
import { useQuery } from 'react-query';

import { Banner, Slider, Spinner } from 'components';

export const Home = () => {
  const type = 'movie';
  const {
    data: popularMovieList,
    isLoading: popularLoading,
    isError: popularError,
  } = useQuery(['popularMovie', type, 'popular'], () => getContents(type, 'popular'));

  const {
    data: topRatedMovieList,
    isLoading: TopReatedLoading,
    isLoading: TopReatedError,
  } = useQuery(['getTopReatedMovie', type, 'top_rated'], () => getContents(type, 'top_rated'));

  const {
    data: upcomingMovieList,
    isLoading: upcomingLoading,
    isLoading: upcomingError,
  } = useQuery(['getUpcomginMovie', type, 'upcoming'], () => getContents(type, 'upcoming'));

  const {
    data: nowPlayMovieList,
    isLoading: nowPlayLoading,
    isLoading: nowPlayError,
  } = useQuery(['getNowPlatMovie', type, 'now_playing'], () => getContents(type, 'now_playing'));


  const isLoading = popularLoading || TopReatedLoading || upcomingLoading || nowPlayLoading;
  const isError = popularError || TopReatedError || upcomingError || nowPlayError;

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const randomNumber = Math.floor(Math.random() * 5);

  return (
    <Container>
      <Banner type="movie" content={popularMovieList?.results?.[randomNumber]} ranking={randomNumber} />
      <Slider  lists={nowPlayMovieList?.results} title="개봉중인 영화" />
      <Slider  lists={topRatedMovieList?.results} title="최고평점 영화" />
      <Slider  lists={upcomingMovieList?.results} title="개봉예정 영화" />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  ${({ theme }) => theme.FlexCol};
  gap: 50px 0;
`;
