import { type Database } from '@/database.types'
import Link from 'next/link'
import React from 'react'

type Blog = Database['public']['Tables']['blogs']['Row']

const fetchBlogs = async () => {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({ apikey: process.env.apikey as string }),
    // cache: 'no-store',
    cache: 'force-cache',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const blogs: Blog[] = await res.json()
  return blogs
}

export const BlogListStatic = async () => {
  const blogs = await fetchBlogs()
  return (
    <div className="p-4">
      <p className="mb-4 pb-3 text-xl underline underline-offset-4">Blogs</p>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="my-1">
            <Link href={`/blogs/${blog.id}`} prefetch={false}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
