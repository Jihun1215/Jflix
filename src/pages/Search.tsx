import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { useQuery } from 'react-query';
import { getSerchContent, getSerchtvContent } from 'utils/api';

import { GrLinkPrevious } from 'react-icons/gr';

// interface ISearchContent {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: string[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

export const Search = () => {
  // const tabs = [{ type: 'movie' }, { type: 'tv' }];
  // const { section } = useParams();
  // console.log(section);
  const [selectedTab, setSelectedTab] = useState<string>('movie');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  console.log(query);

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onClickTab = (section: string) => {
    setSelectedTab(section);
    // navigate(`/search/${section}?q=${keyword}`);
  };

  const { data: movielist, isLoading: movieLodaing } = useQuery(['getmovieSerch', query], () => getSerchContent(query));
  const { data: tvlist, isLoading: tvLoading } = useQuery(['gettvSerch', query], () => getSerchtvContent(query));

  console.log(movielist?.results);
  console.log(tvlist?.results);

  const Loading = movieLodaing || tvLoading;

  if (Loading) {
    return <div>2</div>;
  }

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
        <Tab isActive={selectedTab === 'movie'} onClick={() => onClickTab('movie')}>
          영화
        </Tab>
        <Tab isActive={selectedTab === 'tv'} onClick={() => onClickTab('tv')}>
          티비
        </Tab>
      </Tabnav>
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
  width: 100%;
  height: 50px;
  padding-top: 50px;
  ${({ theme }) => theme.BoxCenter};
`;

const Tab = styled.p<{ isActive: boolean }>`
  width: 150px;
  height: 50px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 3px;
  cursor: pointer;
  transition: 0.2s;
  color: ${(props) => (props.isActive ? '#E51013' : '#FFFFFF')};
  border-bottom: ${(props) => props.isActive && '3px solid #E51013'};
`;
