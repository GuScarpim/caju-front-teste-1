import styled from "styled-components";

export const Header = styled.header`
  background: ${({ theme }) => theme.gradient.primary};
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.xlarge}`};

  h1 {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font.size.super_large};
  }
`;
