import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ModalImage from 'react-modal-image'

import useWalletDetailsContext from '../hooks/useWalletDetailsContext'

const NFTDisplay: React.FC = () => {
  const { nfts } = useWalletDetailsContext()
  return (
    <Grid container spacing={2}>
      {nfts.map((nft, index) => {
        return (
          <Grid key={`nft-${index}`} item xs={4}>
            <ModalImage
              small={nft.imageUrl}
              large={nft.imageUrl}
            />
            <Button>View on Solscan</Button>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default NFTDisplay
