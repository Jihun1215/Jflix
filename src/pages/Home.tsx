import styled from 'styled-components';
import { getnowPlayMovieData, getMovieData, getTopRatedMovies, getUpcomingMovies } from 'utils/api';
import { useQuery } from 'react-query';

import { Banner } from 'components/Banner';
// import { TopMovies } from './Home/TopMovies';

export const Home = () => {
  const { data: popularMovieList, isLoading: loadingMovie, isError } = useQuery('getMovieData', getMovieData);
  const { data: nowPlauyMovieList, isLoading: loadingNowMovie } = useQuery('getMovieData', getnowPlayMovieData);
  const { data: topRatedMovieList, isLoading: loadingTopratedMovie } = useQuery('getTopRatedMovies', getTopRatedMovies);
  const { data: upcomingMovieList, isLoading: loadingupcomingMovie } = useQuery('getUpcomingMovies', getUpcomingMovies);

  console.log('현재상영중', nowPlauyMovieList);
  console.log('최고평점',topRatedMovieList);
  console.log('공개예정',upcomingMovieList);

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
      <Banner type="movie" content={popularMovieList?.results?.[randomNumber]} ranking={randomNumber} />
      {/* <TopMovies /> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  border: 1px solid red;
`;
