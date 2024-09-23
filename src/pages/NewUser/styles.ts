import styled from "styled-components";
import IconButton from '~/components/IconButton';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.regular};
`;

export const Card = styled.div`
  border: ${({ theme }) => `2px solid ${theme.colors.ice}`};
  width: 500px;
  padding: ${({ theme }) => theme.spacing.xxxlarge};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.regular};
  margin-top: ${({ theme }) => theme.spacing.xlarge};

  @media (max-width: 600px) {
    width: 100%;
    align-items: center;
    padding: ${({ theme }) => `${theme.spacing.xxxlarge} ${theme.spacing.medium}`};
    position: relative;
    border: none;
  }
`;

export const IconButtonLarge = styled(IconButton)`
  width: fit-content;
  height: fit-content;

  @media (max-width: 600px) {
    position: absolute;
    left: 20px;
    top: 10px;
  }
`;