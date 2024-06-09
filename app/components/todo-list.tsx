import { type FC } from 'react'
import { TodoItem } from './todo-item'
import { createClient } from '@/utils/supabase/server'

export const TodoList: FC = async () => {
  const supabase = createClient()
  const { data: todos } = await supabase
    .from('todos')
    .select()
    .order('created_at', { ascending: true })
  return (
    <ul className="my-6 mx-3">
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
