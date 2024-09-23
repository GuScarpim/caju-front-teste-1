import * as S from "./styles";
import ColumnTitle from "../ColumnTitle";
import ColumnContent from "../ColumnContent";
import { Registration } from '../../../../types/registration';

type SingleColumnProps = {
  /**
   * The current status of the column, used for styling or filtering.
   *
   */
  status: string;

  /**
   * The title of the column, which will be displayed in the ColumnTitle component.
   *
   */
  title: string;

  /**
   * List of registrations to be displayed in the column.
   *
   */
  registrations: Registration[];
};

export interface Registration {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  cpf: string;
  status: 'APPROVED';
}

const SingleColumn = ({ status, title, registrations }: SingleColumnProps) => (
  <S.Column status={status}>
    <ColumnTitle status={status} title={title} />
    <ColumnContent registrations={registrations} />
  </S.Column>
);

export default SingleColumn;
