import { Sparkles, Gift, Percent, Truck } from 'lucide-react';

interface SpecialOffersSectionProps {
  onShopCategory: (category: any) => void;
}

export function SpecialOffersSection({ onShopCategory }: SpecialOffersSectionProps) {
  return (
    <section id="special-offers" className="py-12 sm:py-16 bg-[#F5F0E6] border-y border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3D18]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handmade Kitchen Deals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#292524]">
            Special Offers & Snack Combos
          </h2>
          <p className="text-sm text-[#57534E]">
            Enjoy small-batch savings on our most loved traditional savories, cookie tins, and celebratory hampers.
          </p>
        </div>

        {/* 3 Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Offer 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8F4] border border-[#FADCCB] text-[#C25E2E] flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-semibold uppercase text-[#8C3D18]">Welcome Special</span>
                <h3 className="text-lg font-serif font-bold text-[#292524]">Flat 10% Off First Batch</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Use coupon code <strong className="font-mono bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E5E0D8]">HOMEBITE10</strong> during checkout on any artisanal order.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F2ECE3] flex items-center justify-between">
              <span className="text-[11px] text-[#78716C]">Valid on all snack jars</span>
              <button
                onClick={() => onShopCategory('all')}
                className="text-xs font-semibold text-[#C25E2E] hover:underline cursor-pointer"
              >
                Apply & Shop →
              </button>
            </div>
          </div>

          {/* Offer 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-semibold uppercase text-[#047857]">Doorstep Perk</span>
                <h3 className="text-lg font-serif font-bold text-[#292524]">Free Delivery Above ₹499</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Order any 2–3 fresh snack packs and unlock free doorstep priority delivery automatically with zero hidden fees.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F2ECE3] flex items-center justify-between">
              <span className="text-[11px] text-[#78716C]">No coupon code required</span>
              <button
                onClick={() => onShopCategory('traditional')}
                className="text-xs font-semibold text-[#059669] hover:underline cursor-pointer"
              >
                Explore Savories →
              </button>
            </div>
          </div>

          {/* Offer 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-semibold uppercase text-[#B45309]">Celebrations</span>
                <h3 className="text-lg font-serif font-bold text-[#292524]">Custom Gift Hampers</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Looking for festive or corporate gifting? Get personalized handwritten cards and custom snack combinations.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F2ECE3] flex items-center justify-between">
              <span className="text-[11px] text-[#78716C]">From ₹850</span>
              <button
                onClick={() => onShopCategory('hampers')}
                className="text-xs font-semibold text-[#D97706] hover:underline cursor-pointer"
              >
                View Hampers →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
