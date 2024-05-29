import { Database } from '@/database.types'
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid'
import format from 'date-fns/format'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Blog = Database['public']['Tables']['blogs']['Row']

type PropsType = {
  params: {
    blogId: string
  }
}

const fetchBlog = async (blogId: string) => {
  const res = await fetch(
    `${process.env.url}/rest/v1/blogs?id=eq.${blogId}&select=*`,
    {
      headers: new Headers({ apikey: process.env.apikey as string }),
      cache: 'force-cache',
    }
  )
  const blogs: Blog[] = await res.json()
  return blogs[0]
}

export default async function BlogDetailPage({ params }: PropsType) {
  const blog = await fetchBlog(params.blogId)
  if (!blog) return notFound()

  return (
    <div className="mt-16 border-2 p-8 h-auto">
      <p>
        <strong className="mr-3">Blog ID:</strong> {blog.id}
      </p>
      <p>
        <strong className="mr-3">Title:</strong> {blog.title}
      </p>
      <p>
        <strong className="mr-3">Content:</strong> {blog.content}
      </p>
      <p>
        <strong className="mr-3">Created at:</strong>
        {format(new Date(blog.created_at), 'yyyy-MM-dd HH:mm:ss')}
      </p>
      <Link href="/blogs">
        <ArrowUturnLeftIcon className="mt-3 size-6 cursor-pointer text-blue-500" />
      </Link>
    </div>
  )
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({ apikey: process.env.apikey as string }),
  })
  const blogs: Blog[] = await res.json()

  return blogs.map((blog) => ({
    blogId: blog.id,
  }))
}
