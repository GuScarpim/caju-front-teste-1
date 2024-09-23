export type Status = 'APPROVED' | 'REVIEW' | 'REPROVED';

export interface Registration {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  cpf: string;
  status: Status;
}

export type ColumnsProps = {
  registrations: RegistrationsByStatus;
};

export type RegistrationsByStatus = {
  APPROVED: Registration[];
  REVIEW: Registration[];
  REPROVED: Registration[];
};