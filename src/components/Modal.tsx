import styled from 'styled-components';

import { useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, MyListContentState, ModalTypeAndId, AlertModalState, AlertTextState } from 'state/atoms';

import { motion } from 'framer-motion';

import { Spinner } from './Spinner';

import { useQuery } from 'react-query';
import { getImgPath, getModalContentData } from 'utils/api';
import { IGenre } from 'type/type';

import { IoClose } from 'react-icons/io5';
import { GoPlusCircle, GoCheckCircle } from 'react-icons/go';

import { Actor } from './modal/Actor';
import { upmodal } from 'styles/animation';

export const Modal = () => {
  const location = useLocation();

  const type = location.pathname === '/' ? 'movie' : 'tv';

  const [isModalOpen, setISModalOpen] = useRecoilState(modalIsOpenState);

  const [modalTypeAndId, setModalTypeAndId] = useRecoilState(ModalTypeAndId);

  const { data: modalList, isLoading: DetailLoading } = useQuery(
    ['modalData', modalTypeAndId?.type, 'id'],
    () => {
      if (modalTypeAndId?.type && modalTypeAndId?.id) {
        return getModalContentData(modalTypeAndId.type, modalTypeAndId.id);
      }
      // modalTypeAndId값이 없을 시 에러 코드 반환
      return Promise.reject(new Error('Invalid type or id'));
    },
    {
      // 데이터 캐싱처리가 되어 새로운 콘텐츠 클릭 시 
      staleTime: 0, // 항상 만료되도록 설정
    }
  );

  const onClickCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    const TagName = element.tagName;
    e.stopPropagation();

    if (TagName === 'SECTION') {
      setISModalOpen(false);
      setModalTypeAndId(undefined);
    }
  };

  const onCloseModal = () => {
    setISModalOpen(false);
    setModalTypeAndId(undefined);
  };

  const BackGroundImg = getImgPath(modalList?.backdrop_path);
  const BackGroundposter = getImgPath(modalList?.poster_path);

  const isLoading = DetailLoading;

  const genres: IGenre[] | undefined = modalList?.genres;

  // mylist code
  const [, setAlertmodla] = useRecoilState(AlertModalState);
  const [, setAlerttext] = useRecoilState(AlertTextState);

  const [saveContent, setSaveContent] = useRecoilState(MyListContentState);

  const existingItem = saveContent.find((item: { id: number; type: string }) => item.id === modalList?.id);
  const isSaveList = Boolean(existingItem);

  // 찜하기 로직
  const onClickSaveContent = (id: number, type: string) => {
    const isIdInList = saveContent.includes(id);

    if (!isIdInList) {
      const updatedContent = [...saveContent, { id, type }];
      setSaveContent(updatedContent);
      setAlertmodla(true);
      setAlerttext('✅ 보관함에 저장되었습니다.');
    } else {
      alert('이미 보관 중인 데이터 입니당!');
    }
  };

  // 찜하기 삭제하기
  const onClickDeleteContent = (id: number) => {
    const currentContent = [...saveContent];

    const indexToRemove = currentContent.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      currentContent.splice(indexToRemove, 1);
      setSaveContent(currentContent);
      setAlertmodla(true);
      setAlerttext('❌ 보관함에 삭제되었습니다.');
    } else {
      alert('해당 ID가 Recoil 상태에 없습니다.');
    }
  };

  let grade = modalList?.vote_average;
  grade = Math.round(grade * 10) / 10;

  const truncatedText = modalList?.overview.length > 150 ? `${modalList?.overview.slice(0, 150)}...` : modalList?.overview;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isModalOpen && (
        <Container onClick={onClickCloseModal} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {modalTypeAndId === undefined ? (
            <Spinner />
          ) : (
            <ModalCard animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
              <CardWrapper>
                <CloseBtn fill="#FFF" onClick={onCloseModal} />
                <ModalImgArea bg={BackGroundImg}>
                  <Poster src={BackGroundposter} />
                </ModalImgArea>
                <ModalContentInfo>
                  <DataInfoArea>
                    {genres?.map((data: IGenre, index: number) => {
                      return <Genres key={index}>{data?.name}</Genres>;
                    })}
                    <span />
                    {modalTypeAndId?.type === 'movie' ? <RuntimeAndSeasons>{modalList?.runtime}분</RuntimeAndSeasons> : null}
                    {modalTypeAndId?.type === 'tv' ? <RuntimeAndSeasons>시즌 {modalList?.seasons.length}개</RuntimeAndSeasons> : null}
                    {modalTypeAndId?.type === 'tv' ? (
                      <RuntimeAndSeasons>에피소드 {modalList?.number_of_episodes}개</RuntimeAndSeasons>
                    ) : null}
                  </DataInfoArea>

                  <Title>
                    <h2>{modalTypeAndId?.type === 'movie' ? `${modalList?.title}` : `${modalList?.name}`}</h2>
                    {isSaveList ? (
                      <GoCheckCircle
                        onClick={() => {
                          onClickDeleteContent(modalList?.id);
                        }}
                      />
                    ) : (
                      <GoPlusCircle
                        onClick={() => {
                          onClickSaveContent(modalList?.id, type);
                        }}
                      />
                    )}
                  </Title>

                  <DateAndVoteAverage>
                    <Date>
                      {modalTypeAndId?.type === 'movie' ? '개봉일: ' : '첫방영: '}
                      {modalTypeAndId?.type === 'movie' ? (
                        <span> {modalList?.release_date}</span>
                      ) : (
                        <span>{modalList?.first_air_date}</span>
                      )}
                    </Date>
                    <VoteAverage>
                      평점: <span>{grade}</span>
                    </VoteAverage>
                  </DateAndVoteAverage>
                  <Overview>{modalList?.overview === '' ? <p>제공된 정보가 없습니다.</p> : <p>{truncatedText}</p>}</Overview>
                </ModalContentInfo>
                <Actor />
              </CardWrapper>
            </ModalCard>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled(motion.section)`
  position: fixed;
  inset: 0;
  width: 100vw;
  z-index: 9995;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.6);
  ${({ theme }) => theme.BoxCenter};
  opacity: 0;
`;

const ModalCard = styled(motion.div)`
  width: min(85%, 900px);
  height: 90vh;
  overflow-y: auto;
  z-index: 9999;
  overflow-x: hiddens;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  /* transition: 03; */
  animation: ${upmodal} 0.25s ease-in-out;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 1100px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
`;

const ModalImgArea = styled.div<{ bg: string }>`
  position: relative;
  width: 100%;
  height: 450px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: ${({ bg }) => (bg ? `linear-gradient(rgb(1 0 0 / 43%), black) 0% 0% / cover no-repeat, url(${bg});` : 'transparent')};
  background-position: 50% 50%;
  padding: 10px;
  ${({ theme }) => theme.BoxCenter};
  background-size: cover;
`;

const ModalContentInfo = styled.div`
  width: 100%;
  height: 300px;
  padding: 20px 40px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
`;

const Poster = styled.img`
  position: absolute;
  width: 350px;
  height: 400px;
  border-radius: 12px;
  @media (max-width: 1024px) {
    width: 325px;
  }

  @media (max-width: 600px) {
    width: 300px;
    height: 350px;
  }
`;

const DataInfoArea = styled.div`
  width: 100%;
  height: 40px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 10px;
  span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #d9d9dc;
  }
  p {
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 700;
  }
`;

const Genres = styled.p`
  background-color: ${({ theme }) => theme.colors.red};
  font-weight: 700;
  text-align: center;
`;

const RuntimeAndSeasons = styled.p`
  background-color: ${({ theme }) => theme.colors.lightgreey};
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 30px;
  svg {
    font-size: 30px;
    ${({ theme }) => theme.BoxCenter};
    cursor: pointer;
    padding-bottom: 2.5px;
  }
`;

const DateAndVoteAverage = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
`;

const Date = styled.p`
  padding: 6px 12px;
  font-weight: 600;
  span {
    color: ${({ theme }) => theme.colors.greey};
  }
`;

const VoteAverage = styled.p`
  padding: 6px 12px;
  font-weight: 600;
  span {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

const Overview = styled.div`
  width: 100%;
  height: 100px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
`;

const CloseBtn = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 40px;
  cursor: pointer;
  z-index: 40;
`;
