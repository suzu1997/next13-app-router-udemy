import { type Database } from '@/database.types'
import { type FC } from 'react'

type Blog = Database['public']['Tables']['blogs']['Row']

const fetchBlogs = async () => {
  // 意図的に6秒処理を遅らせる
  await new Promise((resolve) => setTimeout(resolve, 6000))
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({ apikey: process.env.apikey as string }),
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const blogs: Blog[] = await res.json()
  return blogs
}

export const BlogList: FC = async () => {
  const blogs = await fetchBlogs()
  return (
    <div className="p-4">
      <p className="mb-4 pb-3 text-xl underline underline-offset-4">Blogs</p>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="my-1">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
