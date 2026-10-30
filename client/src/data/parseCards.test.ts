import { describe, expect, it } from 'vitest'

import { allCards } from './cards.ts'
import { parseCards } from './parseCards.ts'

const goodCard = {
  id: 'h-a',
  script: 'hiragana',
  variant: 'monographs',
  kana: 'あ',
  romaji: 'a',
  accepted: ['a'],
}

describe('the real card data', () => {
  it('has 214 cards', () => {
    expect(allCards).toHaveLength(214)
  })

  it.each([
    ['monographs', 46],
    ['diacritics', 25],
    ['digraphs', 36],
  ])('has %s cards in each script', (variant, count) => {
    for (const script of ['hiragana', 'katakana']) {
      const found = allCards.filter((c) => c.script === script && c.variant === variant)
      expect(found).toHaveLength(count)
    }
  })
})

describe('parseCards', () => {
  it('accepts a valid card', () => {
    expect(parseCards([goodCard])).toEqual([goodCard])
  })

  it('rejects data that is not an array', () => {
    expect(() => parseCards({ cards: [] })).toThrow('must be an array')
  })

  it('rejects an unknown variant', () => {
    expect(() => parseCards([{ ...goodCard, variant: 'basic' }])).toThrow('unknown variant')
  })

  it('rejects an accepted list that leaves out the romaji', () => {
    expect(() => parseCards([{ ...goodCard, accepted: ['x'] }])).toThrow('must include')
  })

  it('rejects duplicate ids', () => {
    expect(() => parseCards([goodCard, goodCard])).toThrow('duplicate ids')
  })
})