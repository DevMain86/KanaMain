import type { KanaCard, Script, Variant } from '../types/kana.ts'

const isScript = (value: unknown): value is Script =>
  value === 'hiragana' || value === 'katakana'

const isVariant = (value: unknown): value is Variant =>
  value === 'monographs' || value === 'diacritics' || value === 'digraphs'

function parseCard(value: unknown, index: number): KanaCard {
  if (typeof value !== 'object' || value === null) {
    throw new Error(`Card ${index}: expected an object`)
  }
  const { id, script, variant, kana, romaji, accepted } = value as Record<string, unknown>

  if (typeof id !== 'string' || id === '') throw new Error(`Card ${index}: missing id`)
  if (!isScript(script)) throw new Error(`Card ${id}: unknown script "${String(script)}"`)
  if (!isVariant(variant)) throw new Error(`Card ${id}: unknown variant "${String(variant)}"`)
  if (typeof kana !== 'string' || kana === '') throw new Error(`Card ${id}: missing kana`)
  if (typeof romaji !== 'string' || romaji === '') throw new Error(`Card ${id}: missing romaji`)
  if (!Array.isArray(accepted) || !accepted.every((a) => typeof a === 'string')) {
    throw new Error(`Card ${id}: accepted must be a list of strings`)
  }
  if (!accepted.includes(romaji)) {
    throw new Error(`Card ${id}: accepted spellings must include "${romaji}"`)
  }

  return { id, script, variant, kana, romaji, accepted: accepted as string[] }
}

/** Checks raw JSON and returns typed cards, or throws a clear error. */
export function parseCards(raw: unknown): KanaCard[] {
  if (!Array.isArray(raw)) throw new Error('Card data must be an array')
  const cards = raw.map(parseCard)
  if (new Set(cards.map((card) => card.id)).size !== cards.length) {
    throw new Error('Card data contains duplicate ids')
  }
  return cards
}