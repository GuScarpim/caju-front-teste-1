import styled from 'styled-components';

export const Button = styled.button`
  outline: none;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.ultraLarge};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  width: 100%;
  height: 56px;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: ${({ theme }) => theme.font.weight.semiBold};
  font-weight: ${({ theme }) => theme.font.size.regular};
  padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.xxlarge}`};
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
