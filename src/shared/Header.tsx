import { useState, useEffect } from 'react';
import styled from 'styled-components';

import HeaderLogo from 'assets/svg/netflix.svg?react';
import { motion, useScroll, useAnimation } from 'framer-motion';

import { FiSearch } from 'react-icons/fi';
// import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isInput, setIsInput] = useState(false);

  const onClickSearcIcon = () => {
    setIsInput(!isInput);
  };

  // Nav scroll animation
  const { scrollY } = useScroll();
  const headerAnimation = useAnimation();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        headerAnimation.start('scroll');
      } else {
        headerAnimation.start('top');
      }
    });
  }, [headerAnimation, scrollY]);

  return (
    <Container variants={headerVariants} initial="top" animate={headerAnimation}>
      <Col>
        <MainLogo>
          <motion.path
            variants={logoVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </MainLogo>

        <Nav>
          <li>영화</li>
          <li>TV</li>
          <li>보관함</li>
          <li>한국어</li>
        </Nav>
      </Col>
      <SearchArea>
        <SearchInput isinput={isInput.toString()} value="text" placeholder="검색어를 입력해주세요" />
        <SearcIcon isinput={isInput.toString()} onClick={onClickSearcIcon} />
      </SearchArea>
    </Container>
  );
};

const Container = styled(motion.header)`
  width: 100vw;
  position: fixed;
  top: 0;
  ${({ theme }) => theme.FlexRow};
  justify-content: space-between;
  padding: 20px 60px;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 1024px) {
    padding: 15px 40px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
  }
`;

const Col = styled.div`
  ${({ theme }) => theme.FlexRow};
  align-items: center;
`;

const MainLogo = styled(HeaderLogo)`
  position: relative;
  bottom: -10px;
  width: 100px;
  height: 100%;
  margin-right: 30px;
  path {
    stroke: red;
    stroke-width: 5px;
  }
`;

const logoVariants = {
  start: {
    pathLength: 0,
    fill: 'rgba(229, 16, 19, 0)',
  },
  end: {
    pathLength: 1,
    fill: 'rgba(229, 16, 19, 1)',
    transition: {
      default: { duration: 5, ease: 'easeInOut' },
      fill: { duration: 3, ease: [1, 0, 0.8, 1] },
    },
  },
  hover: {
    scale: 0.9,
    transition: {
      yoyo: Infinity,
    },
  },
};

const headerVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
};

const Nav = styled.ul`
  width: 400px;
  height: 100%;
  ${({ theme }) => theme.FlexRow};
  gap: 0 20px;
  align-items: center;
  list-style: none;
`;

// const L= styled.``

const SearchArea = styled.form`
  position: relative;
  width: 200px;
  ${({ theme }) => theme.BoxCenter};
  z-index: 10000;
`;

const SearchInput = styled.input<{ isinput: string }>`
  width: 180px;
  height: 100%;
  background-color: gray;
  padding-left: 30px;
  transition: 0.3s;
  opacity: ${(props) => (props.isinput === 'true' ? '1' : '0')};
`;

const SearcIcon = styled(FiSearch)<{ isinput: string }>`
  position: absolute;
  left: ${(props) => (props.isinput === 'true' ? '15px' : '175px')};
  cursor: pointer;
  font-size: 20px;
  color: white;
  /* border: 1px solid red; */
  z-index: 100;
  transition: 0.3s;
`;
