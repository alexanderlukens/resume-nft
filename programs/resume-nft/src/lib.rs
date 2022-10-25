use anchor_lang::prelude::*;

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
