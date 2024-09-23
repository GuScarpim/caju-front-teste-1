import styled from "styled-components";
import { registrationStatusStyles } from '~/utils/enums/registrationStatusStyle';

export const TitleColumn = styled.h1<{ status: string }>`
  color: ${({ status }) => registrationStatusStyles[status]?.title};
  margin: ${({ theme }) => theme.spacing.xlarge};
  font-size: ${({ theme }) => theme.font.size.super_large};
`;
