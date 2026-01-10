import Link from 'next/link'
import Image from 'next/image'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      {/* Hero */}
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4">Open Source Template</Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Better Neon
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          A minimal Next.js starter with auth, database, and types.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          {session ? (
            <>
              <Button size="sm" render={<Link href="/dashboard" />}>
                Dashboard
              </Button>
              <Button variant="outline" size="sm" render={<a href="https://github.com" target="_blank" rel="noopener" />}>
                GitHub
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" render={<Link href="/login" />}>
                Get Started
              </Button>
              <Button variant="outline" size="sm" render={<a href="https://github.com" target="_blank" rel="noopener" />}>
                GitHub
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stack */}
      <div className="space-y-4">
        {/* Next.js */}
        <div className="border-border flex items-center gap-4 rounded-lg border p-4">
          <Image src="/icons/nextjs_icon_dark.svg" alt="Next.js" width={24} height={24} className="size-6" />
          <div className="flex-1">
            <p className="text-sm font-medium">Next.js 15</p>
            <p className="text-muted-foreground text-xs">React framework with App Router</p>
          </div>
          <Badge variant="secondary" className="text-[10px]">Frontend</Badge>
        </div>

        {/* TypeScript */}
        <div className="border-border flex items-center gap-4 rounded-lg border p-4">
          <Image src="/icons/typescript.svg" alt="TypeScript" width={24} height={24} className="size-6" />
          <div className="flex-1">
            <p className="text-sm font-medium">TypeScript</p>
            <p className="text-muted-foreground text-xs">End-to-end type safety</p>
          </div>
          <Badge variant="secondary" className="text-[10px]">Language</Badge>
        </div>

        {/* Better Auth */}
        <div className="border-border rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <Image src="/icons/better-auth_light.svg" alt="Better Auth" width={24} height={24} className="size-6" />
            <div className="flex-1">
              <p className="text-sm font-medium">Better Auth</p>
              <p className="text-muted-foreground text-xs">Authentication & session management</p>
            </div>
            <Badge variant="secondary" className="text-[10px]">Auth</Badge>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-dashed pt-3">
            <span className="text-muted-foreground text-xs">Providers:</span>
            <Badge variant="outline" className="text-[10px]">Google</Badge>
            <Badge variant="outline" className="text-[10px]">GitHub</Badge>
            <Badge variant="outline" className="text-[10px]">Apple</Badge>
          </div>
        </div>

        {/* Neon + PostgreSQL + Drizzle */}
        <div className="border-border rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <Image src="/icons/neon.svg" alt="Neon" width={24} height={24} className="size-6" />
            <div className="flex-1">
              <p className="text-sm font-medium">Neon</p>
              <p className="text-muted-foreground text-xs">Serverless Postgres database</p>
            </div>
            <Badge variant="secondary" className="text-[10px]">Database</Badge>
          </div>
          <div className="mt-3 flex items-center gap-4 border-t border-dashed pt-3">
            <div className="flex items-center gap-1.5">
              <Image src="/icons/postgresql.svg" alt="PostgreSQL" width={14} height={14} className="size-3.5" />
              <span className="text-xs">PostgreSQL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Image src="/icons/drizzle-orm_light.svg" alt="Drizzle" width={14} height={14} className="size-3.5" />
              <span className="text-xs">Drizzle ORM</span>
            </div>
          </div>
        </div>

        {/* React */}
        <div className="border-border flex items-center gap-4 rounded-lg border p-4">
          <Image src="/icons/react_light.svg" alt="React" width={24} height={24} className="size-6" />
          <div className="flex-1">
            <p className="text-sm font-medium">React 19</p>
            <p className="text-muted-foreground text-xs">Server Components & Actions</p>
          </div>
          <Badge variant="secondary" className="text-[10px]">UI</Badge>
        </div>
      </div>

      {/* CTA */}
      {session && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            Signed in as <span className="text-foreground font-medium">{session.user.name || session.user.email}</span>
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-muted-foreground text-xs">
          Delete this page and start building.
        </p>
      </footer>
    </main>
  )
}
