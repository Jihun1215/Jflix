import styled from 'styled-components';

import { useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalContentData } from 'state/atoms';

import { motion } from 'framer-motion';

import { Spinner } from './Spinner';


import { useQuery } from 'react-query';
import { getImgPath, getModalContentData, getContentCase } from 'utils/api';
import { IGenre } from 'type/type';

import { IoClose } from 'react-icons/io5';

export const Modal = () => {
  const location = useLocation();

  const type = location.pathname === '/' ? 'movie' : 'tv';
  // console.log(type);
  const [isModalOpen, setISModalOpen] = useRecoilState(modalIsOpenState);

  const [modalInData, setModalInData] = useRecoilState(ModalContentData);

  const {
    data: modalList,
    isLoading: DetailLoading,
    // isError: DetailError,
  } = useQuery(['popularMovie', type, 'id'], () => getModalContentData(type, modalInData?.id));
  // console.log('모달데이터', modalList);

  const {
    data: caseList,
    isLoading: caseLoading,
    // isError: DetailError,
  } = useQuery(['contentCase', type, 'id'], () => getContentCase(type, modalInData?.id));
  console.log('모달안 상세 데이터', modalList);
  console.log('배우데이터', caseList);

  const onClickCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    const TagName = element.tagName;
    e.stopPropagation();
    if (TagName === 'SECTION' || TagName === 'svg' || TagName === 'path') {
      setISModalOpen(false);
      setModalInData(undefined);
    }
  };

  const BackGroundImg = getImgPath(modalInData?.backdrop_path);
  const BackGroundposter = getImgPath(modalInData?.poster_path);

  const isLoading = DetailLoading || caseLoading;

  const genres: IGenre[] | undefined = modalList?.genres;


  if (isLoading) {
    return <Spinner />;
  }

  // genres 장르 ,
  return (
    <>
      {isModalOpen && (
        <Container onClick={onClickCloseModal} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {modalInData === undefined ? (
            <Spinner />
          ) : (
            <ModalCard animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
              <ModalTopArea bg={BackGroundImg}>
                <CloseBtn fill="#FFF" />
                <Poster src={BackGroundposter} />
                <TitleArea>{modalList?.title}</TitleArea>
              </ModalTopArea>
              <ModalBottomArea>
                <GenresAndRuntime>
                  {genres?.map((data: IGenre, index: number) => {
                    return <Genres key={index}>{data?.name}</Genres>;
                  })}
                  <span />
                  <Runtime>{modalList?.runtime}분</Runtime>
                </GenresAndRuntime>
                {/* {modalList?.overview === '' ? <p>제공된 정보가 없습니다.</p> : <p>{modalList?.overview}</p>}
                <br />
                개봉일: {modalList?.release_date}
                <br />
                <p>{modalList?.genres[0].name}</p> */}
              </ModalBottomArea>
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
  /* top: 0; */
  /* bottom: 0; */
  width: 100vw;
  /* height: 100%; */
  z-index: 9998;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.5);
  ${({ theme }) => theme.BoxCenter};
  opacity: 0;
`;

const ModalCard = styled(motion.div)`
  width: min(90%, 900px);
  height: 90vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.BoxCenter};
  /* overflow: hidden; */
`;

const ModalTopArea = styled.div<{ bg: string }>`
  position: relative;
  width: 100%;
  height: 60%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: ${({ bg }) => (bg ? `linear-gradient(rgb(1 0 0 / 43%), black) 0% 0% / cover no-repeat, url(${bg});` : 'transparent')};
  background-position: 50% 50%;
  padding: 10px;
  ${({ theme }) => theme.BoxCenter};
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

const TitleArea = styled.h2`
  position: absolute;
  /* z-index: 100; */
  bottom: 100px;
  left: 20%;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const ModalBottomArea = styled.div`
  width: 100%;
  height: 40%;
  padding: 20px 40px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
`;

const GenresAndRuntime = styled.div`
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
    font-size: 18px;
  }
`;

const Genres = styled.p`
  padding: 4px 8px;
  background-color: red;
  border-radius: 6px;
  font-weight: 700;
`;

const Runtime = styled.p`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.lightgreey};
  border-radius: 6px;
`;

// const TitleArea = styled.``

const CloseBtn = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 40px;
  cursor: pointer;
  z-index: 40;
`;
