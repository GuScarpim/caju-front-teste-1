import * as S from "./styles";
import SingleColumn from "../SingleColumn";
import { ColumnsProps, RegistrationsByStatus } from '../../../../types/registration';
import { Status } from '~/utils/enums/status';
import LoadingScreen from '~/components/Loading';

const columnsConfig = [
  { status: Status.REVIEW, title: "Pronto para revisar" },
  { status: Status.APPROVED, title: "Aprovado" },
  { status: Status.REPROVED, title: "Reprovado" },
];

const Collumns = ({ registrations, isLoading }: ColumnsProps & { isLoading: Boolean; }) => {

  if (isLoading) {
    return <LoadingScreen data-testid="loading" isLoadingHeight='40px' isLoadingWidth='40px' />;
  }

  return (
    <S.Container data-testid="columns">
      {columnsConfig.map(({ status, title }) => (
        <SingleColumn
          data-testid="registration-item"
          key={status}
          status={status}
          title={title}
          registrations={registrations[status as keyof RegistrationsByStatus] || []}
        />
      ))}
    </S.Container>
  );
};

export default Collumns;
