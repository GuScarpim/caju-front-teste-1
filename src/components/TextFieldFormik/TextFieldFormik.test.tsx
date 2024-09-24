import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import TextFieldFormik, { PropsTextFieldFormik } from './index';
import Container from '~/__mocks__/container';

describe('TextFieldFormik', () => {
  const setup = (props: Partial<PropsTextFieldFormik> = {}) => {
    const initialValues = { [props.name || '']: '' };
    return render(
      <Container>
        <Formik initialValues={initialValues} onSubmit={() => { }}>
          <Form>
            <TextFieldFormik name="test" {...props} />
          </Form>
        </Formik>
      </Container>
    );
  };

  it('renders a label if provided', () => {
    setup({ name: 'test', label: 'Test Label' });
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('does not render a label if not provided', () => {
    setup({ name: 'test' });
    expect(screen.queryByLabelText('Test Label')).toBeNull();
  });

  it('renders a select element with options when options are provided', () => {
    setup({ name: 'test', options: [{ value: '1', label: 'Option 1' }] });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders an input element when no options are provided', () => {
    setup({ name: 'test' });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    setup({ name: 'test', placeholder: 'Enter text' });
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    setup({ name: 'test', onChange: handleChange });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('does not render error message if not provided', () => {
    setup({ name: 'test' });
    const errorMessage = screen.queryByText('Error message');
    expect(errorMessage).toBeNull();
  });
});
