import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, DetailContentId } from 'state/atoms';

import { Spinner } from './Spinner';

import { IContent } from 'type/type';
import { getImgPath } from 'utils/api';
// import { useEffect } from 'react';

interface ModalProps {
  type: string;
  contents?: IContent;
}

export const Modal = ({ type, contents }: ModalProps) => {
  const [isModalOpen, setISModalOpen] = useRecoilState(modalIsOpenState);
  const [contentId] = useRecoilState(DetailContentId);
  console.log(contentId, type);
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetTagName = e.currentTarget.tagName;
    if (targetTagName === 'SECTION') {
      setISModalOpen(false);
    }
  };

  const BackGroundImg = getImgPath(contents?.backdrop_path);
  const BackGroundposter = getImgPath(contents?.poster_path);

  // genres 장르 ,
  return (
    <>
      {isModalOpen && (
        <Container onClick={onClick}>
          {contents === undefined ? (
            <Spinner />
          ) : (
            <ModalCard>
              <ModalTopArea bg={BackGroundImg}>
                <Poster src={BackGroundposter} />
                <TitleArea>{contents?.title}</TitleArea>
              </ModalTopArea>
              <ModalBottomArea>
                {/* {data && <div>{data?.genres.name[0]}</div>} */}
                {/* {data?.map((v: any) => {
                  return <div>{v?.genres.name}</div>;
                })} */}
              </ModalBottomArea>
            </ModalCard>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  ${({ theme }) => theme.BoxCenter};
`;

const ModalCard = styled.div`
  width: min(90%, 900px);
  height: 90vh;
  background-color: white;
  border-radius: 12px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.BoxCenter};
  /* object-fit: cover; */
`;

const ModalTopArea = styled.div<{ bg: string }>`
  position: relative;
  width: 100%;
  height: 65%;
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
  height: 450px;
  border-radius: 12px;
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
  height: 35%;
  border: 1px solid red;
`;
