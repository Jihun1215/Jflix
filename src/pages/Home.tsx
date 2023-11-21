import styled from 'styled-components';

import { getContents } from 'utils/api';
import { useQuery } from 'react-query';

import { Banner, Slider, Spinner } from 'components';

export const Home = () => {
  const type = 'movie';
  const { data: popularMovieList, isLoading: loadingMovie } = useQuery(['popularMovie', type, 'popular'], () =>
    getContents(type, 'popular')
  );

  const { data: topRatedMovieList, isLoading: nowPlayLoading } = useQuery(['getTopReatedMovies', type, 'top_rated'], () =>
    getContents(type, 'top_rated')
  );

  const { data: upcomingMovieList, isLoading: upcomingMovieLoading } = useQuery(['getTopReatedMovie', type, 'upcoming'], () =>
    getContents(type, 'upcoming')
  );

  // const { data: nowPlayMovieList, isLoading: nowPlayMovieLoading } = useQuery(['getNowPlatMovie', type, 'now-playing'], () =>
  //   getContents(type, 'now-playing')
  // );

  console.log(topRatedMovieList, upcomingMovieList);

  const isLoading = loadingMovie || nowPlayLoading || upcomingMovieLoading;

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  // if (isError) {
  //   return <div>Error fetching data</div>;
  // }

  const randomNumber = Math.floor(Math.random() * 5);

  return (
    <Container>
      <Banner type="movie" contents={popularMovieList?.results?.[randomNumber]} ranking={randomNumber} />
      {/* <Slider type="movie" contents={nowPlauyMovieList?.results} title="인기 영화" /> */}
      <Slider type="movie" contents={topRatedMovieList?.results} title="최고평점 영화" />
      <Slider type="movie" contents={upcomingMovieList?.results} title="개봉예정 영화" />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  ${({ theme }) => theme.FlexCol};
  gap: 50px 0;
`;
