import { ThemeProvider } from 'styled-components'
import { themeMain } from '~/styles/themes';

interface IContainer {
  children: React.ReactNode
}

const Container = ({ children }: IContainer) => {
  return <ThemeProvider theme={themeMain}>{children}</ThemeProvider>
}

export default Container
