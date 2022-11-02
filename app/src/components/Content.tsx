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
import useWalletDetailsContext from '../hooks/useWalletDetailsContext'

const Content: FC = () => {
  const wallet = useWallet()
  const { connected, connecting } = wallet
  const { balance } = useWalletDetailsContext()

  let body
  // eslint-disable-next-line no-constant-condition
  if (connecting) {
    body = (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress size={130} thickness={2} />
      </Grid>
    )
  } else if (!connected) {
    body = (
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography variant="h5" align="center" color="text.primary">
            Please connect wallet to continue
          </Typography>
        </Grid>
      </Grid>
    )
  } else {
    body = (
      <NFTDisplay />
    )
  }

  return (
    <>
      <Grid container justifyContent={'center'}>
        <Box
          sx={{
            pt: 1,
            pb: 6
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
          >
            Alex&apos;s Resume NFT
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary">
            An NFT project running on Solana (devnet)
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            justifyContent="center"
          >
            <Typography variant="body1" align="center" color="text.secondary">
              Getting Started
            </Typography>
            <Typography variant="overline" align="left" color="text.secondary">
              1. Connect Wallet
            </Typography>
            <Typography variant="overline" align="left" color="text.secondary">
              2. Airdrop Sol if balance is below 2 (Your Balance: <Typography color="text.primary" component="span" sx={{ fontWeight: 'bold' }} variant="overline">{balance} SOL</Typography>)
            </Typography>
            <Typography variant="overline" align="left" color="text.secondary">
              3. Click Mint
            </Typography>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="space-between"
          >
            <AirdropButton />
            <MintButton />
          </Stack>
        </Box>
      </Grid>
      {body}
    </>
  )
}

export default Content
