export type Script = 'hiragana' | 'katakana'
export type Variant = 'monographs' | 'diacritics' | 'digraphs'

export interface KanaCard {
    id: string
    script: Script
    variant: Variant
    kana: string
    romaji: string
    /** Every romaji spelling that counts as correct, including `romaji`. */
    accepted: string[]
}