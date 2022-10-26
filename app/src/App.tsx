import { FC } from 'react'
import { WalletContext } from './contexts/WalletContext'
import Index from './components/Index'

const App: FC = () => {
  return (
    <WalletContext>
      <Index />
    </WalletContext>
  )
}

export default App
