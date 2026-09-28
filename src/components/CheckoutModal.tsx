import { useState } from 'react';
import { CartItem, CheckoutDetails, OrderRecord } from '../types';
import { X, CheckCircle, ShieldCheck, MapPin, CreditCard, Banknote, Smartphone, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  onOrderPlaced: (order: OrderRecord) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  deliveryFee,
  total,
  onOrderPlaced,
}: CheckoutModalProps) {
  const [form, setForm] = useState<CheckoutDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    apartment: '',
    city: 'Bengaluru',
    postalCode: '',
    deliveryNotes: '',
    paymentMethod: 'cod',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim() || !form.postalCode.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (form.phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable order processing
    setTimeout(() => {
      const orderId = `HB-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderRecord = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items,
        subtotal,
        discount,
        deliveryFee,
        total,
        customer: { ...form },
        status: 'Received',
        estimatedDelivery: 'Tomorrow morning (Fresh batch dispatch)',
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E5E0D8] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFECE6] bg-[#FAF7F2]">
          <div>
            <h2 className="text-xl font-bold font-serif text-[#292524]">
              Complete Your Homemade Snack Order
            </h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Freshly packed in hygienic kitchen containers with tamper seal
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#78716C] hover:text-[#292524] rounded-lg transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#8C3D18] uppercase tracking-wider flex items-center gap-1.5">
              <span>01. Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:ring-1 focus:ring-[#C25E2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1">
                  Phone Number (for delivery updates) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9845012345"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:ring-1 focus:ring-[#C25E2E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#44403C] mb-1">
                  Email Address (for order receipt)
                </label>
                <input
                  type="email"
                  placeholder="e.g. ananya@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:ring-1 focus:ring-[#C25E2E]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="space-y-3 pt-2 border-t border-[#EFECE6]">
            <h3 className="text-xs font-bold text-[#8C3D18] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>02. Delivery Address</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1">
                  House / Flat / Building / Street *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Flat 402, Green Meadows, 12th Main"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:ring-1 focus:ring-[#C25E2E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:ring-1 focus:ring-[#C25E2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#44403C] mb-1">
                    Pin Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 560038"
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:ring-1 focus:ring-[#C25E2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1">
                  Delivery Notes / Dietary Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave with security / Ring doorbell"
                  value={form.deliveryNotes}
                  onChange={(e) => setForm({ ...form, deliveryNotes: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:ring-1 focus:ring-[#C25E2E]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3 pt-2 border-t border-[#EFECE6]">
            <h3 className="text-xs font-bold text-[#8C3D18] uppercase tracking-wider flex items-center gap-1.5">
              <span>03. Payment Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label
                className={`p-3 rounded-xl border flex flex-col items-start gap-1 cursor-pointer transition-all ${
                  form.paymentMethod === 'cod'
                    ? 'border-[#C25E2E] bg-[#FFF8F4] ring-1 ring-[#C25E2E]'
                    : 'border-[#E5E0D8] bg-white hover:border-[#D6CEBE]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.paymentMethod === 'cod'}
                  onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                  className="sr-only"
                />
                <Banknote className="w-4 h-4 text-[#C25E2E]" />
                <span className="text-xs font-bold text-[#292524]">Cash on Delivery</span>
                <span className="text-[10px] text-[#78716C]">Pay when snacks arrive</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-start gap-1 cursor-pointer transition-all ${
                  form.paymentMethod === 'upi'
                    ? 'border-[#C25E2E] bg-[#FFF8F4] ring-1 ring-[#C25E2E]'
                    : 'border-[#E5E0D8] bg-white hover:border-[#D6CEBE]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={form.paymentMethod === 'upi'}
                  onChange={() => setForm({ ...form, paymentMethod: 'upi' })}
                  className="sr-only"
                />
                <Smartphone className="w-4 h-4 text-[#166534]" />
                <span className="text-xs font-bold text-[#292524]">UPI / QR / GPay</span>
                <span className="text-[10px] text-[#78716C]">Instant mobile payment</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-start gap-1 cursor-pointer transition-all ${
                  form.paymentMethod === 'card'
                    ? 'border-[#C25E2E] bg-[#FFF8F4] ring-1 ring-[#C25E2E]'
                    : 'border-[#E5E0D8] bg-white hover:border-[#D6CEBE]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.paymentMethod === 'card'}
                  onChange={() => setForm({ ...form, paymentMethod: 'card' })}
                  className="sr-only"
                />
                <CreditCard className="w-4 h-4 text-[#0369A1]" />
                <span className="text-xs font-bold text-[#292524]">Cards / Net Banking</span>
                <span className="text-[10px] text-[#78716C]">All major cards</span>
              </label>
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] space-y-2 text-xs text-[#57534E]">
            <div className="font-bold text-[#292524] flex justify-between">
              <span>Order Total ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span className="text-base text-[#C25E2E] font-serif tabular-nums">₹{total}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#166534]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Homemade Quality Guarantee · Prepared Fresh in Small Batches</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#C25E2E] hover:bg-[#A84E24] active:scale-[0.99] text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Confirming Fresh Batch...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Place Order (₹{total})</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
