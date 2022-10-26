import { FC } from 'react'
import Container from '@mui/material/Container'

import { WalletContext } from './contexts/WalletContext'
import Index from './components/Index'

const App: FC = () => {
  return (
    <WalletContext>
      <Container maxWidth="lg">
        <Index />
      </Container>
    </WalletContext>
  )
}

export default App
