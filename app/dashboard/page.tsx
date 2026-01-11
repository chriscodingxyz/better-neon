import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/db/db'
import { account, session as sessionTable } from '@/db/schemas/auth'
import { Badge } from '@/components/ui/badge'
import { Sessions } from '@/components/sessions'
import { SignOutButton } from '@/components/sign-out-button'

const providerNames: Record<string, string> = {
  google: 'Google',
  github: 'GitHub',
  apple: 'Apple',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const { user } = session

  // Get user's linked accounts
  const linkedAccounts = await db
    .select({
      providerId: account.providerId,
      createdAt: account.createdAt,
    })
    .from(account)
    .where(eq(account.userId, user.id))

  // Get user's sessions
  const sessions = await db
    .select({
      id: sessionTable.id,
      createdAt: sessionTable.createdAt,
      expiresAt: sessionTable.expiresAt,
      userAgent: sessionTable.userAgent,
      ipAddress: sessionTable.ipAddress,
    })
    .from(sessionTable)
    .where(eq(sessionTable.userId, user.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <SignOutButton variant="outline" size="sm" />
      </div>

      {/* Profile + Details Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass-card flex items-center gap-3 rounded-xl border p-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'Avatar'}
              width={44}
              height={44}
              className="size-11 rounded-full ring-2 ring-border/50"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex size-11 items-center justify-center rounded-full text-sm font-medium ring-2 ring-border/50">
              {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name || 'No name'}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <Badge variant={user.emailVerified ? 'secondary' : 'outline'} className="text-[10px] shrink-0">
            {user.emailVerified ? 'Verified' : 'Unverified'}
          </Badge>
        </div>

        <div className="glass-card rounded-xl border p-4 text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-mono text-[10px] truncate max-w-[120px]">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Member since</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Linked Accounts - Compact */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Linked Accounts</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {['google', 'github', 'apple'].map((provider) => {
            const acc = linkedAccounts.find(a => a.providerId === provider)
            return (
              <div
                key={provider}
                className="glass-card flex items-center justify-between rounded-xl border p-3 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Image src={`/icons/${provider === 'github' ? 'github_light' : provider}.svg`} alt="" width={16} height={16} className="opacity-80" />
                  <span className="text-xs font-medium">{providerNames[provider]}</span>
                </div>
                <div className={`size-2 rounded-full ${acc ? 'bg-green-500' : 'bg-neutral-300'}`} />
              </div>
            )
          })}
        </div>
      </section>
        
      {/* Sessions - Compact */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sessions</h2>
        <Sessions sessions={sessions} currentSessionId={session.session.id} />
      </section>

    </div>
  )
}
