import styled from 'styled-components';
import { useQuery } from 'react-query';

import { getContents } from 'utils/api';
import { Banner, Slider } from 'components';

export const Tv = () => {
  const type = 'tv';
  const { data: popularLists, isLoading: popularLoading } = useQuery(['getpopilarTv', type, 'popular'], () => getContents(type, 'popular'));

  const { data: airingTodayLists, isLoading: airingTodayLoading } = useQuery(['getairingTodayTv', type, 'airing_today'], () =>
    getContents(type, 'airing_today')
  );

  const { data: topRatedTvData, isLoading: topRatedTvLoading } = useQuery(['topRatedTv', type, 'top_rated'], () =>
    getContents(type, 'top_rated')
  );

  const isLoading = popularLoading || airingTodayLoading || topRatedTvLoading;

  if (isLoading) {
    return <div>1isLoading</div>;
  }
  // if (isError) {
  //   return <div>1isError</div>;
  // }
  const randomNumber = Math.floor(Math.random() * 5);
  return (
    <Container>
      <Banner type="tv" contents={popularLists?.results?.[randomNumber]} ranking={randomNumber} />
      <Slider type="tv" contents={popularLists?.results} title="현재 인기있는 TV" />
      <Slider type="tv" contents={airingTodayLists?.results} title="오늘방영 TV" />
      <Slider type="tv" contents={topRatedTvData?.results} title="최고평점 TV" />
      {/* <Slider type="tv" contents={onTheAirLists?.results} title="방영 예정 TV" /> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
`;
