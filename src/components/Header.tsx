import { useState, useEffect } from "react";
import { Search, ShoppingCart, ChevronDown, Menu, X, Leaf, PhoneCall, Truck, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, Category, ContactData } from "../types";

interface HeaderProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigate: (section: string) => void;
  categories: Category[];
  contactData?: ContactData;
  activeNav?: string;
}

export default function Header({
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  onNavigate,
  categories,
  contactData,
  activeNav,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [activePolicy, setActivePolicy] = useState<"shipping" | "terms" | null>(null);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Monitor scrolling to compress header and add frosted effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeNav) {
      setActiveTab(activeNav);
    }
  }, [activeNav]);

  const hHome = contactData?.headerHome || "TRANG CHỦ";
  const hProducts = contactData?.headerProducts || "SẢN PHẨM";
  const hAbout = contactData?.headerAbout || "VỀ CHÚNG TÔI";
  const hContact = contactData?.headerContact || "LIÊN HỆ";
  const hSearch = contactData?.headerSearch || "Tìm kiếm sản phẩm...";
  const policyContent = {
    shipping: {
      title: "Chính Sách Vận Chuyển",
      icon: Truck,
      updatedAt: "Cập nhật lần cuối: 28/06/2026",
      subtitle: "Giao hàng toàn quốc, đồng kiểm trước khi thanh toán và luôn xác nhận phí vận chuyển trước khi gửi.",
      sections: [
        {
          heading: "Thời gian giao hàng",
          points: [
            "Miền Bắc dự kiến 1-3 ngày làm việc.",
            "Miền Trung/Nam dự kiến 3-4 ngày làm việc.",
            "Vùng sâu, vùng xa hoặc dịp lễ Tết có thể phát sinh thêm thời gian vận chuyển."
          ]
        },
        {
          heading: "Phí vận chuyển & đồng kiểm",
          points: [
            "Phí vận chuyển được xác nhận trước khi gửi theo trọng lượng và khu vực nhận hàng.",
            "Khách được kiểm tra đóng gói, tem niêm phong và đúng sản phẩm trước khi thanh toán.",
            "Nếu gói hàng móp méo, rách hoặc sai sản phẩm, vui lòng chụp ảnh và liên hệ shop ngay."
          ]
        }
      ]
    },
    terms: {
      title: "Điều Khoản Mua Hàng",
      icon: FileText,
      updatedAt: "Cập nhật lần cuối: 28/06/2026",
      subtitle: "Quy trình mua hàng rõ ràng, minh bạch giá bán và có hỗ trợ đổi trả khi phát sinh lỗi từ shop hoặc vận chuyển.",
      sections: [
        {
          heading: "Quy trình đặt hàng",
          points: [
            "Khách chọn sản phẩm, thêm vào giỏ hàng và để lại thông tin nhận hàng chính xác.",
            "Shop gọi điện hoặc nhắn Zalo xác nhận sản phẩm, giá trị đơn và phí vận chuyển.",
            "Đơn hàng chỉ được gửi đi sau khi hai bên đã xác nhận đầy đủ thông tin."
          ]
        },
        {
          heading: "Đổi trả & lưu ý sức khỏe",
          points: [
            "Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm sai mẫu, bung gói hoặc lỗi vận chuyển.",
            "Không áp dụng đổi trả với sản phẩm đã sử dụng hoặc bảo quản sai hướng dẫn.",
            "Sản phẩm thảo dược không thay thế thuốc chữa bệnh; người có bệnh nền nên hỏi ý kiến chuyên môn trước khi dùng."
          ]
        }
      ]
    }
  } as const;
  const activePolicyData = activePolicy ? policyContent[activePolicy] : null;

  // Handler for desktop navigate that also clears search if navigating elsewhere
  const handleNavClick = (section: string) => {
    setActiveTab(section);
    onNavigate(section);
    setIsProductDropdownOpen(false);
  };

  const openPolicy = (policy: "shipping" | "terms") => {
    setIsMobileMenuOpen(false);
    setActivePolicy(policy);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? "bg-[#11291b]/95 backdrop-blur-md py-2.5 shadow-xl border-b border-[#254f37]/60"
            : "bg-[#153020] py-4 border-b border-[#214b32]"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* BRAND LOGO CONTEXT - Extremely clean & compact, scales beautifully */}
            <div
              onClick={() => handleNavClick("hero")}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group select-none shrink-0"
              id="header-logo-container"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#d4af37] flex items-center justify-center bg-gradient-to-br from-[#1b432d] to-[#153020] shadow-md transform group-hover:rotate-12 transition-transform duration-500">
                <Leaf className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#d4af37]" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-serif text-[15px] sm:text-lg md:text-xl font-bold tracking-wider text-white leading-none">
                  THẢO DƯỢC <span className="text-[#d4af37] font-semibold">HƯƠNG VŨ</span>
                </h1>
                <span className="text-[8px] sm:text-[9px] text-[#a1b8aa] tracking-widest uppercase font-sans mt-0.5 font-medium">
                  {contactData?.tagline || "Tinh túy núi rừng Tây Bắc"}
                </span>
              </div>
            </div>

            {/* DESKTOP RIGHT CONTAINER - Keeps menu visible next to cart */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 shrink-0">
              {/* DESKTOP NAVIGATION MENU */}
              <nav className="flex items-center gap-3 lg:gap-5 xl:gap-7 font-sans font-medium text-[11px] lg:text-[13px] xl:text-[14px] tracking-wider shrink-0">
                <button
                  onClick={() => handleNavClick("hero")}
                  className={`transition-colors duration-200 uppercase cursor-pointer relative py-1 ${
                    activeTab === "hero" ? "text-[#d4af37]" : "text-white hover:text-[#d4af37]"
                  }`}
                  id="nav-link-home"
                >
                  {hHome}
                  {activeTab === "hero" && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <div
                  className="relative py-1 group"
                  onMouseEnter={() => setIsProductDropdownOpen(true)}
                  onMouseLeave={() => setIsProductDropdownOpen(false)}
                  id="nav-dropdown-products"
                >
                  <button
                    onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                    className={`flex items-center space-x-1 cursor-pointer transition-colors duration-200 uppercase ${
                      isProductDropdownOpen || activeTab.startsWith("cat-") || activeTab === "products"
                        ? "text-[#d4af37]"
                        : "text-white hover:text-[#d4af37]"
                    }`}
                  >
                    <span>{hProducts}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Secure padding spacer bridge to hold hover transition smoothly */}
                  <div className="absolute left-0 w-full h-2 bg-transparent" />

                  <AnimatePresence>
                    {isProductDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2 w-56 rounded-lg bg-[#112918] border border-[#234b32] shadow-2xl py-2 z-50 text-slate-100"
                      >
                        <button
                          onClick={() => handleNavClick("products")}
                          className="block w-full text-left px-4 py-2 hover:bg-[#1f4a2f] hover:text-[#d4af37] text-xs font-bold transition-colors uppercase border-b border-[#234b32]/50 pb-2 mb-1"
                        >
                          Tất cả sâm thảo dược
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleNavClick(`cat-${cat.id}`)}
                            className="block w-full text-left px-4 py-1.5 hover:bg-[#1f4a2f] hover:text-[#d4af37] text-xs transition-colors"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => handleNavClick("about")}
                  className={`transition-colors duration-200 uppercase cursor-pointer relative py-1 ${
                    activeTab === "about" ? "text-[#d4af37]" : "text-white hover:text-[#d4af37]"
                  }`}
                  id="nav-link-about"
                >
                  {hAbout}
                  {activeTab === "about" && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <button
                  onClick={() => handleNavClick("contact")}
                  className={`transition-colors duration-200 uppercase cursor-pointer relative py-1 ${
                    activeTab === "contact" ? "text-[#d4af37]" : "text-white hover:text-[#d4af37]"
                  }`}
                  id="nav-link-contact"
                >
                  {hContact}
                  {activeTab === "contact" && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </nav>

              {/* DESKTOP SEARCH & CART GROUP */}
              <div className="flex items-center space-x-3.5 shrink-0">
                
                {/* Clean, Non-expanding stable Search bar */}
                <div className="relative hidden xl:block w-52" id="desktop-search-container">
                  <input
                    type="text"
                    placeholder={hSearch}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1b3d29] text-white border border-[#2c533c] rounded-full py-1.5 pl-4 pr-10 text-xs focus:outline-none focus:ring-1.5 focus:ring-[#d4af37]/60 placeholder-[#a1b8aa]/80 transition-shadow"
                  />
                  <Search className="w-3.5 h-3.5 text-[#a1b8aa] absolute right-3.5 top-2.5 pointer-events-none" />
                  
                  {searchQuery.trim() !== "" && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-8 top-1.5 p-1 text-slate-100 hover:text-white bg-[#8f2d24] rounded-full cursor-pointer flex items-center justify-center w-5 h-5 transition-colors"
                      title="Xóa tìm kiếm"
                    >
                      <span className="text-[8px] font-sans">✕</span>
                    </button>
                  )}
                </div>

                {/* Shopping Cart Trigger */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 rounded-full hover:bg-[#1b3d29] transition-all duration-200 group cursor-pointer"
                  aria-label="Xem giỏ hàng"
                  id="desktop-cart-trigger"
                >
                  <ShoppingCart className="w-5.5 h-5.5 text-[#faf6f0] group-hover:text-[#d4af37] transition-colors" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] rounded-full h-5 w-5 flex items-center justify-center shadow-lg border border-[#153020]">
                      {totalQuantity}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-md hover:bg-[#1b3d29] transition-colors text-white focus:outline-none cursor-pointer"
                  aria-label="Mở menu"
                  id="desktop-hamburger-btn"
                >
                  <Menu className="w-5.5 h-5.5 text-[#faf6f0]" />
                </button>
              </div>
            </div>

            {/* MOBILE ACTION HEADER BUTTONS */}
            <div className="flex md:hidden items-center space-x-2.5" id="mobile-action-container">
              {/* Slim Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-[#1b3d29] cursor-pointer"
                aria-label="Xem giỏ hàng"
              >
                <ShoppingCart className="w-6 h-6 text-[#faf6f0]" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white font-bold text-[10px] rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-md">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md hover:bg-[#1b3d29] transition-colors text-white focus:outline-none cursor-pointer"
                aria-label="Mở menu"
                id="mobile-hamburger-btn"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE MODERN DRAWER BACKGROUND WINDOW - Slides in gracefully using dynamic motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Solid backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-xs"
              id="mobile-drawer-backdrop"
            />

            {/* Right Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[#122b1c] border-l border-[#214b32] shadow-2xl z-50 flex flex-col"
              id="mobile-nav-panel"
            >
              {/* Drawer Title Header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-[#214b32]">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full border border-[#d4af37]/70 flex items-center justify-center bg-[#153020]">
                    <Leaf className="w-4.5 h-4.5 text-[#d4af37]" />
                  </div>
                  <span className="font-serif text-[15px] font-bold text-white tracking-wide">
                    DANH MỤC
                  </span>
                </div>
                
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#1b3d29] transition-colors cursor-pointer"
                  aria-label="Đóng menu"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Search function inside Mobile Menu Drawer */}
              <div className="px-5 py-4 border-b border-[#214b32]/50 bg-[#153421]/40">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sâm thảo dược..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1b3d29] text-white border border-[#2c533c] rounded-lg py-2 pl-4.5 pr-10 text-sm focus:outline-none focus:border-[#d4af37] placeholder-[#a1b8aa]/75"
                  />
                  <Search className="w-4 h-4 text-[#a1b8aa] absolute right-3 top-3 pointer-events-none" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-8 top-2.5 bg-[#8f2d24] text-white text-[10px] uppercase font-bold py-0.5 px-1.5 rounded"
                    >
                      Xoá
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation lists with active highlighting */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5">
                <button
                  onClick={() => {
                    handleNavClick("hero");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors ${
                    activeTab === "hero" ? "bg-[#d4af37]/15 text-[#d4af37] border-l-2 border-[#d4af37]" : "text-white hover:bg-[#1b3d29]"
                  }`}
                >
                  {hHome}
                </button>

                <button
                  onClick={() => {
                    handleNavClick("products");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors ${
                    activeTab === "products" || activeTab.startsWith("cat-")
                      ? "bg-[#d4af37]/15 text-[#d4af37] border-l-2 border-[#d4af37]"
                      : "text-white hover:bg-[#1b3d29]"
                  }`}
                >
                  {hProducts}
                </button>

                <div className="pt-3 border-t border-[#214b32]/40 mt-3 space-y-1">
                  <button
                    onClick={() => {
                      handleNavClick("about");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors ${
                      activeTab === "about" ? "bg-[#d4af37]/15 text-[#d4af37] border-l-2 border-[#d4af37]" : "text-white hover:bg-[#1b3d29]"
                    }`}
                  >
                    {hAbout}
                  </button>
                  <button
                    onClick={() => {
                      handleNavClick("contact");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors ${
                      activeTab === "contact" ? "bg-[#d4af37]/15 text-[#d4af37] border-l-2 border-[#d4af37]" : "text-white hover:bg-[#1b3d29]"
                    }`}
                  >
                    {hContact}
                  </button>
                </div>

                <div className="pt-3 border-t border-[#214b32]/40 mt-3 space-y-1">
                  <span className="block px-3 text-[10px] font-bold text-[#a1b8aa]/80 tracking-wider uppercase mb-1">
                    Chính sách mua hàng
                  </span>
                  <button
                    onClick={() => openPolicy("shipping")}
                    className="flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg text-sm font-semibold tracking-wide uppercase text-white hover:bg-[#1b3d29] transition-colors"
                  >
                    <Truck className="w-4 h-4 text-[#d4af37]" />
                    <span>Chính sách vận chuyển</span>
                  </button>
                  <button
                    onClick={() => openPolicy("terms")}
                    className="flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg text-sm font-semibold tracking-wide uppercase text-white hover:bg-[#1b3d29] transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#d4af37]" />
                    <span>Điều khoản mua hàng</span>
                  </button>
                </div>
              </div>

              {/* Short footer contact inside drawer */}
              <div className="p-5 border-t border-[#214b32] bg-[#153121] text-xs space-y-2 mt-auto">
                {contactData?.phone && (
                  <div className="flex items-center text-slate-300 space-x-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="font-sans font-medium">{contactData.phone}</span>
                  </div>
                )}
                <div className="text-[10px] text-[#a1b8aa]/80 tracking-normal font-sans">
                  {contactData?.companyName || "Thảo Dược Hương Vũ"} © 2026
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {activePolicyData && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActivePolicy(null)}
          />
          <div className="relative w-full max-w-2xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto bg-[#faf8f4] text-[#153020] rounded-t-2xl sm:rounded-2xl border border-[#dfd4c0] shadow-2xl">
            <div className="sticky top-0 z-10 bg-[#153020] text-white px-4 sm:px-6 py-4 flex items-start justify-between gap-4 border-b border-[#d4af37]/30">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                  <activePolicyData.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight">{activePolicyData.title}</h3>
                  <p className="text-[11px] sm:text-xs text-[#cbd8cf] mt-1 leading-relaxed">{activePolicyData.updatedAt}</p>
                </div>
              </div>
              <button
                onClick={() => setActivePolicy(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer shrink-0"
                aria-label="Đóng chính sách"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <p className="text-sm sm:text-base text-[#445449] leading-relaxed bg-white border border-[#e8dfcf] rounded-xl p-4 shadow-sm">
                {activePolicyData.subtitle}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4">
                {activePolicyData.sections.map((section) => (
                  <section key={section.heading} className="bg-white border border-[#e8dfcf] rounded-xl p-4 sm:p-5 shadow-sm">
                    <h4 className="font-serif text-base font-bold text-[#153020] mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8f2d24] shrink-0" />
                      {section.heading}
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#d4af37] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="mt-5 bg-[#153020] text-white rounded-xl p-4 sm:p-5">
                <h4 className="font-serif text-base font-bold text-[#d4af37]">Cần hỗ trợ nhanh?</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Liên hệ {contactData?.phone || "(+84)569315315"} để được hỗ trợ về đơn hàng và chính sách mua hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
