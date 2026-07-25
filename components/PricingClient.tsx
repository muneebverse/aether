'use client';

import PricingTierCard from '@/components/PricingTierCard';
import CurrencyToggle from '@/components/CurrencyToggle';
import { formatPrice } from '@/lib/currency';
import { useCurrency } from '@/lib/CurrencyContext';
import { useRequestModal } from '@/contexts/RequestModalContext';

export type PricingTier = {
  id: string;
  name: string;
  price_pkr: number;
  badge: string | null;
  features: string[];
  is_bundle: boolean;
  bundle_includes: string | null;
};

export type ServiceGroup = {
  service_id: string;
  service_title: string;
  service_slug: string;
  tiers: PricingTier[];
};

export default function PricingClient({
  serviceGroups,
  bundles,
}: {
  serviceGroups: ServiceGroup[];
  bundles: PricingTier[];
}) {
  const { currency } = useCurrency();
  const { openModal } = useRequestModal();

  return (
    <>
      <section className="bg-aether-deep-teal text-sky-white py-12 sm:py-16 lg:py-20">
        <div className="container-aether text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">Transparent Pricing</h1>
          <p className="text-base sm:text-lg text-sky-white text-opacity-90 max-w-2xl mx-auto mb-6">
            No hidden fees. Choose your service, pick a tier, get started.
          </p>
          <CurrencyToggle />
        </div>
      </section>

      <section className="py-12 sm:py-24 section-spacing">
        <div className="container-aether">
          {serviceGroups.length === 0 && bundles.length === 0 && (
            <p className="text-center text-deep-ink text-opacity-70 mb-16">
              No pricing published yet — add tiers from the admin dashboard.
            </p>
          )}

          {serviceGroups.map((group) => (
            <div key={group.service_id} id={`service-${group.service_slug}`} className="scroll-mt-24">
              <h2 className="font-display font-bold text-3xl mb-8 text-aether-deep-teal text-center">
                {group.service_title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                {group.tiers.map((t) => (
                  <PricingTierCard
                    key={t.id}
                    name={t.name}
                    pricePKR={t.price_pkr}
                    badge={t.badge || undefined}
                    features={t.features}
                    serviceCategory={group.service_title}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Bundles */}
          {bundles.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display font-bold text-3xl mb-8 text-aether-deep-teal text-center">Smart Bundles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bundles.map((b) => (
                  <div key={b.id} className="card text-center flex flex-col">
                    <h3 className="font-display font-bold text-lg mb-2 text-aether-deep-teal">{b.name}</h3>
                    <div className="text-2xl font-mono font-bold text-aether-electric-teal mb-1">
                      {formatPrice(b.price_pkr, currency)}
                    </div>
                    {b.bundle_includes && (
                      <p className="text-sm text-deep-ink text-opacity-70 mb-6 flex-grow">{b.bundle_includes}</p>
                    )}
                    <button
                      onClick={() => openModal('Other', `Interested in the ${b.name}.`)}
                      className="btn btn-secondary w-full min-h-[44px] touch-manipulation"
                    >
                      Get This Bundle
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* International clients banner */}
          <div className="bg-aether-electric-teal bg-opacity-5 border border-aether-electric-teal border-opacity-20 rounded-expansive p-6 text-center">
            <p className="text-sm text-deep-ink text-opacity-70">
              🌍 <strong className="text-aether-deep-teal">International clients:</strong> Payment methods (PayPal, Fiverr, Upwork) coming soon. Local clients can pay via Bank Transfer, JazzCash, or Easypaisa.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
