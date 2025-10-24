declare module "@supabase/supabase-js" {
  interface SupabaseAuthClient {
    /**
     * Legacy helper kept for backwards compatibility with codebases that still
     * call `setAuth` when a bearer token is provided. Newer versions of the
     * SDK expose different primitives, but the helper may be polyfilled by
     * auth wrappers.
     */
    setAuth?: (accessToken: string) => void;
  }
}
