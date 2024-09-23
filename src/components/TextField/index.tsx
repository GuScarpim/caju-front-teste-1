import { forwardRef } from 'react';
import * as S from './styles';

type PropsTextField = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Defines the label for the text field.
   *
   * @optional
   */
  label?: string;

  /**
   * Provides an error message to display when the text field has an error.
   *
   * @optional
   */
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, PropsTextField>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <S.Content>
        {label && <S.Label htmlFor={id}>{label}</S.Label>}
        <S.Input id={id} ref={ref} {...rest} />
        {error && <S.ErrorText>{error}</S.ErrorText>}
      </S.Content>
    );
  }
);

export default TextField;
