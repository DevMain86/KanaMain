import { describe, expect, it } from 'vitest'

import { allCards } from '../data/cards.ts'
import type { Script, Variant } from '../types/kana.ts'
import { selectCards } from './selectCards.ts'

// Card counts from the project brief: one script, then both scripts.
const cases: [Variant[], number, number][] = [
  [['monographs'], 46, 92],
  [['diacritics'], 25, 50],
  [['digraphs'], 36, 72],
  [['monographs', 'diacritics'], 71, 142],
  [['monographs', 'digraphs'], 82, 164],
  [['diacritics', 'digraphs'], 61, 122],
  [['monographs', 'diacritics', 'digraphs'], 107, 214],
]

describe('selectCards', () => {
  it.each(cases)('matches the brief for %j', (variants, one, both) => {
    const hiragana: Script[] = ['hiragana']
    const bothScripts: Script[] = ['hiragana', 'katakana']
    expect(selectCards(allCards, { scripts: hiragana, variants })).toHaveLength(one)
    expect(selectCards(allCards, { scripts: bothScripts, variants })).toHaveLength(both)
  })

  it('returns nothing when no script is chosen', () => {
    expect(selectCards(allCards, { scripts: [], variants: ['monographs'] })).toHaveLength(0)
  })
})