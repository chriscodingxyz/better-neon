import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center space-y-4">
        <p className="text-9xl font-bold tracking-tighter text-muted-foreground/20">404</p>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground text-sm">
            This page doesn&apos;t exist. Maybe it never did.
          </p>
        </div>
        <div className="pt-4">
          <Button className="rounded-full px-8" render={<Link href="/" />}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
