// import { useState } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// import { AnimatePresence, motion } from 'framer-motion';

import { GrPrevious, GrNext } from 'react-icons/gr';

// import { getImgSetting } from 'utils/api';

import {
  IContent,
  //   ITodayBestMovie,
  //   ITodayMoive,
} from 'type/type';

interface SliderProps {
  type: string;
  video?: IContent;
  title: string;
}

export const Slider = ({ type, video, title }: SliderProps) => {

  return (
    <Container>
      <TitleAndPoint>
        <Title>{title}</Title>
        <div>1</div>
      </TitleAndPoint>
      <SliderContainer>
        {video?.map((v) => {
          return (
            <Card
              key={v.id}
            
            >
              <ListImg src={`https://image.tmdb.org/t/p/original/${v?.poster_path}`} />
            </Card>
          );
        })}
        <PrevBtn />
        <NextBtn />
      </SliderContainer>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 150px;
  border: 1px solid red;
  ${({ theme }) => theme.FlexCol};
`;

const TitleAndPoint = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 20px;
  ${({ theme }) => theme.FlexRow};
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  ${({ theme }) => theme.BoxCenter};
`;

const SliderContainer = styled.div`
  width: 95%;
  height: 120px;
  margin: 0 auto;
  ${({ theme }) => theme.FlexRow};
  /* display: grid; */
  /* grid-template-columns: repeat(6, 1fr); */
  align-items: center;
  gap: 0 15px;
  /* overflow-x: scroll; */
`;

const Card = styled.div`
  min-width: 200px;
  height: 100px;
  border: 1px solid red;
  border-radius: 4px;
`;

const ListImg = styled.img`
  ${({ theme }) => theme.WH100};
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;
// position: absolute;
//     z-index: 3;
//     display: grid;
//     grid-template-columns: repeat(6, 1fr);
//     gap: 10px;
//     width: 100%;
//     padding: 0px 60px;

const PrevBtn = styled(GrPrevious)`
  position: absolute;
  font-size: 30px;
  left: 0;
`;
const NextBtn = styled(GrNext)`
  position: absolute;
  border: 1px solid red;
  font-size: 30px;
  right: 0;
`;
