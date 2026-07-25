import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import LeadStatusForm from './lead-status-form'

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: lead } = await supabase.from('leads').select('*').eq('id', id).single()

  if (!lead) redirect('/admin/leads')

  // Attachments are stored as private storage paths, not public URLs — sign
  // them here (server-side, admin-only route) so the admin can actually open
  // the files a client uploaded.
  let attachmentLinks: { path: string; url: string | null }[] = []
  if (lead.file_urls && lead.file_urls.length > 0) {
    const adminClient = createAdminClient()
    attachmentLinks = await Promise.all(
      (lead.file_urls as string[]).map(async (path) => {
        const { data } = await adminClient.storage
          .from('lead-attachments')
          .createSignedUrl(path, 60 * 60); // 1 hour
        return { path, url: data?.signedUrl ?? null }
      })
    )
  }

  async function updateStatus(status: string) {
    'use server'
    const supabase = await createClient()
    const { error } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return { error: error.message }
    return {}
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-sky-white border-b border-aether-electric-teal border-opacity-10 px-6 py-4 flex items-center gap-4">
        <Link href="/admin/leads" className="flex items-center gap-1 text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal transition-colors">
          <ChevronLeft size={16} />
          Leads
        </Link>
        <h1 className="font-display font-bold text-lg text-aether-deep-teal">Order {lead.order_id}</h1>
        {lead.is_urgent && (
          <span className="ml-auto text-xs font-bold uppercase tracking-wide px-2 py-1 rounded bg-red-100 text-red-700">
            Rush
          </span>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl p-6 space-y-4">
          <div>
            <span className="text-xs text-neutral uppercase font-semibold">Name</span>
            <p className="text-sm font-medium text-deep-ink">{lead.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-neutral uppercase font-semibold">Email</span>
              <p className="text-sm font-medium break-all">
                <a href={`mailto:${lead.email}`} className="text-aether-electric-teal hover:underline">{lead.email}</a>
              </p>
            </div>
            <div>
              <span className="text-xs text-neutral uppercase font-semibold">WhatsApp</span>
              <p className="text-sm font-medium">
                <a href={`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-aether-electric-teal hover:underline">
                  {lead.whatsapp}
                </a>
              </p>
            </div>
          </div>
          <div>
            <span className="text-xs text-neutral uppercase font-semibold">Service</span>
            <p className="text-sm font-medium text-deep-ink">{lead.service_interested}</p>
          </div>
          <div>
            <span className="text-xs text-neutral uppercase font-semibold">Desired date</span>
            <p className="text-sm font-medium text-deep-ink">
              {lead.desired_date ? new Date(lead.desired_date).toLocaleDateString() : '—'}
              {lead.is_urgent && <span className="ml-2 text-alert text-xs font-semibold">RUSH</span>}
            </p>
          </div>
          <div>
            <span className="text-xs text-neutral uppercase font-semibold">Instructions</span>
            <p className="text-sm text-deep-ink text-opacity-80 whitespace-pre-wrap">{lead.instructions || '—'}</p>
          </div>
          <div>
            <span className="text-xs text-neutral uppercase font-semibold">Attachments</span>
            {attachmentLinks.length > 0 ? (
              <ul className="mt-1 space-y-1">
                {attachmentLinks.map((file) => (
                  <li key={file.path}>
                    {file.url ? (
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-sm text-aether-electric-teal hover:underline break-all">
                        {file.path.split('/').pop()}
                      </a>
                    ) : (
                      <span className="text-sm text-neutral">{file.path.split('/').pop()} (link unavailable)</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral">No files attached</p>
            )}
          </div>
          <div>
            <span className="text-xs text-neutral uppercase font-semibold">Received</span>
            <p className="text-sm font-medium text-deep-ink">{new Date(lead.created_at).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl p-6">
          <LeadStatusForm currentStatus={lead.status} onUpdate={updateStatus} />
        </div>
      </main>
    </div>
  )
}
