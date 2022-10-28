import { useConnection } from '@solana/wallet-adapter-react'

type confirmTransactionType = (txSignature: string) => Promise<void>

const useConfirmTransaction = (): confirmTransactionType => {
  const { connection } = useConnection()
  const confirmTransaction = async (txSignature: string): Promise<void> => {
    const latestBlockHash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txSignature
    })
  }
  return confirmTransaction
}

export default useConfirmTransaction
