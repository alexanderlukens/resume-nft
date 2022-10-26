import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Header: FC = () => {
  return (
    <AppBar color="secondary" position="static">
      <Grid container alignItems="center" justifyContent={'space-between'} p={1}>
        <Grid item>
          <Button variant='contained' href="https://alexanderlukens.github.io/">Back to Portfolio</Button>
        </Grid>
        <Grid item>
          <Typography variant="h4">Alex&apos;s Resume NFT</Typography>
        </Grid>
        <Grid item>
          <WalletMultiButton />
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Header
