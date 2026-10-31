import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterEach, describe, expect, it } from 'vitest'

import { routes } from './router.tsx'

afterEach(cleanup)

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
}

describe('routes', () => {
  it('shows the four menu items on Home', () => {
    renderAt('/')
    for (const name of ['Play now', 'Study', 'Stats', 'About']) {
      expect(screen.getByRole('link', { name })).toBeTruthy()
    }
  })

  it.each([
    ['/study', 'Study'],
    ['/play', 'Play setup'],
    ['/play/run', 'Play'],
    ['/play/results', 'Results'],
    ['/stats', 'Stats'],
    ['/about', 'About'],
  ])('renders %s', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { name: heading })).toBeTruthy()
  })

  it('shows a not-found page for unknown paths', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeTruthy()
  })
})