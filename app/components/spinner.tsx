import { type FC } from 'react'

type PropsType = {
  color?: string
}

export const Spinner: FC<PropsType> = ({ color = 'border-blue-500' }) => {
  return (
    <div className="my-6 flex justify-center">
      <div
        className={`h-10 w-10 animate-spin rounded-full border-4 ${color} border-t-transparent`}
      />
    </div>
  )
}
