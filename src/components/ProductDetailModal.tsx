import { useState } from 'react';
import { Product, Review } from '../types';
import { X, Star, ShoppingBag, MessageCircle, Check, ShieldCheck, Clock, AlertTriangle, ChefHat, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedWeight: string, price: number, quantity: number) => void;
  onOrderNow: (product: Product, selectedWeight: string, price: number, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onOrderNow,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [addedToast, setAddedToast] = useState(false);

  // New review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);

  const currentOption =
    product.weightOptions.find((opt) => opt.weight === selectedWeight) ||
    product.weightOptions[0];
  const unitPrice = currentOption.price;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, selectedWeight, unitPrice, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello HomeBite Snacks! 👋 I would like to order:\n` +
      `• *${product.name}*\n` +
      `• Pack size: ${selectedWeight}\n` +
      `• Quantity: ${quantity}\n` +
      `• Total: ₹${totalPrice}\n\n` +
      `Please let me know how soon this fresh batch can be delivered!`
    );
    window.open(`https://wa.me/919845012345?text=${text}`, '_blank');
  };

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewCity.trim() || 'Verified Buyer',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E5E0D8] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFECE6] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs text-[#78716C] font-medium">
            <span className="text-[#8C3D18]">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-semibold">{product.isVeg ? '100% Pure Veg' : 'Non-Veg'}</span>
            <span aria-hidden="true">·</span>
            <span>Batch ID: HB-{product.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#78716C] hover:text-[#292524] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#F5F2EB] border border-[#E5E0D8] shadow-inner relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                  Fresh Batch Today
                </div>
              </div>

              {/* Quick Trust badges */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] text-xs space-y-1.5 text-[#57534E]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#8C3D18]" />
                  <span><strong>Shelf Life:</strong> {product.shelfLife}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Zero Palm Oil & Zero Preservatives</span>
                </div>
              </div>
            </div>

            {/* Info & Options Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#292524] leading-snug">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-[#78716C]">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#292524] tabular-nums">{product.rating}</span>
                  <span>({reviewsList.length} verified reviews)</span>
                </div>
              </div>

              <p className="text-sm text-[#57534E] leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Weight Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524]">Choose Available Pack Size:</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.weightOptions.map((opt) => {
                    const isSelected = opt.weight === selectedWeight;
                    return (
                      <button
                        key={opt.weight}
                        onClick={() => setSelectedWeight(opt.weight)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#292524] text-white border-[#292524] shadow-sm'
                            : 'bg-white text-[#44403C] border-[#E5E0D8] hover:border-[#D6CEBE]'
                        }`}
                      >
                        <div className="text-xs font-semibold">{opt.weight}</div>
                        <div className={`text-xs tabular-nums mt-0.5 ${isSelected ? 'text-[#F0C987]' : 'text-[#78716C]'}`}>
                          ₹{opt.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Price */}
              <div className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#57534E]">Quantity:</span>
                  <div className="flex items-center border border-[#D6CEBE] rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-sm font-semibold text-[#57534E] hover:bg-[#FAF7F2] rounded-l-lg transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-[#292524] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-sm font-semibold text-[#57534E] hover:bg-[#FAF7F2] rounded-r-lg transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-[#78716C]">Total Price</div>
                  <div className="text-xl font-bold font-serif text-[#C25E2E] tabular-nums">
                    ₹{totalPrice}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    addedToast
                      ? 'bg-[#166534] text-white'
                      : 'bg-[#292524] hover:bg-[#1C1917] text-white shadow-xs'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#166534] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

            </div>
          </div>

          {/* Navigation Tabs: Product Specifications vs Reviews */}
          <div className="border-t border-[#EFECE6] pt-4">
            <div className="flex items-center gap-2 border-b border-[#EFECE6] pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#292524] text-white'
                    : 'text-[#78716C] hover:text-[#292524]'
                }`}
              >
                Specifications & Ingredients
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-[#292524] text-white'
                    : 'text-[#78716C] hover:text-[#292524]'
                }`}
              >
                <span>Customer Reviews</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${activeTab === 'reviews' ? 'bg-[#44403C] text-white' : 'bg-[#EFECE6] text-[#57534E]'}`}>
                  {reviewsList.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Detailed Specifications */}
            {activeTab === 'details' && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Ingredients */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#292524]">
                    <ChefHat className="w-4 h-4 text-[#C25E2E]" />
                    <span>Pure Kitchen Ingredients:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.ingredients.map((ing, i) => (
                      <span key={i} className="bg-white border border-[#D6CEBE] text-[#44403C] px-2 py-1 rounded text-[11px]">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preparation Info */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#292524]">
                    <Sparkles className="w-4 h-4 text-[#8C3D18]" />
                    <span>Preparation Method:</span>
                  </div>
                  <p className="text-[#57534E] leading-relaxed">
                    {product.prepInfo}
                  </p>
                </div>

                {/* Storage Instructions */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#292524]">
                    <Clock className="w-4 h-4 text-[#166534]" />
                    <span>Storage Instructions:</span>
                  </div>
                  <p className="text-[#57534E] leading-relaxed">
                    {product.storageInstructions}
                  </p>
                </div>

                {/* Allergen Information */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EBE6DC] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#292524]">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Allergen Advice:</span>
                  </div>
                  <p className="text-[#57534E] leading-relaxed">
                    {product.allergenInfo}
                  </p>
                </div>

              </div>
            )}

            {/* Tab 2: Reviews */}
            {activeTab === 'reviews' && (
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#78716C]">
                    Customer experiences from real orders
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-xs font-semibold text-[#C25E2E] hover:underline cursor-pointer"
                  >
                    {showReviewForm ? 'Cancel Form' : '+ Write a Review'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handlePostReview} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#D6CEBE] space-y-3">
                    <div className="font-semibold text-xs text-[#292524]">Share Your Taste Experience:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="bg-white border border-[#D6CEBE] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#C25E2E]"
                      />
                      <input
                        type="text"
                        placeholder="Your City (e.g. Bengaluru)"
                        value={newReviewCity}
                        onChange={(e) => setNewReviewCity(e.target.value)}
                        className="bg-white border border-[#D6CEBE] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#C25E2E]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#57534E]">Rating:</span>
                      <div className="flex gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setNewReviewRating(num)}
                            className="cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${num <= newReviewRating ? 'fill-current' : 'text-[#D6CEBE]'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      placeholder="What did you love about this homemade snack?"
                      required
                      rows={2}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full bg-white border border-[#D6CEBE] rounded-lg p-2 text-xs outline-none focus:border-[#C25E2E]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#292524] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-white border border-[#E5E0D8] rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#292524]">{rev.author}</span>
                          <span className="text-[11px] text-[#78716C]">• {rev.location}</span>
                          {rev.verified && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-medium">
                              Verified Order
                            </span>
                          )}
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(rev.rating) ? 'fill-current' : 'text-[#E5E0D8]'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#57534E] leading-relaxed">"{rev.comment}"</p>
                      <div className="text-[10px] text-[#A8A29E]">{rev.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
