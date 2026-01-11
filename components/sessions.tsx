'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
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

export function Sessions({ sessions: initialSessions }: SessionsProps) {
  const [sessionCount, setSessionCount] = React.useState(initialSessions.length)
  const [isRevoking, setIsRevoking] = React.useState(false)

  const otherSessionCount = sessionCount - 1

  async function revokeOtherSessions() {
    setIsRevoking(true)
    try {
      await authClient.revokeOtherSessions()
      setSessionCount(1)
      toast.success('All other sessions have been signed out')
    } catch {
      toast.error('Failed to sign out other sessions')
    } finally {
      setIsRevoking(false)
    }
  }

  return (
    <div className="glass-card flex items-center justify-between rounded-xl border p-4">
      <div className="text-xs">
        <p className="font-medium">
          {sessionCount} active session{sessionCount !== 1 ? 's' : ''}
        </p>
        {otherSessionCount > 0 && (
          <p className="text-muted-foreground">
            {otherSessionCount} other device{otherSessionCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      {otherSessionCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-destructive"
          onClick={revokeOtherSessions}
          disabled={isRevoking}
        >
          {isRevoking ? <Spinner size="xs" /> : 'Sign out other devices'}
        </Button>
      )}
    </div>
  )
}
