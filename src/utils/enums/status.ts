import { Status as TypeStatus } from '~/types/registration';

interface IStatus {
  APPROVED: TypeStatus;
  REVIEW: TypeStatus;
  REPROVED: TypeStatus;
}

export const Status: IStatus = {
  APPROVED: 'APPROVED',
  REVIEW: 'REVIEW',
  REPROVED: 'REPROVED'
}