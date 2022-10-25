import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ResumeNft } from "../target/types/resume_nft";

describe("resume-nft", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const nftTitle = "Alex's Resume";
  const nftSymbol = "ALEXLUKENS";
  const nftMetadataUrl = "https://raw.githubusercontent.com/alexanderlukens/resume-nft/main/assets/resume.json";

  const program = anchor.workspace.ResumeNft as Program<ResumeNft>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.mint().rpc();
    console.log("Your transaction signature", tx);
  });
});
