// One-off script: converts the old kana.json to the new field names.
// Usage: node scripts/convert-kana.mjs <old-file> <new-file>
import { readFileSync, writeFileSync } from 'node:fs'

const [, , inPath, outPath] = process.argv
if (!inPath || !outPath) {
  console.error('Usage: node scripts/convert-kana.mjs <old-file> <new-file>')
  process.exit(1)
}

const old = JSON.parse(readFileSync(inPath, 'utf8'))
const variantNames = { basic: 'monographs', diacritics: 'diacritics', digraphs: 'digraphs' }

const cards = old.cards.map((c) => {
  const variant = variantNames[c.group]
  if (!variant) throw new Error(`Unknown group "${c.group}" on card ${c.id}`)
  const accepted = [...new Set([c.romaji, ...(c.variants ?? [])])]
  return { id: c.id, script: c.set, variant, kana: c.kana, romaji: c.romaji, accepted }
})

// Sanity checks: 46 / 25 / 36 cards per script, unique ids
const expected = { monographs: 46, diacritics: 25, digraphs: 36 }
for (const script of ['hiragana', 'katakana']) {
  for (const [variant, count] of Object.entries(expected)) {
    const n = cards.filter((c) => c.script === script && c.variant === variant).length
    if (n !== count) throw new Error(`${script} ${variant}: expected ${count}, found ${n}`)
  }
}
if (new Set(cards.map((c) => c.id)).size !== cards.length) throw new Error('Duplicate card ids')

writeFileSync(outPath, JSON.stringify(cards, null, 2) + '\n')
console.log(`Wrote ${cards.length} cards to ${outPath}`)