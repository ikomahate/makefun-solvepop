// Offline preparation and bounty entrypoint. No wallet, signing or network code.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const root = resolve(process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url)));
const output = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? join(root, 'output'));
const prepare = process.argv.includes('--prepare');
const website = 'https://make.fun/bounty/makefun-coin-promo-01';
const metadata = {
  name: 'BOT GOT PAID', symbol: 'BOTPAY',
  description: 'You prompted. It clocked in. make.fun posted the bounty. BOTPAY is the meme of AI getting its first job: people and AI agents build software for cash rewards on make.fun, a coding bounty competition platform. Created for the make.fun coin-promotion bounty: ' + website + ' Community-created meme token; no make.fun affiliation, ownership or reward rights. The robot receipt is fictional, not proof of earnings.',
  website, image: 'logo.png',
};

type Color = readonly [number, number, number];
const size = 512;
const pixels = Buffer.alloc(size * size * 4);
const ink: Color = [15, 23, 42];
const mint: Color = [92, 245, 177];
const paper: Color = [255, 247, 224];
const coral: Color = [255, 129, 119];
function pixel(x: number, y: number, color: Color) {
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  const i = (y * size + x) * 4;
  pixels[i] = color[0]; pixels[i + 1] = color[1];
  pixels[i + 2] = color[2]; pixels[i + 3] = 255;
}
function rect(x: number, y: number, w: number, h: number, color: Color) {
  for (let yy = y; yy < y + h; yy++)
    for (let xx = x; xx < x + w; xx++) pixel(xx, yy, color);
}
function circle(cx: number, cy: number, r: number, color: Color) {
  for (let y = cy - r; y <= cy + r; y++)
    for (let x = cx - r; x <= cx + r; x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r ** 2) pixel(x, y, color);
}
function line(x1: number, y1: number, x2: number, y2: number, width: number, color: Color) {
  const n = Math.max(1, Math.abs(x2 - x1), Math.abs(y2 - y1));
  for (let i = 0; i <= n; i++)
    circle(Math.round(x1 + (x2 - x1) * i / n), Math.round(y1 + (y2 - y1) * i / n), width, color);
}
function roundRect(x: number, y: number, w: number, h: number, r: number, color: Color) {
  rect(x + r, y, w - r * 2, h, color);
  rect(x, y + r, w, h - r * 2, color);
  for (const xx of [x + r, x + w - r - 1])
    for (const yy of [y + r, y + h - r - 1]) circle(xx, yy, r, color);
}

rect(0, 0, size, size, ink);
circle(256, 256, 228, mint);
circle(256, 256, 213, ink);
rect(249, 81, 14, 55, paper);
circle(256, 78, 18, coral);
roundRect(91, 167, 42, 76, 13, paper);
roundRect(379, 167, 42, 76, 13, paper);
roundRect(123, 125, 266, 168, 35, mint);
roundRect(154, 155, 204, 104, 24, ink);
circle(197, 196, 15, paper);
circle(315, 196, 15, paper);
line(227, 229, 256, 240, 5, mint);
line(256, 240, 285, 229, 5, mint);
roundRect(162, 273, 188, 158, 8, paper);
for (let y = 273; y < 305; y++) rect(318, y, y - 272, 1, coral);
rect(187, 298, 105, 8, ink);
rect(187, 318, 72, 6, ink);
line(208, 363, 241, 391, 9, ink);
line(241, 391, 306, 345, 9, ink);
circle(149, 326, 24, mint);
circle(363, 326, 24, mint);

function crc32(bytes: Buffer) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Buffer) {
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const length = Buffer.alloc(4); length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4); checksum.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, checksum]);
}
const header = Buffer.alloc(13);
header.writeUInt32BE(size, 0); header.writeUInt32BE(size, 4);
header[8] = 8; header[9] = 6;
const rows = Buffer.alloc(size * (size * 4 + 1));
for (let y = 0; y < size; y++)
  pixels.copy(rows, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
const logo = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header),
  chunk('IDAT', deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0)),
]);

mkdirSync(output, { recursive: true });
writeFileSync(join(output, 'logo.png'), logo);
writeFileSync(join(output, 'metadata.draft.json'), JSON.stringify(metadata, null, 2) + '\n');
const launchPath = join(root, 'LAUNCH.json');
if (prepare) {
  // Preparation never reads or copies launch records, even if one exists.
  console.log('Prepared artwork and draft metadata only; launch records were not accessed.');
} else if (existsSync(launchPath)) {
  const launch = readFileSync(launchPath);
  if (root === output) throw new Error('Launch output must be separate from the repository.');
  if (launch.length > 16384) throw new Error('LAUNCH.json exceeds the official 16384-byte limit.');
  const record = JSON.parse(launch.toString('utf8'));
  if (!record || typeof record !== 'object' || Array.isArray(record))
    throw new Error('LAUNCH.json must contain an object.');
  function base58Bytes(value: unknown, field: string, bytes: number) {
    if (typeof value !== 'string' || !/^[1-9A-HJ-NP-Za-km-z]+$/.test(value))
      throw new Error(`${field} must be base58.`);
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let n = 0n;
    for (const char of value) n = n * 58n + BigInt(alphabet.indexOf(char));
    let length = 0;
    while (n > 0n) { length++; n >>= 8n; }
    length += value.match(/^1*/)?.[0].length ?? 0;
    if (length !== bytes) throw new Error(`${field} must decode to ${bytes} bytes.`);
  }
  base58Bytes(record.mint, 'mint', 32);
  base58Bytes(record.create_signature, 'create_signature', 64);
  writeFileSync(join(output, 'LAUNCH.json'), launch);
  console.log('Copied LAUNCH.json. On-chain verification remains the house gate.');
} else {
  throw new Error('LAUNCH.json is required for the bounty. Use --prepare for offline assets only.');
}
