import { Formik } from "formik";
import Button from "~/components/Button";
import TextFieldFormik from '~/components/TextFieldFormik';
import { Registration } from '~/types/registration';
import { maskCPF } from '~/utils/maskUtils';
import { validateNewUsers } from '~/utils/yup/validateNewUsers';
import { Status } from '~/utils/enums/status';
import * as S from './styles';

type FormUserProps = {
  onSubmit: (values: Registration) => void | Promise<void>;
  isLoading: boolean;
};

const FormUser = ({ onSubmit, isLoading }: FormUserProps) => {
  const { APPROVED, REPROVED, REVIEW } = Status;

  return (
    <Formik
      initialValues={{
        employeeName: '',
        email: '',
        cpf: '',
        admissionDate: '',
        status: ''
      }}
      validationSchema={validateNewUsers}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values as Registration);
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, values }) => (
        <S.ContentForm>
          <TextFieldFormik
            name="employeeName"
            aria-label="Nome"
            label="Nome"
            placeholder="Digite o nome completo"
          />
          <TextFieldFormik
            name="email"
            aria-label="Email"
            label="Email"
            type="email"
            placeholder="Digite o email"
          />

          <TextFieldFormik
            name="cpf"
            aria-label="CPF"
            label="CPF"
            value={values.cpf}
            placeholder="Digite o CPF"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const maskedCPF = maskCPF(e.target.value);
              setFieldValue('cpf', maskedCPF);
            }}
          />

          <TextFieldFormik
            name="admissionDate"
            aria-label="Data de admissão"
            label="Data de admissão"
            type="date"
          />

          <TextFieldFormik
            name="status"
            aria-label="Status"
            label="Status"
            options={[
              { value: '', label: 'Selecione um status' },
              { value: APPROVED, label: 'Aprovado' },
              { value: REVIEW, label: 'Revisar' },
              { value: REPROVED, label: 'Reprovado' }
            ]}
            placeholder="Selecione um status"
          />

          <Button type="submit" disabled={isLoading} isLoading={isLoading} data-testid="submit-button">Cadastrar</Button>
        </S.ContentForm>
      )}
    </Formik>
  );
};

export default FormUser;
