/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export interface WalletDetailInterface {
  balance: number
  updateBalance: () => Promise<void>
  updateNfts: () => Promise<void>
}

const initialContext: WalletDetailInterface = {
  balance: 0,
  updateBalance: () => {
    throw new Error('Update balance is not avaliable')
  },
  updateNfts: () => { throw new Error('Update NFTs is not avaliable') }
}
const WalletDetailContext = React.createContext<WalletDetailInterface>(initialContext)

interface Props {
  children: React.ReactNode
}

const WalletDetailContextProvider: React.FC<Props> = ({ children }) => {
  const [balance, setBalance] = useState(0)
  // const [nfts, setNfts] = useState(0)
  const { connection } = useConnection()
  const wallet = useWallet() || {}

  const updateBalance = async (): Promise<void> => {
    if (wallet.publicKey) {
      let balance = await connection.getBalance(wallet.publicKey)
      balance = (Math.round(balance / LAMPORTS_PER_SOL * 100) / 100)
      setBalance(balance)
    }
  }

  const updateNfts = async (): Promise<void> => {
    if (wallet.publicKey) {
      console.log('alex')
    }
  }

  useEffect(() => {
    updateBalance()
    updateNfts()
  }, [wallet])

  return (
    <WalletDetailContext.Provider value={{ balance, updateBalance, updateNfts }}>
      {children}
    </WalletDetailContext.Provider>
  )
}

export { WalletDetailContext }

export default WalletDetailContextProvider
