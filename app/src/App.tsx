import { FC } from 'react'
import WalletConnectionContextProvider from './contexts/WalletConnectionContext'
import WalletDetailContextProvider from './contexts/WalletDetailContext'
import Index from './components/Index'

const App: FC = () => {
  return (
    <WalletDetailContextProvider>
      <WalletConnectionContextProvider>
        <Index />
      </WalletConnectionContextProvider>
    </WalletDetailContextProvider>
  )
}

export default App
