'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export function SignOutButton({ children = 'Sign out', ...props }: React.ComponentProps<typeof Button>) {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <Button onClick={handleSignOut} {...props}>
      {children}
    </Button>
  )
}
