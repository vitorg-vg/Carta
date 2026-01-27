const CACHE_NAME = "baralho-cache-v2";
const BASE = "https://deckofcardsapi.com/static/img/";

const valores = ["A","2","3","4","5","6","7","8","9","0","J","Q","K"];
const naipes = ["S","H","D","C"];

const CARTAS = [];
for (let v of valores)
  for (let n of naipes)
    CARTAS.push(`${BASE}${v}${n}.png`);

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  `${BASE}back.png`,
  ...CARTAS
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
