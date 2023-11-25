import styled from 'styled-components';

import { useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { ModalContentData } from 'state/atoms';

import { useQuery } from 'react-query';
import { getContentCase, getImgPath } from 'utils/api';

import { Spinner } from 'components/Spinner';

import { ICast } from 'type/type';

import DefaultProfile from 'assets/defaultProfile.png';

export const Actor = () => {
  const location = useLocation();

  const type = location.pathname === '/' ? 'movie' : 'tv';
  const [modalInData] = useRecoilState(ModalContentData);

  const {
    data: caseList,
    isLoading: caseLoading,
    // isError: DetailError,
  } = useQuery(['contentCase', type, 'id'], () => getContentCase(type, modalInData?.id));
  console.log('배우데이터', caseList);
  if (caseLoading) {
    return <Spinner />;
  }

  return (
    <Contianer>
      <Title>출연진</Title>
      <GridWrapper>
        {caseList?.cast.map((data: ICast, index: number) => {
          return (
            <ActorArea key={index}>
              <ActorImg bg={data.profile_path ? getImgPath(data.profile_path) : DefaultProfile} />
              <ActorInfo>
                <div className="name">{data.name}</div>
                <div className="character">{data.character}</div>
              </ActorInfo>
            </ActorArea>
          );
        })}
      </GridWrapper>
    </Contianer>
  );
};

const Contianer = styled.div`
  width: 100%;
  height: 350px;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 50px;
  @media (max-width: 479px) {
    font-size: 22px;
  }
`;

const GridWrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  row-gap: 40px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ActorArea = styled.div`
  width: 100%;
`;

const ActorImg = styled.div<{ bg: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 12px;
  border-radius: 2px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const ActorInfo = styled.div`
  text-align: center;
  .name {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .character {
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
    color: ${({ theme }) => theme.colors.gray};
  }
`;
