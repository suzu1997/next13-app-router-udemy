import { SupabaseListener } from '@/app/components/supabase-listener'
import { createClient } from '@/utils/supabase/server'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
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
