import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getLocalStorageAuthToken } from 'src/services/storage/auth'
import { updateApplicationAuthState } from 'src/shared/stores/auth'

import Router from 'src/routes'

const queryClient = new QueryClient()

export default function App() {
  useEffect(() => {
    const token = getLocalStorageAuthToken()

    if (!token) {
      return
    }

    updateApplicationAuthState(token)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}
