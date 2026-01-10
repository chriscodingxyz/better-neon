'use client'

import { Toaster as Sonner, toast } from 'sonner'

function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'bg-background border-border text-foreground text-sm shadow-lg',
          title: 'font-medium',
          description: 'text-muted-foreground text-xs',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  )
}

export { Toaster, toast }
