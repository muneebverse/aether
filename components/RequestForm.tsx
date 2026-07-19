'use client';

import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Portfolio & Website', 'CV & Career Documents',
  'Presentation / Slide Deck', 'LinkedIn Optimization',
  'Restaurant Website', 'Other',
];

export default function RequestForm({
  prefillService,
  prefillNote,
  onSuccess,
}: {
  prefillService?: string;
  prefillNote?: string;
  onSuccess: (orderId: string) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [service, setService] = useState(prefillService || '');
  const [instructions, setInstructions] = useState(prefillNote || '');
  const [desiredDate, setDesiredDate] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isUrgent = desiredDate
    ? (new Date(desiredDate).getTime() - Date.now()) / 86400000 <= 5
    : false;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('whatsapp', whatsapp);
    formData.append('service_interested', service);
    formData.append('instructions', instructions);
    formData.append('desired_date', desiredDate);
    files.forEach((f) => formData.append('files', f));

    try {
      const res = await fetch('/api/leads', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong. Please try again.'); setLoading(false); return; }
      onSuccess(data.order_id);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="text-sm text-aether-alert bg-red-50 border border-red-200 rounded-tight px-4 py-2.5">{error}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label>Your Name</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Muneeb" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label>WhatsApp Number</label>
        <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+92 3XX XXXXXXX" />
      </div>

      <div>
        <label>Service</label>
        <select required value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label>Instructions / Scope Details</label>
        <textarea rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Describe what you need..." />
      </div>

      <div>
        <label>Attach Files (optional)</label>
        <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="text-sm touch-manipulation" />
        {files.length > 0 && <p className="text-xs text-deep-ink text-opacity-60 mt-1">{files.length} file(s) selected</p>}
      </div>

      <div>
        <label>Desired Completion Date</label>
        <input type="date" required value={desiredDate} onChange={(e) => setDesiredDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
        {isUrgent && <p className="text-xs text-aether-alert mt-1.5">⚡ Rush request (within 5 days) — a rush fee may apply.</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full min-h-[48px] touch-manipulation active:scale-[0.98] transition-transform"
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}
