import React from 'react';
import { useQuery } from 'react-query';

import { getTopRatedMovies } from 'utils/api';

export const TopMovies = () => {
  const { data, isLoading, isError } = useQuery('topmovies', getTopRatedMovies);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  console.log(data);

  return <div>TopMovies</div>;
};
