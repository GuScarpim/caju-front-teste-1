import ReactDOM from "react-dom/client";
import App from "./App";
import { DashboardProvider } from './context/dashboardContext';
import { ThemeProvider } from 'styled-components';
import { themeMain } from './styles/themes';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <DashboardProvider>
      <ThemeProvider theme={themeMain}>
        <App />
      </ThemeProvider>
    </DashboardProvider>
  </>);
