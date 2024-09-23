import styled from "styled-components";
import { registrationStatusStyles } from '~/utils/enums/registrationStatusStyle';

export const Column = styled.div<{ status: string }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status]?.background};
  border-radius: ${({ theme }) => theme.border.radius.extraLarge};
  min-height: 80vh;
  max-height: 80vh;
  min-width: 340px;
`;

