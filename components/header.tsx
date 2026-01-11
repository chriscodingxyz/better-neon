import Link from 'next/link'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import { HugeiconsIcon } from '@hugeicons/react'
import { CommandIcon } from '@hugeicons/core-free-icons'

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <header className="w-full pb-4">
       <div className="flex w-full items-center justify-between">
        <Link
          href='/'
          className='text-muted-foreground transition-colors duration-200 hover:text-foreground'
        >
          <HugeiconsIcon icon={CommandIcon} className="size-6" strokeWidth={2} />
        </Link>

        <div className="flex items-center gap-2">
           {session ? (
             <UserMenu user={session.user} />
           ) : (
             <Button variant='ghost' size='sm' className="text-xs h-8 px-3 rounded-full text-muted-foreground hover:text-foreground" render={<Link href='/login' />}>
               Sign in
             </Button>
           )}
        </div>
      </div>
    </header>
  )
}
