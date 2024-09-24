import styled, { keyframes } from 'styled-components';
import { LoadingScreenProps } from '.';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullScreen'].includes(prop),
}) <LoadingScreenProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ fullScreen }) => (fullScreen ? '100vh' : 'auto')};
  width: ${({ fullScreen }) => (fullScreen ? '100vw' : 'auto')};
  position: absolute;
  top: 65px;
  left: 0;
  background-color: ${({ theme, fullScreen }) => (fullScreen ? `${theme.colors.ice}` : 'transparent')};
`;

export const Spinner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isLoadingHeight', 'isLoadingWidth'].includes(prop),
}) <LoadingScreenProps>`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left: ${({ theme }) => `8px solid ${theme.colors.primary}`};
  border-radius: ${({ theme }) => theme.border.radius.circle};
  height: ${({ fullScreen, isLoadingHeight }) => (fullScreen ? '60px' : `${isLoadingHeight ?? '20px'}`)};
  width: ${({ fullScreen, isLoadingWidth }) => (fullScreen ? '60px' : `${isLoadingWidth ?? '20px'}`)};
  animation: ${spin} 1s linear infinite;
`;
