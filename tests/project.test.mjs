import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { inflateSync, crc32 } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'solvepop-test-'));
  const bot = join(dir, 'bot'); const output = join(dir, 'output');
  mkdirSync(bot); mkdirSync(output);
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return { bot, output };
}
function run(f, args = []) {
  return spawnSync(process.execPath, [
    '--permission', `--allow-fs-read=${root}`, `--allow-fs-read=${f.bot}`,
    `--allow-fs-write=${f.output}`, join(root, 'main.ts'), ...args,
  ], { env: { ...process.env, MAKEFUN_BOT_DIR: f.bot, MAKEFUN_OUTPUT_DIR: f.output },
    encoding: 'utf8', timeout: 60000 });
}
function syntheticLaunch(f, changes = {}) {
  // Shape-only fixtures: these values are NOT a real coin or transaction.
  const value = { mint: '1'.repeat(32), create_signature: '1'.repeat(64), ...changes };
  writeFileSync(join(f.bot, 'LAUNCH.json'), JSON.stringify(value));
}

test('offline preparation produces deterministic assets with restricted permissions', t => {
  const a = fixture(t); const b = fixture(t);
  const ra = run(a, ['--prepare']); const rb = run(b, ['--prepare']);
  assert.equal(ra.status, 0, ra.stderr); assert.equal(rb.status, 0, rb.stderr);
  assert.deepEqual(readdirSync(a.output).sort(), ['logo.png', 'metadata.draft.json']);
  for (const file of readdirSync(a.output))
    assert.deepEqual(readFileSync(join(a.output, file)), readFileSync(join(b.output, file)));
});
test('PNG dimensions, compressed pixel stream and size satisfy image limits', t => {
  const f = fixture(t); assert.equal(run(f, ['--prepare']).status, 0);
  const png = readFileSync(join(f.output, 'logo.png'));
  assert.deepEqual([...png.subarray(0, 8)], [137,80,78,71,13,10,26,10]);
  assert.equal(png.readUInt32BE(16), 512); assert.equal(png.readUInt32BE(20), 512);
  assert.ok(png.length < 5 * 1024 * 1024);
  const idat = []; const types = [];
  for (let p = 8; p < png.length;) {
    const length = png.readUInt32BE(p); const type = png.toString('ascii', p + 4, p + 8);
    assert.ok(p + 12 + length <= png.length); types.push(type);
    assert.equal(crc32(png.subarray(p + 4, p + 8 + length)), png.readUInt32BE(p + 8 + length));
    if (type === 'IDAT') idat.push(png.subarray(p + 8, p + 8 + length));
    p += 12 + length;
  }
  assert.deepEqual(types, ['IHDR', 'IDAT', 'IEND']);
  const rows = inflateSync(Buffer.concat(idat));
  assert.equal(rows.length, 512 * (512 * 4 + 1));
  for (let y = 0; y < 512; y++) assert.equal(rows[y * 2049], 0);
});
test('metadata contains the required promotion and matches root generated copies', t => {
  const f = fixture(t); assert.equal(run(f, ['--prepare']).status, 0);
  const m = JSON.parse(readFileSync(join(f.output, 'metadata.draft.json'), 'utf8'));
  assert.equal(m.website, 'https://make.fun/bounty/makefun-coin-promo-01');
  assert.ok(m.description.includes(m.website));
  assert.match(m.description, /Created for the make.fun coin-promotion bounty/);
  assert.match(m.description, /coding bounty competition platform/);
  assert.equal(m.name, 'PROBLEM PINATA'); assert.equal(m.symbol, 'SOLVEPOP');
  assert.match(m.description, /^The prize is inside the problem\./);
  assert.match(m.description, /people and AI agents/);
  assert.match(m.description, /compete for the prize/);
  assert.doesNotMatch(JSON.stringify(m), /BOTPAY|BOT GOT PAID/);
  assert.equal(m.image, 'logo.png');
  for (const file of ['logo.png', 'metadata.draft.json'])
    assert.deepEqual(readFileSync(join(root, file)), readFileSync(join(f.output, file)));
});
test('bounty mode refuses an absent launch instead of inventing one', t => {
  const f = fixture(t); const r = run(f);
  assert.notEqual(r.status, 0); assert.match(r.stderr, /LAUNCH.json is required/);
  assert.equal(existsSync(join(f.output, 'LAUNCH.json')), false);
});
test('preparation ignores an existing malformed launch record', t => {
  const f = fixture(t);
  const source = join(f.bot, 'LAUNCH.json');
  writeFileSync(source, 'deliberately invalid JSON');
  const r = run(f, ['--prepare']);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(readFileSync(source, 'utf8'), 'deliberately invalid JSON');
  assert.equal(existsSync(join(f.output, 'LAUNCH.json')), false);
});
test('shape-valid synthetic fixture is copied byte-for-byte on two runs', t => {
  const a = fixture(t); const b = fixture(t); syntheticLaunch(a); syntheticLaunch(b);
  for (const f of [a, b]) {
    const r = run(f); assert.equal(r.status, 0, r.stderr);
    assert.deepEqual(readFileSync(join(f.bot, 'LAUNCH.json')), readFileSync(join(f.output, 'LAUNCH.json')));
  }
  for (const file of readdirSync(a.output))
    assert.deepEqual(readFileSync(join(a.output, file)), readFileSync(join(b.output, file)));
});
test('invalid base58 and wrong decoded lengths are refused', t => {
  for (const changes of [{ mint: '0'.repeat(32) }, { mint: '2'.repeat(32) },
    { create_signature: '1'.repeat(32) }]) {
    const f = fixture(t); syntheticLaunch(f, changes);
    const r = run(f); assert.notEqual(r.status, 0); assert.match(r.stderr, /base58|decode/);
    assert.equal(existsSync(join(f.output, 'LAUNCH.json')), false);
  }
});
test('oversized and non-object launch records are refused', t => {
  for (const value of ['[]', 'null', '{bad json', JSON.stringify({ padding: 'x'.repeat(16384) })]) {
    const f = fixture(t); writeFileSync(join(f.bot, 'LAUNCH.json'), value);
    assert.notEqual(run(f).status, 0);
    assert.equal(existsSync(join(f.output, 'LAUNCH.json')), false);
  }
});
