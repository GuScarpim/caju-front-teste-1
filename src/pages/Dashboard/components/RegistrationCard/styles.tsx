import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xsmall};
  border: ${({ theme }) => `4px solid ${theme.colors.white}`};
  margin: ${({ theme }) => theme.spacing.regular};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: ${({ theme }) => theme.spacing.regular};
  background-color: ${({ theme }) => theme.colors.white};
  h3,
  p {
    margin: ${({ theme }) => theme.spacing.none};
  }
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const Actions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.small};
  display: flex;
  justify-content: space-between;
  align-items: center;


  svg {
    cursor: pointer;
  }
`;

export const GapActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xsmall};
`;

export const TrashButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
`;