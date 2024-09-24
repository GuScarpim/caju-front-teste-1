import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.regular};

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.regular};

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

export const IconButton = styled.button`
  border-radius: ${({ theme }) => theme.border.radius.circle};
  cursor: pointer;
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xsmall};
  border-radius: ${({ theme }) => theme.border.radius.large};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;