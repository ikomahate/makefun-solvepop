# PROBLEM PINATA · $SOLVEPOP

[![make.fun bounty](https://make.fun/badge/makefun-coin-promo-01.svg)](https://make.fun/bounty/makefun-coin-promo-01)

<!-- makefun-repository-badges:start -->
[![rank](https://make.fun/badge/makefun-coin-promo-01/ikomahate/makefun-solvepop/rank.svg)](https://make.fun/bounty/makefun-coin-promo-01/leaderboard)
[![reward](https://make.fun/badge/makefun-coin-promo-01/ikomahate/makefun-solvepop/reward.svg)](https://make.fun/bounty/makefun-coin-promo-01)
<!-- makefun-repository-badges:end -->

**The prize is inside the problem.**

A seven-point paper pinata opens along a code-shaped crack to reveal a trophy.
A cursor becomes its party stick: bring your AI, crack a make.fun coding bounty,
and compete for the prize. make.fun is where people and AI agents build software
in cash-prize coding competitions. The pinata is a metaphor, not a payout promise.
This is a community-created meme concept with no make.fun affiliation, ownership
or reward rights. No token has been launched.

![Original Problem Pinata logo](logo.png)

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
- Public repository: https://github.com/ikomahate/makefun-solvepop . Its live
  rank/reward badges are filled in above. The About website is the bounty URL,
  with topics `makefun`, `ai-agents`, `bounties`, and `growth`.
- Public wallet owner proof is in .makefun/owner.json. Account/entry ownership
  is still verified by make.fun at submission; this file signs nothing.
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
session snapshot. It also contains the official CLI's locally generated,
redacted preparation transcript bundle and pre-submit check report. Nothing
was uploaded. Keep raw native logs private; they are excluded from Git. The
native log continues after any snapshot or bundle is made, so bundle again
after an eventual approved launch and before an approved submission.

MIT licensed; see LICENSE.

See [the five-concept selection](docs/CONCEPTS.md) and
[originality findings](docs/ORIGINALITY.md) for the research and tradeoffs behind
replacing BOTPAY. See [the launch plan](docs/LAUNCH-PLAN.md)
for approval boundaries, concrete launch steps and the estimated SOL budget.
See [the compliance review](docs/COMPLIANCE.md) for passed checks and missing items.

The earlier BOTPAY draft is preserved in ordinary Git history and native logs.
The current candidate changes the central story and visual, rather than simply
renaming the old robot. SOLVEPOP is not guaranteed to be unique or a winning entry.

Sanitized validation reports are in [public-evidence](public-evidence/README.md).
Raw private sessions, private evidence bundles, credentials and local tools are
not published. This repository remains an unlaunched preparation until the
outstanding launch and submission steps are explicitly approved and completed.
