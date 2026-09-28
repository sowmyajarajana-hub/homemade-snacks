import { OrderRecord } from '../types';
import { CheckCircle2, MessageCircle, ArrowRight, MapPin, Calendar, Clock, ShoppingBag } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderRecord | null;
  onClose: () => void;
}

export function OrderConfirmationModal({ order, onClose }: OrderConfirmationModalProps) {
  if (!order) return null;

  const handleSendToWhatsApp = () => {
    const itemsList = order.items
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.weight}) x ${item.quantity} = ₹${item.unitPrice * item.quantity}`)
      .join('\n');

    const msg = encodeURIComponent(
      `🎉 *New Order Placed on HomeBite Snacks!*\n\n` +
      `*Order ID:* ${order.orderId}\n` +
      `*Customer:* ${order.customer.fullName}\n` +
      `*Phone:* ${order.customer.phone}\n` +
      `*Delivery Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.postalCode}\n` +
      `*Payment Method:* ${order.customer.paymentMethod.toUpperCase()}\n\n` +
      `*Items Ordered:*\n${itemsList}\n\n` +
      `*Total Paid/Due:* ₹${order.total}\n\n` +
      `Please confirm my batch preparation time!`
    );

    window.open(`https://wa.me/919845012345?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E5E0D8] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header Banner */}
        <div className="bg-[#14532D] text-white p-6 text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto text-emerald-200">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Order Confirmed!
          </h2>
          <p className="text-xs text-[#BBF7D0]">
            Thank you, {order.customer.fullName}. Your homemade snacks are being freshly prepared with love.
          </p>
          <div className="inline-block bg-black/25 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-emerald-100">
            Order #{order.orderId}
          </div>
        </div>

        {/* Receipt Details Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-[#57534E]">
          
          {/* Estimated dispatch */}
          <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#C25E2E] shrink-0" />
            <div>
              <div className="font-semibold text-[#292524]">Batch Preparation Status:</div>
              <div className="text-[11px] text-[#78716C]">{order.estimatedDelivery}</div>
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#8C3D18] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#292524]">Delivering To:</div>
              <div className="text-[11px] text-[#44403C] mt-0.5">
                {order.customer.address}, {order.customer.city} - {order.customer.postalCode}
              </div>
              <div className="text-[11px] text-[#78716C]">Phone: {order.customer.phone}</div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-2 pt-2 border-t border-[#EFECE6]">
            <div className="font-bold text-[#292524] flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#C25E2E]" />
              <span>Items Ordered:</span>
            </div>
            <div className="space-y-1.5 divide-y divide-[#F5F2EB]">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="pt-1.5 first:pt-0 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-[#292524]">{item.name}</span>
                    <span className="text-[11px] text-[#78716C] ml-1">({item.weight} × {item.quantity})</span>
                  </div>
                  <span className="font-semibold tabular-nums text-[#292524]">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E5E0D8] space-y-1 text-[#78716C]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="tabular-nums font-semibold text-[#292524]">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Coupon Savings:</span>
                  <span className="tabular-nums font-semibold">-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doorstep Delivery:</span>
                <span className="tabular-nums font-semibold text-[#292524]">
                  {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#292524] pt-1 border-t border-[#E5E0D8]">
                <span>Total Amount Paid / Due:</span>
                <span className="font-serif text-[#C25E2E] tabular-nums">₹{order.total}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="p-4 sm:p-5 border-t border-[#EFECE6] bg-[#FAF7F2] space-y-2">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full py-3 px-4 bg-[#166534] hover:bg-[#14532D] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Send Order Copy to WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-white hover:bg-[#FAF7F2] border border-[#D6CEBE] text-[#44403C] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
