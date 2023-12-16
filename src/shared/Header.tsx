import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import HeaderLogo from 'assets/svg/netflix.svg?react';
import { motion, useScroll, useAnimation } from 'framer-motion';

import { Headernav } from './Header/Headernav';
import { Headersearch } from './Header/Headersearch';
import { Headerdment } from './Header/Headerdment';

import { useDebouncedWidth } from 'hooks/useDebouncedWidth';

const headerVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
};

export const Header = () => {
  const navigate = useNavigate();
  const windowWidth = useDebouncedWidth();

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
        <MainLogo
          onClick={() => {
            navigate('/');
          }}
        />
        {windowWidth >= 795 ? <Headernav /> : null}
      </Col>
      <SearchAndMenu>
        <Headersearch />
        {windowWidth <= 795 ? <Headerdment /> : null}
      </SearchAndMenu>
    </Container>
  );
};

const Container = styled(motion.header)`
  width: 100vw;
  position: fixed;
  z-index: 9990;
  top: 0;
  ${({ theme }) => theme.FlexRow};
  justify-content: space-between;
  padding: 20px 60px;
  color: ${({ theme }) => theme.colors.white};
  background-image: linear-gradient(rgba(0, 0, 0, 0.6) 15%, transparent);

  @media (max-width: 1024px) {
    padding: 15px 40px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
  }
`;

const Col = styled.div`
  ${({ theme }) => theme.FlexRow};
  width: 60vw;
  align-items: center;
  transition: 0.3s;
  @media (max-width: 480px) {
    width: 150px;
  }
`;

const MainLogo = styled(HeaderLogo)`
  position: relative;
  bottom: -5px;
  width: 100px;
  height: 30px;
  margin-right: 30px;
  cursor: pointer;
`;

const SearchAndMenu = styled.div`
  width: 225px;
  height: 100%;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 15px;
  @media (max-width: 480px) {
    width: 210px;
  }
`;
