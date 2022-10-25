import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ResumeNft } from "../target/types/resume_nft";

describe("resume-nft", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ResumeNft as Program<ResumeNft>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
