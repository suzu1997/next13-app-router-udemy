'use client'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

type PropsType = {
  destination?: string
}

export const RouterBtn: FC<PropsType> = ({ destination = '' }) => {
  const router = useRouter()
  return (
    <button
      className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700"
      onClick={() => router.push(`/${destination}`)}
    >
      Nav to {destination || 'home'}
    </button>
  )
}
