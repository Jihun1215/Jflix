import styled from 'styled-components';
import { getnowPlayMovieData, getMovieData, getTopRatedMovies, getUpcomingMovies } from 'utils/api';
import { useQuery } from 'react-query';

import { Banner, Slider } from 'components';

export const Home = () => {
  const { data: popularMovieList, isLoading: loadingMovie, isError } = useQuery('getMovieData', getMovieData);
  const { data: nowPlauyMovieList, isLoading: loadingNowMovie } = useQuery('getMovieData', getnowPlayMovieData);
  const { data: topRatedMovieList, isLoading: loadingTopratedMovie } = useQuery('getTopRatedMovies', getTopRatedMovies);
  const { data: upcomingMovieList, isLoading: loadingupcomingMovie } = useQuery('getUpcomingMovies', getUpcomingMovies);


  const isLoading = loadingNowMovie || loadingMovie || loadingTopratedMovie || loadingupcomingMovie;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const randomNumber = Math.floor(Math.random() * 5);

  return (
    <Container>
      <Banner type="movie" contents={popularMovieList?.results?.[randomNumber]} ranking={randomNumber} />
      <Slider type="movie" video={nowPlauyMovieList?.results} title="인기 영화" />
      <Slider type="movie" video={topRatedMovieList?.results} title="최고평점 영화" />
      <Slider type="movie" video={upcomingMovieList?.results} title="개봉예정 영화" />

    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  ${({ theme }) => theme.FlexCol};
  gap: 50px 0;
`;
