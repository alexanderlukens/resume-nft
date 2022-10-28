use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::system_program;

use anchor_spl::{associated_token, token};

use mpl_token_metadata::{
    instruction as token_instruction, state::Creator, ID as MPL_TOKEN_METADATA_ID,
};

mod constants;
mod errors;

declare_id!("7dGW6wNb8PjvBXazgTjWUAPoZJfU8aeDXsJW6xkETQDE");

#[program]
pub mod resume_nft {
    use super::*;
    pub fn mint(ctx: Context<MintNft>) -> Result<()> {
        // create mint account
        system_program::create_account(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                system_program::CreateAccount {
                    from: ctx.accounts.mint_authority.to_account_info(),
                    to: ctx.accounts.mint.to_account_info(),
                },
            ),
            1000000000,
            82,
            &ctx.accounts.token_program.key(),
        )?;
        // initialize mint account
        token::initialize_mint(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::InitializeMint {
                    mint: ctx.accounts.mint.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
            ),
            0,
            &ctx.accounts.mint_authority.key(),
            Some(&ctx.accounts.mint_authority.key()),
        )?;
        // create token account
        associated_token::create(CpiContext::new(
            ctx.accounts.associated_token_program.to_account_info(),
            associated_token::Create {
                payer: ctx.accounts.mint_authority.to_account_info(),
                associated_token: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.mint_authority.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                token_program: ctx.accounts.token_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
        ))?;
        // mint token to token account
        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.mint_authority.to_account_info(),
                },
            ),
            1,
        )?;
        // create metadata account
        let creator = Creator {
            address: constants::CREATOR_PUB_KEY,
            verified: true,
            share: 100,
        };

        require!(
            ctx.accounts.update_authority.key() == constants::CREATOR_PUB_KEY,
            errors::MintingError::InvalidCreator
        );

        invoke(
            &token_instruction::create_metadata_accounts_v3(
                MPL_TOKEN_METADATA_ID,
                ctx.accounts.metadata.key(),
                ctx.accounts.mint.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.mint_authority.key(),
                constants::CREATOR_PUB_KEY,
                "Alex Lukens' Resume".to_string(),
                "ALEXLUKENS".to_string(),
                "https://raw.githubusercontent.com/alexanderlukens/resume-nft/main/assets/resume.json".to_string(),
                Some(vec!(creator)),
                1,
                true,
                true,
                None,
                None,
                None,
            ),
            &[
                ctx.accounts.metadata.to_account_info(),
                ctx.accounts.mint.to_account_info(),
                ctx.accounts.token_account.to_account_info(),
                ctx.accounts.mint_authority.to_account_info(),
                ctx.accounts.rent.to_account_info(),
            ],
        )?;
        // create master edition account
        invoke(
            &token_instruction::create_master_edition_v3(
                MPL_TOKEN_METADATA_ID,
                ctx.accounts.master_edition.key(),
                ctx.accounts.mint.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.metadata.key(),
                ctx.accounts.mint_authority.key(),
                Some(0),
            ),
            &[
                ctx.accounts.master_edition.to_account_info(),
                ctx.accounts.mint.to_account_info(),
                ctx.accounts.mint_authority.to_account_info(),
                ctx.accounts.metadata.to_account_info(),
                ctx.accounts.rent.to_account_info(),
                ctx.accounts.token_account.to_account_info(),
            ],
        )?;

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
    #[account(mut)]
    pub update_authority: Signer<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    /// CHECK: Metaplex will check this
    pub token_metadata_program: UncheckedAccount<'info>,
}
