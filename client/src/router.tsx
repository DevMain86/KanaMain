import { createBrowserRouter, type RouteObject } from 'react-router'

import AppLayout from './components/AppLayout.tsx'
import About from './pages/About.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import Play from './pages/Play.tsx'
import PlaySetup from './pages/PlaySetup.tsx'
import Results from './pages/Results.tsx'
import Stats from './pages/Stats.tsx'
import Study from './pages/Study.tsx'

// Home is a standalone menu screen; every other page shares the layout.
export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  {
    element: <AppLayout />,
    children: [
      { path: 'study', element: <Study /> },
      { path: 'play', element: <PlaySetup /> },
      { path: 'play/run', element: <Play /> },
      { path: 'play/results', element: <Results /> },
      { path: 'stats', element: <Stats /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const router = createBrowserRouter(routes)