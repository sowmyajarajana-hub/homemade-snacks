import { Heart, Sparkles, UtensilsCrossed, ShieldAlert, Award, Coffee } from 'lucide-react';
import murukkuImg from '../assets/images/traditional_murukku_1790578753947.jpg';

export function OurStorySection() {
  return (
    <section id="story" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#EFECE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Story Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DFD5] bg-[#EBE4D8] aspect-[4/3]">
              <img
                src={murukkuImg}
                alt="Traditional homemade snacks preparation at HomeBite"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 backdrop-blur-md bg-black/40 rounded-xl border border-white/15">
                <span className="text-[11px] font-mono text-[#F0C987] uppercase tracking-wider block">Artisan Tradition</span>
                <span className="text-sm font-serif font-bold">Stone-Ground, Hand-Extruded, Slowly Fried in Single Batches</span>
              </div>
            </div>

            {/* Overlapping Floating badge */}
            <div className="absolute -bottom-6 -right-3 sm:right-6 bg-white p-4 rounded-xl border border-[#E5E0D8] shadow-lg max-w-xs space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#C25E2E]">
                <Heart className="w-4 h-4 fill-current" />
                <span>Small Batch Philosophy</span>
              </div>
              <p className="text-[11px] text-[#57534E] leading-normal">
                We never mass-produce in industrial factories. Each snack is made by home cooks who take immense pride in flavor.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3D18]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#292524] leading-tight text-balance">
                Preserving the Sacred Taste of Mother's Kitchen
              </h2>
            </div>

            <div className="space-y-4 text-sm text-[#57534E] leading-relaxed">
              <p>
                HomeBite Snacks started around our family dining table with a simple longing: where did the honest, wholesome snacks of our childhood go? The ones made with fresh stone-ground flours, fragrant whole spices, and pure churned cow ghee that didn't leave a heavy, artificial grease in your mouth.
              </p>
              <p>
                Frustrated by supermarket snack packets loaded with stale palm oil, artificial flavor enhancers, and months of preservatives, we began preparing traditional murukkus, slow-roasted masala nuts, and butter almond cookies in our home kitchen for friends and neighbours.
              </p>
              <p>
                Today, our kitchen remains true to that very first batch: <strong>we prepare in small, numbered batches</strong> using authentic recipes passed down through three generations. No industrial short-cuts. Just pure ingredients, utmost hygiene, and love.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EFECE6]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#292524]">
                  <UtensilsCrossed className="w-4 h-4 text-[#C25E2E]" />
                  <span>Grandmother's Recipes</span>
                </div>
                <p className="text-[11px] text-[#78716C]">
                  Authentic spices roasted and pounded by hand for nuanced regional flavors.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#292524]">
                  <ShieldAlert className="w-4 h-4 text-[#166534]" />
                  <span>Zero Palm Oil or Vanaspati</span>
                </div>
                <p className="text-[11px] text-[#78716C]">
                  Fried exclusively in cold-pressed groundnut oil, virgin coconut oil, or pure cow ghee.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#292524]">
                  <Award className="w-4 h-4 text-[#0369A1]" />
                  <span>Hygienic Home Kitchen</span>
                </div>
                <p className="text-[11px] text-[#78716C]">
                  Prepared in sanitized stainless-steel cooktops following strict safety protocols.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#292524]">
                  <Coffee className="w-4 h-4 text-[#B45309]" />
                  <span>Made Fresh on Order</span>
                </div>
                <p className="text-[11px] text-[#78716C]">
                  Never stored for months in warehouses. Dispatched directly from pan to your porch.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
