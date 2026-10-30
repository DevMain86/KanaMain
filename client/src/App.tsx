import kanaData from './data/kana.json'
import type {KanaCard} from './types/kana'

const cards = kanaData as KanaCard[]

function App() {
  return (
    <main style={{padding: '2rem', textAlign: 'center'}}>
      <h1>KanaMain</h1>
      <p style={{ fontFamily: 'var(--font-kana)', fontSize: '2rem' }}>
        カナマイン
      </p>
      <p>{cards.length} cards loaded. Coming soon.</p>
    </main>
  )
}

export default App