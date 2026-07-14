'use client'

import { Button } from '@/components/ui/button'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        className="absolute inset-0 bg-foreground/30"
        aria-label="Close cart"
        onClick={onClose}
      />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground">
            ✕
          </button>
        </div>
        <p className="mt-8 text-sm text-foreground/70">
          Your personalized books will appear here.
        </p>
        <Button href="/checkout" className="mt-auto">
          Go to Checkout
        </Button>
      </aside>
    </div>
  )
}
