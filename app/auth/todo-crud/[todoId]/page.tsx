import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid'
import format from 'date-fns/format'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

type PropsType = {
  params: {
    todoId: string
  }
}

export default async function TodoDetailPage({ params }: PropsType) {
  const supabase = createClient()

  const { data: todo } = await supabase
    .from('todos')
    .select('*')
    .eq('id', params.todoId)
    .limit(1)
    .single()
  if (!todo) return notFound()
  return (
    <div className="mt-16 border-2 p-8 h-auto">
      <p>Task ID: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Status: {todo.completed ? 'done' : 'not yet'}</p>
      <p>
        Created at: {format(new Date(todo.created_at), 'yyyy-MM-dd HH:mm:ss')}
      </p>
      <Link href="/blogs">
        <ArrowUturnLeftIcon className="mt-3 size-6 cursor-pointer text-blue-500" />
      </Link>
    </div>
  )
}
