# Launch plan - pending explicit approval

Nothing in this document authorizes any signature, spending, launch or entry.
No wallet secrets are read by this project. Approval of this plan is separate
from an actual transaction approval and separate from bounty submission.

## Inputs and preflight

1. Resolve or accept the naming and narrative limitations in ORIGINALITY.md.
2. Confirm the bounty still takes entries. Both coin creation and entry receipt
   must be before 2026-11-17 06:00 UTC (13:00 Bangkok), with coin creation no
   earlier than 2026-11-15 06:00 UTC. The escrow's later internal deadline is not
   permission to enter late. Leave time for finality and intake checks.
3. Confirm the public wallet address is linked to the entrant's make.fun account
   and has sufficient SOL. Never request a seed phrase or paste a secret into
   this repository, chat, command arguments or transcripts.
4. Prepare an entrant-owned public GitHub repository created after the opening.
   Add its actual owner and repository to the README badges using
   `node scripts/finalize-readme.mjs OWNER REPOSITORY`. Set GitHub About website
   to the bounty URL and topics to makefun, ai-agents, bounties, growth. If
   account/repository ownership differs, add the official wallet owner proof.
   Public creation/pushing is deferred until the user permits publishing.
5. Check the official bundle against the genuine complete sessions and accurate
   run record. Never change transcript timestamps, usage or model IDs.

## After explicit launch and spending approval

6. Use the real pump.fun creation workflow from the linked wallet through an
   agent-operable signer. Re-confirm the current supported create mechanism
   before implementation; this project intentionally contains no launcher or
   third-party launch API integration. The user approves the action and budget;
   the agent must perform the actual creation to meet the autonomous-work rule.
7. Upload the exact logo.png through that workflow and obtain its actual public
   image URI. Put that URI in the uploaded metadata. The local draft's image
   filename is not a launch-ready URI. Preserve the approved name, ticker and
   full description. Website: https://make.fun/bounty/makefun-coin-promo-01 .
8. Configure a plain SOL-paired launch and a proposed 0.01 SOL initial buy.
   Do not add bundles, promotions, third-party tips, extra purchases, holder
   rewards or other special modes without specific authorization.
9. Build and simulate an unsigned create transaction. Inspect the actual mint,
   creator, program IDs, account-creation deposits, every SOL transfer, fees,
   initial-buy maximum debit and slippage. Produce an exact breakdown and ask
   for explicit transaction approval. A displayed estimate alone authorizes none.
   Stop if the debit can exceed the approved total ceiling or the transaction
   cannot be inspected. Simulation may be unavailable until the chosen workflow
   and public wallet are known; no quote has been obtained in this preparation.
10. Only after approval, sign through the authorized signer and broadcast once.
    Wait for finalized success and inspect the actual transaction. If status is
    uncertain, query the same signature; do not create or buy again blindly.
11. Write root LAUNCH.json with the actual mint and create_signature. Record both
    in the native agent session, then verify the coin page, public metadata,
    readable logo, website, full description, creation window and wallet linkage.
12. Run `node main.ts` with an isolated output directory twice and compare bytes.
    The house supplies coin.dossier.json; never fabricate that file locally.
13. Commit the final files, prepare and check the final transcript bundle,
    including the launch session, and show the exact repository, commit and
    evidence hashes. Obtain separate explicit approval before any entry-message
    signing or bounty submission. None of those steps is performed by this plan.

## Estimated budget, in SOL

Pump's fee page, read November 16, 2026, lists no platform creation fee.
Creation still requires Solana network fees and account deposits. The current
SOL bonding-curve trade fee is 1.25%. Source: https://pump.fun/docs/fees .

| Item | Estimate or allowance |
| --- | --- |
| Platform creation fee | 0 SOL under the current published schedule |
| Account deposits, network and priority fees | 0.01-0.03 SOL planning allowance, not a quote |
| Proposed initial buy | 0.01 SOL |
| Buy fee if charged in addition to that amount | about 0.000125 SOL |
| Indicative combined debit | 0.020125-0.040125 SOL, subject to actual quote |
| Proposed total launch debit ceiling | 0.05 SOL, requires explicit approval |
| Bounty entry fee | none in the retrieved requirements |

If fees are included inside the input buy amount, do not add them twice.
Slippage protection must cap the transaction's actual debit; it is not a
separate unlimited allowance. The initial buy is speculative capital and can
lose all value. Unused budget remains in the wallet. No promised return or
prize offset is assumed. Model/session charges are outside this SOL budget.
Image upload is assumed to use the launch workflow without a separate paid
storage service; if it asks for payment, obtain a fresh quote and approval.

Graduation's published 0.015 SOL fee is deducted from a SOL-paired bonding
curve, not a separate proposed launch payment. Any eventual prize-claim rent
and fees are also outside this launch estimate and require separate approval.
