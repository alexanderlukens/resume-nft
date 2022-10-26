/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from 'react'
import * as anchor from '@project-serum/anchor'
import Button from '@mui/material/Button'

import useToast from '../hooks/useToast'
import useMintProgram from '../hooks/useMintProgram'
import { TOKEN_METADATA_PROGRAM_ID } from '../utils'

const MintButton: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const mintProgram = useMintProgram()

  const { showSuccessToast, showErrorToast } = useToast()

  if (!mintProgram) {
    return null
  }

  const onClick = async (): Promise<void> => {
    if (mintProgram.provider.publicKey) {
      setLoading(true)
      try {
        const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate()
        const tokenAddress = await anchor.utils.token.associatedAddress({
          mint: mintKeypair.publicKey,
          owner: mintProgram.provider.publicKey
        })

        const metadataAddress = (await anchor.web3.PublicKey.findProgramAddress(
          [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer()
          ],
          TOKEN_METADATA_PROGRAM_ID
        ))[0]

        const masterEditionAddress = (await anchor.web3.PublicKey.findProgramAddress(
          [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
            Buffer.from('edition')
          ],
          TOKEN_METADATA_PROGRAM_ID
        ))[0]

        await mintProgram.methods.mint()
          .accounts({
            masterEdition: masterEditionAddress,
            metadata: metadataAddress,
            mint: mintKeypair.publicKey,
            tokenAccount: tokenAddress,
            mintAuthority: mintProgram.provider.publicKey,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID
          })
          .signers([mintKeypair])
          .rpc()

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
