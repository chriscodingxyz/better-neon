'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
    <div className="w-full max-w-[300px] space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">Pick an account to continue</p>
      </div>

      <div className="space-y-2.5">
        {error && (
          <div className="rounded-xl bg-destructive/10 p-3 text-xs font-medium text-destructive">
            {error}
          </div>
        )}

        <SocialButton
          label="Continue with Google"
          icon="/icons/google.svg"
          isLoading={isLoading === 'google'}
          isLast={lastUsed === 'google'}
          disabled={isLoading !== null}
          onClick={() => handleSignIn('google')}
        />

        <SocialButton
          label="Continue with Apple"
          icon="/icons/apple.svg"
          isLoading={isLoading === 'apple'}
          isLast={lastUsed === 'apple'}
          disabled={isLoading !== null}
          onClick={() => handleSignIn('apple')}
        />

        <SocialButton
          label="Continue with GitHub"
          icon="/icons/github_light.svg"
          isLoading={isLoading === 'github'}
          isLast={lastUsed === 'github'}
          disabled={isLoading !== null}
          onClick={() => handleSignIn('github')}
        />
      </div>

      <p className="text-[10px] text-muted-foreground/70">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}

interface SocialButtonProps {
  label: string
  icon: string
  isLoading: boolean
  isLast: boolean
  disabled: boolean
  onClick: () => void
}

function SocialButton({ label, icon, isLoading, isLast, disabled, onClick }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      className="glass-card relative flex h-11 w-full items-center justify-start gap-3 rounded-xl border px-4 transition-colors duration-200"
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <Spinner size="xs" className="shrink-0" />
      ) : (
        <Image src={icon} alt="" width={18} height={18} className="shrink-0" />
      )}
      <span className="flex-1 text-left text-sm font-medium text-foreground">{label}</span>
      {isLast && (
        <Badge variant="secondary" className="mr-0 rounded-md px-1.5 py-0 text-[10px] font-normal text-muted-foreground opacity-70">
          Last used
        </Badge>
      )}
    </Button>
  )
}
