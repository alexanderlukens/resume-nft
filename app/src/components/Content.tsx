import { FC } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

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
    <Paper>
      <Container maxWidth="sm">
        <Box
          sx={{
            pt: 1,
            pb: 6
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
              >
                Alex&apos;s Resume NFT
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" gutterBottom>
                An NFT project running on Solana (devnet)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="center" color="text.secondary" component="div">
                Getting Started
              </Typography>
              <Typography variant="overline" align="left" color="text.secondary" component="div">
                1. Connect Wallet
              </Typography>
              <Typography variant="overline" align="left" color="text.secondary" component="div">
                2. Airdrop Sol if balance is below 2 (Your Balance: <Typography color="text.primary" component="span" sx={{ fontWeight: 'bold' }} variant="overline">{balance} SOL</Typography>)
              </Typography>
              <Typography variant="overline" align="left" color="text.secondary" component="div">
                3. Click Mint
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Link href="https://github.com/alexanderlukens/resume-nft" target="_blank" rel="noopener">
                <Typography variant="body1" align="center">
                  Github Repo
                </Typography>
              </Link>
            </Grid>
          </Grid>
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
      </Container>
      {body}
    </Paper >
  )
}

export default Content
