import { useContext } from 'react'

import { WalletDetailContext, WalletDetailInterface } from '../contexts/WalletDetailContext'

export const useWalletDetailContext = (): WalletDetailInterface => {
  const walletDetailContext = useContext(WalletDetailContext)
  return walletDetailContext
}

export default useWalletDetailContext
