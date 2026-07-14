'use client'

import type { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-foreground/30"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-background p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full px-2 py-1 text-foreground/60 hover:bg-foreground/5"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
