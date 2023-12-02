import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { SearchMovieTotalCount, SearchTvTotalCount } from 'state/atoms';

import { GrLinkPrevious } from 'react-icons/gr';

import { SearchMovieContent, SearchTvContent } from 'components/Content';

export const Search = () => {
  const [type, setType] = useState<string>('movie');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onClickTab = (section: string) => {
    setType(section);
    navigate(`/search/${section}?q=${query}`);
  };

  const searchMovieCount = useRecoilValue(SearchMovieTotalCount);
  const searchTvCount = useRecoilValue(SearchTvTotalCount);

  // const tvTotalCount = useRecoilValue(SearchTvContent);
  // console.log('영화 총 갯수', searchMovieCount);
  // console.log('tv 총 갯수', searchTvCount);

  // movie data fetch
  // const [movieLoading, movietotalCount, filteredMovieSearch] = useInfiniteSearchQuery('movie', query!, getSerachMovieContent);

  // const [tvLoading, tvtotalCount, filteredTvSearch] = useInfiniteSearchQuery('tv', query!, getSerachtvContent);
  // console.log('영화데이터', filteredMovieSearch);
  // console.log('Tv데이터', filteredTvSearch);

  //  const Loading = movieLoading || tvLoading;

  //   if (Loading) {
  //     return  <Spinner />;
  //   }

  // 무한스크롤 관련한 데이터 패칭 !

  return (
    <Container>
      <TitleAndGoback>
        <GoBack>
          <GrLinkPrevious onClick={onClickGoBack} />
        </GoBack>
        <SearchWord>
          <Query>{query}</Query>
          <P>의 관련된 검색 결과</P>
        </SearchWord>
      </TitleAndGoback>

      <Tabnav>
        <Tab isactive={type === 'movie'} onClick={() => onClickTab('movie')}>
          영화
          {/* (<span>{searchMovieCount}</span>) */}
        </Tab>
        <Tab isactive={type === 'tv'} onClick={() => onClickTab('tv')}>
          티비
          {/* (<span>{searchTvCount}</span>) */}
        </Tab>
      </Tabnav>

      <SearchContentArea>
        {type === 'movie' ? <SearchMovieContent type="movie" query={query!} /> : <SearchTvContent type="tv" query={query} />}
      </SearchContentArea>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 120px 60px;
  height: 100vh;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  @media (max-width: 1023px) {
    padding: 100px 40px;
  }
  @media (max-width: 479px) {
    padding: 80px 20px;
  }
`;

const TitleAndGoback = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.white};
  gap: 0 10px;
  text-align: center;
`;

const GoBack = styled.div`
  width: 10%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter}
  svg {
    font-size: 30px;
    color: #fff;
    cursor: pointer;
  }
`;

const SearchWord = styled.div`
  width: 90%;
  height: 100%;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  padding-right: 10%;
  gap: 0 5px;
  justify-content: center;
`;

const Query = styled.h2`
  font-size: 24px;
  font-weight: 700;
  padding-left: 50px;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const Tabnav = styled.nav`
  padding-top: 50px;
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.BoxCenter};
`;

const Tab = styled.p<{ isactive: boolean }>`
  width: 150px;
  height: 50px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 3px;
  cursor: pointer;
  transition: 0.2s;
  color: ${(props) => (props.isactive ? '#E51013' : '#FFFFFF')};
  border-bottom: ${(props) => props.isactive && '3px solid #E51013'};
  span {
    font-size: 20px;
  }
`;

const SearchContentArea = styled.div`
  width: 100%;
  padding-top: 50px;
`;
