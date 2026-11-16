// Audits only Git-tracked history and exports HEAD. Never authenticates or publishes.
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const git = process.env.GIT_EXE ?? 'git';
function call(args, binary = false) {
  const result = spawnSync(git, args, { cwd: root, encoding: binary ? undefined : 'utf8', maxBuffer: 32 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`git ${args[0]} failed; no publication attempted`);
  return result.stdout;
}
const forbidden = /(^|\/)(evidence|\.tools|\.publication|\.codex|\.agents)(\/|$)|(^|\/)\.env($|\.)|keypair|credentials|session.*\.jsonl|transcripts.*\.tar/i;
const patterns = [
  ['github-token', /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/],
  ['makefun-api-key', /\baf_[A-Za-z0-9_-]{20,}\b/],
  ['provider-key', /\b(?:sk-(?:proj-|svcacct-|ant-|or-v1-)?[A-Za-z0-9_-]{24,}|AIza[A-Za-z0-9_-]{30,})\b/],
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
];
const findings = [];
const objects = call(['rev-list', '--objects', '--all']).trim().split('\n');
let blobs = 0;
let commitAndTagObjects = 0;
for (const row of objects) {
  const split = row.indexOf(' '), id = split < 0 ? row : row.slice(0, split);
  const path = split < 0 ? '' : row.slice(split + 1);
  if (path && forbidden.test(path)) findings.push({ path, check: 'forbidden-history-path' });
  const kind = call(['cat-file', '-t', id]).trim();
  if (!['blob', 'commit', 'tag'].includes(kind)) continue;
  if (kind === 'blob') blobs++; else commitAndTagObjects++;
  const content = call(['cat-file', '-p', id], true).toString('latin1');
  for (const [check, pattern] of patterns)
    if (pattern.test(content)) findings.push({ path, check });
}
if (findings.length) {
  console.error(JSON.stringify({ ok: false, findings }, null, 2));
  process.exit(1);
}
const files = call(['ls-files']).trim().split('\n');
if (files.some(path => forbidden.test(path))) throw new Error('Forbidden tracked file');
if (call(['status', '--porcelain', '--untracked-files=no']).trim()) throw new Error('Commit tracked changes before export');
const output = join(root, '.publication');
mkdirSync(output, { recursive: true });
const archive = join(output, 'problem-pinata-solvepop.zip');
call(['archive', '--format=zip', `--output=${archive}`, 'HEAD']);
const bytes = call(['archive', '--format=zip', 'HEAD'], true);
const report = {
  format: 'local-publication-audit/1', ok: true, published: false,
  commit: call(['rev-parse', 'HEAD']).trim(), scanned_history_blobs: blobs,
  scanned_commit_and_tag_objects: commitAndTagObjects,
  files, archive: '.publication/problem-pinata-solvepop.zip',
  bytes: statSync(archive).size, sha256: createHash('sha256').update(bytes).digest('hex'),
  limits: 'Pattern scan, not proof that all secrets are absent; excludes ignored local files by construction.',
  blockers: ['Actual launched coin and LAUNCH.json pending', 'Expected make.fun handle differs from authenticated handle; confirm before entry', 'Launch funding and final submission approval pending'],
};
writeFileSync(join(output, 'publication-audit.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
