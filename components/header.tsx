import Link from 'next/link'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import { HugeiconsIcon } from '@hugeicons/react'
import { Home12Icon } from '@hugeicons/core-free-icons'

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <header className='flex items-center justify-between px-6 py-4'>
      <Link
        href='/'
        className='flex items-center gap-2 transition-opacity hover:opacity-80'
      >
        <HugeiconsIcon icon={Home12Icon} className='size-5' strokeWidth={2} />
      </Link>

      {session ? (
        <UserMenu user={session.user} />
      ) : (
        <Button variant='ghost' size='sm' render={<Link href='/login' />}>
          Sign in
        </Button>
      )}
    </header>
  )
}
