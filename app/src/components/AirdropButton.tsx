/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { FC, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

import useToast from '../hooks/useToast'

const AirdropButton: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [solBalance, setSolBalance] = useState<number>(0)
  const { connection } = useConnection()
  const wallet = useWallet()

  const { showSuccessToast, showErrorToast } = useToast()

  const onClick = async (): Promise<void> => {
    if (wallet.publicKey) {
      setLoading(true)
      try {
        const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL)
        const latestBlockHash = await connection.getLatestBlockhash()
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: airdropSignature
        })
        updateBalance()
        showSuccessToast('Airdrop Successful')
      } catch (e) {
        showErrorToast('Airdrop Failure. Please try again later.')
      }
      setLoading(false)
    }
  }

  const updateBalance = async (): Promise<void> => {
    if (wallet.publicKey) {
      let balance = await connection.getBalance(wallet.publicKey)
      balance = (Math.round(balance / LAMPORTS_PER_SOL * 100) / 100)
      setSolBalance(balance)
    }
  }

  useEffect(() => {
    updateBalance()
  }, [])

  return (
    <>
      <Button disabled={loading} onClick={onClick}>
        Airdrop 2 Sol
      </Button>
      <Typography>{solBalance} SOL</Typography>
    </>
  )
}

export default AirdropButton
