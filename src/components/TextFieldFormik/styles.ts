import styled from 'styled-components';

export const Content = styled.div`
  @media (max-width: 600px) {
    padding: ${({ theme }) => theme.spacing.medium};
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
`;

export const Select = styled.select`
  padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.small}`};
  vertical-align: middle;
  border-radius: ${({ theme }) => theme.border.radius.medium};
  width: 100%;
  min-height: 36px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: ${({ theme }) => theme.font.size.medium};
  line-height: 18px;
  font-weight: normal;
  min-width: 100%;
  :focus {
    outline: none;
    border:  ${({ theme }) => `1px solid ${theme.colors.primary}`};
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.primary}`};
  }

  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;