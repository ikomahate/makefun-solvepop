# Public repository preparation

Public repository: https://github.com/ikomahate/makefun-solvepop . GitHub API
confirmed owner ikomahate, visibility PUBLIC and creation at 2026-11-16T04:40:34Z,
after the bounty opened. The user explicitly authorized creation and publication.
Source is pushed only after the publication audit. The make.fun account discrepancy
remains for confirmation before a future entry; no account was switched or renamed.

## Official account verification

The official CLI's authenticated status and wallet-list endpoints report:

- Account: @hazel-kestrel-73, ID 01a1e23b-f56e-72bd-b115-f08398685f06.
- Expected handle supplied by user: @bcuhpeydu8qbdinntg5rhyyyzyajgkd4qb8uzcc.
- Primary linked wallet: BcUhPeydu8qbdinNTg5rhyyyzyaJgKD4QB8uZCCFgUzE.
- Connected agent wallet: HBo9cpkxSnaCjxqxsqTrebAbXtziqiZYwdox9qkjaK1P.

The linked wallet matches the prefix of the expected wallet-derived handle.
This does not prove the handles are aliases. No account was renamed, merged or
reconnected. The user was asked whether to use this existing account or reconnect.
Private account-home output is retained only under ignored evidence/.

## Read-only funding check

Finalized public RPC reads returned 2,354,497 lamports (0.002354497 SOL) for
the primary linked wallet at slot 469997148, and 0 lamports for the agent
wallet at slot 469997764. Responses are saved privately in evidence/.
The primary balance is below the earlier conservative 0.00256524 SOL floor
for base account deposits plus two signatures, before the full account set,
extensions, fees or a buy. No verified sponsor exists. Neither wallet is
therefore established as sufficiently funded for the planned launch. A balance
query is not a transaction quote or authorization to use either signer.

## GitHub verification and local preparation

Portable official GitHub CLI is installed under ignored .tools/gh. Its archive
digest was checked against the official cli/cli release metadata. `gh auth status`
and `gh api user` now verify active login ikomahate. Git authentication is configured.
The repository-specific README badges, About homepage/topics and public wallet
owner proof are prepared. Raw sessions and private transcript bundles are not
included in the public repository.

scripts/prepare-public-repo.mjs inspects all reachable Git history for forbidden
private paths and common credential patterns, then exports only clean committed
HEAD to .publication/problem-pinata-solvepop.zip. Its audit lists the exact files.
This pattern scan reduces accidental leakage; it does not prove universal secret
absence. Raw sessions, transcript bundles, private account output and downloaded
tools are outside the tracked source tree and excluded from the archive.

The freeze manifest binds the approved concept, code, metadata and logo. Existing
tests and genuine native development evidence are retained. Raw evidence is not
part of the public repository export. Official redacted transcript evidence is
reserved for a separately approved bounty submission.

## Completed authentication and remaining entry work

GitHub authentication, repository creation, About settings, badges and public
wallet ownership proof are now prepared. The checklist below records the original
workflow; verification of published files follows the audited push. Before a future
entry, resolve the make.fun handle discrepancy, fund the approved launch, and
produce genuine launch evidence. No entry or blockchain transaction is authorized.

## Original preparation checklist (historical)

1. Authenticate GitHub with the portable gh CLI, without printing tokens:
   `.\.tools\gh\bin\gh.exe auth login --hostname github.com --web --git-protocol https`
   Then confirm the authenticated login with `gh auth status` and `gh api user`.
2. Create a fresh public repository owned by that login after the bounty opening,
   November 15, 2026 06:00 UTC. Do not reuse a repository created before opening.
3. Fill the actual README rank/reward badges using scripts/finalize-readme.mjs.
   Set About homepage to https://make.fun/bounty/makefun-coin-promo-01 and topics
   makefun, ai-agents, bounties, growth.
4. Verify the make.fun account's GitHub ownership match or add .makefun/owner.json
   naming a wallet on the confirmed entrant account. Do not invent an owner/login.
5. Commit these changes, rerun the source/history publication audit and official
   local checks, then push only the audited repository. Confirm public visibility,
   owner, created_at and reachable full commit SHA with GitHub's API.

Launching, blockchain signing, SOL spending and bounty submission remain prohibited
without separate explicit approval. A public repository alone is not an eligible
coin entry: actual approved launch metadata and LAUNCH.json remain outstanding.
