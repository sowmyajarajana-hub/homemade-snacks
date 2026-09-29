import { useState } from 'react';
import { ShoppingBag, Search, MessageCircle, Menu, X, Bot } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onToggleSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenChatbot?: () => void;
}

export function Navbar({
  cartItemCount,
  onOpenCart,
  onToggleSearch,
  onNavigateSection,
  onOpenChatbot,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      "Hi HomeBite Snacks! 👋 I would like to explore today's fresh homemade snacks menu and place an order."
    );
    window.open(`https://wa.me/919845012345?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EFECE6] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element in display font) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="text-2xl sm:text-2xl font-bold tracking-tight text-[#292524] hover:text-[#C25E2E] transition-colors flex items-center gap-1.5"
        >
          <span className="font-serif">HomeBite</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C25E2E] font-sans">Snacks</span>
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          <button
            onClick={() => handleNavClick('explore')}
            className="hover:text-[#292524] hover:underline underline-offset-8 transition-colors cursor-pointer"
          >
            Explore Snacks
          </button>
          <button
            onClick={() => handleNavClick('bestsellers')}
            className="hover:text-[#292524] hover:underline underline-offset-8 transition-colors cursor-pointer"
          >
            Best Sellers
          </button>
          <button
            onClick={() => handleNavClick('special-offers')}
            className="hover:text-[#292524] hover:underline underline-offset-8 transition-colors cursor-pointer"
          >
            Special Offers
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="hover:text-[#292524] hover:underline underline-offset-8 transition-colors cursor-pointer"
          >
            Our Story
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-[#292524] hover:underline underline-offset-8 transition-colors cursor-pointer"
          >
            Customer Reviews
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hover:text-[#292524] hover:underline underline-offset-8 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search button */}
          <button
            onClick={onToggleSearch}
            className="p-2 text-[#57534E] hover:text-[#292524] hover:bg-[#EFECE6]/60 rounded-full transition-colors"
            title="Search snacks"
            aria-label="Search snacks"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* AI Assistant Chatbot Button */}
          {onOpenChatbot && (
            <button
              onClick={onOpenChatbot}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8C3D18] bg-[#FDF2E9] hover:bg-[#FCE7D6] border border-[#F3C4A5] rounded-full transition-colors whitespace-nowrap cursor-pointer"
              title="Chat with our Snack Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-[#C25E2E]" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          )}

          {/* WhatsApp Direct Order Button */}
          <button
            onClick={handleDirectWhatsApp}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#166534] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] rounded-full transition-colors whitespace-nowrap"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp Order</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C25E2E] hover:bg-[#A84E24] active:scale-[0.98] rounded-full transition-all shadow-sm whitespace-nowrap cursor-pointer"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="bg-[#451A03] text-[#FEF3C7] text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center tabular-nums">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#57534E] hover:text-[#292524] rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EFECE6] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#44403C]">
            <button
              onClick={() => handleNavClick('explore')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              Explore Snacks & Menu
            </button>
            <button
              onClick={() => handleNavClick('bestsellers')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              Best Sellers
            </button>
            <button
              onClick={() => handleNavClick('special-offers')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              Special Offers & Combos
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              Our Story & Kitchen
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              Contact & Business Location
            </button>
          </div>

          <div className="pt-2 border-t border-[#EFECE6] space-y-2">
            {onOpenChatbot && (
              <button
                onClick={() => {
                  onOpenChatbot();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#8C3D18] bg-[#FDF2E9] hover:bg-[#FCE7D6] border border-[#F3C4A5] rounded-lg transition-colors cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#C25E2E]" />
                <span>Chat with Snack Assistant (AI)</span>
              </button>
            )}
            <button
              onClick={handleDirectWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#166534] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] rounded-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat & Order on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
