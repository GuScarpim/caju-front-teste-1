import { useRef, useState } from 'react';
import { Registration } from '~/types/registration';
import { ButtonSmall } from "../../../../components/Button/styles";
import * as S from "./styles";
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
          <h3>{registration.employeeName}</h3>
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
                <ButtonSmall
                  aria-label="Reprovar"
                  bgcolor={themeMain.colors.errorAlternative}
                  onClick={() => {
                    handleOpenModal(() => onRegistration(registration, REPROVED));
                    messageModal.current = 'Você gostaria de mover o usuário para a coluna REPROVADO?';
                  }}
                >
                  Reprovar
                </ButtonSmall>

                <ButtonSmall
                  aria-label="Aprovar"
                  bgcolor={themeMain.colors.primaryAlternative}
                  onClick={() => {
                    handleOpenModal(() => onRegistration(registration, APPROVED));
                    messageModal.current = 'Você gostaria de mover o usuário para a coluna APROVADO?';
                  }}
                >
                  Aprovar
                </ButtonSmall>
              </>
            )}

            {(registration.status === APPROVED || registration.status === REPROVED) && (
              <ButtonSmall
                aria-label="Revisar novamente"
                bgcolor={themeMain.colors.alertAlternative}
                onClick={() => {
                  handleOpenModal(() => onRegistration(registration, REVIEW));
                  messageModal.current = 'Você gostaria de mover o usuário para a coluna PRONTO PARA REVISÃO?';
                }}
              >
                Revisar novamente
              </ButtonSmall>
            )}
          </S.GapActions >
          <S.TrashButton
            onClick={() => {
              handleOpenModal(() => onDelete(registration.id));
              messageModal.current = `Você gostaria de remover o usuário ${registration.employeeName}?`;
            }}
            data-testId="trash-id"
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
