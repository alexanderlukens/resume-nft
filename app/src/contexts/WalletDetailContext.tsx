/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Metaplex } from '@metaplex-foundation/js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { UPDATE_AUTHORITY_PUB_KEY } from '../utils'

interface NftData {
  address: PublicKey
  imageUrl: string
}

export interface WalletDetailInterface {
  balance: number
  nfts: NftData[]
  updateBalance: () => Promise<void>
  updateNfts: () => Promise<void>
}

const initialContext: WalletDetailInterface = {
  balance: 0,
  nfts: [],
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
  const [nfts, setNfts] = useState<NftData[]>([])
  const { connection } = useConnection()
  const wallet = useWallet()
  const metaplex = new Metaplex(connection)

  const updateBalance = async (): Promise<void> => {
    if (wallet.publicKey) {
      let balance = await connection.getBalance(wallet.publicKey)
      balance = (Math.round(balance / LAMPORTS_PER_SOL * 100) / 100)
      setBalance(balance)
    }
  }

  const updateNfts = async (): Promise<void> => {
    if (wallet.publicKey) {
      let nfts = await metaplex.nfts().findAllByOwner({
        owner: wallet.publicKey
      })

      nfts = nfts.filter(nft => {
        const creatorAddress: PublicKey = _.get(nft, 'creators[0].address')
        return creatorAddress.toString() === UPDATE_AUTHORITY_PUB_KEY.toString()
      })

      const nftData = await Promise.all(nfts.map(async (nft) => {
        const response = await fetch(nft.uri)
        const responseJSON = await response.json()
        const data = {
          address: (nft as any).mintAddress,
          imageUrl: _.get(responseJSON, 'image')
        }
        return data
      }))
      setNfts(nftData)
    }
  }

  useEffect(() => {
    updateBalance()
    updateNfts()
  }, [wallet])

  return (
    <WalletDetailContext.Provider value={{ balance, nfts, updateBalance, updateNfts }}>
      {children}
    </WalletDetailContext.Provider>
  )
}

export { WalletDetailContext }

export default WalletDetailContextProvider
