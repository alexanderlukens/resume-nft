import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ModalImage from 'react-modal-image'
import { PublicKey } from '@solana/web3.js'

import useWalletDetailsContext from '../hooks/useWalletDetailsContext'

const NFTDisplay: React.FC = () => {
  const { nfts } = useWalletDetailsContext()
  const openSolscan = (address: PublicKey): void => {
    window.open(`https://solscan.io/token/${address.toString()}?cluster=devnet`)
  }

  if (!nfts.length) {
    return (
      <Grid container justifyContent="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography>You dont have Alex&apos;s Resume :(</Typography>
          <Typography>Click the mint button to get one!</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
      {nfts.map((nft, index) => {
        return (
          <Grid key={`nft-${index}`} item xs={4}>
            <Card raised>
              <CardActionArea disableRipple>
                <ModalImage
                  small={nft.imageUrl}
                  large={nft.imageUrl}
                />
              </CardActionArea>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button onClick={() => openSolscan(nft.address)}>View on Solscan</Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default NFTDisplay
