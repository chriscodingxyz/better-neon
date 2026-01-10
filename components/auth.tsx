'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth-client'

type Provider = 'google' | 'apple' | 'github'

const LAST_PROVIDER_KEY = 'better-neon-last-provider'

export function Auth() {
  const [isLoading, setIsLoading] = React.useState<Provider | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [lastUsed, setLastUsed] = React.useState<Provider | null>(null)

  React.useEffect(() => {
    const stored = localStorage.getItem(LAST_PROVIDER_KEY) as Provider | null
    if (stored) setLastUsed(stored)
  }, [])

  async function handleSignIn(provider: Provider) {
    setIsLoading(provider)
    setError(null)
    localStorage.setItem(LAST_PROVIDER_KEY, provider)
    try {
      await authClient.signIn.social({ provider, callbackURL: '/dashboard' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(null)
    }
  }

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-base">Welcome</CardTitle>
        <CardDescription>Sign in to continue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {error && (
          <p className="text-destructive text-center text-xs">{error}</p>
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => handleSignIn('google')}
          disabled={isLoading !== null}
        >
          {isLoading === 'google' ? (
            <Spinner size="xs" />
          ) : (
            <Image src="/icons/google.svg" alt="" width={14} height={14} className="size-3.5" />
          )}
          <span className="flex-1 text-left">Google</span>
          {lastUsed === 'google' && <Badge variant="secondary" className="text-[9px]">Last</Badge>}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => handleSignIn('apple')}
          disabled={isLoading !== null}
        >
          {isLoading === 'apple' ? (
            <Spinner size="xs" />
          ) : (
            <Image src="/icons/apple.svg" alt="" width={14} height={14} className="size-3.5" />
          )}
          <span className="flex-1 text-left">Apple</span>
          {lastUsed === 'apple' && <Badge variant="secondary" className="text-[9px]">Last</Badge>}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => handleSignIn('github')}
          disabled={isLoading !== null}
        >
          {isLoading === 'github' ? (
            <Spinner size="xs" />
          ) : (
            <Image src="/icons/github_light.svg" alt="" width={14} height={14} className="size-3.5" />
          )}
          <span className="flex-1 text-left">GitHub</span>
          {lastUsed === 'github' && <Badge variant="secondary" className="text-[9px]">Last</Badge>}
        </Button>
      </CardContent>
    </Card>
  )
}
