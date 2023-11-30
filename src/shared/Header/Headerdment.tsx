import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate, useMatch, PathMatch } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';

export const Headerdment = () => {
  const navigate = useNavigate();

  const movieMatch: PathMatch<string> | null = useMatch('/');
  const tvMatch: PathMatch<string> | null = useMatch('/tv');
  const mylistMatch: PathMatch<string> | null = useMatch('/mylist');

  const [isMenuOpne, setIsMenuOpen] = useState<boolean>(false);

  const onClickMenu = () => {
    setIsMenuOpen(true);
  };

  const onClickCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    const TagName = element.tagName;
    e.stopPropagation();
    console.log(TagName);
    if (TagName === 'DIV') {
      setIsMenuOpen(false);
    }
  };

  const onClickMoveToPage = (url: string) => {
    setIsMenuOpen(false);
    navigate(`${url}`);
  };

  return (
    <>
      {isMenuOpne && (
        <Container onClick={onClickCloseModal}>
          <SideMenuArea>
            <MenuLists>
              <MenuList
                onClick={() => {
                  onClickMoveToPage('/');
                }}
              >
                영화<AnimatePresence>{movieMatch && <Circle />}</AnimatePresence>
              </MenuList>
              <MenuList
                onClick={() => {
                  onClickMoveToPage('tv');
                }}
              >
                TV
                <AnimatePresence>{tvMatch && <Circle />}</AnimatePresence>
              </MenuList>
              <MenuList
                onClick={() => {
                  onClickMoveToPage('mylist');
                }}
              >
                보관함
                <AnimatePresence>{mylistMatch && <Circle />}</AnimatePresence>
              </MenuList>
            </MenuLists>
          </SideMenuArea>
        </Container>
      )}
      <Card>
        <GiHamburgerMenu onClick={onClickMenu} />
      </Card>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
  ${({ theme }) => theme.BoxCenter};
`;

const SideMenuArea = styled.section`
  position: absolute;
  right: 0;
  width: 40vw;
  height: 100vh;
  background-color: #212529;
  opacity: 0.9;
`;

const MenuLists = styled.ul`
  padding: 20px 0 0 20px;
  height: 400px;
  ${({ theme }) => theme.FlexCol};
  gap: 10px;
  list-style: none;
`;

const MenuList = styled.li`
  position: relative;
  width: 90%;
  height: 35px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 600;
  padding-left: 15px;
`;

const Circle = styled(motion.span)`
  position: absolute;
  right: 5px;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgb(229, 16, 19);
  transition: all 0.3s;
`;

const Card = styled.div`
  width: 50px;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  cursor: pointer;
  svg {
    font-size: 24px;
  }
`;
