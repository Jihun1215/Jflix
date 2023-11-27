import styled from 'styled-components';

export const MyList = () => {
  return (
    <Container>
      <Title>
        <h1>내가 찜한 리스트</h1>
      </Title>
      <MyListCard>21312</MyListCard>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 12.5rem;
  width: 100%;
  border: 0.0625rem solid red;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
`;

const Title = styled.div`
  width: 90%;
  height: 100px;
  border: 1px solid red;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  h1 {
    font-size: 40px;
    font-weight: 600;
  }
`;

const MyListCard = styled.div`
  width: 90%;
  height: 700px;
  border: 1px solid red;
`;
