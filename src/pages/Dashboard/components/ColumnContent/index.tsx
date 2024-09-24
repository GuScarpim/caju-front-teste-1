import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Registration } from '~/types/registration';

type ColumnContentProps = {
  /**
   * An array of `Registration` objects to be displayed in the column.
   *
   */
  registrations: Registration[];
};

const ColumnContent = ({ registrations }: ColumnContentProps) => (
  <S.CollumContent>
    {registrations.map((registration) => (
      <RegistrationCard key={registration.id} {...registration} />
    ))}
  </S.CollumContent>
);

export default ColumnContent;
