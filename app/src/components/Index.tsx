import React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'

import Content from './Content'
import Header from './Header'

const Index: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 64px)' }}>
        <Grid container style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Content />
        </Grid>
      </Container>
    </>
  )
}

export default Index
