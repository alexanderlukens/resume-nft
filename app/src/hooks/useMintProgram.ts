import { Program, AnchorProvider, Idl, web3 } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import idl from '../idl.json'

const useMintProgram = (): Program | null => {
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const programID = new PublicKey(idl.metadata.address)
  const opts: web3.ConfirmOptions = {
    preflightCommitment: 'confirmed',
    commitment: 'confirmed'
  }

  if (!wallet) {
    return null
  }
  const provider = new AnchorProvider(connection, wallet, opts)
  const program = new Program(idl as Idl, programID, provider)
  return program
}

export default useMintProgram
