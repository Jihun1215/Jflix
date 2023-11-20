import styled from 'styled-components';

export const Movie = () => {
  return <Container></Container>;
};

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  ${({ theme }) => theme.FlexCol};
  gap: 50px 0;
`;
