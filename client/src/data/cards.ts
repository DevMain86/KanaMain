import type { KanaCard } from '../types/kana'
import raw from './kana.json'
import {parseCards} from './parseCards.ts'

export const allCards: readonly KanaCard[] = parseCards(raw)