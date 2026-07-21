// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-browser'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-aether-deep-teal via-aether-electric-teal to-aether-bright-cyan flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background accents, consistent with the public hero treatment */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-aether-bright-cyan rounded-full mix-blend-overlay filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-aether-sky-cyan rounded-full mix-blend-overlay filter blur-3xl opacity-30" />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logos/aether-logo-icon.png"
            alt="AETHER Logo"
            width={48}
            height={48}
            className="w-12 h-12 mb-3"
          />
          <span className="font-display font-bold text-xl text-sky-white">AETHER</span>
          <span className="text-sky-white text-opacity-70 text-sm mt-1">Admin</span>
        </div>

        <div className="bg-sky-white rounded-2xl p-8 shadow-2xl border border-aether-electric-teal border-opacity-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-aether-electric-teal bg-opacity-10">
              <Lock size={18} className="text-aether-electric-teal" />
            </div>
            <h1 className="font-display font-bold text-lg text-aether-deep-teal">Sign in</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-deep-ink mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full border border-aether-electric-teal border-opacity-20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-aether-electric-teal focus:ring-1 focus:ring-aether-electric-teal transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-ink mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-aether-electric-teal border-opacity-20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-aether-electric-teal focus:ring-1 focus:ring-aether-electric-teal transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-aether-electric-teal to-aether-bright-cyan hover:from-aether-deep-teal hover:to-aether-electric-teal text-sky-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
