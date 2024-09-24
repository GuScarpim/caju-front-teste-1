import styled from 'styled-components';

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