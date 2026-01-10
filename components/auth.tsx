'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { Loading01Icon } from '@hugeicons/core-free-icons'
import { authClient } from '@/lib/auth-client'

type Provider = 'google' | 'apple' | 'github'

export function Auth() {
  const [isLoading, setIsLoading] = React.useState<Provider | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSignIn(provider: Provider) {
    setIsLoading(provider)
    setError(null)
    try {
      await authClient.signIn.social({ provider, callbackURL: '/dashboard' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(null)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Sign in to continue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {error && (
          <p className="text-destructive text-center text-sm">{error}</p>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSignIn('google')}
          disabled={isLoading !== null}
        >
          {isLoading === 'google' ? (
            <HugeiconsIcon
              icon={Loading01Icon}
              strokeWidth={2}
              className="animate-spin"
              data-icon="inline-start"
            />
          ) : (
            <GoogleIcon />
          )}
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSignIn('apple')}
          disabled={isLoading !== null}
        >
          {isLoading === 'apple' ? (
            <HugeiconsIcon
              icon={Loading01Icon}
              strokeWidth={2}
              className="animate-spin"
              data-icon="inline-start"
            />
          ) : (
            <AppleIcon />
          )}
          Continue with Apple
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSignIn('github')}
          disabled={isLoading !== null}
        >
          {isLoading === 'github' ? (
            <HugeiconsIcon
              icon={Loading01Icon}
              strokeWidth={2}
              className="animate-spin"
              data-icon="inline-start"
            />
          ) : (
            <GitHubIcon />
          )}
          Continue with GitHub
        </Button>
      </CardContent>
    </Card>
  )
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 256 262" data-icon="inline-start">
      <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
      <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
      <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
      <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="size-4 fill-current" viewBox="0 0 256 315" data-icon="inline-start">
      <path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615-.35 1.116-6.599 22.563-21.757 44.716-13.104 19.153-26.705 38.235-48.13 38.63-21.05.388-27.82-12.483-51.888-12.483-24.061 0-31.582 12.088-51.51 12.871-20.68.783-36.428-20.71-49.64-39.793-27-39.033-47.633-110.3-19.928-158.406 13.763-23.89 38.36-39.017 65.056-39.405 20.307-.387 39.475 13.662 51.889 13.662 12.406 0 35.699-16.895 60.186-14.414 10.25.427 39.026 4.14 57.503 31.186-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199-15.826.636-34.962 10.546-46.314 23.828-10.173 11.763-19.082 30.589-16.678 48.633 17.64 1.365 35.66-8.964 46.64-22.262"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="size-4 fill-current" viewBox="0 0 256 250" data-icon="inline-start">
      <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Z"/>
    </svg>
  )
}
