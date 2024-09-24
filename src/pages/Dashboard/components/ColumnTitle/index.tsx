import * as S from "./styles";

type ColumnTitleProps = {
  /**
   * The status associated with the column. This could be used to style or filter the column.
   *
   */
  status: string;

  /**
   * The title of the column, which will be displayed as a header or label.
   *
   */
  title: string;
};

const ColumnTitle = ({ status, title }: ColumnTitleProps) => (
  <S.TitleColumn status={status}>{title}</S.TitleColumn>
);

export default ColumnTitle;
