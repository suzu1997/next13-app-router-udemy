import { Suspense } from 'react'
import { NotesList } from './components/notes-list'
import { TimerCounter } from './components/timer-counter'
import { Spinner } from './components/spinner'
import { RefreshBtn } from './components/refresh-btn';

export default function Page() {
  return (
    <main>
      <div className="text-center m-10">
        <p>Hello World</p>
        <Suspense fallback={<Spinner color='border-green-500' />}>
          {/* server component */}
          <NotesList />
        </Suspense>
        {/* client component */}
        <TimerCounter />
        <RefreshBtn />
      </div>
    </main>
  )
}
