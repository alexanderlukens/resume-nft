import React, { FC } from 'react'
import Container from '@mui/material/Container'

import { WalletContext } from './contexts/WalletContext'

const App: FC = () => {
  return (
    <WalletContext>
      <Container maxWidth="lg">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            THIS IS THE RESUME APP
          </a>
        </header>
      </Container>
    </WalletContext>
  )
}

export default App
