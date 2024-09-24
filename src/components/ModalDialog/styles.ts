import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  width: 400px;
  max-width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const ModalBody = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const Button = styled.button<{ primary?: boolean; }>`
  padding: ${({ theme }) => `${theme.spacing.medium} ${theme.spacing.large}`};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.small};
  cursor: pointer;
  background: ${({ theme, primary }) => (primary ? theme.colors.primary : theme.colors.grayLight)};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.size.medium};
  &:hover {
    opacity: 0.9;
  }
`;
