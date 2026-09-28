import { MessageCircle } from 'lucide-react';

export function WhatsAppFloatingButton() {
  const handleClick = () => {
    const text = encodeURIComponent(
      "Hi HomeBite Snacks! 👋 I'm browsing your website and would like to ask a question / place an order."
    );
    window.open(`https://wa.me/919845012345?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group active:scale-95 cursor-pointer"
        aria-label="Order or Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Order on WhatsApp
        </span>
      </button>
    </div>
  );
}
