import styled from "styled-components";
import { Form } from 'formik';

export const ContentForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.regular};

  @media (max-width: 600px) {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.large};

    button {
      margin-left: ${({ theme }) => theme.spacing.medium};
    }
  }
`;
