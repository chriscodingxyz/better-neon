import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/db/db'
import { account } from '@/db/schemas/auth'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

  return (
    <main className="mx-auto max-w-3xl px-6 py-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-xs">Manage your account</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Profile</CardTitle>
            <CardDescription>Your account</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'Avatar'}
                width={32}
                height={32}
                className="size-8 rounded-full"
              />
            ) : (
              <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full text-xs font-medium">
                {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name || 'No name'}</p>
              <p className="text-muted-foreground truncate text-xs">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Linked Accounts Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Linked Accounts</CardTitle>
            <CardDescription>{linkedAccounts.length} connected</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {linkedAccounts.length > 0 ? (
              linkedAccounts.map((acc) => (
                <div key={acc.providerId} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{providerNames[acc.providerId] || acc.providerId}</span>
                  <Badge variant="secondary" className="text-[10px]">Connected</Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-xs">No linked accounts</p>
            )}
            {/* Show unlinked providers */}
            {['google', 'github', 'apple']
              .filter(p => !linkedAccounts.some(a => a.providerId === p))
              .map((provider) => (
                <div key={provider} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{providerNames[provider]}</span>
                  <Badge variant="outline" className="text-[10px]">Not linked</Badge>
                </div>
              ))
            }
          </CardContent>
        </Card>

        {/* Account Info Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Account Info</CardTitle>
            <CardDescription>Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-[10px]">{user.id.slice(0, 8)}...</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email verified</span>
              <Badge variant={user.emailVerified ? 'secondary' : 'outline'} className="text-[10px]">
                {user.emailVerified ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Session Card */}
        <Card className="sm:col-span-2 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Current Session</CardTitle>
            <CardDescription>Active login session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <div>
                <span className="text-muted-foreground">Session ID: </span>
                <span className="font-mono text-[10px]">{session.session.id.slice(0, 12)}...</span>
              </div>
              <div>
                <span className="text-muted-foreground">Expires: </span>
                <span>{new Date(session.session.expiresAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
