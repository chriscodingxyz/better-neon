'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/sonner'
import { authClient } from '@/lib/auth-client'

interface Session {
  id: string
  createdAt: Date
  expiresAt: Date
  userAgent: string | null
  ipAddress: string | null
}

interface SessionsProps {
  sessions: Session[]
  currentSessionId: string
}

export function Sessions({ sessions: initialSessions, currentSessionId }: SessionsProps) {
  const [sessions, setSessions] = React.useState(initialSessions)
  const [revokingId, setRevokingId] = React.useState<string | null>(null)

  async function revokeSession(sessionId: string) {
    setRevokingId(sessionId)
    try {
      await authClient.revokeSession({ id: sessionId })
      setSessions(sessions.filter(s => s.id !== sessionId))
      toast.success('Session revoked')
    } catch {
      toast.error('Failed to revoke session')
    } finally {
      setRevokingId(null)
    }
  }

  function parseUserAgent(ua: string | null): string {
    if (!ua) return 'Unknown device'
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari')) return 'Safari'
    if (ua.includes('Edge')) return 'Edge'
    return 'Browser'
  }

  return (
    <Card className="sm:col-span-2 lg:col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Active Sessions</CardTitle>
        <CardDescription>{sessions.length} session{sessions.length !== 1 ? 's' : ''}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-md border border-border p-2"
          >
            <div className="flex items-center gap-3 text-xs">
              <div>
                <p className="font-medium">
                  {parseUserAgent(session.userAgent)}
                  {session.id === currentSessionId && (
                    <Badge variant="secondary" className="ml-2 text-[10px]">Current</Badge>
                  )}
                </p>
                <p className="text-muted-foreground">
                  {session.ipAddress || 'Unknown IP'} · Expires {new Date(session.expiresAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {session.id !== currentSessionId && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => revokeSession(session.id)}
                disabled={revokingId === session.id}
              >
                {revokingId === session.id ? <Spinner size="xs" /> : 'Revoke'}
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
