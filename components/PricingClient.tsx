'use client';

import { Globe } from 'lucide-react';
import PricingTierCard from '@/components/PricingTierCard';
import CurrencyToggle from '@/components/CurrencyToggle';
import { formatPrice } from '@/lib/currency';
import { useCurrency } from '@/lib/CurrencyContext';
import { useRequestModal } from '@/contexts/RequestModalContext';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

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
          <Reveal>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">Transparent Pricing</h1>
            <p className="text-base sm:text-lg text-sky-white/85 max-w-2xl mx-auto mb-6">
              No hidden fees. Choose your service, pick a tier, get started.
            </p>
            <CurrencyToggle />
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-24">
        <div className="container-aether">
          {serviceGroups.length === 0 && bundles.length === 0 && (
            <p className="text-center text-deep-ink/70 mb-16">
              No pricing published yet — add tiers from the admin dashboard.
            </p>
          )}

          {serviceGroups.map((group) => (
            <div key={group.service_id} id={`service-${group.service_slug}`} className="scroll-mt-24 mb-20 sm:mb-24">
              <Reveal>
                <h2 className="font-display font-bold text-3xl mb-8 text-aether-deep-teal text-center">
                  {group.service_title}
                </h2>
              </Reveal>
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.tiers.map((t) => (
                  <StaggerItem key={t.id}>
                    <PricingTierCard
                      name={t.name}
                      pricePKR={t.price_pkr}
                      badge={t.badge || undefined}
                      features={t.features}
                      serviceCategory={group.service_title}
                    />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          ))}

          {/* Bundles */}
          {bundles.length > 0 && (
            <div className="mb-16">
              <Reveal>
                <h2 className="font-display font-bold text-3xl mb-8 text-aether-deep-teal text-center">Smart Bundles</h2>
              </Reveal>
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bundles.map((b) => (
                  <StaggerItem key={b.id}>
                    <div className="card text-center flex flex-col h-full">
                      <h3 className="font-display font-bold text-lg mb-2 text-aether-deep-teal">{b.name}</h3>
                      <div className="text-2xl font-mono font-bold text-aether-electric-teal mb-1">
                        {formatPrice(b.price_pkr, currency)}
                      </div>
                      {b.bundle_includes && (
                        <p className="text-sm text-deep-ink/70 mb-6 flex-grow">{b.bundle_includes}</p>
                      )}
                      <button
                        onClick={() => openModal('Other', `Interested in the ${b.name}.`)}
                        className="btn btn-secondary w-full min-h-[44px] touch-manipulation"
                      >
                        Get This Bundle
                      </button>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          )}

          {/* International clients banner */}
          <Reveal>
            <div className="bg-aether-electric-teal/5 border border-aether-electric-teal/20 rounded-expansive p-6 flex items-start sm:items-center gap-3 text-left sm:text-center sm:justify-center">
              <Globe size={20} className="text-aether-deep-teal shrink-0 mt-0.5 sm:mt-0" strokeWidth={1.75} />
              <p className="text-sm text-deep-ink/70">
                <strong className="text-aether-deep-teal">International clients:</strong> Payment methods (PayPal, Fiverr, Upwork) coming soon. Local clients can pay via Bank Transfer, JazzCash, or Easypaisa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
