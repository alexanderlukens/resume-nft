/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

import useConfirmTransaction from '../hooks/useConfirmTransaction'
import useToast from '../hooks/useToast'
import useWalletDetailsContext from '../hooks/useWalletDetailsContext'

const AirdropButton: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { connection } = useConnection()
  const wallet = useWallet()
  const { updateBalance } = useWalletDetailsContext()
  const confirmTransaction = useConfirmTransaction()

  const { showSuccessToast, showErrorToast } = useToast()

  if (!wallet.publicKey) {
    return null
  }

  const onClick = async (): Promise<void> => {
    if (wallet.publicKey) {
      setLoading(true)
      try {
        const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL)
        await confirmTransaction(airdropSignature)
        await updateBalance()
        showSuccessToast('Airdrop Successful')
      } catch (e) {
        showErrorToast('Airdrop Failure. Please try again later.')
      }
      setLoading(false)
    }
  }

  return (
    <LoadingButton
      disabled={loading}
      loading={loading}
      onClick={onClick}
      variant="outlined">
      Airdrop 2 Sol
    </LoadingButton>
  )
}

export default AirdropButton
