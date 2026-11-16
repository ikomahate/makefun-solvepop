# Bounty compliance review

This is an unlaunched local preparation, not a fully compliant bounty entry.
Official sources: https://make.fun/skill.md ,
https://make.fun/api/competitions/makefun-coin-promo-01/requirements and the
downloaded competition kit's RULES.txt. The kit's explicit judging order is
creativity, make.fun promotion, packaging. Local files cannot replace a real coin.

| Requirement | Preparation status |
| --- | --- |
| Original agent-authored logo | New pinata artwork generated in main.ts, visually inspected; 512 x 512 RGBA PNG, 7329 bytes |
| Logo <= 5 MiB and <= 16 megapixels | Passed; PNG structure, chunk CRCs and compressed scanlines tested |
| Name, ticker and story | PROBLEM PINATA / SOLVEPOP; five-concept comparison and limited collision screening documented |
| Website and full description link | Exact bounty URL present in metadata.draft.json |
| Bounty attribution and make.fun explanation | Present in description; pinata explicitly a metaphor with no payout promise |
| Public image URI in actual launched metadata | Missing intentionally; local image filename is a draft only |
| main.ts, Node 22, standard library only | Implemented; runs under portable Node 22.23.5 and Node 26.12.1 |
| Offline deterministic execution | Two isolated runs compared in tests under Node permissions |
| Actual LAUNCH.json copied to /output | Shape-valid synthetic fixtures test copy behavior; genuine record absent |
| MIT license | LICENSE present with the SPDX-License-Identifier: MIT line required by the local checker |
| Entrant-owned public repository created after opening | Target ikomahate/makefun-solvepop; GitHub API verification recorded privately |
| Required README live badges | Competition, repository rank and repository reward badges present |
| GitHub About and wallet owner proof if applicable | Bounty homepage/topics configured; public linked-wallet owner proof present |
| Genuine native development sessions | Native logs and prior Git commits preserved; final bundle includes the rebrand sessions |
| Run record | Official bundler derives the original prompt and harness data; current result in evidence/official-check.json |
| Recorded revisions and tests | Real writes, execution, validation changes and test results in native sessions |
| Exact pinned sandbox container | Not run: Docker unavailable; Windows Node tests do not prove Linux container behavior |
| Linked wallet and funded launch capacity | Linkage verified; observed balances do not establish adequate launch funding |
| Pump.fun launch inside the window | Pending explicit launch/signing/spending approval |
| On-chain finalized successful creation and linked creator | Pending actual launch; shape tests prove none of this |
| Signed entry and submission | Pending separate explicit approval |

The official check tool's results, when available, are retained locally in
evidence/official-check.json. A successful bundle is only evidence packaging,
not proof that every check passed or the entry is launch/submission-ready.
The first official check identified a missing SPDX line in LICENSE; it was
corrected in recorded development before the final local check. Native-session
timestamps, recorded usage, authored source lines and actual revisions passed
the first check. Final check details and hashes are in the evidence directory.

Deadline: November 17, 2026 06:00 UTC / 13:00 Bangkok. The brief limits entries
to 5 per UTC day and 10 total, subject to applicable lower account/country caps.
No entry has been sent, and no quota has been consumed by this project.

The source-bundle alternative requires its own official drand-anchored history
and a linked wallet. This ordinary local Git history does not satisfy that route;
use the GitHub route, or explicitly prepare the proper source workflow later.
No registration, wallet signing or remote publication was done here.
