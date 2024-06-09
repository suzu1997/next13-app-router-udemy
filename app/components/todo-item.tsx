'use client'
import { type Database } from '@/database.types'
import { useStore } from '@/store'
import { createClient } from '@/utils/supabase/client'
import PencilIcon from '@heroicons/react/24/solid/PencilIcon'
import TrashIcon from '@heroicons/react/24/solid/TrashIcon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

type Todo = Database['public']['Tables']['todos']['Row']

type PropsType = {
  todo: Todo
}

export const TodoItem: FC<PropsType> = ({ todo }) => {
  const router = useRouter()
  const supabase = createClient()
  const updateTask = useStore((state) => state.updateEditedTask)
  const resetTask = useStore((state) => state.resetEditedTask)
  const updateMutate = async (id: string, completed: boolean) => {
    await supabase.from('todos').update({ completed }).eq('id', id)
    resetTask()
    router.refresh()
  }
  const deleteMutate = async (id: string) => {
    await supabase.from('todos').delete().eq('id', id)
    router.refresh()
  }
  return (
    <li className="my-2 list-none flex justify-between">
      <div>
        <input
          type="checkbox"
          className="mr-1"
          checked={todo.completed}
          onChange={(e) => updateMutate(todo.id, !todo.completed)}
        />
        <Link href={`auth/todo-crud/${todo.id}`}>{todo.title}</Link>
      </div>
      <div className="float-right ml-20 flex">
        <PencilIcon
          className="mr-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            updateTask({ id: todo.id, title: todo.title })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteMutate(todo.id)
          }}
        />
      </div>
    </li>
  )
}
