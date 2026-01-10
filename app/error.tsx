'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <Image
          src="/fine.webp"
          alt="This is fine"
          width={200}
          height={100}
          className="mx-auto mb-6 rounded-lg"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Don't worry, it happens to the best of us.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="outline" render={<Link href="/" />}>
            Go home
          </Button>
          <Button onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
