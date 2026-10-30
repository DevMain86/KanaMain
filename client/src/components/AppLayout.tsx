import { Link, Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <>
      <header className="topbar">
        <Link to="/" className="topbar__home">
          KanaMain
        </Link>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </>
  )
}