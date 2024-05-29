'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="mt-6 text-center text-red-500">
      <p>Data Fetching in server failed</p>
    </div>
  )
}
