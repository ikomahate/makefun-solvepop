// Local text edit only. Does not create a remote repository or publish anything.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const [owner, repo] = process.argv.slice(2);
if (!owner || !repo || !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(owner)
  || !/^[A-Za-z0-9._-]{1,100}$/.test(repo) || repo === '.' || repo === '..') {
  throw new Error('Usage: node scripts/finalize-readme.mjs ACTUAL_OWNER ACTUAL_REPOSITORY');
}
const path = fileURLToPath(new URL('../README.md', import.meta.url));
const start = '<!-- makefun-repository-badges:start -->';
const end = '<!-- makefun-repository-badges:end -->';
const badgeRoot = `https://make.fun/badge/makefun-coin-promo-01/${owner}/${repo}`;
const bounty = 'https://make.fun/bounty/makefun-coin-promo-01';
const block = `${start}\n[![rank](${badgeRoot}/rank.svg)](${bounty}/leaderboard)\n[![reward](${badgeRoot}/reward.svg)](${bounty})\n${end}`;
const text = readFileSync(path, 'utf8');
if (!text.includes(start) || !text.includes(end)) throw new Error('README badge markers are missing.');
const before = text.slice(0, text.indexOf(start));
const after = text.slice(text.indexOf(end) + end.length);
writeFileSync(path, before + block + after);
console.log('Updated README badges locally. Verify owner/account eligibility before publishing.');
