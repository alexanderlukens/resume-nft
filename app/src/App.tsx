import { FC } from 'react'
import Container from '@mui/material/Container'

import { WalletContext } from './contexts/WalletContext'
import Home from './components/Home'

const App: FC = () => {
  return (
    <WalletContext>
      <Container maxWidth="lg">
        <Home />
      </Container>
    </WalletContext>
  )
}

export default App
