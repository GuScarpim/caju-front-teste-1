import * as Yup from "yup";
import { Status } from '../enums/status';

const { APPROVED, REPROVED, REVIEW } = Status;

const validateCPF = (cpf: string) => {
  const cleanedCPF = cpf.replace(/\D/g, '');

  if (cleanedCPF.length !== 11) {
    return false;
  }

  const digits = cleanedCPF.split('').map(Number);
  let sum = 0;
  let remainder;

  if (digits.every(digit => digit === digits[0])) return false;

  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== digits[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== digits[10]) return false;

  return true;
};

export const validateNewUsers = Yup.object({
  employeeName: Yup.string()
    .required("Nome é obrigatório")
    .matches(/^(?!\d)(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z\s]+$/, "Nome deve conter pelo menos uma letra e um espaço, e não deve começar com um número"),

  email: Yup.string()
    .email("Email inválido")
    .required("Email é obrigatório"),

  cpf: Yup.string()
    .required("CPF é obrigatório")
    .test('valid-cpf', 'CPF inválido', (value) => validateCPF(value || '')),

  admissionDate: Yup.date()
    .required("Data de admissão é obrigatória"),

  status: Yup.string()
    .oneOf([APPROVED, REVIEW, REPROVED], "Status inválido")
    .required("Status é obrigatório")
});
