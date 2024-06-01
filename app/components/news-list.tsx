import { type Database } from '@/database.types'
import { type FC } from 'react'
import { Counter } from './counter'

type News = Database['public']['Tables']['news']['Row']

const fetchNews = async () => {
  // 意図的に2秒処理を遅らせる
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/news?select=*`, {
    headers: new Headers({ apikey: process.env.apikey as string }),
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const news: News[] = await res.json()
  return news
}

export const NewsList: FC = async () => {
  const news = await fetchNews()
  return (
    <div className="p-4 border border-blue-500">
      <Counter />
      <p className="my-4 pb-3 text-xl underline underline-offset-4">News</p>
      <ul>
        {news.map((news) => (
          <li key={news.id} className="my-1">
            {news.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
