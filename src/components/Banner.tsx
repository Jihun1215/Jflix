import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId } from 'state/atoms';

import { IContent } from 'type/type';

import { toDown } from 'styles/animation';

interface BannerProps {
  type: string;
  content?: IContent;
  ranking: number;
}

import { getImgPath } from 'utils/api';

import Logo from 'assets/svg/netflixlogo.svg?react';
import { FiInfo } from 'react-icons/fi';
import { Spinner } from './Spinner';

export const Banner = ({ type, content, ranking }: BannerProps) => {
  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);

  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);
  if (content === undefined) {
    return <Spinner />;
  }

  const BackGroundImg = getImgPath(content?.backdrop_path);

  const truncatedText = content?.overview.length > 150 ? `${content?.overview.slice(0, 150)}...` : content?.overview;

  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };

  return (
    <>
      {content && (
        <Container img={BackGroundImg}>
          <Card>
            <TopText>
              <NetflixLogo />
              <p>
                오늘의 {ranking + 1}위 {type === 'movie' ? '영화' : 'Tv'}
              </p>
            </TopText>
            <Title>
              {content?.title || content.name}
            </Title>
            <Overview>
              {content?.overview === '' ? (
                <OverviewText>제공된 줄거리가 없습니다.</OverviewText>
              ) : (
                <OverviewText>{truncatedText}</OverviewText>
              )}
            </Overview>
            <DetailArea>
              <button
                onClick={() => {
                  onClickModalOpen(content?.id);
                }}
              >
                <FiInfo />
                상세 보기
              </button>
            </DetailArea>
          </Card>
        </Container>
      )}
    </>
  );
};

const Container = styled.section<{ img: string }>`
  width: 100%;
  height: 80vh;
  padding: 200px 0 0 60px;
  animation: ${toDown} 0.45s ease-in-out;
  ${({ theme }) => theme.FlexCol};
  justify-content: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.img});
  @media (max-width: 1024px) {
    padding-left: 40px;
  }

  @media (max-width: 600px) {
    padding-left: 20px;
  }
`;

const Card = styled.div`
  width: 600px;
  height: 400px;
  padding: 10px;
  ${({ theme }) => theme.FlexCol};
  color: ${({ theme }) => theme.color2};
  @media (max-width: 1024px) {
    width: 500px;
  }

  @media (max-width: 600px) {
    width: 350px;
  }
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

const Overview = styled.div`
  width: 800px;
  height: 300px;
  font-size: 16px;
  ${({ theme }) => theme.BoxCenter};
  font-weight: 600;
  @media (max-width: 1024px) {
    width: 500px;
  }
  @media (max-width: 600px) {
    width: 350px;
  }
`;

const OverviewText = styled.p`
  ${({ theme }) => theme.WH100};
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 10px;
  font-size: 18px;
`;

const DetailArea = styled.div`
  width: 100%;
  height: 200px;
  padding-top: 20px;
  button {
    width: 200px;
    height: 60px;
    background-color: #6d6d6eb3;
    font-size: 18px;
    font-weight: 700;
    ${({ theme }) => theme.BoxCenter};
    gap: 0 5px;
  }
`;
