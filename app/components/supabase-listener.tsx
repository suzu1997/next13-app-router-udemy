'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { createClient } from '@/utils/supabase/client'

export const SupabaseListener = ({ accessToken }: { accessToken?: string }) => {
  const supabase = createClient()
  const router = useRouter()
  const { updateLoginUser } = useStore()
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!,
        })
      }
    }
    getUserInfo()
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email! })
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
  }, [accessToken, router, supabase.auth, updateLoginUser])
  return null
}
