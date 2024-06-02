import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SupabaseListener } from '../components/supabase-listener'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // @ts-ignore
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            console.log(error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // @ts-ignore
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            console.log(error)
          }
        },
      },
    }
  )
  // サーバーサイドに保存されているアクセストークンを取得
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  )
}
