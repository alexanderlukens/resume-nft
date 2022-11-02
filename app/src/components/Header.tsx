/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Header: FC = () => {
  return (
    <AppBar color="secondary" position="static">
      <Toolbar variant="dense">
        <Grid container alignItems="center" justifyContent={'space-between'} p={1}>
          <Grid item>
            <Button variant='contained' href="https://alexanderlukens.github.io/" size="small">Back to Portfolio</Button>
          </Grid>
          <Grid item>
            <WalletMultiButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
