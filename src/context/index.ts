import { combineContexts } from './combineContexts';

import { DashboardProvider } from './dashboardContext';

const providers = [DashboardProvider];
export const AppContextProvider = combineContexts(...providers);
