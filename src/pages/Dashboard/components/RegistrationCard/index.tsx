import { useRef, useState } from 'react';
import { Registration } from '~/types/registration';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRegistration } from '~/hooks/Dashboard/useRegistration';
import { Status } from '~/utils/enums/status';
import ModalDialog from '~/components/ModalDialog';
import { themeMain } from '~/styles/themes';
import * as S from "./styles";

const RegistrationCard = ({ ...registration }: Registration) => {
  const { onRegistration, onDelete } = useRegistration();
  const { APPROVED, REPROVED, REVIEW } = Status;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const messageModal = useRef('');
  const [modalAction, setModalAction] = useState<() => void>(() => () => { });

  const handleOpenModal = (action: () => void) => {
    setModalAction(() => action);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    modalAction();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h1>{registration.employeeName}</h1>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{registration.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{registration.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          <S.GapActions>
            {registration.status === 'REVIEW' && (
              <>
                <S.ButtonSmall
                  aria-label="Reprovar"
                  bgcolor={themeMain.colors.errorAlternative}
                  onClick={() => {
                    handleOpenModal(() => onRegistration(registration, REPROVED));
                    messageModal.current = 'Você gostaria de mover o usuário para a coluna REPROVADO?';
                  }}
                >
                  Reprovar
                </S.ButtonSmall>

                <S.ButtonSmall
                  aria-label="Aprovar"
                  bgcolor={themeMain.colors.primaryAlternative}
                  onClick={() => {
                    handleOpenModal(() => onRegistration(registration, APPROVED));
                    messageModal.current = 'Você gostaria de mover o usuário para a coluna APROVADO?';
                  }}
                >
                  Aprovar
                </S.ButtonSmall>
              </>
            )}

            {(registration.status === APPROVED || registration.status === REPROVED) && (
              <S.ButtonSmall
                aria-label="Revisar novamente"
                bgcolor={themeMain.colors.alertAlternative}
                onClick={() => {
                  handleOpenModal(() => onRegistration(registration, REVIEW));
                  messageModal.current = 'Você gostaria de mover o usuário para a coluna PRONTO PARA REVISÃO?';
                }}
              >
                Revisar novamente
              </S.ButtonSmall>
            )}
          </S.GapActions >
          <S.TrashButton
            onClick={() => {
              handleOpenModal(() => onDelete(registration.id));
              messageModal.current = `Você gostaria de remover o usuário ${registration.employeeName}?`;
            }}
            aria-label="excluir"
            data-testid="trash-id"
          >
            <HiOutlineTrash
              aria-hidden="false"
              style={{ cursor: 'pointer', color: 'red' }}
            />
          </S.TrashButton>
        </S.Actions >
      </S.Card >

      <ModalDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Confirmar ação"
        message={messageModal.current}
      />
    </>
  );
};

export default RegistrationCard;
