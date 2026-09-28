import { TESTIMONIALS } from '../data/products';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';

export function CustomerReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-20 bg-white border-b border-[#EFECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3D18]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#292524]">
            Loved by 800+ Families Across Cities
          </h2>
          <p className="text-sm text-[#57534E]">
            Read genuine reflections from tea lovers, mothers, and food enthusiasts who trust HomeBite for their daily teatime.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testi) => (
            <div
              key={testi.id}
              className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E5E0D8] flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-[#E2DACD] absolute top-5 right-5 pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex text-amber-500">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic">
                  "{testi.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#292524]">{testi.name}</h4>
                  <div className="text-[11px] text-[#78716C]">{testi.role} · {testi.city}</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust metrics bar (Zero-pill layout with tabular numbers) */}
        <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E5E0D8] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#292524] tabular-nums">4.9 ★</div>
            <div className="text-xs text-[#78716C] mt-0.5">Average customer rating</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#292524] tabular-nums">10,000+</div>
            <div className="text-xs text-[#78716C] mt-0.5">Fresh snack packs delivered</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#292524] tabular-nums">100%</div>
            <div className="text-xs text-[#78716C] mt-0.5">Preservative & chemical-free</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#292524] tabular-nums">94%</div>
            <div className="text-xs text-[#78716C] mt-0.5">Repeat customer rate</div>
          </div>
        </div>

      </div>
    </section>
  );
}
