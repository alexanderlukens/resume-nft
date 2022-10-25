import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ResumeNft } from "../target/types/resume_nft";

describe("resume-nft", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env()
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.ResumeNft as Program<ResumeNft>;
  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  it("Can mint!", async () => {
    const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate();
    const tokenAddress = await anchor.utils.token.associatedAddress({
      mint: mintKeypair.publicKey, 
      owner: wallet.publicKey
    })

    const metadataAddress = (await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    ))[0]

    const masterEditionAddress = (await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
        Buffer.from("edition"),
      ],
      TOKEN_METADATA_PROGRAM_ID
    ))[0];


    const tx = await program.methods.mint()
      .accounts({
        masterEdition: masterEditionAddress,
        metadata: metadataAddress,
        mint: mintKeypair.publicKey,
        tokenAccount: tokenAddress,
        mintAuthority: wallet.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID
      })
      .signers([mintKeypair])
      .rpc();
    // console.log("Your transaction signature", tx);
  });
});
