import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

export const Spinner = () => {
  return (
    <Container>
      <CircularProgress color='error'/>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  ${({ theme }) => theme.BoxCenter};
  color: red;
`;

