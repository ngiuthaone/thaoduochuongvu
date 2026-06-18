/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { Product, CartItem, OrderDetails, Category, AboutUsData } from "./types";
import { products as initialProducts, categories as initialCategories } from "./data";
import { Sparkles, Eye, ShieldCheck, Heart, User, Clock, ArrowRight, X } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem("huongvu_cart");
    return local ? JSON.parse(local) : [];
  });
  
  // Custom Dynamic State for customizable products, categories, about us, orders, hero background, and administration trigger
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const local = localStorage.getItem("huongvu_products");
    return local ? JSON.parse(local) : initialProducts;
  });

  const [categoriesList, setCategoriesList] = useState<Category[]>(() => {
    const local = localStorage.getItem("huongvu_categories");
    return local ? JSON.parse(local) : initialCategories;
  });

  const defaultAboutUs: AboutUsData = {
    subtitle: "Hành Trình Gìn Giữ Di Sản",
    title: "VỀ CHÚNG TÔI - THẢO DƯỢC HƯƠNG VŨ",
    description: "Sứ mệnh mang từng giọt tinh túy, thảo mộc quý của núi cao hoang dã Tây Bắc tiếp cận hàng triệu gia đình Việt mong muốn tăng tuổi thọ và bồi bổ sức khỏe tự nhiên.",
    quote: "“Chất lượng từ chữ TÂM, uy tín gầy dựng qua năm tháng”",
    paragraph1: "Khởi đầu từ những chuyến đi rừng dài ngày của dòng họ Vũ tìm kiếm các phương thuốc trân quý của người Dao đỏ, người H'mông bản địa vùng núi Sapa, Hà Giang. Thảo Dược Hương Vũ đã nâng tầm chế biến thủ công giữ trọn vẹn lớp dược lý cao nhất mà không lạm dụng bất kỳ hóa chất diệt cỏ hay sấy lưu huỳnh công nghiệp độc hại nào.",
    paragraph2: "Sản phẩm của Hương Vũ đạt kiểm định an toàn vệ sinh thực phẩm khắt khe và được các chuyên khoa Đông y viện Trung Ương tin dùng kê đơn nâng cao thể trạng.",
    statNumber: "15+ Năm",
    statLabel: "Châm cứu & thảo dược thuần tự nhiên rừng sâu"
  };

  const [aboutUsData, setAboutUsData] = useState<AboutUsData>(() => {
    const local = localStorage.getItem("huongvu_about_us");
    return local ? JSON.parse(local) : defaultAboutUs;
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    const local = localStorage.getItem("huongvu_orders");
    return local ? JSON.parse(local) : [];
  });

  const [heroImage, setHeroImage] = useState<string>(() => {
    const local = localStorage.getItem("huongvu_hero_image");
    return local || "/src/assets/images/hero_vietnam_mountains_new_1781779741604.jpg";
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleSetProducts = (newProds: Product[]) => {
    setProductsList(newProds);
    localStorage.setItem("huongvu_products", JSON.stringify(newProds));
  };

  const handleSetCategories = (newCats: Category[]) => {
    setCategoriesList(newCats);
    localStorage.setItem("huongvu_categories", JSON.stringify(newCats));
  };

  const handleSetAboutUsData = (newAbout: AboutUsData) => {
    setAboutUsData(newAbout);
    localStorage.setItem("huongvu_about_us", JSON.stringify(newAbout));
  };

  const handleSetOrders = (newOrders: OrderDetails[]) => {
    setOrders(newOrders);
    localStorage.setItem("huongvu_orders", JSON.stringify(newOrders));
  };

  const handleSetHeroImage = (newImage: string) => {
    setHeroImage(newImage);
    localStorage.setItem("huongvu_hero_image", newImage);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [addedNotify, setAddedNotify] = useState<string | null>(null);

  // Sync cart with localstorage
  useEffect(() => {
    localStorage.setItem("huongvu_cart", JSON.stringify(cart));
  }, [cart]);

  // Handle auto scroll down to product sections when actively searching
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const element = document.getElementById("products-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchQuery]);

  // Handle adding items to cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const copy = [...prevCart];
        copy[idx].quantity += quantity;
        return copy;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    // Fire tiny alert notification
    setAddedNotify(`Đã thêm ${quantity} × ${product.name} vào giỏ hàng thành công!`);
    setTimeout(() => {
      setAddedNotify(null);
    }, 3000);
  };

  // Modify quantities inside cart
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove an item entirely from cart
  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Clear cart on successful purchase invoice submission
  const handleClearCart = () => {
    setCart([]);
  };

  // Custom navigation anchor helper
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSelectedCategoryFilter("all");
      setSearchQuery("");
      return;
    }

    if (sectionId.startsWith("cat-")) {
      setSelectedCategoryFilter(sectionId);
      const element = document.getElementById("products-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (sectionId === "products") {
      setSelectedCategoryFilter("all");
      const element = document.getElementById("products-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Proceed checkout helper
  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Filter products by searching
  const searchedProducts = productsList.filter((p) => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true;
    return p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
  });

  return (
    <div className="bg-[#faf8f4] text-[#153020] min-h-screen font-sans antialiased selection:bg-[#8f2d24] selection:text-white">
      
      {/* Toast Notification Alert when added to cart */}
      {addedNotify && (
        <div className="fixed top-24 right-4 z-50 bg-[#153020]/95 backdrop-blur-md text-white border-l-4 border-yellow-400 rounded-lg p-4 shadow-xl shadow-[#153020]/20 flex items-center justify-between max-w-sm gap-4 transition-transform duration-300 transform translate-x-0 animate-bounce">
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <span className="font-sans font-semibold">{addedNotify}</span>
          </div>
          <button 
            onClick={() => setAddedNotify(null)}
            className="text-white/60 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary Landing Page Header Header */}
      <Header
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigate={handleNavigateSection}
        categories={categoriesList}
      />

      {/* Hero Section Banner */}
      <Hero 
        onExploreClick={() => handleNavigateSection("products")} 
        heroImage={heroImage}
      />

      {/* Categories Grid list */}
      <Categories onCategorySelect={handleNavigateSection} categories={categoriesList} />

      {/* Dynamic Products listing column / search result section */}
      {searchQuery && (
        <section className="py-10 bg-[#f9f5ed] border-t border-b border-[#eadecc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-bold text-[#153020]">
                Kết quả tìm kiếm cho: &ldquo;<span className="text-[#8f2d24]">{searchQuery}</span>&rdquo;
              </h3>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-500 hover:text-[#8f2d24] font-medium"
              >
                Xóa tìm kiếm
              </button>
            </div>

            {searchedProducts.length === 0 ? (
              <p className="text-sm font-sans text-slate-500 py-6">Rất tiếc, không tìm thấy sản phẩm thảo dược nào phù hợp với từ khóa này.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#e8dfcf] p-4.5 rounded-xl shadow-sm hover:shadow-md flex items-center space-x-4 cursor-pointer hover:border-[#153020]/20 transition-all duration-300"
                    onClick={() => setActiveDetailProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#153020] hover:text-[#8f2d24]">{product.name}</h4>
                      <p className="font-sans text-xs text-[#8f2d24] font-bold mt-1">
                        {product.price.toLocaleString("vi-VN")}đ
                      </p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block line-clamp-1">{product.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main products catalog card lists */}
      <Products
        onProductClick={setActiveDetailProduct}
        onAddToCart={handleAddToCart}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        products={productsList}
        categories={categoriesList}
      />

      {/* About Us section */}
      <AboutUs heroImage={heroImage} data={aboutUsData} />

      {/* Contact & Map locations section */}
      <Contact />

      {/* Bottom Footer Section */}
      <Footer onNavigate={handleNavigateSection} />

      {/* Detailed dialog modals */}
      <ProductDetailModal
        product={activeDetailProduct}
        onClose={() => setActiveDetailProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
      />

      {/* Cart Drawer panel slide right */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedCheckout}
      />

      {/* Secure Order forms popup */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={(id, orderDetails) => handleSetOrders([orderDetails, ...orders])}
        clearCart={handleClearCart}
      />

      {/* Beautiful Admin Area Trigger Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 transition-transform active:scale-95 group">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#153020] to-[#8f2d24] text-[#d4af37] border border-[#d4af37]/40 font-sans font-bold text-[11px] sm:text-xs uppercase px-4.5 py-3 rounded-full shadow-2xl hover:brightness-110 cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          <span>⚙️ BẢNG QUẢN TRỊ</span>
        </button>
      </div>

      {/* Comprehensive Offline Admin Dashboard panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={productsList}
        setProducts={handleSetProducts}
        categories={categoriesList}
        setCategories={handleSetCategories}
        aboutUsData={aboutUsData}
        setAboutUsData={handleSetAboutUsData}
        orders={orders}
        setOrders={handleSetOrders}
        heroImage={heroImage}
        setHeroImage={handleSetHeroImage}
      />

    </div>
  );
}

