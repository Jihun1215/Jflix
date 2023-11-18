import styled from 'styled-components';
import {
  // getnowPlayMovieData,
  getMovieData,
} from 'utils/api';
import { useQuery } from 'react-query';

import { Banner } from 'components/Banner';
// import { TopMovies } from './Home/TopMovies';

export const Home = () => {
  const { data, isLoading, isError } = useQuery('getMovieData', getMovieData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const randomNumber = Math.floor(Math.random() * 5);

  return (
    <Container>
      <Banner type="movie" content={data?.results?.[randomNumber]} ranking={randomNumber} />
      {/* <TopMovies /> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  border: 1px solid red;
`;
