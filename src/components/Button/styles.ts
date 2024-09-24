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
  color: ${({ theme }) => theme.colors.black};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: ${({ theme }) => theme.font.weight.semiBold};
  font-weight: ${({ theme }) => theme.font.size.regular};
  padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.xxlarge}`};
`;

