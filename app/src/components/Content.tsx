import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useWallet } from '@solana/wallet-adapter-react'

import AirdropButton from './AirdropButton'
import MintButton from './MintButton'
import NFTDisplay from './NFTDisplay'

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
    <>
      <Box
        sx={{
          pt: 8,
          pb: 6
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Alex&apos;s Resume NFT
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <MintButton />
          <AirdropButton />
        </Stack>
      </Box>
      <NFTDisplay />
    </>
  )
}

export default Content
