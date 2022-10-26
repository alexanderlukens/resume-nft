/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react'
import Button from '@mui/material/Button'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

const AirdropButton: FC = () => {
  const { connection } = useConnection()
  const wallet = useWallet()

  const onClick = async (): Promise<void> => {
    if (wallet.publicKey) {
      await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL)
    }
  }

  return (
    <Button onClick={onClick}>
      Airdrop 2 Sol
    </Button>
  )
}

export default AirdropButton
