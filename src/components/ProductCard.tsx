import { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedWeight: string, price: number) => void;
  onOrderNow: (product: Product, selectedWeight: string, price: number) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onOrderNow,
  onViewDetails,
}: ProductCardProps) {
  // Local state for selected weight
  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Find price for currently selected weight
  const currentOption =
    product.weightOptions.find((opt) => opt.weight === selectedWeight) ||
    product.weightOptions[0];
  const currentPrice = currentOption.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedWeight, currentPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOrderNow(product, selectedWeight, currentPrice);
  };

  return (
    <article
      onClick={() => onViewDetails(product)}
      className="group relative bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden hover:border-[#D6CEBE] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-[#F5F2EB] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Minimal text kicker overlay for badges (Zero-pill discipline) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#451A03]/90 backdrop-blur-xs text-[#FEF3C7] text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#14532D]/90 backdrop-blur-xs text-[#DCFCE7] text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm">
              New Batch
            </span>
          )}
        </div>

        {/* Veg Food Safe Mark on top right */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-1 rounded-sm border border-[#E5E0D8] shadow-2xs pointer-events-none">
          <div className="w-3.5 h-3.5 border-2 border-emerald-600 p-[2px] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </div>
        </div>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-[#292524] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#C25E2E]" />
            <span>Quick View Details</span>
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Metadata (Zero-pill rule: clean text with typographic separator) */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-1.5 font-medium">
            <span className="text-[#8C3D18]">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.isVeg ? '100% Pure Veg' : 'Non-Veg'}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#292524]">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-semibold tabular-nums">{product.rating}</span>
              <span className="text-[#A8A29E]">({product.reviewCount})</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-bold text-[#292524] group-hover:text-[#C25E2E] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#57534E] line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Weight Selector & Pricing Area */}
        <div className="pt-2 border-t border-[#F2ECE3] space-y-3">
          {/* Weight Options Segmented Selector */}
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-[#78716C] flex justify-between">
              <span>Select Pack Size:</span>
              <span className="font-semibold text-[#292524]">{selectedWeight}</span>
            </div>
            <div
              className="flex items-center gap-1 p-0.5 bg-[#FAF7F2] rounded-lg border border-[#EBE6DC]"
              onClick={(e) => e.stopPropagation()}
            >
              {product.weightOptions.map((opt) => {
                const isSelected = opt.weight === selectedWeight;
                return (
                  <button
                    key={opt.weight}
                    onClick={() => setSelectedWeight(opt.weight)}
                    className={`flex-1 py-1 text-[11px] font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#292524] shadow-xs border border-[#D6CEBE]'
                        : 'text-[#78716C] hover:text-[#292524]'
                    }`}
                  >
                    {opt.weight}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <div className="text-[11px] text-[#78716C]">Fresh Batch Price</div>
              <div className="text-xl font-bold font-serif text-[#292524] tabular-nums">
                ₹{currentPrice}
              </div>
            </div>

            {/* Action Buttons: Add to Cart and Order Now */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  addedAnimation
                    ? 'bg-[#166534] border-[#166534] text-white'
                    : 'bg-[#FAF7F2] border-[#D6CEBE] text-[#292524] hover:bg-[#EFECE6] hover:border-[#B8AC97]'
                }`}
                title="Add to shopping cart"
                aria-label="Add to cart"
              >
                {addedAnimation ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={handleOrderNow}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#C25E2E] hover:bg-[#A84E24] active:scale-[0.98] rounded-xl transition-all shadow-xs whitespace-nowrap cursor-pointer"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
