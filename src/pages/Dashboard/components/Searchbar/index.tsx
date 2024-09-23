import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Button";
import routes from "~/router/routes";
import TextField from '~/components/TextField';
import { useSearch } from '~/hooks/Dashboard/useSearch';
import IconButton from '~/components/IconButton';
import * as S from "./styles";

export const SearchBar = () => {
  const { handleInputChange, searchResults, refreshRegistrations } = useSearch();
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container data-testid="search-bar">
      <TextField
        name="search"
        label="CPF"
        placeholder='Digite um CPF válido'
        value={searchResults}
        onChange={(e: { target: { value: string; }; }) => handleInputChange(e.target.value)}
      />
      <S.Actions>
        <IconButton aria-label="refetch" data-testId="refetch" onClick={() => refreshRegistrations()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
