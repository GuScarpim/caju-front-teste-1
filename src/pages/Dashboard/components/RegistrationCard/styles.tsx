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

  h1 {
    font-size: ${({ theme }) => theme.font.size.large};
    margin: ${({ theme }) => theme.spacing.none};
  }
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

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: ${({ theme }) => theme.font.size.small};
  outline: none;
  border-radius: ${({ theme }) => theme.border.radius.small};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.xsmall} ${theme.spacing.regular}`};
  background-color: ${(props) => props.bgcolor ?? 'none'};
  color: ${(props) => props.color ?? "#000"};
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;