import * as S from './styles';

interface ModalProps {
  /**
   * Determines if the modal is currently open.
   *
   * @default false
   */
  isOpen: boolean;

  /**
   * Function to be called when the modal is closed.
   *
   */
  onClose: () => void;

  /**
   * Function to be called when the confirm action is triggered.
   *
   */
  onConfirm: () => void;

  /**
   * The title to be displayed at the top of the modal.
   *
   */
  title: string;

  /**
   * The message or content to be displayed inside the modal.
   *
   */
  message: string;
}

const ModalDialog = ({ isOpen, onClose, onConfirm, title, message }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalHeader>{title}</S.ModalHeader>
        <S.ModalBody>{message}</S.ModalBody>
        <S.ModalFooter>
          <S.Button onClick={onClose} aria-label="Cancelar">Cancelar</S.Button>
          <S.Button primary onClick={onConfirm} aria-label="Confirmar" data-testId='confirm-button'>Confirmar</S.Button>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default ModalDialog;
