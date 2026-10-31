import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@fontsource/kosugi/400.css'
import '@fontsource/zen-old-mincho/400.css'
import '@fontsource/zen-old-mincho/700.css'
import './index.css'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

