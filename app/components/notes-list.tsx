import { type FC } from 'react'
import { type Database } from '@/database.types'
import { format } from 'date-fns'

type Note = Database['public']['Tables']['notes']['Row']
const fetchNotes = async () => {
  // 2秒間の遅延を持たせる
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/notes?select=*`, {
    headers: new Headers({ apikey: process.env.apikey as string }),
    cache: 'no-store',
    // cache: 'force-cache',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const notes: Note[] = await res.json()
  return notes
}

export const NotesList: FC = async () => {
  const notes = await fetchNotes()
  console.log(notes)

  return (
    <div>
      <p className="my-4 pb-3 text-xl font-medium underline underline-offset-4">
        Notes
      </p>
      <ul className="m-3">
        {notes.map(({ id, title, created_at }) => (
          <li key={id}>
            <p>{title}</p>
            <p>
              <strong className="mr-3">Created at:</strong>
              {format(new Date(created_at), 'yyyy-MM-dd HH:mm:ss')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
