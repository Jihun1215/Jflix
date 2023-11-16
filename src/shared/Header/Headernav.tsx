// import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useMatch, PathMatch } from 'react-router-dom';
import {
  motion,
  // useScroll,
  // useAnimation,
  AnimatePresence,
} from 'framer-motion';

export const Headernav = () => {
  const navigate = useNavigate();
  // Menu indicator animation
  const homeMatch: PathMatch<string> | null = useMatch('/');
  const movieMatch: PathMatch<string> | null = useMatch('/movie');
  const tvMatch: PathMatch<string> | null = useMatch('/tv');
  const mylistMatch: PathMatch<string> | null = useMatch('/mylist');

  console.log(homeMatch);
  console.log(movieMatch);
  console.log(tvMatch);
  console.log(mylistMatch);

  return (
    <Nav>
      <Li
        onClick={() => {
          navigate('/');
        }}
      >
        홈<AnimatePresence>{homeMatch && <Circle />}</AnimatePresence>
      </Li>
      <Li
        onClick={() => {
          navigate('/movie');
        }}
      >
        영화
        <AnimatePresence>{movieMatch && <Circle className="movie" />}</AnimatePresence>
      </Li>
      <Li
        onClick={() => {
          navigate('/tv');
        }}
      >
        TV
        <AnimatePresence>{tvMatch && <Circle className="tv" />}</AnimatePresence>
      </Li>
      <Li
        onClick={() => {
          navigate('/mylist');
        }}
      >
        보관함
        <AnimatePresence>{mylistMatch && <Circle className="mylist" />}</AnimatePresence>
      </Li>
    </Nav>
  );
};

const Nav = styled.ul`
  width: 400px;
  height: 100%;
  ${({ theme }) => theme.FlexRow};
  gap: 0 20px;
  align-items: center;
  list-style: none;
`;

const Li = styled.li`
  position: relative;
  cursor: pointer;
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -10px;
  right: 5px;
  margin: 0px auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgb(229, 16, 19);
  transition: all 0.3s;
  &.movie {
    right: 12px;
  }
  &.tv {
    right: 7px;
  }
  &.mylist {
    right: 20px;
  }
`;
