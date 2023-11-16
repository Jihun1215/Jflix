import { useState, useRef, SetStateAction } from 'react';
import styled from 'styled-components';

import { FiSearch } from 'react-icons/fi';

export const Headersearch = () => {
  const [searchValue, setSearcvalue] = useState('');

  const valueRef = useRef<HTMLInputElement>(null);

  const [isInput, setIsInput] = useState<boolean>(false);

  const onClickSearcIcon = () => {
    setIsInput(!isInput);
  };

  const onChangeValue = (e: { target: { value: SetStateAction<string> } }) => {
    setSearcvalue(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (e: any | null) => {
    e.preventDefault();
    if (searchValue === '') {
      // valueRef.current.focus();
      return;
    }
    console.log(e);
  };

  return (
    <SearchArea onSubmit={onSubmit}>
      <SearchInput
        type="text"
        ref={valueRef}
        isinput={isInput.toString()}
        value={searchValue}
        onChange={onChangeValue}
        placeholder="검색어를 입력해주세요"
      />
      <SearcIcon isinput={isInput.toString()} onClick={onClickSearcIcon} />
    </SearchArea>
  );
};

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
  left: ${(props) => (props.isinput === 'true' ? '15px' : '175px')};
  cursor: pointer;
  font-size: 20px;
  color: white;
  /* border: 1px solid red; */
  z-index: 100;
  transition: 0.3s;
`;
