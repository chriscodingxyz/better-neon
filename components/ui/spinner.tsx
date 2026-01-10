import { cn } from '@/lib/utils'
import { HugeiconsIcon } from '@hugeicons/react'
import { Loading03Icon } from '@hugeicons/core-free-icons'

interface SpinnerProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export function Spinner({ className, size = 'sm' }: SpinnerProps) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      className={cn('animate-spin text-muted-foreground', sizeClasses[size], className)}
      strokeWidth={2}
    />
  )
}
