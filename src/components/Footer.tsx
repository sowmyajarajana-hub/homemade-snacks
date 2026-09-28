interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export function Footer({ onNavigateSection }: FooterProps) {
  return (
    <footer className="bg-[#1C1917] text-[#D6D3D1] border-t border-[#292524] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-1.5 text-white">
              <span className="font-serif text-2xl font-bold">HomeBite</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F0C987] font-sans">Snacks</span>
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm">
              Fresh, delicious, hygienic homemade snacks prepared in small batches with quality ingredients and traditional recipes. Made with love for your teatime moments.
            </p>
            <div className="text-xs text-[#78716C]">
              FSSAI Reg. No. 21224009000184 · Indiranagar, Bengaluru
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Snack Categories
            </h4>
            <ul className="text-xs space-y-1.5 text-[#A8A29E]">
              <li>
                <button
                  onClick={() => onNavigateSection('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cookies & Biscuits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Traditional Murukku & Savories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Homemade Tea Cakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Artisan Dark Chocolates & Sweets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Spicy Mixture & Masala Cashews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Festive Gift Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="text-xs space-y-1.5 text-[#A8A29E]">
              <li>
                <button
                  onClick={() => onNavigateSection('bestsellers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('special-offers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Special Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Kitchen Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Quality Notice Col */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Pure Ingredients Guarantee
            </h4>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              We never use cheap palm oil, artificial colors, chemical preservatives, or synthetic leaveners. All traditional snacks are freshly made with pure cow ghee and cold-pressed oils.
            </p>
            <div className="pt-2 text-xs text-[#F0C987] font-semibold">
              ❤️ Handcrafted daily in small batches
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} HomeBite Snacks. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Fresh Batch Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Hygienic Packaging</span>
            <span aria-hidden="true">·</span>
            <span>100% Vegetarian Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
