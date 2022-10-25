use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::system_program;

use anchor_spl::{associated_token, token};

use mpl_token_metadata::{instruction as token_instruction, ID as MPL_TOKEN_METADATA_ID};

declare_id!("7dGW6wNb8PjvBXazgTjWUAPoZJfU8aeDXsJW6xkETQDE");

#[program]
pub mod resume_nft {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
