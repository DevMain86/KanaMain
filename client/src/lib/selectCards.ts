import type { KanaCard, Script, Variant } from '../types/kana.ts'

export interface CardFilter {
  scripts: readonly Script[]
  variants: readonly Variant[]
}

/** Returns the cards that match the chosen writing systems and variants. */
export function selectCards(cards: readonly KanaCard[], filter: CardFilter): KanaCard[] {
  return cards.filter(
    (card) => filter.scripts.includes(card.script) && filter.variants.includes(card.variant),
  )
}