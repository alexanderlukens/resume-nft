import { FC } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useWallet } from '@solana/wallet-adapter-react'

import AirdropButton from './AirdropButton'
import MintButton from './MintButton'

const Content: FC = () => {
  const wallet = useWallet()
  const { connected, connecting } = wallet

  if (connecting) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    )
  }

  if (!connected) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          Please connect wallet to continue
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <AirdropButton />
      </Grid>
      <Grid item>
        <MintButton />
      </Grid>
    </Grid>
  )
}

export default Content
