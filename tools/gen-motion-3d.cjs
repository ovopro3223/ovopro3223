// Generates assets/motion-3d.svg: a true-3D rotating cube (SMIL keyframes),
// a spinning wireframe globe and a floating isometric stack. No JavaScript in the output.
const fs = require("fs");
const out = process.argv[2];
const K = 36, DUR = 16;
const f1 = (n) => (Math.round(n * 10) / 10).toString();

const tilt = (24 * Math.PI) / 180;
function rot(v, th) {
  const [x, y, z] = v;
  const x1 = x * Math.cos(th) + z * Math.sin(th), z1 = -x * Math.sin(th) + z * Math.cos(th);
  const y2 = y * Math.cos(tilt) - z1 * Math.sin(tilt), z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt);
  return [x1, y2, z2];
}
function proj(v, th, s, cx, cy, d = 4.2) {
  const [x, y, z] = rot(v, th);
  const p = d / (d - z);
  return { x: cx + x * s * p, y: cy - y * s * p, z };
}
const V = [...Array(8)].map((_, i) => [i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1]);
const E = [];
for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) if (((a ^ b) & ((a ^ b) - 1)) === 0) E.push([a, b]);
const F = [
  { n: [1, 0, 0], v: [1, 3, 7, 5], c: "#00D4FF" }, { n: [-1, 0, 0], v: [0, 2, 6, 4], c: "#00D4FF" },
  { n: [0, 1, 0], v: [2, 3, 7, 6], c: "#7C5CFF" }, { n: [0, -1, 0], v: [0, 1, 5, 4], c: "#7C5CFF" },
  { n: [0, 0, 1], v: [4, 5, 7, 6], c: "#A493FF" }, { n: [0, 0, -1], v: [0, 1, 3, 2], c: "#A493FF" },
];
const anim = (attr, vals) =>
  `<animate attributeName="${attr}" values="${vals.join(";")}" dur="${DUR}s" repeatCount="indefinite"/>`;

function cube({ s, cx, cy, dir, color, faces, dots, oMin, oMax, wMin, wMax }) {
  const frames = [...Array(K + 1)].map((_, k) => (dir * 2 * Math.PI * k) / K);
  let g = "";
  if (faces)
    for (const f of F) {
      const pts = frames.map((th) => f.v.map((i) => { const p = proj(V[i], th, s, cx, cy); return `${f1(p.x)},${f1(p.y)}`; }).join(" "));
      const op = frames.map((th) => { const nz = rot(f.n, th)[2]; return f1(nz > 0 ? 0.03 + 0.13 * nz : 0.015) ; });
      g += `<polygon fill="${f.c}" points="${pts[0]}">${anim("points", pts)}${anim("fill-opacity", op)}</polygon>`;
    }
  for (const [a, b] of E) {
    const P = frames.map((th) => [proj(V[a], th, s, cx, cy), proj(V[b], th, s, cx, cy)]);
    const t = P.map(([p, q]) => ((p.z + q.z) / 2 + 1.74) / 3.48);
    g += `<line stroke="${color}" stroke-linecap="round" x1="${f1(P[0][0].x)}" y1="${f1(P[0][0].y)}" x2="${f1(P[0][1].x)}" y2="${f1(P[0][1].y)}">` +
      anim("x1", P.map(([p]) => f1(p.x))) + anim("y1", P.map(([p]) => f1(p.y))) +
      anim("x2", P.map(([, q]) => f1(q.x))) + anim("y2", P.map(([, q]) => f1(q.y))) +
      anim("stroke-opacity", t.map((v) => f1(oMin + (oMax - oMin) * v))) +
      anim("stroke-width", t.map((v) => f1(wMin + (wMax - wMin) * v))) + `</line>`;
  }
  if (dots)
    for (let i = 0; i < 8; i++) {
      const P = frames.map((th) => proj(V[i], th, s, cx, cy));
      const t = P.map((p) => (p.z + 1.74) / 3.48);
      g += `<circle fill="#FFFFFF" cx="${f1(P[0].x)}" cy="${f1(P[0].y)}" r="2">` +
        anim("cx", P.map((p) => f1(p.x))) + anim("cy", P.map((p) => f1(p.y))) +
        anim("r", t.map((v) => f1(1.6 + 2.2 * v))) + anim("fill-opacity", t.map((v) => f1(0.3 + 0.7 * v))) + `</circle>`;
    }
  return g;
}

// Globe: 6 meridians whose rx follows |cos| as the sphere spins (period 180°).
const GX = 855, GY = 225, GR = 80, GK = 36;
let globe = "";
for (let i = 0; i < 6; i++) {
  const vals = [...Array(GK + 1)].map((_, k) => f1(GR * Math.abs(Math.cos((i * Math.PI) / 6 + (Math.PI * k) / GK))));
  globe += `<ellipse cx="${GX}" cy="${GY}" rx="${vals[0]}" ry="${GR}" fill="none" stroke="#00D4FF" stroke-opacity=".45" stroke-width="1.1">` +
    `<animate attributeName="rx" values="${vals.join(";")}" dur="9s" repeatCount="indefinite"/></ellipse>`;
}
for (const lat of [-60, -30, 0, 30, 60]) {
  const r = lat * Math.PI / 180, y = GY - GR * Math.sin(r), hw = GR * Math.cos(r);
  globe += `<line x1="${f1(GX - hw)}" y1="${f1(y)}" x2="${f1(GX + hw)}" y2="${f1(y)}" stroke="#FFFFFF" stroke-opacity="${lat === 0 ? ".35" : ".16"}"/>`;
}
const RX = 128, RY = 30;
const ringPath = `M${GX},${GY + RY} A${RX},${RY} 0 1 1 ${GX},${GY - RY} A${RX},${RY} 0 1 1 ${GX},${GY + RY}`;
const particle = (color, r, begin) =>
  `<circle r="${r}" fill="${color}"><animateMotion dur="10s" begin="${begin}" repeatCount="indefinite" path="${ringPath}"/>` +
  `<animate attributeName="r" values="${r};${r * 0.45};${r}" keyTimes="0;.5;1" dur="10s" begin="${begin}" repeatCount="indefinite"/>` +
  `<animate attributeName="fill-opacity" values="1;.25;1" keyTimes="0;.5;1" dur="10s" begin="${begin}" repeatCount="indefinite"/></circle>`;

// Isometric stack.
const SX = 1090, tiles = [["Studio", "#7C5CFF", 140], ["API", "#5B7CFF", 186], ["Renderer", "#00B4D8", 232], ["Data", "#00D4FF", 278]];
let stack = "";
tiles.forEach(([label, c, y], i) => {
  stack += `<g class="t t${i}">` +
    `<path d="M${SX - 72},${y + 12} L${SX},${y + 48} L${SX + 72},${y + 12} L${SX + 72},${y} L${SX},${y + 36} L${SX - 72},${y} Z" fill="${c}" fill-opacity=".22"/>` +
    `<path d="M${SX},${y - 36} L${SX + 72},${y} L${SX},${y + 36} L${SX - 72},${y} Z" fill="${c}" fill-opacity=".38" stroke="${c}" stroke-opacity=".9" stroke-width="1.2"/>` +
    `<text class="f" x="${SX}" y="${y + 5}" font-size="14" font-weight="600" fill="#FFFFFF" text-anchor="middle">${label}</text></g>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="440" viewBox="0 0 1200 440" role="img" aria-labelledby="t d">
  <title id="t">Motion and 3D, native to Atlas</title>
  <desc id="d">A rotating wireframe cube, a spinning globe and a floating isometric stack of the Studio, API, Renderer and Data layers. Pure SVG with SMIL animation.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070A1A"/><stop offset=".6" stop-color="#0B1233"/><stop offset="1" stop-color="#160B30"/></linearGradient>
    <radialGradient id="gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#7C5CFF" stop-opacity=".32"/><stop offset="1" stop-color="#7C5CFF" stop-opacity="0"/></radialGradient>
    <radialGradient id="sph" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#4B3CC9" stop-opacity=".55"/><stop offset="1" stop-color="#0B1233" stop-opacity=".2"/></radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#FFFFFF" stroke-opacity=".045"/></pattern>
    <clipPath id="card"><rect width="1200" height="440" rx="22"/></clipPath>
  </defs>
  <style>
    .f{font-family:system-ui,-apple-system,'Segoe UI',Roboto,Inter,Helvetica,Arial,sans-serif}
    .t{animation:fl 5s ease-in-out infinite}.t1{animation-delay:-1.2s}.t2{animation-delay:-2.4s}.t3{animation-delay:-3.6s}
    @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    .pulse{animation:pu 3s ease-in-out infinite}
    @keyframes pu{0%,100%{opacity:.35}50%{opacity:1}}
  </style>
  <g clip-path="url(#card)">
    <rect width="1200" height="440" fill="url(#bg)"/>
    <rect width="1200" height="440" fill="url(#grid)"/>
    <ellipse cx="585" cy="225" rx="260" ry="200" fill="url(#gl)"/>
    <ellipse cx="855" cy="225" rx="220" ry="180" fill="url(#gl)"/>
    <text class="f" x="56" y="150" font-size="28" font-weight="700" fill="#FFFFFF">Motion &amp; 3D, native to Atlas</text>
    <g class="f" font-size="15" fill="#A9B4D8">
      <text x="56" y="196">One timeline engine for DOM, 3D and variables</text>
      <text x="56" y="226">R3F scenes with quality tiers and fallbacks</text>
      <text x="56" y="256">glTF pipeline · meshopt · LODs · KTX2</text>
    </g>
    <text class="f pulse" x="56" y="300" font-size="13" font-weight="600" letter-spacing="3" fill="#00D4FF">LIVE 3D PREVIEW</text>
    <text class="f" x="56" y="402" font-size="13" fill="#6B7699">Pure SVG + SMIL, no JavaScript, no video</text>
    ${cube({ s: 78, cx: 585, cy: 225, dir: 1, color: "#00D4FF", faces: true, dots: true, oMin: 0.22, oMax: 1, wMin: 1, wMax: 2.4 })}
    ${cube({ s: 32, cx: 585, cy: 225, dir: -1, color: "#C3B3FF", faces: false, dots: false, oMin: 0.2, oMax: 0.95, wMin: 0.8, wMax: 1.6 })}
    <g transform="rotate(-18 ${GX} ${GY})">
      <circle cx="${GX}" cy="${GY}" r="${GR}" fill="url(#sph)"/>
      ${globe}
      <ellipse cx="${GX}" cy="${GY}" rx="${RX}" ry="${RY}" fill="none" stroke="#FFFFFF" stroke-opacity=".14" stroke-dasharray="3 6"/>
      ${particle("#00D4FF", 5, "0s")}
      ${particle("#C3CCFF", 3.5, "-4.2s")}
    </g>
    <line x1="${SX}" y1="110" x2="${SX}" y2="330" stroke="#00D4FF" stroke-opacity=".35" stroke-dasharray="4 8">
      <animate attributeName="stroke-dashoffset" values="0;-96" dur="2.4s" repeatCount="indefinite"/></line>
    ${stack}
  </g>
</svg>
`;
fs.writeFileSync(out, svg);
console.log("wrote", out, svg.length, "bytes");
