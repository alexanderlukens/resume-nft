import { FC } from 'react'
import WalletConnectionContextProvider from './contexts/WalletConnectionContext'
import WalletDetailContextProvider from './contexts/WalletDetailContext'
import Index from './components/Index'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import themeOverrides from './theme'

const theme = createTheme(themeOverrides)

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletConnectionContextProvider>
        <WalletDetailContextProvider>
          <Index />
        </WalletDetailContextProvider>
      </WalletConnectionContextProvider>
    </ThemeProvider>
  )
}

export default App
