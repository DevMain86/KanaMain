import { Link } from 'react-router'

const menu = [
  { to: '/play', label: 'Play now' },
  { to: '/study', label: 'Study' },
  { to: '/stats', label: 'Stats' },
  { to: '/about', label: 'About' },
]

export default function Home() {
  return (
    <main className="home">
      {/* Placeholder until the SVG logo is added. */}
      <h1 className="home__title">KanaMain</h1>
      <p className="home__kana" lang="ja">
        カナマイン
      </p>
      <nav aria-label="Main menu">
        <ul className="menu">
          {menu.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="menu__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}