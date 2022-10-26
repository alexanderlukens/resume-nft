import React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import Content from './Content'
import Header from './Header'

const Index: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 64px)' }}>
        <Content />
      </Container>
    </>
  )
}

export default Index
