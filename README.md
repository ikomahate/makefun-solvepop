# BOT GOT PAID · $BOTPAY

[![make.fun bounty](https://make.fun/badge/makefun-coin-promo-01.svg)](https://make.fun/bounty/makefun-coin-promo-01)

<!-- makefun-repository-badges:start -->
<!-- Actual owner and repository are required before adding rank/reward badges. -->
<!-- makefun-repository-badges:end -->

**You prompted. It clocked in. make.fun posted the bounty.**

A friendly robot holds its fictional first-job receipt. The concept celebrates
people and AI agents building software for cash rewards through make.fun coding
bounties. The receipt is a mascot story, not evidence of actual earnings.
This is a community-created meme concept with no make.fun affiliation, ownership
or reward rights. No token has been launched.

![Original BOTPAY logo](logo.png)

## Run locally

Requires Node.js 22.18 or later. No npm install, dependencies, credentials,
network access or wallet are needed.

```powershell
node main.ts --prepare
```

Writes `output/logo.png` and `output/metadata.draft.json`. Preparation mode never
reads or copies LAUNCH.json, even if one is present. Set `MAKEFUN_OUTPUT_DIR` to
choose another output directory. The root PNG and metadata
are generated copies of these outputs. The draft's `image` is a local filename;
an approved future launch must upload that image and use its real public URI.

```powershell
node --test tests/project.test.mjs
```

## Bounty entry behavior

Without `--prepare`, `main.ts` requires a genuine root `LAUNCH.json`, validates
the mint and creation signature as 32-byte and 64-byte base58 values, and copies
the file unchanged into the output directory. Source and output must differ.
`MAKEFUN_BOT_DIR` selects the source directory; by default it is the directory
containing `main.ts`. The grader supplies `/bot` and `/output` using these variables.
The program performs no on-chain verification: make.fun's own gate does that.
It never creates `coin.dossier.json`, which belongs to the house verifier.

No real `LAUNCH.json` exists because launching, spending, signing and submission
are not authorized. Synthetic test fixtures exist only inside temporary test
directories and are never launch evidence.

## Before an eventual approved entry

- Confirm a funded Solana wallet linked to the entrant's make.fun account.
- Preserve the original native Codex logs for every development and launch session.
- Portable Git is available under .tools/mingit. Use the official kit's local
  bundle/check commands. See evidence/ for actual outcomes, not a claim of remote
  entry eligibility. At least five assistant turns and
  genuine source revisions are required; this session includes actual writes,
  execution and subsequent validation changes. Do not fabricate missing evidence.
- Create an entrant-owned public GitHub repository after the opening, or use the
  kit's properly anchored source-bundle workflow. This local folder is not yet an
  eligible remote repository or anchored source bundle.
- Add the repository-specific live rank and reward badges using the actual
  GitHub owner/repository. They are deliberately absent here because neither is
  known. This README is therefore a preparation README, not submission-ready.
- Set GitHub About website to the bounty URL and topics to `makefun`, `ai-agents`,
  `bounties`, and `growth`; add owner proof if the account/repository needs it.
- After separate explicit approval, the agent must launch autonomously within
  the official window. Put the actual mint and creation signature in LAUNCH.json.
- Set the coin website to https://make.fun/bounty/makefun-coin-promo-01 and retain
  that full link, bounty attribution and platform explanation in its description.
- Run the entry twice with no network and compare outputs; then run the kit's
  checks and bundle native transcripts with an accurate run record. Do not upload
  private instruction text: record it as withheld with a reason when appropriate.
- Obtain explicit approval before signing or submitting anything.

## Rules and evidence

[Official brief](https://make.fun/bounty/makefun-coin-promo-01) ·
[Requirements](https://make.fun/api/competitions/makefun-coin-promo-01/requirements) ·
[Agent skill](https://make.fun/skill.md)

The downloaded official kit clarified that creativity is the first judging
criterion, make.fun promotion second, and packaging third. The judge reads the
coin's actual metadata and logo, not this program's promotional output. Price,
volume and holder counts do not affect judging.

The official window is November 15, 2026 06:00 UTC through November 17, 2026
06:00 UTC (13:00 Bangkok on November 17). Verify current rules before entry.
The 512 × 512 PNG is below the official 5 MiB and 16-megapixel image caps.

`evidence/` contains fetched official materials, local test results and a native
session snapshot. These are preparation records, not a submitted or verified
transcript bundle. Keep the native logs private until reviewed and redacted by
the official bundler. The native log continues after any snapshot is made.

MIT licensed; see LICENSE.

See [originality findings](docs/ORIGINALITY.md) for the competing employment and
receipt concepts and BOTPAY naming collisions. See [the launch plan](docs/LAUNCH-PLAN.md)
for approval boundaries, concrete launch steps and the estimated SOL budget.
See [the compliance review](docs/COMPLIANCE.md) for passed checks and missing items.
