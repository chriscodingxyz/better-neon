'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth-client'

export function SignOutButton({ children = 'Sign out', ...props }: React.ComponentProps<typeof Button>) {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  async function handleSignOut() {
    setIsLoading(true)
    // 5 second delay to show spinner
    await new Promise(resolve => setTimeout(resolve, 5000))
    await authClient.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <Button onClick={handleSignOut} disabled={isLoading} {...props}>
      {isLoading ? <Spinner size="xs" /> : children}
    </Button>
  )
}
