import React, { useState, useContext } from 'react'

interface WalletDetailInterface {
  balance: number
  setBalance: (balance: number) => void
}

const initialContext: WalletDetailInterface = { balance: 0, setBalance: () => { throw new Error('Set balance is not avaliable') } }
const WalletDetailContext = React.createContext<WalletDetailInterface>(initialContext)

interface Props {
  children: React.ReactNode
}

const WalletDetailContextProvider: React.FC<Props> = ({ children }) => {
  const [balance, setBalance] = useState(0)

  return (
    <WalletDetailContext.Provider value={{ balance, setBalance }}>
      {children}
    </WalletDetailContext.Provider>
  )
}

export const useWalletDetailContext = (): WalletDetailInterface => {
  const walletDetailContext = useContext(WalletDetailContext)
  return walletDetailContext
}

export default WalletDetailContextProvider
