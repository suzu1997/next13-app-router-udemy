'use client'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

export const RefreshBtn: FC = () => {
  const router = useRouter()
  return (
    <button
      className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700"
      onClick={() => router.refresh()}
    >
      Refresh current route
    </button>
  )
}
