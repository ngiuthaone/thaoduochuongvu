/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductsPage from "./components/ProductsPage";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { Product, CartItem, OrderDetails, Category, AboutUsData, ContactData, ConsultationRequest } from "./types";
import { products as initialProducts, categories as initialCategories } from "./data";
import { Sparkles, Eye, ShieldCheck, Heart, User, Clock, ArrowRight, X, ShoppingCart } from "lucide-react";

interface SiteDataState {
  products?: Product[];
  categories?: Category[];
  aboutUs?: AboutUsData;
  heroImage?: string;
  orders?: OrderDetails[];
  contact?: ContactData;
  consultations?: ConsultationRequest[];
}

const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Local storage quota exceeded for key "${key}". Storage will persist on the server:`, error);
  }
};

const safeGetItem = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read cached value for key "${key}":`, error);
    return null;
  }
};

const safeCacheHeroImage = (value: string) => {
  try {
    sessionStorage.setItem("huongvu_hero_image", value);
  } catch (error) {
    console.warn("Unable to cache hero image:", error);
  }
};

// Help strip Vietnamese accent tones for accent-insensitive search queries
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

const getSearchScore = (product: Product, term: string): number => {
  if (!term) return 0;
  const cleanSearch = removeVietnameseTones(term).trim();
  const cleanName = removeVietnameseTones(product.name).trim();
  const cleanDesc = removeVietnameseTones(product.description || "").trim();

  let score = 0;

  const termLower = term.toLowerCase().trim();
  const nameLower = product.name.toLowerCase().trim();
  const descLower = (product.description || "").toLowerCase().trim();

  // 1. Starts with exact search term in Name (Highest priority)
  if (nameLower.startsWith(termLower)) {
    score += 10000;
  } else if (cleanName.startsWith(cleanSearch)) {
    // Starts with accent-insensitive search term in Name
    score += 5000;
  }

  // 2. Word boundary match: any word inside Name starts with the term
  // e.g. "Hồng Sâm" when searching "Sâm" or "s"
  if (nameLower.includes(" " + termLower)) {
    score += 3000;
  } else if (cleanName.includes(" " + cleanSearch)) {
    score += 1500;
  }

  // 3. Substring match inside Name (matches starting from 2nd or 3rd character)
  if (nameLower.includes(termLower)) {
    score += 1000;
  } else if (cleanName.includes(cleanSearch)) {
    score += 500;
  }

  // 4. Match inside Description (much lower priority)
  if (descLower.includes(termLower)) {
    score += 10;
  } else if (cleanDesc.includes(cleanSearch)) {
    score += 5;
  }

  return score;
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem("huongvu_cart");
    return local ? JSON.parse(local) : [];
  });
  
  // Custom Dynamic State for customizable products, categories, about us, orders, hero background, and administration trigger
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);

  const [categoriesList, setCategoriesList] = useState<Category[]>(initialCategories);

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

  const defaultContact: ContactData = {
    companyName: "THẢO DƯỢC HƯƠNG VŨ",
    tagline: "Tổng Kho Thảo Dược Đông Y Tây Bắc",
    address: "Bản Cát Cát, Thị xã Sa Pa, Tỉnh Lào Cai, Việt Nam.",
    phone: "(+84)569315315",
    email: "thaoduochuongvu.taybac@gmail.com",
    workingHours: "7h30 sáng - 22h00 đêm hàng ngày (kể cả Thứ 7 và Chủ nhật).",
    footerDesc: "Nguồn dược liệu hoang dã sấy hữu cơ mang nguyên vẹn dược tính thượng hạng bồi bổ thể trạng cho gia đình bạn.",
    footerCopyright: "© 2026 Thảo Dược Hương Vũ. Bản quyền thiết kế ván hàng thuộc Sapa Organic Farm.",
    commitment1Title: "CAM KẾT CHÍNH HÃNG",
    commitment1Desc: "Đền bù ngay gấp 10 lần giá trị hóa đơn nếu phát hiện hàng giả, sâm giả hay không rõ nguồn gốc.",
    commitment2Title: "GIAO HÀNG ĐỒNG KIỂM",
    commitment2Desc: "Nhận hàng toàn quốc nhanh chóng, được bóc hộp kiểm tra và ngửi chất lượng dược phẩm trước khi thanh toán.",
    commitment3Title: "ĐỔI TRẢ MIỄN PHÍ",
    commitment3Desc: "Đổi trả sản phẩm trong vòng 7 ngày nếu bị bung gói chân không hoặc sấy ẩm mốc do lỗi vận chuyển.",
    zaloLink: "https://zalo.me/84569315315",
    facebookLink: "https://www.facebook.com/thaoduochuongvu",
    tiktokLink: "https://www.tiktok.com/@huonggoluanongsantaybac",
    bannerBadge: "100% Nguyên Liệu Thiên Nhiên Rừng Già",
    bannerSubtitle: "Thảo Dược Đông Y Tây Bắc",
    bannerTitle: "HƯƠNG VŨ",
    bannerTagline: "TINH TÚY NÚI RỰNG TÂY BẮC",
    bannerDesc: "Chuyên cung cấp sỉ lẻ thảo dược chất lượng cao - Đồ uống ngâm bổ Đông Y Tây Bắc thượng hạng. Được thu hái thủ công 100% tự nhiên bảo đảm vệ sinh - Uy tín đặt lên hàng đầu.",
    headerHome: "TRANG CHỦ",
    headerProducts: "SẢN PHẨM",
    headerAbout: "VỀ CHÚNG TÔI",
    headerContact: "LIÊN HỆ",
    headerSearch: "Tìm kiếm sản phẩm...",
    sectionProductsTitle: "SẢN PHẨM MỚI THU HOẠCH",
    sectionCategoriesTitle: "DANH MỤC NỔI BẬT",
    showCategoriesSection: true,
    showProductsSection: true,
    showAboutSection: true,
    showContactSection: true
  };

  const [aboutUsData, setAboutUsData] = useState<AboutUsData>(defaultAboutUs);

  const [contactData, setContactData] = useState<ContactData>(defaultContact);

  const [orders, setOrders] = useState<OrderDetails[]>([]);

  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);

  const [heroImage, setHeroImage] = useState<string>(() => safeGetItem("huongvu_hero_image") || "");

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const updateIfChanged = <T,>(setter: Dispatch<SetStateAction<T>>, nextValue: T) => {
    setter((current) => (JSON.stringify(current) === JSON.stringify(nextValue) ? current : nextValue));
  };

  const applyServerData = useCallback((data: SiteDataState) => {
    if (data.products) updateIfChanged(setProductsList, data.products);
    if (data.categories) updateIfChanged(setCategoriesList, data.categories);
    if (data.aboutUs) updateIfChanged(setAboutUsData, data.aboutUs);
    if (data.heroImage) {
      safeCacheHeroImage(data.heroImage);
      updateIfChanged(setHeroImage, data.heroImage);
    }
    if (data.orders) updateIfChanged(setOrders, data.orders);
    if (data.contact) updateIfChanged(setContactData, { ...defaultContact, ...data.contact });
    if (data.consultations) updateIfChanged(setConsultations, data.consultations);
  }, []);

  const syncServerData = useCallback(() => {
    fetch("/api/data", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data: SiteDataState) => applyServerData(data))
      .catch((err) => console.error("Error fetching shared site data:", err));
  }, [applyServerData]);

  const parseAdminResponse = (res: Response) => {
    if (res.status === 401) {
      throw new Error("Phiên quản trị đã hết hạn. Vui lòng đăng nhập lại.");
    }
    if (!res.ok) {
      return res.json().catch(() => null).then((body) => {
        throw new Error(body?.error || "Không thể lưu thay đổi lên server.");
      });
    }
    return res.json();
  };

  // Shared website content is owned by the server so every visitor sees the same admin-managed data.
  useEffect(() => {
    syncServerData();
    const timer = window.setInterval(syncServerData, 5000);
    return () => window.clearInterval(timer);
  }, [syncServerData]);

  const handleSetConsultations = (newConsults: ConsultationRequest[]) => {
    return fetch("/api/set_consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ consultations: newConsults }),
    })
      .then(parseAdminResponse)
      .then((data) => {
        if (data.consultations) setConsultations(data.consultations);
      })
      .catch((err) => {
        alert(err.message || "Không thể lưu thay đổi tư vấn.");
        syncServerData();
        throw err;
      });
  };

  const handleAddConsultation = (newConsult: { name: string; phone: string; message: string }) => {
    const freshConsult: ConsultationRequest = {
      id: "CST-" + Date.now(),
      name: newConsult.name,
      phone: newConsult.phone,
      message: newConsult.message,
      createdAt: new Date().toLocaleString("vi-VN"),
      status: "pending"
    };
    const updated = [freshConsult, ...consultations];
    setConsultations(updated);
    fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consultation: freshConsult })
    })
      .then((res) => res.json())
      .then((data) => data.consultations && setConsultations(data.consultations))
      .catch((err) => console.error("Error sending consultation to server:", err));
  };

  const handleSetContactData = (newContact: ContactData) => {
    return fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ contact: newContact }),
    })
      .then(parseAdminResponse)
      .then((data) => {
        if (data.contact) setContactData({ ...defaultContact, ...data.contact });
      })
      .catch((err) => {
        alert(err.message || "Không thể lưu thông tin liên hệ.");
        syncServerData();
        throw err;
      });
  };

  const handleSetProducts = (newProds: Product[]) => {
    return fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ products: newProds }),
    })
      .then(parseAdminResponse)
      .then((data) => {
        if (data.products) setProductsList(data.products);
      })
      .catch((err) => {
        alert(err.message || "Không thể lưu sản phẩm.");
        syncServerData();
        throw err;
      });
  };

  const handleSetCategories = (newCats: Category[]) => {
    return fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ categories: newCats }),
    })
      .then(parseAdminResponse)
      .then((data) => {
        if (data.categories) setCategoriesList(data.categories);
      })
      .catch((err) => {
        alert(err.message || "Không thể lưu danh mục.");
        syncServerData();
        throw err;
      });
  };

  const handleSetAboutUsData = (newAbout: AboutUsData) => {
    return fetch("/api/about_us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ aboutUs: newAbout }),
    })
      .then(parseAdminResponse)
      .then((data) => {
        if (data.aboutUs) setAboutUsData(data.aboutUs);
      })
      .catch((err) => {
        alert(err.message || "Không thể lưu phần giới thiệu.");
        syncServerData();
        throw err;
      });
  };

  const handleSetOrders = (newOrders: OrderDetails[]) => {
    return fetch("/api/set_orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ orders: newOrders }),
    })
      .then(parseAdminResponse)
      .then((data) => {
        if (data.orders) setOrders(data.orders);
      })
      .catch((err) => {
        alert(err.message || "Không thể lưu trạng thái đơn hàng.");
        syncServerData();
        throw err;
      });
  };

  const handleAddOrder = (newOrder: OrderDetails) => {
    setOrders((current) => [newOrder, ...current]);
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: newOrder }),
    })
      .then((res) => res.json())
      .then((data) => data.orders && setOrders(data.orders))
      .catch((err) => console.error("Error submitting order to backend:", err));
  };

  const handleSetHeroImage = (newImage: string) => {
    return fetch("/api/hero_image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ heroImage: newImage }),
    })
      .then(parseAdminResponse)
      .then((data) => {
        if (data.heroImage) setHeroImage(data.heroImage);
      })
      .catch((err) => {
        alert(err.message || "Không thể lưu ảnh bìa.");
        syncServerData();
        throw err;
      });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [addedNotify, setAddedNotify] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window === "undefined") return "/";
    return `${window.location.pathname}${window.location.search}`;
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(`${window.location.pathname}${window.location.search}`);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const navigateTo = (path: string, shouldScrollTop = true) => {
    window.history.pushState({}, "", path);
    setCurrentRoute(`${window.location.pathname}${window.location.search}`);
    if (shouldScrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Sync cart with localstorage
  useEffect(() => {
    safeSetItem("huongvu_cart", JSON.stringify(cart));
  }, [cart]);

  // Handle auto scroll down to product sections when actively searching/filtering
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const timer = setTimeout(() => {
        const element = document.getElementById("products-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
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

    // Automatically open the Cart Drawer so the user can see their added items immediately!
    setIsCartOpen(true);

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
      if (window.location.pathname !== "/") {
        navigateTo("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setSelectedCategoryFilter("all");
      setSearchQuery("");
      return;
    }

    if (sectionId === "categories") {
      setSelectedCategoryFilter("all");
      navigateTo("/products");
      return;
    }

    if (sectionId.startsWith("cat-")) {
      setSelectedCategoryFilter(sectionId);
      navigateTo(`/products?category=${encodeURIComponent(sectionId.replace("cat-", ""))}`);
      return;
    }

    if (sectionId === "products") {
      setSelectedCategoryFilter("all");
      navigateTo("/products");
      return;
    }

    if (sectionId === "about" || sectionId === "contact") {
      if (window.location.pathname !== "/") {
        window.history.pushState({}, "", `/#${sectionId}`);
        setCurrentRoute("/");
        window.setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return;
      }
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

  // Filter products by searching (with relevance scoring and sorting)
  const searchedProducts = searchQuery.trim() !== ""
    ? productsList
        .map((p) => ({ product: p, score: getSearchScore(p, searchQuery.trim()) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.product)
    : productsList;
  const landingCategories = categoriesList.filter((category) => category.showOnLanding !== false).slice(0, 4);

  const routeUrl = typeof window !== "undefined"
    ? new URL(currentRoute, window.location.origin)
    : new URL("http://localhost/");
  const pathname = routeUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isProductsRoute = pathname === "/products" || pathname === "/categories";
  const categoryFromUrl = routeUrl.searchParams.get("category") || "all";
  const renderAdminPanel = (isOpen: boolean, onClose: () => void) => (
    <AdminPanel
      isOpen={isOpen}
      onClose={onClose}
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
      contactData={contactData}
      setContactData={handleSetContactData}
      consultations={consultations}
      setConsultations={handleSetConsultations}
    />
  );

  if (isAdminRoute) {
    return (
      <div className="bg-[#153020] min-h-screen font-sans antialiased">
        {renderAdminPanel(true, () => {
          window.history.pushState({}, "", "/");
          window.location.reload();
        })}
      </div>
    );
  }

  const pageContent = isProductsRoute ? (
    <ProductsPage
      products={searchedProducts}
      categories={categoriesList}
      initialCategory={categoryFromUrl}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onProductClick={setActiveDetailProduct}
      onAddToCart={handleAddToCart}
      onCategoryChange={(categoryId) => {
        setSelectedCategoryFilter(categoryId === "all" ? "all" : `cat-${categoryId}`);
        navigateTo(categoryId === "all" ? "/products" : `/products?category=${encodeURIComponent(categoryId)}`, false);
      }}
    />
  ) : (
    <>
      {/* Hero Section Banner */}
      <Hero
        onExploreClick={() => handleNavigateSection("products")}
        heroImage={heroImage}
        contactData={contactData}
      />

      {/* Categories Grid list */}
      {contactData.showCategoriesSection !== false && (
        <Categories
          onCategorySelect={handleNavigateSection}
          categories={landingCategories}
          title={contactData.sectionCategoriesTitle}
        />
      )}

      {/* Main products catalog card lists */}
      {contactData.showProductsSection !== false && (
        <Products
          onProductClick={setActiveDetailProduct}
          onAddToCart={handleAddToCart}
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          products={searchedProducts}
          categories={categoriesList}
          title={contactData.sectionProductsTitle}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onViewAllProducts={() => handleNavigateSection("products")}
        />
      )}

      {/* About Us section */}
      {contactData.showAboutSection !== false && (
        <AboutUs heroImage={heroImage} data={aboutUsData} />
      )}

      {/* Contact & Map locations section */}
      {contactData.showContactSection !== false && (
        <Contact contactData={contactData} onAddConsultation={handleAddConsultation} />
      )}
    </>
  );

  return (
    <div className="bg-[#faf8f4] text-[#153020] min-h-screen font-sans antialiased selection:bg-[#8f2d24] selection:text-white overflow-x-hidden w-full relative">
      
      {/* Toast Notification Alert when added to cart */}
      {addedNotify && (
        <div className="fixed top-24 right-4 z-[100] bg-[#153020]/95 backdrop-blur-md text-white border-l-4 border-yellow-400 rounded-lg p-4 shadow-xl shadow-[#153020]/20 flex items-center justify-between max-w-sm gap-4 transition-transform duration-300 transform translate-x-0 animate-bounce">
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
        contactData={contactData}
        activeNav={isProductsRoute ? "products" : undefined}
      />

      {pageContent}

      {/* Bottom Footer Section */}
      <Footer 
        onNavigate={handleNavigateSection} 
        contactData={contactData} 
        onAddConsultation={handleAddConsultation} 
      />

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
        onOrderSuccess={(id, orderDetails) => handleAddOrder(orderDetails)}
        clearCart={handleClearCart}
      />

      {renderAdminPanel(isAdminOpen, () => setIsAdminOpen(false))}

    </div>
  );
}
