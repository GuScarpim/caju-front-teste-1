import * as S from "./styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNewUser } from '~/hooks/Dashboard/useNewUser';
import FormUser from './components/FormUser';

const NewUserPage = () => {
  const { handleCreateUser, goToHome, isLoading } = useNewUser();

  return (
    <S.Container>
      <S.Card>
        <S.IconButtonLarge onClick={() => goToHome()} aria-label="voltar para o inicio">
          <HiOutlineArrowLeft size={24} />
        </S.IconButtonLarge>
        <FormUser isLoading={isLoading} onSubmit={handleCreateUser} />
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
