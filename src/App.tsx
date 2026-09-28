/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CategoryId, OrderRecord } from './types';
import { TopPromoBanner } from './components/TopPromoBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { OurStorySection } from './components/OurStorySection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { ContactSection } from './components/ContactSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';
import { Sparkles, Flame, Check } from 'lucide-react';

export default function App() {
  // Navigation & Filter state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'bestsellers' | 'new'>('all');

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Provide 1 initial fresh item so user immediately sees a functional cart with subtotal
    {
      cartItemId: 'hb-01-250g',
      productId: 'hb-01',
      name: 'Artisanal Butter Almond Cookies',
      image: PRODUCTS[0].image,
      weight: '250g',
      unitPrice: 220,
      quantity: 1,
      isVeg: true,
    },
  ]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, weight: string, price: number, quantity: number = 1) => {
    const cartItemId = `${product.id}-${weight}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          weight,
          unitPrice: price,
          quantity,
          isVeg: product.isVeg,
        },
      ];
    });

    showToast(`Added ${quantity} × ${product.name} (${weight}) to your basket!`);
  };

  const handleOrderNow = (product: Product, weight: string, price: number, quantity: number = 1) => {
    handleAddToCart(product, weight, price, quantity);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Checkout handling
  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: OrderRecord) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    handleClearCart();
  };

  // Navigation scroll helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSearch = () => {
    handleNavigateSection('explore');
    const input = document.querySelector('input[type="text"]') as HTMLInputElement | null;
    if (input) {
      input.focus();
    }
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Quick filter type (bestsellers / new)
      if (filterType === 'bestsellers' && !item.isBestSeller) {
        return false;
      }
      if (filterType === 'new' && !item.isNewArrival) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.shortDescription.toLowerCase().includes(query);
        const matchIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        const matchCat = item.categoryLabel.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchIngredients && !matchCat) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, filterType, searchQuery]);

  // Best Sellers subset for the dedicated showcase
  const bestSellers = useMemo(() => {
    return PRODUCTS.filter((p) => p.isBestSeller);
  }, []);

  // Cart financial summary
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 50;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#292524]">
      {/* Slim Promotional Notification Banner */}
      <TopPromoBanner />

      {/* Strict 3-Zone Navigation Top Bar */}
      <Navbar
        cartItemCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onToggleSearch={handleToggleSearch}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onShopNow={() => handleNavigateSection('explore')}
          onExploreSnacks={() => handleNavigateSection('explore')}
        />

        {/* Best Sellers Showcase Section */}
        <section id="bestsellers" className="py-12 sm:py-16 border-b border-[#EFECE6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3D18]">
                  <Flame className="w-3.5 h-3.5 text-[#C25E2E]" />
                  <span>Customer Favorites</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-[#292524] mt-1">
                  Our Best Sellers
                </h2>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                  The most requested homemade treats baked & roasted fresh daily in our kitchen.
                </p>
              </div>

              <button
                onClick={() => {
                  setFilterType('bestsellers');
                  handleNavigateSection('explore');
                }}
                className="text-xs font-semibold text-[#C25E2E] hover:underline self-start sm:self-auto cursor-pointer"
              >
                View all bestsellers →
              </button>
            </div>

            {/* Best Sellers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onOrderNow={handleOrderNow}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Product Catalog Section with Category Filter & Search */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Catalog Section Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3D18]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Small Batch Artisanal Menu</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#292524] mt-1">
                Explore Homemade Delights
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl">
                Select your preferred pack size and enjoy authentic crunch, sweet treats, and savory snacks prepared without any preservatives.
              </p>
            </div>

            {/* Category Filter & Search Controls */}
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              totalProductsCount={filteredProducts.length}
            />

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8] space-y-3">
                <div className="text-3xl">🔍</div>
                <h3 className="text-base font-bold font-serif text-[#292524]">
                  No snack found matching your selection
                </h3>
                <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                  Try clearing your search query or switching categories to see other fresh batches.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFilterType('all');
                  }}
                  className="px-4 py-2 bg-[#292524] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onOrderNow={handleOrderNow}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Special Offers & Combo Hampers Section */}
        <SpecialOffersSection
          onShopCategory={(cat) => {
            setSelectedCategory(cat);
            handleNavigateSection('explore');
          }}
        />

        {/* Our Story / Heritage Kitchen Section */}
        <OurStorySection />

        {/* Customer Reviews & Testimonials Section */}
        <CustomerReviewsSection />

        {/* Contact & Kitchen Location Section */}
        <ContactSection />
      </main>

      {/* Quiet Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Floating Instant WhatsApp Button */}
      <WhatsAppFloatingButton />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOrderNow={(prod, weight, price, qty) => {
          handleAddToCart(prod, weight, price, qty);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={handleProceedCheckout}
        onClearCart={handleClearCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={0}
        deliveryFee={deliveryFee}
        total={total}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Quick Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1C1917]/95 text-white px-4 py-2.5 rounded-full shadow-xl border border-white/10 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
