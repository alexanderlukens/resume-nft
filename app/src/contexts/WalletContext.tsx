import { FC, ReactNode, useCallback, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

export const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter()
    ],
    []
  )

  const onError = useCallback((error: WalletError) => {
    // custom handling for Slope since it doesn't return a message
    console.error(error.name, error.message)
  }, [])

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{ confirmTransactionInitialTimeout: 240000 }}
    >
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}
