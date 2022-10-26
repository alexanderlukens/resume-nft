import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Header: FC = () => {
  return (
    <AppBar>
      <Grid container>
        <Grid item>
          <WalletMultiButton />
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Header
