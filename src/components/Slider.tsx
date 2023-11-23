import { useState } from 'react';
import styled, { css } from 'styled-components';
// import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { modalIsOpenState, ModalContentData } from 'state/atoms';

import { AnimatePresence, motion } from 'framer-motion';

import { useDebouncedResize } from 'hooks/useDebouncedResize';

import { GrPrevious, GrNext } from 'react-icons/gr';
import { getImgPath } from 'utils/api';

import { IContent } from 'type/type';

interface ISliderVariantsProps {
  movingBack: boolean;
  windowWidth: number;
}

interface SliderProps {
  contents: IContent[];
  title: string;
}
//  Card 컴포넌트 애니메이션
const cardVariants = {
  hover: {
    scale: 1.2,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: 'tween',
    },
  },
};

// 슬라이더 영화 이미지 Hover시 보여지는 함수 코드
const infoVariants = {
  hover: {
    display: 'block',
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: 'tween',
    },
  },
};

const sliderVariants = {
  enter: ({ movingBack, windowWidth }: ISliderVariantsProps) => ({
    x: movingBack ? -windowWidth + 10 : windowWidth - 10,
  }),
  show: {
    x: 0,
  },
  exit: ({ movingBack, windowWidth }: ISliderVariantsProps) => ({
    x: movingBack ? windowWidth - 10 : -windowWidth + 10,
  }),
};

export const Slider = ({  contents, title }: SliderProps) => {
  const [, setIsModalOpen] = useRecoilState(modalIsOpenState);
  const [, setModalInData] = useRecoilState(ModalContentData);


  // Slider layout
  const windowWidth = useDebouncedResize();

  const getSliderOffSet = (windowWidth: number) => {
    if (windowWidth <= 430) return 2;
    else if (windowWidth <= 768) return 3;
    else if (windowWidth <= 992) return 4;
    else if (windowWidth <= 1600) return 6;
    else return 6;
  };

  // Slider List
  // view에 보이는 슬라이더 영화이미지 갯수
  const offset = getSliderOffSet(windowWidth);

  // 슬라이더 버튼을 누룬 숫자
  const [index, setIndex] = useState(0);

  // props 받은 배열의 길이
  const listLength = contents?.length;

  // 최대 Slider 할 수있는 Index
  const maxIndex = Math.floor(listLength / offset) - 1;

  // console.log('offset', offset, type);
  // console.log('index', index);
  // console.log('MaxIndex', maxIndex);

  // Slider Moving
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
  const [moving, setMoving] = useState(false);
  const [movingBack, setMovingBack] = useState(false);

  const onClickPrenBtn = () => {
    if (contents) {
      if (moving) return;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setMoving(true);
      setMovingBack(true);
    }
  };

  const onClickNextBtn = () => {
    if (contents) {
      // console.log('increase 문 진입');
      if (moving) return;
      // console.log('increase 누름');
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      setMoving(true);
      setIsPrevBtnDisabled(false);
    }
  };

  const toggleMoving = () => {
    setMoving(false);
    setMovingBack(false);
  };



  const onClickModalOpen = (data: IContent) => {
    setIsModalOpen(true);
    setModalInData(data);
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
          >
            {contents?.slice(offset * index, offset * index + offset).map((data, idx) => (
              <Card key={data.id}>
                <CardPoster
                  bg={getImgPath(data.backdrop_path)}
                  idx={idx}
                  offset={offset}
                  onClick={() => onClickModalOpen(data)}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {/* 여기가 Hover시 보이는 영역  */}
                  <CardInfo variants={infoVariants}>
                    <CardTitle>{data.title || data.name}</CardTitle>
                    <CardDateAndRating>
                      <CardDate>
                        개봉일: <span>{data.release_date}</span>
                      </CardDate>
                      <CardRating>
                        평점: <span> {data.vote_average}</span>
                      </CardRating>
                    </CardDateAndRating>
                  </CardInfo>
                </CardPoster>
              </Card>
            ))}
          </SliderWrapper>
          <NextBtn onClick={onClickNextBtn}>
            <GrNext />
          </NextBtn>
        </AnimatePresence>
      </SliderContainer>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 200px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 20px 0;
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
  height: 120px;
  margin: 0 auto;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
`;

const Button = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  padding: 0;
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: 20px;
  z-index: 5;
  color: ${({ theme }) => theme.colors.white};

  ${(props) =>
    !props.disabled &&
    css`
      opacity: 0.5;
      &:hover {
        cursor: pointer;
        opacity: 1;
        transform: scale(1.1);
        transition: 0.3s;
      }
    `}
`;

const PrevBtn = styled(Button)`
  left: -10px;
`;
const NextBtn = styled(Button)`
  right: -10px;
`;

const SliderWrapper = styled(motion.div)<{ offset: number }>`
  position: absolute;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.offset}, 1fr)`};
  gap: 10px;
  width: 100%;
  padding: 0 60px;
  @media (max-width: 1023px) {
    padding: 0 40px;
  }

  @media (max-width: 479px) {
    padding: 0 20px;
  }
`;

const Card = styled.div``;

const CardInfo = styled(motion.div)`
  display: none;
  width: 100%;
  padding: 5%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
`;

const CardPoster = styled(motion.div)<{
  bg?: string;
  idx: number;
  offset: number;
}>`
  width: 100%;
  padding-top: 56%;
  /* border: 1px solid red; */
  border-radius: 6px;
  background-image: url(${({ bg }) => bg});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transform-origin: center ${({ idx, offset }) => (idx === 0 ? 'left' : idx === offset - 1 ? 'right' : 'center')};
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
