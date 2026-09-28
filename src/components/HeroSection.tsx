import { heroSpreadImg } from '../data/products';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreSnacks: () => void;
}

export function HeroSection({ onShopNow, onExploreSnacks }: HeroSectionProps) {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EFECE6]">
      {/* Background warm aesthetic tint */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8E2C4]/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4D7B5]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quiet text kicker / Trust marker (Zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C3D18] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Small-Batch Artisan Kitchen</span>
              <span aria-hidden="true">·</span>
              <span>100% Homemade</span>
            </div>

            {/* Hero Heading as requested */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#292524] leading-[1.12] text-balance">
              Homemade Taste, <br className="hidden sm:inline" />
              Made With Love <span className="text-[#DC2626]">❤️</span>
            </h1>

            {/* Short description as requested */}
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
              Fresh, delicious, hygienic homemade snacks prepared with quality ingredients.
              Stone-ground flours, pure cow ghee, cold-pressed oils, and cherished family recipes delivered fresh to your door.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#C25E2E] hover:bg-[#A84E24] active:scale-[0.98] rounded-full transition-all shadow-md shadow-[#C25E2E]/20 whitespace-nowrap cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSnacks}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#44403C] hover:text-[#292524] bg-white hover:bg-[#FAF7F2] border border-[#D6CEBE] active:scale-[0.98] rounded-full transition-all shadow-xs whitespace-nowrap cursor-pointer"
              >
                <span>Explore Snacks</span>
              </button>
            </div>

            {/* Quality Pillars (Zero-pill text layout with icons) */}
            <div className="pt-6 border-t border-[#EFECE6] grid grid-cols-3 gap-3 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#166534] shrink-0" />
                <span className="font-medium text-[#292524]">Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#C25E2E] shrink-0" />
                <span className="font-medium text-[#292524]">Pure Butter & Ghee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0369A1] shrink-0" />
                <span className="font-medium text-[#292524]">FSSAI Compliant</span>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DFD5] bg-[#EBE4D8] aspect-[16/10] sm:aspect-[16/10]">
              <img
                src={heroSpreadImg}
                alt="HomeBite homemade artisanal snacks spread on rustic table"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle overlay caption card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white pointer-events-auto backdrop-blur-md bg-black/40 px-4 py-3 rounded-xl border border-white/15">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#F0C987] font-semibold">Today's Fresh Batch</div>
                  <div className="text-sm sm:text-base font-serif font-bold">Slow-Roasted Savories & Fresh Bakes</div>
                </div>
                <button
                  onClick={onShopNow}
                  className="px-3 py-1.5 bg-[#C25E2E] hover:bg-[#A84E24] text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
                >
                  Order Fresh
                </button>
              </div>
            </div>

            {/* Floating Trust Float Badge */}
            <div className="absolute -top-4 -right-2 sm:-top-3 sm:right-4 bg-white/95 backdrop-blur-md border border-[#EFECE6] px-4 py-2 rounded-xl shadow-lg flex items-center gap-2.5">
              <span className="text-xl">⭐️</span>
              <div>
                <div className="text-xs font-bold text-[#292524] tabular-nums">4.9 / 5.0 Rating</div>
                <div className="text-[11px] text-[#78716C]">From 800+ happy households</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
