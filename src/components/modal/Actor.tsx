import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ModalTypeAndId } from 'state/atoms';

import { useQuery } from 'react-query';
import { getContentCase, getImgPath } from 'utils/api';

import { Spinner } from 'components/Spinner';

import { ICast } from 'type/type';

import DefaultProfile from 'assets/defaultProfile.png';

export const Actor = () => {
  const [modalTypeAndId] = useRecoilState(ModalTypeAndId);
  // console.log(modalTypeAndId);

  const type = modalTypeAndId?.type;

  const { data: caseList, isLoading: caseLoading } = useQuery(['contentCase', type, 'id'], () => {
    if (modalTypeAndId?.type && modalTypeAndId?.id) {
      return getContentCase(modalTypeAndId.type, modalTypeAndId.id);
    }
    // modalTypeAndId값이 없을 시 에러 코드 반환
    return Promise.reject(new Error('Invalid type or id'));
  });

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
  width: 90%;
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
