# Launch readiness: frozen Problem Pinata / SOLVEPOP

Reviewed November 16, 2026, approximately 04:12 UTC (11:12 Bangkok).
**Update: account connection and wallet linkage verified through the official CLI
on November 16, 2026 at approximately 04:21 UTC. Funding/sponsorship and repository
eligibility remain unverified. No blockchain transaction was signed, no SOL spent,
and no launch or submission performed.** The approved login used off-chain
authentication. Identity, logo, code and draft metadata are frozen by SHA-256
in concept.freeze.json. The display name uses PIÑATA; the existing token metadata
keeps the ASCII name PROBLEM PINATA. No branding bytes were changed.

## Deadline and current official rules

Latest unauthenticated requirements say the competition is open. Entries close
November 17, 2026, 06:00 UTC / 13:00 Bangkok. At 04:12 UTC on November 16 there
were about 25 hours 48 minutes remaining. Both the actual coin creation and entry
receipt must be within the published window; the later escrow/final deadlines
do not extend intake. Prerequisites and check definitions match the preceding
requirements snapshot. Entry fee is null, meaning no bounty entry fee.

Sources: https://make.fun/api/competitions/makefun-coin-promo-01/requirements ,
https://make.fun/bounty/makefun-coin-promo-01 and https://make.fun/skill.md .
Latest copies: evidence/requirements-latest.json and evidence/skill-latest.md.

## Can the creator launch with 0 SOL?

| Route | What is verified | Is it ready for this entry? |
| --- | --- | --- |
| Normal self-funded create_v2 | Pump charges no platform creation fee, but its user signer pays account creation and Solana fees remain payable | No: a funded, linked public wallet and an actual transaction breakdown are missing |
| Sponsored network fee only | Solana permits another signer to be the fee payer | Insufficient alone: it does not automatically pay the program's user-funded account deposits |
| Sponsor pays network fee AND creation accounts | The protocol exposes a user/payer separately from creator; in principle the linked creator can begin with 0 SOL if someone else funds every debit | Technically plausible, not an available verified offer; sponsor authorization, operational route and bounty acceptance unverified |
| Pump's documented deferred/free creation flow | Official legacy-create documentation describes a first buyer creating the coin on-chain while retaining the original creator field | Not a finalized coin until that transaction occurs; relying on an outside buyer is deadline-unsafe and does not establish the required autonomous launch |
| Gas abstraction paid in another token | Solana/Kora documentation supports fee abstraction | Not free funding and not proof of support for Pump account deposits; no provider/quote verified |

The current create_v2 docs name `user` as signer and payer, and take `creator`
as an instruction argument. Merely swapping the transaction fee payer leaves
program account-creation debits to user. A full sponsor must fund those too,
either through the instruction payer or an explicitly approved transfer. No
such transfer was requested. No public documentation reviewed establishes a
universally available Pump-sponsored zero-balance launch service for this account.

The legacy free-creation explanation is not evidence that every present website
account can use it or that make.fun will accept waiting for a third-party launch.
A sponsor arrangement would still require explicit user approval before any
signature, creation or SOL spending. No sponsor was contacted or asked to sign.

Primary sources:
- https://pump.fun/docs/fees
- https://github.com/pump-fun/pump-public-docs/blob/main/docs/instructions/COIN_CREATION.md
- https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_PROGRAM_README.md
- https://solana.com/docs/payments/send-payments/payment-processing/fee-abstraction
- https://solana.com/docs/core/fees

## Minimum actual SOL: what can and cannot be established now

**An exact executable minimum has not been established.** There is no actual
selected funded payer, sponsored-payer agreement, uploaded metadata URI or unsigned
launch transaction to inspect/simulate. An arbitrary fixed number would be a
budget estimate, not the minimum actual debit.

Confirmed cost components and read-only lower bounds:

| Component | Verified amount / status |
| --- | --- |
| Pump platform creation fee | 0 SOL in the current published fee schedule |
| Standard create_v2 base fee | Two required instruction signers, mint and user: 10,000 lamports (0.00001 SOL) at 5,000 per signature if user is also fee payer; an additional distinct fee payer adds a signature |
| 82-byte account minimum balance | Mainnet RPC returned 1,066,800 lamports (0.0010668 SOL) |
| 165-byte account minimum balance | Mainnet RPC returned 1,488,440 lamports (0.00148844 SOL) |
| Illustrative strict lower bound | 2,565,240 lamports (0.00256524 SOL), summing the two base-size account minima and two signatures; this excludes other accounts and extensions and is NOT a sufficient launch balance |
| Full self-funded create minimum | Greater than that lower bound; exact amount unresolved until actual account sizes, creation route, URI and fees are quoted/simulated |
| Creator wallet minimum with full sponsorship | Could be 0 SOL; total transaction still consumes sponsor SOL, and no working sponsorship is verified |

The current Token-2022 mint/metadata and token-account extensions make base
sizes inadequate for a full quote. Bonding-curve state and any other initialized
accounts add costs. Account deposits are still upfront cash even when some may
eventually be recoverable; no recovery is assumed. Priority fees depend on the
transaction and network. RPC rent values are live observations, not timeless
constants or evidence of a successful create transaction.

Evidence: evidence/pump-idl.json (create_v2 signers),
evidence/rpc-rent-lower-bounds.json (read-only mainnet RPC).

The earlier 0.01-0.03 SOL account/network allowance and 0.05 SOL proposed ceiling
were planning amounts, **not a verified minimum**. They remain unauthorized.
A 0.01 SOL initial buy was an optional project proposal, not a demonstrated
protocol minimum. The official bounty prerequisite mentions SOL for creation
and a first buy but gives no numerical minimum. Do not assume a zero-buy launch
satisfies that prerequisite without verifying the chosen route against the rules.
If a buy is approved, add the selected amount and current 1.25% bonding-curve
trade fee as the actual quote charges it; do not count included fees twice.

## Wallet and repository checks

The user approved the official CLI connection. Login completed as
@hazel-kestrel-73, account 01a1e23b-f56e-72bd-b115-f08398685f06.
The official read-only `wallet list --json` then verified:

- Primary linked sign-in wallet: BcUhPeydu8qbdinNTg5rhyyyzyaJgKD4QB8uZCCFgUzE
- Connected agent wallet: HBo9cpkxSnaCjxqxsqTrebAbXtziqiZYwdox9qkjaK1P

The first is kind linked, primary true, signs_in true. The second is kind agent,
primary false, signs_in false. Neither balance was checked by wallet listing.
Launch-payer selection and funding remain unverified; the linked wallet is not
automatically available as an agent signer. No key material was printed.
Current public evidence: evidence/wallet-linkage-verified.json. The earlier
unauthenticated failure remains as historical evidence/wallet-linkage-check.txt.

Update: GitHub authenticates as ikomahate. The explicitly authorized PUBLIC
repository https://github.com/ikomahate/makefun-solvepop was created at
2026-11-16T04:40:34Z, after the opening. README badges are filled in, About is
configured, and .makefun/owner.json names the verified linked public wallet.
Remote file/commit checks follow the audited push. See REPOSITORY-READINESS.md.
Raw sessions and private evidence are excluded. The drand source-bundle route
remains unused.

## Metadata, runtime and evidence

- Frozen name: PROBLEM PINATA (14 ASCII characters); symbol SOLVEPOP (8).
  These fit Pump's documented name/symbol limits of 32/13 characters.
- Draft description contains the full exact bounty link, bounty attribution,
  platform explanation and no payout/ownership claim. Website is the exact
  make.fun bounty URL. Description fits the judge's 4,000-character cap.
- Logo is the frozen original 512 x 512 PNG, 7,329 bytes; decoded structure,
  CRCs and dimensions passed tests. No metadata/image upload has happened.
- `image: logo.png` is a local draft reference. A real public image URI and
  metadata URI are required for launch. Pump documents a 200-character URI cap.
  Keep the frozen content and record the final uploaded metadata hash separately.
- No genuine LAUNCH.json exists. It must eventually carry the real mint and
  creation signature, finalized success, correct Pump program and linked creator.
- Eight runtime tests passed on Node 22.23.5 and 26.12.1. Exact pinned Linux
  sandbox remains untested because Docker is unavailable.
- The preceding official local check exited 0: 13 passed, seven skipped, five
  submission-only. It is not remote approval of a launch or account eligibility.
- Native logs, real revisions and earlier commits are preserved. The official
  bundle contains the original user prompt, recorded model usage and run record.
  Rebundle after any approved launch; no transcript is reconstructed by hand.
- A run record is mandatory for entries received from November 17 00:00 UTC.
  Bundle/check locally again with the current kit before an approved submission.

## Deadline-prioritized remaining work

1. Account/wallet linkage is now verified. Obtain the intended repository URL,
   select the authorized launch payer and verify its balance read-only. Agent
   wallet linkage does not establish that the primary wallet can be used to sign.
2. Choose a verified funded payer or a full sponsor covering fees AND deposits.
   Preserve the linked creator field and autonomous agent launch. Without a
   sponsor, do not plan around a 0-SOL creator wallet.
3. Prepare eligible repository ownership, badges/About and upload-ready metadata.
   Do not publish or upload externally without the required approval.
4. Build/inspect an unsigned transaction through the chosen current Pump route;
   simulate with signature verification disabled if supported, without signing.
   Report exact rent/account debits, fees, buy and maximum total before approval.
5. Only after explicit launch/spending/signing approval: create, verify finality
   and write genuine LAUNCH.json. Leave ample time before the entry deadline.
6. Recheck, rebundle and present commit/evidence hashes. Obtain separate explicit
   entry-signing/submission approval before the deadline. This report submits none.

Current status is **frozen development complete, launch blocked**, not ready with
0 SOL. Fastest dependable route is a verified linked funded wallet and eligible
repository; an unconfirmed gasless offering is not a deadline-safe substitute.
