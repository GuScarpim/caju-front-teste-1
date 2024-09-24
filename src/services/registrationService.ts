import { AxiosResponse } from 'axios';
import api from './api';
import { Registration } from '../types/registration';

export const getRegistrations = async ({ query }: { query?: string }): Promise<AxiosResponse<Registration[]>> => {
  let queryString = '';

  if (query) {
    queryString = `?cpf=${query}`;
  }

  return api.get<Registration[]>(`/registrations${queryString}`);
};

export const createRegistration = async (data: Partial<Registration>): Promise<AxiosResponse<Registration>> => {
  return api.post<Registration>('/registrations', data);
};

export const updateRegistration = async (id: string, data: Partial<Registration>): Promise<AxiosResponse<Registration>> => {
  return api.put<Registration>(`/registrations/${id}`, data);
};

export const deleteRegistration = async (id: string): Promise<AxiosResponse<void>> => {
  return api.delete<void>(`/registrations/${id}`);
};
