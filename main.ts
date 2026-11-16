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
  name: 'PROBLEM PINATA', symbol: 'SOLVEPOP',
  description: 'The prize is inside the problem. Meet the Problem Pinata: bring your AI, crack a make.fun coding bounty, and compete for the prize. make.fun is a coding bounty competition platform where people and AI agents build software for cash rewards. This pinata holds a challenge: working code earns its shot at the prize. Created for the make.fun coin-promotion bounty: ' + website + ' Community-created meme token; no make.fun affiliation or reward rights. The pinata is a metaphor, not a payout promise.',
  website, image: 'logo.png',
};

type Color = readonly [number, number, number];
const size = 512;
const pixels = Buffer.alloc(size * size * 4);
const ink: Color = [15, 23, 42];
const mint: Color = [87, 239, 202];
const paper: Color = [255, 247, 224];
const coral: Color = [255, 101, 125];
const violet: Color = [151, 101, 255];
const gold: Color = [255, 209, 84];
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

type Point = readonly [number, number];
function polygon(points: Point[], color: Color | ((x: number, y: number) => Color)) {
  const top = Math.max(0, Math.floor(Math.min(...points.map(p => p[1]))));
  const bottom = Math.min(size - 1, Math.ceil(Math.max(...points.map(p => p[1]))));
  for (let y = top; y <= bottom; y++) {
    const hits: number[] = [];
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length];
      if ((a[1] <= y + 0.5 && b[1] > y + 0.5) || (b[1] <= y + 0.5 && a[1] > y + 0.5))
        hits.push(a[0] + (y + 0.5 - a[1]) * (b[0] - a[0]) / (b[1] - a[1]));
    }
    hits.sort((a, b) => a - b);
    for (let i = 0; i + 1 < hits.length; i += 2)
      for (let x = Math.max(0, Math.ceil(hits[i])); x < Math.min(size, hits[i + 1]); x++)
        pixel(x, y, typeof color === 'function' ? color(x, y) : color);
  }
}
function star(radius: number, inner: number): Point[] {
  return Array.from({ length: 14 }, (_, i) => {
    const angle = -Math.PI / 2 + i * Math.PI / 7;
    const r = i % 2 ? inner : radius;
    return [256 + Math.cos(angle) * r, 231 + Math.sin(angle) * r] as Point;
  });
}

// Seven-point paper pinata, a code-shaped crack, and the prize revealed inside.
rect(0, 0, size, size, ink);
circle(256, 235, 215, [23, 35, 59]);
line(256, 14, 256, 62, 4, paper);
polygon(star(192, 117), ink);
polygon(star(179, 106), (_x, y) => [coral, gold, mint, violet][Math.floor(y / 36) % 4]);
// Short fringe cuts sell the paper construction without small lettering.
for (const y of [124, 160, 196, 268, 304, 340])
  for (let x = 190; x <= 320; x += 18) line(x, y, x, y + 7, 1, ink);
polygon([[245, 93], [271, 157], [253, 192], [281, 230], [253, 271],
  [271, 314], [242, 370], [247, 296], [222, 256], [242, 215], [225, 169]], ink);
polygon([[256, 167], [318, 232], [256, 305], [194, 232]], ink);
// Trophy emerges through the opening; code brackets flank it.
line(224, 215, 211, 215, 5, gold);
line(211, 215, 213, 240, 5, gold);
line(213, 240, 232, 248, 5, gold);
line(286, 215, 300, 215, 5, gold);
line(300, 215, 298, 240, 5, gold);
line(298, 240, 279, 248, 5, gold);
polygon([[226, 204], [284, 204], [280, 247], [268, 261], [242, 261], [230, 247]], gold);
rect(248, 257, 14, 27, gold);
roundRect(230, 280, 51, 10, 3, gold);
line(237, 216, 237, 234, 3, paper);
line(184, 213, 165, 231, 5, ink);
line(165, 231, 184, 249, 5, ink);
line(328, 213, 347, 231, 5, ink);
line(347, 231, 328, 249, 5, ink);
// A code cursor is the party stick: solve the challenge to reach the prize.
line(106, 372, 170, 303, 10, ink);
line(106, 372, 170, 303, 5, paper);
polygon([[160, 284], [193, 296], [176, 321]], mint);
for (const [x, y, color] of [[77, 153, coral], [419, 122, gold], [416, 331, mint]] as const)
  rect(x, y, 10, 18, color);
circle(107, 90, 5, mint); circle(389, 376, 5, coral);

// Original bitmap lettering, not a copied official logo.
const glyphs: Record<string, string[]> = {
  M: ['10001','11011','10101','10101','10001','10001','10001'],
  A: ['01110','10001','10001','11111','10001','10001','10001'],
  K: ['10001','10010','10100','11000','10100','10010','10001'],
  E: ['11111','10000','10000','11110','10000','10000','11111'],
  '.': ['00000','00000','00000','00000','00000','00100','00100'],
  F: ['11111','10000','10000','11110','10000','10000','10000'],
  U: ['10001','10001','10001','10001','10001','10001','01110'],
  N: ['10001','11001','11001','10101','10011','10011','10001'],
};
for (const [i, char] of [...'MAKE.FUN'].entries())
  glyphs[char].forEach((row, y) => [...row].forEach((bit, x) => {
    if (bit === '1') rect(115 + i * 36 + x * 6, 442 + y * 6, 6, 6, paper);
  }));

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
