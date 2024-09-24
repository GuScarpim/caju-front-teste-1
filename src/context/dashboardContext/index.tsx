import { useState, createContext, ReactNode } from 'react';
import { RegistrationsByStatus } from '~/types/registration';

export interface IValuesDashboard {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  registrations: RegistrationsByStatus;
  setRegistrations: (registrations: RegistrationsByStatus) => void;
  query: string;
  setQuery: (query: string) => void;
}

export interface ICombineContexts {
  children: ReactNode;
}

export const DashboardContext = createContext<IValuesDashboard>({
  isLoading: false,
  setIsLoading: () => { },
  registrations: {
    APPROVED: [],
    REVIEW: [],
    REPROVED: [],
  },
  setRegistrations: () => { },
  query: '',
  setQuery: () => { },
});

export const DashboardProvider = ({ children }: ICombineContexts) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [registrations, setRegistrations] = useState<RegistrationsByStatus>({
    APPROVED: [],
    REVIEW: [],
    REPROVED: [],
  });

  const values: IValuesDashboard = {
    isLoading,
    setIsLoading,
    registrations,
    setRegistrations,
    query,
    setQuery
  };

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};
