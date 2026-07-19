'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

// TODO: replace with a live fetch from `services` once I have the full schema
const SERVICE_OPTIONS = [
  'Portfolio & Website', 'CV & Career Documents',
  'Presentation / Slide Deck', 'LinkedIn Optimization',
  'Restaurant Website', 'Other',
];

export default function RequestModal({ prefillService, onClose }: { prefillService?: string; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [service, setService] = useState(prefillService || '');
  const [instructions, setInstructions] = useState('');
  const [desiredDate, setDesiredDate] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

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
      setOrderId(data.order_id);
    } catch {
      setError('Network error. Please check your connection and try again.');
    }
    setLoading(false);
  }

  const handleCopy = async () => {
    if (!orderId) return;
    await navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-aether-deep-teal bg-opacity-40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-sky-white rounded-expansive p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-card">
        <button onClick={onClose} className="absolute top-4 right-4 text-aether-deep-teal hover:text-aether-bright-cyan transition-colors" aria-label="Close">
          <X size={22} />
        </button>

        {orderId ? (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-sky-white border border-aether-electric-teal border-opacity-20 rounded-full flex items-center justify-center mx-auto text-aether-success">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl text-aether-deep-teal">Request Received!</h2>
              <p className="text-deep-ink text-opacity-70 text-sm">Save this tracking code to check your order status anytime.</p>
            </div>
            <div className="bg-white border border-aether-electric-teal border-opacity-15 rounded-tight p-4 flex items-center justify-between font-mono text-lg text-deep-ink">
              <span className="font-bold tracking-wider">{orderId}</span>
              <button onClick={handleCopy} className="text-xs font-semibold bg-aether-electric-teal hover:bg-aether-deep-teal text-sky-white px-3 py-1.5 rounded-tight transition-all duration-fast">
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
            <a href={`/track?order_id=${orderId}`} className="btn btn-primary w-full">Track Order Status</a>
          </div>
        ) : (
          <>
            <h2 className="font-display font-bold text-2xl text-aether-deep-teal mb-1">Start Your Project</h2>
            <p className="text-deep-ink text-opacity-70 text-sm mb-6">Tell us what you need — we'll follow up shortly.</p>

            {error && <p className="text-sm text-aether-alert bg-red-50 border border-red-200 rounded-tight px-4 py-2.5 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="text-sm" />
                {files.length > 0 && <p className="text-xs text-deep-ink text-opacity-60 mt-1">{files.length} file(s) selected</p>}
              </div>

              <div>
                <label>Desired Completion Date</label>
                <input type="date" required value={desiredDate} onChange={(e) => setDesiredDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                {isUrgent && <p className="text-xs text-aether-alert mt-1.5">⚡ Rush request (within 5 days) — a rush fee may apply.</p>}
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
