'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useStore } from '@/store'
import { createClient } from '@/utils/supabase/client'

export const Auth = () => {
  const supabase = createClient()
  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        router.push('/auth/todo-crud')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <p>{loginUser.email}</p>
      <ArrowRightOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={() => {
          supabase.auth.signOut()
        }}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="my-6 flex justify-center text-sm">
          <button
            type="submit"
            className=" rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="cursor-pointer font-medium hover:text-indigo-500"
      >
        change mode ?
      </p>
    </div>
  )
}
