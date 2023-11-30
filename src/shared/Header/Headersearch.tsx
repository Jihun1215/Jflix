import { useState, useRef } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';

export const Headersearch = () => {
  const navigate = useNavigate();

  const [searchValue, setSearcvalue] = useState('');

  const valueRef = useRef<HTMLInputElement>(null);

  const [isInput, setIsInput] = useState<boolean>(false);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearcvalue(e.target.value);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue === '') {
      // valueRef.current.focus();
      return;
    }
    navigate(`/search/movie?q=${searchValue}`);
    setIsInput(false);
    setSearcvalue('');
  };

  const onClickCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    const TagName = element.tagName;
    e.stopPropagation();
    if (TagName === 'DIV') {
      setIsInput(false);
      setSearcvalue('');
    } else if (TagName === 'svg' || TagName === 'circle') {
      setIsInput(true);
      setSearcvalue('');
    }
  };

  return (
    <div onClick={onClickCloseModal}>
      {isInput && <Container />}
      <SearchArea onSubmit={onSubmit}>
        <SearchInput
          type="text"
          ref={valueRef}
          isinput={isInput.toString()}
          value={searchValue}
          onChange={onChangeValue}
          placeholder="검색어를 입력해주세요"
        />
        <SearcIcon isinput={isInput.toString()} />
      </SearchArea>
    </div>
  );
};

const Container = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  z-index: 9995;
  background-color: rgba(0, 0, 0, 0.6);
  ${({ theme }) => theme.BoxCenter};
`;

const SearchArea = styled.form`
  position: relative;
  width: 175px;
  height: 30px;
  ${({ theme }) => theme.BoxCenter};
  z-index: 9996;
  @media (max-width: 480px) {
    width: 175px;
  }
`;

const SearchInput = styled.input<{ isinput: string }>`
  width: 180px;
  height: 100%;
  background-color: gray;
  padding-left: 30px;
  transition: 0.3s;
  opacity: ${(props) => (props.isinput === 'true' ? '1' : '0')};
  border-radius: 4px;
  &::placeholder {
    color: ${({ theme }) => theme.color2};
  }
  &:focus {
    border: 2px solid #0288d1;
  }
`;

const SearcIcon = styled(FiSearch)<{ isinput: string }>`
  position: absolute;
  left: ${(props) => (props.isinput === 'true' ? '5px' : '160px')};
  cursor: pointer;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
  z-index: 1;
  transition: 0.3s;
`;
