import Link from 'next/link'
import Image from 'next/image'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon, Layers01Icon } from '@hugeicons/core-free-icons'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="space-y-10">
      <section className="space-y-6 text-center sm:text-left">
          <Badge variant="outline" className="rounded-full px-3 py-1 font-normal text-muted-foreground bg-background/60 backdrop-blur-sm">
            v1.0.0
          </Badge>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Better Neon
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto sm:mx-0">
              A precise, type-safe Next.js starter template.{' '}
              <span className="hidden sm:inline"><br /></span>
              Everything you need, nothing you don&apos;t.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center sm:justify-start pt-2">
            {session ? (
              <Button size="lg" className="rounded-full px-8" render={<Link href="/dashboard" />}>
                Dashboard
                <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
              </Button>
            ) : (
              <Button size="lg" className="rounded-full px-8" render={<Link href="/login" />}>
                Get Started
                <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
              </Button>
            )}

            <Button variant="outline" size="lg" className="rounded-full px-8 bg-background/60 backdrop-blur-sm" render={<a href="https://github.com" target="_blank" rel="noopener" />}>
              <Image src="/icons/github.svg" alt="" width={16} height={16} className="mr-2" />
              GitHub
            </Button>
          </div>
        </section>

        <hr className="border-border/30" />

        {/* Stack Compact List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
              <HugeiconsIcon icon={Layers01Icon} className="size-4 text-muted-foreground" />
              Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <StackItem title="Next.js 16" desc="App Router & Server Actions">
                <Image src="/icons/nextjs_icon_dark.svg" alt="Next.js" width={18} height={18} className="dark:invert" />
             </StackItem>
             <StackItem title="Neon Postgres" desc="Serverless Database">
                <Image src="/icons/neon.svg" alt="Neon" width={18} height={18} />
             </StackItem>
             <StackItem title="Better Auth" desc="Secure & Type-safe Auth">
                <Image src="/icons/better-auth_light.svg" alt="Auth" width={18} height={18} />
             </StackItem>
              <StackItem title="Drizzle ORM" desc="TypeScript ORM">
                <Image src="/icons/drizzle-orm_light.svg" alt="Drizzle" width={18} height={18} />
             </StackItem>
             <StackItem title="TypeScript" desc="Strict Type Safety">
                <Image src="/icons/typescript.svg" alt="TS" width={18} height={18} />
             </StackItem>
              <StackItem title="React 19" desc="Latest Features">
                <Image src="/icons/react_light.svg" alt="React" width={18} height={18} />
             </StackItem>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="pt-6 text-xs text-muted-foreground/80">
          <p>
            Start editing by modifying{' '}
            <code className="bg-muted/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md font-mono text-foreground/80 text-[11px]">
              app/page.tsx
            </code>
          </p>
        </footer>

    </div>
  )
}

function StackItem({ children, title, desc }: { children: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-card group flex items-center gap-3 rounded-xl border p-3.5 transition-colors duration-200">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/80">
        {children}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground">{desc}</span>
      </div>
    </div>
  )
}
