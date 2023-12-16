import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalTypeAndId } from 'state/atoms';

import { AnimatePresence, motion } from 'framer-motion';

import { useDebouncedWidth } from 'hooks/useDebouncedWidth';

import { GrPrevious, GrNext } from 'react-icons/gr';
import { getImgPath } from 'utils/api';

import { IContent } from 'type/type';
import noimg from 'assets/noimg.png';

interface ISliderProps {
  movingBack: boolean;
  windowWidth: number;
}

interface SliderProps {
  lists: IContent[];
  title: string;
  zindex: number;
}

const sliderVariants = {
  enter: ({ movingBack, windowWidth }: ISliderProps) => ({
    x: movingBack ? -windowWidth + 10 : windowWidth - 10,
  }),
  show: {
    x: 0,
  },
  exit: ({ movingBack, windowWidth }: ISliderProps) => ({
    x: movingBack ? windowWidth - 10 : -windowWidth + 10,
  }),
};

const cardVariants = {
  hover: {
    scale: 1.1,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    display: 'block',
    transition: {
      delay: 0.4,
      duaration: 0.3,
      type: 'tween',
    },
  },
};

export const Slider = ({ lists, title, zindex }: SliderProps) => {
  const windowWidth = useDebouncedWidth();

  const getSliderOffSet = (windowWidth: number) => {
    if (windowWidth <= 810) return 2;
    else if (windowWidth <= 1050) return 3;
    else if (windowWidth <= 1565) return 4;
    else return 5;
  };

  const offset = getSliderOffSet(windowWidth);
  const [index, setIndex] = useState(0);
  const listLength = lists?.length;
  const maxIndex = Math.floor(listLength / offset) - 1;

  useEffect(() => {
    setIndex((prev) => (prev > maxIndex ? maxIndex : prev));
  }, [windowWidth]);

  const [isNextBtnDisabled] = useState(false);
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);

  const [moving, setMoving] = useState(false);
  const [movingBack, setMovingBack] = useState(false);

  // 이전 콘텐츠 보기 함수
  const onClickPrenBtn = () => {
    if (lists) {
      if (moving) return;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setMoving(true);
      setMovingBack(true);
    }
  };

  // 다음 콘텐츠 보기 함수
  const onClickNextBtn = () => {
    if (lists) {
      if (moving) return;
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      setMoving(true);
      setIsPrevBtnDisabled(false);
    }
  };

  const toggleMoving = () => {
    setMoving(false);
    setMovingBack(false);
  };

  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalTypeAndId] = useRecoilState(ModalTypeAndId);

  const location = useLocation();
  const type = location.pathname === '/' ? 'movie' : 'tv';

  const onClickModalOpen = (id: number) => {
    const modalInfo = { type, id };
    setIsModalOpen(true);
    setModalTypeAndId(modalInfo);
  };

  return (
    <Container>
      <TitleAndPoint>
        <Title>{title}</Title>
      </TitleAndPoint>
      <SliderContainer>
        <PrevBtn onClick={onClickPrenBtn} disabled={isPrevBtnDisabled}>
          <GrPrevious />
        </PrevBtn>
        <AnimatePresence initial={false} onExitComplete={toggleMoving} custom={{ movingBack, windowWidth }}>
          <SliderWrapper
            key={index}
            variants={sliderVariants}
            initial="enter"
            animate="show"
            exit="exit"
            transition={{ type: 'tween', duration: 0.5 }}
            custom={{ movingBack, windowWidth }}
            offset={offset}
            zindex={zindex}
          >
            {lists?.slice(offset * index, offset * index + offset).map((data, idx) => (
              <Card key={data.id}>
                <Poster
                  bg={data.backdrop_path ? getImgPath(data.backdrop_path) : noimg}
                  idx={idx}
                  offset={offset}
                  onClick={() => onClickModalOpen(data?.id)}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <CardInfo variants={infoVariants}>
                    <CardTitle>{data.title || data.name}</CardTitle>
                    <CardDateAndRating>
                      <CardDate>
                        개봉일:
                        <span>{data.release_date || data.first_air_date}</span>
                      </CardDate>
                      <CardRating>
                        평점: <span> {data.vote_average}</span>
                      </CardRating>
                    </CardDateAndRating>
                  </CardInfo>
                </Poster>
              </Card>
            ))}
          </SliderWrapper>
        </AnimatePresence>
        <NextBtn onClick={onClickNextBtn} disabled={isNextBtnDisabled}>
          <GrNext />
        </NextBtn>
      </SliderContainer>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 225px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 20px 0;
  margin-bottom: 50px;
`;

const TitleAndPoint = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 20px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  ${({ theme }) => theme.BoxCenter};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;


const SliderContainer = styled.div`
  position: relative;
  width: 95%;
  height: 195px;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  @media (max-width: 55px) {
    padding: 0;
  }
`;

const Button = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  padding: 0;
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: 24px;
  z-index: 5;
  color: ${({ theme }) => theme.colors.white};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      &:hover {
        cursor: pointer;
        opacity: 1;
        transform: scale(1.1);
        transition: 0.3s;
      }
    `}

  @media (max-width: 1023px) {
    width: 40px;
    font-size: 20px;
  }

  @media (max-width: 555px) {
    bottom: 90px;
  }

  @media (max-width: 440px) {
    width: 20px;
    font-size: 16px;
    bottom: 100px;
  }
`;

const PrevBtn = styled(Button)`
  left: -10px;
`;
const NextBtn = styled(Button)`
  right: -10px;
`;

const SliderWrapper = styled(motion.div)<{ offset: number; zindex: number }>`
  position: absolute;
  z-index: ${({ zindex }) => zindex};
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.offset}, 1fr)`};
  width: 95%;
  height: 100%;
  gap: 10px;
  @media (max-width: 810px) {
    width: 90%;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.15s;
`;

const Poster = styled(motion.div)<{
  bg?: string;
  idx: number;
  offset: number;
}>`
  width: 100%;
  height: 100%;
  padding-top: 56%;
  border-radius: 6px;
  background-image: url(${({ bg }) => bg});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transform-origin: center ${({ idx, offset }) => (idx === 0 ? 'left' : idx === offset - 1 ? 'right' : 'center')};
`;

const CardInfo = styled(motion.div)`
  display: none;
  width: 100%;
  padding: 5%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${({ theme }) => theme.colors.darkgary};
  color: ${({ theme }) => theme.colors.white};
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;

  @media (max-width: 1023px) {
    font-size: 16px;
  }
`;

const CardDateAndRating = styled.div`
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  @media (max-width: 1080px) {
    font-size: 12px;
  }
`;

const CardDate = styled.p`
  margin-right: 8px;
  span {
    color: ${({ theme }) => theme.colors.greey};
    font-weight: 700;
  }
`;

const CardRating = styled.p`
  span {
    color: ${({ theme }) => theme.colors.yellow};
    font-weight: 700;
  }
`;
