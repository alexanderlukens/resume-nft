use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::system_program;

use anchor_spl::{associated_token, token};

use mpl_token_metadata::{instruction as token_instruction, ID as MPL_TOKEN_METADATA_ID};

declare_id!("7dGW6wNb8PjvBXazgTjWUAPoZJfU8aeDXsJW6xkETQDE");

#[program]
pub mod resume_nft {
    use super::*;

    pub fn mint(ctx: Context<MintNft>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintNft<'info> {
    /// CHECK: Metaplex will create this account
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    /// CHECK: Metaplex will create this account
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,
    #[account(mut)]
    pub mint: Signer<'info>,
    /// CHECK: Anchor will create this account
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    #[account(mut)]
    pub mint_authority: Signer<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    /// CHECK: Metaplex will check this
    pub token_metadata_program: UncheckedAccount<'info>,
}
