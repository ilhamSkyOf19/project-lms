import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import route from './routes/index.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* provicer query client */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={route}
      />
    </QueryClientProvider>

  </StrictMode>,
)
