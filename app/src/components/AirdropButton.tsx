/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react'
import Button from '@mui/material/Button'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

import useToast from '../hooks/useToast'

const AirdropButton: FC = () => {
  const { connection } = useConnection()
  const wallet = useWallet()

  const { showSuccessToast, showErrorToast } = useToast()

  const onClick = async (): Promise<void> => {
    if (wallet.publicKey) {
      try {
        await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL)
        showSuccessToast('Airdrop Successful')
      } catch (e) {
        showErrorToast('Airdrop Failure. Please try again later.')
      }
    }
  }

  return (
    <Button onClick={onClick}>
      Airdrop 2 Sol
    </Button>
  )
}

export default AirdropButton
