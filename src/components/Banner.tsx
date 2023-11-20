import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalIsOpenState } from 'state/atoms';

import {
  IContent,
  //   ITodayBestMovie,
  //   ITodayMoive,
} from 'type/type';

import { Modal } from './Modal';

interface BannerProps {
  type: string;
  contents?: IContent;
  ranking: number;
}

import { getImgSetting } from 'utils/api';

import Logo from 'assets/svg/netflixlogo.svg?react';
import { FiInfo } from 'react-icons/fi';

export const Banner = ({ type, contents, ranking }: BannerProps) => {
  const [, setIsmodalOpen] = useRecoilState(modalIsOpenState);

  if (contents === undefined) {
    return <div> 로딩 중 </div>;
  }

  const BackGroundImg = getImgSetting(contents?.backdrop_path);
  const BackGroundposter = getImgSetting(contents?.poster_path);

  const truncatedText = contents?.overview.length > 150 ? `${contents?.overview.slice(0, 250)}...` : contents?.overview;

  const onClickModalOpen = () => {
    // console.log(data);
    setIsmodalOpen(true);
  };

  return (
    <>
      {contents && (
        <Container img={BackGroundImg} poster={BackGroundposter}>
          <Card>
            <TopText>
              <NetflixLogo />
              {type === 'movie' ? <p>오늘의 {ranking + 1}위 영화</p> : <p>오늘의 {ranking + 1}위 Tv</p>}
            </TopText>
            <Title>{type === 'movie' ? `${contents?.title}` : `${contents?.name}`}</Title>
            <GradeAndDate>
              <span>평점: {contents?.vote_average}</span>
              <span>{type === 'movie' ? `개봉일: ${contents?.release_date}` : `첫 개봉 ${contents?.first_air_date}`}</span>
            </GradeAndDate>
            <Overview>{truncatedText}</Overview>
            <DetailArea>
              <button
                onClick={() => {
                  onClickModalOpen();
                }}
              >
                <FiInfo />
                상세 보기
              </button>
            </DetailArea>
          </Card>
        </Container>
      )}

      <Modal type={type} contents={contents} />
    </>
  );
};

const Container = styled.section<{ img: string; poster: string }>`
  width: 100%;
  height: 80vh;
  padding: 200px 0 0 60px;
  ${({ theme }) => theme.FlexCol};
  justify-content: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.img});
`;

const Card = styled.div`
  width: 600px;
  height: 400px;
  padding: 10px;
  ${({ theme }) => theme.FlexCol};
  color: ${({ theme }) => theme.color2};
`;

const TopText = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  gap: 0 10px;
`;

const NetflixLogo = styled(Logo)`
  width: 20px;
  height: 20px;
`;

const Title = styled.h1`
  width: 100%;
  height: 80px;
  ${({ theme }) => theme.FlexRow};
  gap: 0 5px;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
`;

const GradeAndDate = styled.div`
  width: 60%;
  height: 80px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 20px;
  span {
    width: 50%;
    font-size: 18px;
    font-weight: 700;
  }
`;

const Overview = styled.p`
  width: 100%;
  height: 150px;
  font-size: 16px;
  ${({ theme }) => theme.BoxCenter};
  font-weight: 600;
`;

const DetailArea = styled.div`
  width: 100%;
  height: 200px;
  padding-top: 20px;
  button {
    width: 200px;
    height: 60px;
    background-color: #6d6d6eb3;
    opacity: 0.9;
    font-size: 18px;
    font-weight: 700;
    ${({ theme }) => theme.BoxCenter};
    gap: 0 5px;
  }
`;
