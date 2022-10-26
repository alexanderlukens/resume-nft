import React, { FC } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useWallet } from '@solana/wallet-adapter-react'

const Content: FC = () => {
  const wallet = useWallet()
  const { connected, connecting } = wallet

  if (connecting) {
    return (
      <Box>
        <Grid container alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Box>
    )
  }

  if (!connected) {
    return (
      <Grid container>
        <Grid item>
          Please connect wallet to continue
        </Grid>
      </Grid>
    )
  }

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          Hello World
        </Grid>
      </Grid>
    </Box>
  )
}

export default Content
