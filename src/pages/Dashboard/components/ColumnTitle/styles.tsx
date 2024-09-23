import styled from "styled-components";
import { registrationStatusStyles } from '~/utils/enums/registrationStatusStyle';

export const TitleColumn = styled.h3<{ status: string }>`
  margin: ${({ theme }) => theme.spacing.none};
  color: ${({ status }) => registrationStatusStyles[status]?.title};
  margin: ${({ theme }) => theme.spacing.xlarge};
`;
