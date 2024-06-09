import { createBrowserClient } from "@supabase/ssr";

/**
 * @refs https://github.com/vercel/next.js/blob/canary/examples/with-supabase/utils/supabase/client.ts
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );