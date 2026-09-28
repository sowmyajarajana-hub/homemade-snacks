import { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Sparkles, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedCheckout: () => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 499;
  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 50;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const amountNeededForFreeDelivery = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'HOMEBITE10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied to your fresh batch!');
    } else if (code === 'FREESHIP') {
      setDiscountPercent(5);
      setPromoSuccess('Special discount applied!');
    } else {
      setPromoError('Invalid coupon code. Try HOMEBITE10');
    }
  };

  const handleDirectWhatsAppCart = () => {
    if (items.length === 0) return;
    const itemListText = items
      .map((item, index) => `${index + 1}. *${item.name}* (${item.weight}) x ${item.quantity} = ₹${item.unitPrice * item.quantity}`)
      .join('\n');

    const text = encodeURIComponent(
      `Hi HomeBite Snacks! 👋 I'd like to place an order from your website:\n\n` +
      `*Order Summary:*\n` +
      `${itemListText}\n\n` +
      `• Subtotal: ₹${subtotal}\n` +
      `${discountAmount > 0 ? `• Discount: -₹${discountAmount}\n` : ''}` +
      `• Delivery Fee: ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n` +
      `• *Total: ₹${finalTotal}*\n\n` +
      `Please let me know how to proceed with payment and delivery address!`
    );
    window.open(`https://wa.me/919845012345?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#EFECE6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-[#EFECE6] bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C25E2E]" />
            <h2 className="text-lg font-bold font-serif text-[#292524]">
              Your Snack Basket
            </h2>
            <span className="text-xs bg-[#E5E0D8] text-[#57534E] font-semibold px-2 py-0.5 rounded-full tabular-nums">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#292524] rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {subtotal > 0 && (
          <div className="bg-[#FFFBEB] border-b border-[#FEF3C7] px-4 py-2.5 text-xs text-[#92400E]">
            {amountNeededForFreeDelivery > 0 ? (
              <div>
                <span>Add <strong>₹{amountNeededForFreeDelivery}</strong> more to unlock <strong>Free Delivery</strong>!</span>
                <div className="w-full bg-[#FDE68A] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#D97706] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 font-semibold text-[#166534]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Congratulations! Your order qualifies for Free Doorstep Delivery!</span>
              </div>
            )}
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#F2ECE3]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E5E0D8] flex items-center justify-center text-2xl">
                🍪
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#292524]">
                  Your snack basket is empty
                </h3>
                <p className="text-xs text-[#78716C] mt-1 max-w-xs">
                  Discover our freshly baked almond cookies, crispy traditional murukku, or decadent cakes.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#C25E2E] hover:bg-[#A84E24] rounded-full transition-colors cursor-pointer"
              >
                Browse Fresh Snacks
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-[#F5F2EB] border border-[#E5E0D8] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#292524] truncate">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-[#78716C] mt-0.5">
                    Pack: <span className="font-semibold text-[#44403C]">{item.weight}</span>
                  </div>
                  <div className="text-xs font-bold text-[#C25E2E] mt-1 tabular-nums">
                    ₹{item.unitPrice * item.quantity}
                    <span className="text-[10px] text-[#A8A29E] font-normal ml-1">
                      (₹{item.unitPrice} each)
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center border border-[#D6CEBE] rounded-lg bg-[#FAF7F2]">
                    <button
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-2 py-0.5 text-xs text-[#57534E] hover:text-black font-semibold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 py-0.5 text-xs font-bold text-[#292524] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-2 py-0.5 text-xs text-[#57534E] hover:text-black font-semibold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.cartItemId)}
                    className="text-[#A8A29E] hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary / Checkout Area */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EFECE6] bg-[#FAF7F2] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. HOMEBITE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#D6CEBE] rounded-lg text-xs outline-none focus:border-[#C25E2E] uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#292524] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoSuccess && <div className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</div>}
              {promoError && <div className="text-[11px] text-red-600 font-medium">{promoError}</div>}
            </form>

            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs text-[#57534E] pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#292524] tabular-nums">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Discount (10%):</span>
                  <span className="font-semibold tabular-nums">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Fresh Doorstep Delivery:</span>
                <span className="font-semibold tabular-nums">
                  {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#292524] pt-2 border-t border-[#E5E0D8]">
                <span>To Pay:</span>
                <span className="font-serif text-base text-[#C25E2E] tabular-nums">₹{finalTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={onProceedCheckout}
                className="w-full py-3 px-4 bg-[#C25E2E] hover:bg-[#A84E24] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDirectWhatsAppCart}
                className="w-full py-2.5 px-4 bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] text-[#166534] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant Order via WhatsApp</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
