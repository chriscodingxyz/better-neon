import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <Image
          src="/gold.png"
          alt="Gold bar"
          width={80}
          height={80}
          className="mx-auto mb-6 opacity-50"
        />
        <h1 className="text-6xl font-bold tracking-tighter text-amber-500">404</h1>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          This page doesn't exist. Maybe it never did.
        </p>
        <Button className="mt-6" render={<Link href="/" />}>
          Back to safety
        </Button>
      </div>
    </div>
  )
}
