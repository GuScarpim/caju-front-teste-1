import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${({ theme }) => theme.spacing.xlarge};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xlarge};
  min-width: fit-content;

  @media (max-width: 500px) {
    display: flex;
    min-width: auto;
    justify-content: flex-start;
    overflow: auto;
  }
`;
