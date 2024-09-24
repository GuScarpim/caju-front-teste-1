import styled from 'styled-components';

export const Content = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
`

export const Input = styled.input`
  padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.small}`};
  vertical-align: middle;
  border-radius: ${({ theme }) => theme.border.radius.medium};
  width: 100%;
  max-width: 482px;
  min-height: 36px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: ${({ theme }) => theme.font.size.medium};
  line-height: 18px;
  font-weight: normal;
  :focus {
    outline: none;
    border:  ${({ theme }) => `1px solid ${theme.colors.primary}`};
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.primary}`};
  }

  @media (max-width: 500px) {
    max-width: 96%;
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.regular};
  margin-bottom: ${({ theme }) => theme.spacing.xsmall};
  display: block;
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.font.size.small};
  color: red;
  margin-top: ${({ theme }) => theme.spacing.xsmall};
  display: block;
`;
