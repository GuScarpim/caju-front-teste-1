import { Field, ErrorMessage, useField } from "formik";
import { Select, Content } from './styles';
import * as S from '../TextField/styles';
import { forwardRef } from 'react';

type Option = {
  /**
   * The value of the option.
   */
  value: string;

  /**
   * The label of the option.
   */
  label: string;
};

export type PropsTextFieldFormik = {
  /**
   * The name attribute for the input field.
   */
  name: string;

  /**
   * The label for the input field.
   *
   * @optional
   */
  label?: string;

  /**
   * The type of the input field.
   *
   * @default "text"
   * @optional
   */
  type?: string;

  /**
   * The options for a select input.
   *
   * @optional
   */
  options?: Option[];

  /**
   * The value of the input field.
   *
   * @optional
   */
  value?: string;

  /**
   * Function called when the value of the input field changes.
   *
   * @optional
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Placeholder text for the input field.
   *
   * @optional
   */
  placeholder?: string;
};


const TextFieldFormik = forwardRef<HTMLInputElement | HTMLSelectElement, PropsTextFieldFormik>(
  ({ name, label, type = 'text', options, value, placeholder, onChange }, ref) => {
    const [field, meta] = useField(name);
    const hasError = !!meta.error && meta.touched;
    return (
      <Content>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}
        {options ? (
          <Field
            as={Select}
            {...field}
            id={name}
            ref={ref as React.Ref<HTMLSelectElement>}
            aria-invalid={hasError ? 'true' : 'false'}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
        ) : (
          <S.Input
            {...field}
            ref={ref as React.Ref<HTMLInputElement>}
            placeholder={placeholder}
            id={name}
            type={type}
            value={value || field.value}
            onChange={onChange || field.onChange}
            aria-invalid={hasError ? 'true' : 'false'}
          />
        )}
        <ErrorMessage name={name} component={S.ErrorText} />
      </Content>
    );
  }
);

export default TextFieldFormik;
