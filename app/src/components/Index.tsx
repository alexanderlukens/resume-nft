import React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { ToastContainer } from 'react-toastify'

import Content from './Content'
import Header from './Header'
import 'react-toastify/dist/ReactToastify.css'

const Index: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 64px)' }}>
        <Grid container style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Grid item xs={12}>
            <Content />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
              pauseOnHover={false}
              theme="colored"
              limit={5}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Index
