import { getUsers } from '@/server/utils'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await getUsers()

  if (!result.ok) {
    // Convert Result to HTTP Response at the boundary
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }

  return NextResponse.json(result.data)
}
