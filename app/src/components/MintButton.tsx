/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from 'react'
import Button from '@mui/material/Button'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

import useToast from '../hooks/useToast'

const MintButton: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { connection } = useConnection()
  const wallet = useWallet()

  const { showSuccessToast, showErrorToast } = useToast()

  const onClick = async (): Promise<void> => {
    if (wallet.publicKey) {
      setLoading(true)
      try {
        await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL)
        showSuccessToast('Mint Successful')
      } catch (e) {
        showErrorToast('Mint Failure.')
      }
      setLoading(false)
    }
  }
  return (
    <Button disabled={loading} onClick={onClick}>
      Mint
    </Button>
  )
}

export default MintButton
