'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import RequestForm from './RequestForm';

export default function RequestModal({
  prefillService, prefillNote, onClose,
}: { prefillService?: string; prefillNote?: string; onClose: () => void }) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

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
        <button onClick={onClose} className="absolute top-4 right-4 text-aether-deep-teal hover:text-aether-bright-cyan transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation" aria-label="Close">
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
              <button onClick={handleCopy} className="text-xs font-semibold bg-aether-electric-teal hover:bg-aether-deep-teal text-sky-white px-3 py-1.5 rounded-tight transition-all duration-fast min-h-[36px] touch-manipulation">
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
            <a href={`/track?order_id=${orderId}`} className="btn btn-primary w-full min-h-[48px] touch-manipulation">Track Order Status</a>
          </div>
        ) : (
          <>
            <h2 className="font-display font-bold text-2xl text-aether-deep-teal mb-1">Start Your Project</h2>
            <p className="text-deep-ink text-opacity-70 text-sm mb-6">Tell us what you need — we'll follow up shortly.</p>
            <RequestForm prefillService={prefillService} prefillNote={prefillNote} onSuccess={setOrderId} />
          </>
        )}
      </div>
    </div>
  );
}
