import { useState, useRef, useEffect } from "react";
import { Leaf, ArrowRight, Eye, Star, ShoppingCart, Filter, Search, X } from "lucide-react";
import { Product, Category } from "../types";

function getProductBadge(product: Product) {
  if (product.badge === "không hiện") return null;
  if (product.badge) {
    const norm = product.badge.toLowerCase().trim();
    if (norm === "hot") {
      return { text: "HOT", bg: "bg-orange-500 animate-pulse" };
    } else if (norm === "sắp cháy hàng") {
      return { text: "Sắp cháy hàng", bg: "bg-amber-600 font-medium" };
    } else if (norm === "mới") {
      return { text: "MỚI", bg: "bg-[#8f2d24]" };
    }
    return { text: product.badge, bg: "bg-[#153020]" };
  }
  if (product.isNew) {
    return { text: "MỚI", bg: "bg-[#8f2d24]" };
  }
  return null;
}

interface ProductsProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  products: Product[];
  categories: Category[];
  title?: string;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onViewAllProducts?: () => void;
}

export default function Products({
  onProductClick,
  onAddToCart,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  products,
  categories,
  title,
  searchQuery = "",
  setSearchQuery,
  onViewAllProducts,
}: ProductsProps) {
  const [activeTab, setActiveTab] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // States for the new Full Products Catalog Drawer/Modal
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogActiveTab, setCatalogActiveTab] = useState("all");
  const handleCatalogAddToCart = (product: Product) => {
    onAddToCart(product);
  };

  // Sync state tab whenever parent selectedCategoryFilter changes
  useEffect(() => {
    if (selectedCategoryFilter.startsWith("cat-")) {
      setActiveTab(selectedCategoryFilter.replace("cat-", ""));
    } else {
      setActiveTab(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      setSelectedCategoryFilter("all");
    } else {
      setSelectedCategoryFilter(`cat-${tabId}`);
    }
  };

  // Sync catalog category tab with home active tab when opening
  useEffect(() => {
    if (isCatalogOpen) {
      setCatalogActiveTab(activeTab);
    }
  }, [isCatalogOpen]);

  // All matching products based on active category tab on landing page
  const categoryProducts = products.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  // Only show landing page approved items (where showOnLanding is not explicitly set to false)
  const landingProducts = categoryProducts.filter((p) => p.showOnLanding !== false);

  // Home display list is limited to exactly 6 items max so it doesn't waste space
  const visibleProducts = landingProducts.slice(0, 6);

  // All products for the Interactive Modal Catalog
  const modalFilteredProducts = products.filter((p) => {
    // 1. Filter by category inside the modal
    if (catalogActiveTab !== "all" && p.category !== catalogActiveTab) {
      return false;
    }
    // 2. Filter by search input inside the modal (Vietnamese accent-insensitive)
    if (catalogSearch.trim() !== "") {
      const searchClean = catalogSearch.toLowerCase().trim();
      const nameClean = p.name.toLowerCase();
      const descClean = (p.description || "").toLowerCase();
      return nameClean.includes(searchClean) || descClean.includes(searchClean);
    }
    return true;
  });

  // Currency Formatter
  const formatVND = (num: number) => {
    return num > 0 ? num.toLocaleString("vi-VN") + "đ" : "Liên hệ";
  };

  return (
    <section id="products-section" className="pt-7 pb-14 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-4 border-b border-[#e6dfd3] gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 rounded-full bg-[#153020]/10 text-[#153020] inline-flex">
                <Leaf className="w-5 h-5" />
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#153020]">
                {searchQuery ? (
                  <>
                    Kết quả tìm kiếm cho: <span className="text-[#8f2d24]">“{searchQuery}”</span>
                  </>
                ) : (
                  title || "SẢN PHẨM MỚI THU HOẠCH"
                )}
              </h2>
            </div>
          </div>

          {/* Tab Filter buttons & Search bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 w-full lg:w-auto">
            {/* Inline Search Bar */}
            {setSearchQuery && (
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Tìm thảo dược..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-[#153020] border border-[#d2c9b9] hover:border-[#153020]/45 rounded-full py-2 pl-9 pr-9 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#153020] focus:border-transparent transition-all placeholder-[#a1b8aa]/85 shadow-sm"
                />
                <Search className="w-3.5 h-3.5 text-[#153020]/50 absolute left-3.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1.5 text-[#8f2d24] hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full w-5 h-5 flex items-center justify-center font-sans text-[10px] font-bold select-none cursor-pointer transition-colors"
                    title="Xóa tìm kiếm"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}

            {/* Tab Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:max-w-[32rem] lg:max-w-[38rem] shrink-0 pb-1">
              <button
                onClick={() => handleTabChange("all")}
                className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-[#153020] text-white shadow-md font-semibold"
                    : "bg-[#eadecc]/30 text-[#153020] hover:bg-[#eadecc]/75 border border-[#dfd4c0]"
                }`}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    activeTab === cat.id
                      ? "bg-[#153020] text-white shadow-md font-semibold"
                      : "bg-[#eadecc]/30 text-[#153020] hover:bg-[#eadecc]/75 border border-[#dfd4c0]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Wrapper */}
        {landingProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#fcfaf7] rounded-xl border border-[#e6dfd3] max-w-lg mx-auto">
            <Filter className="w-12 h-12 text-[#a1b8aa] mx-auto mb-3" />
            <p className="text-[#153020] font-sans font-medium text-base">Hiện không tìm thấy sản phẩm phù hợp</p>
            <p className="text-slate-500 text-xs mt-1">Vui lòng thử bộ lọc danh mục khác!</p>
            <button
              onClick={() => handleTabChange("all")}
              className="mt-4 px-4 py-2 bg-[#153020] text-white rounded-lg text-xs font-medium hover:bg-[#1f472f] cursor-pointer"
            >
              Danh mục Tất Cả
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Horizontal Scroll wrapper */}
            <div 
              ref={scrollContainerRef}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-5 sm:gap-6 justify-center"
            >
              {visibleProducts.map((product: Product) => {
                const badgeInfo = getProductBadge(product);

                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-[#fdfcfa] border border-[#e8e1d2] hover:border-[#153020]/20 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Floating New Tag top-left */}
                    {badgeInfo && (
                      <div className={`absolute top-4 left-4 z-10 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md ${badgeInfo.bg}`}>
                        {badgeInfo.text}
                      </div>
                    )}

                    {/* Thumbnail Container */}
                    <div className="relative h-[180px] sm:h-[195px] lg:h-[205px] w-full bg-[#f4ece0] overflow-hidden">
                      <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient slide/fade overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-3 transition-opacity duration-300">
                      <button
                        onClick={() => onProductClick(product)}
                        className="p-3 bg-white hover:bg-[#8f2d24] text-[#153020] hover:text-white rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-all duration-200"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-3 bg-white hover:bg-[#8f2d24] text-[#153020] hover:text-white rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-all duration-200"
                        title="Thêm vào giỏ"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Product Name */}
                      <h3 
                        onClick={() => onProductClick(product)} 
                        className="font-serif text-base font-bold text-[#153020] hover:text-[#8f2d24] cursor-pointer transition-colors leading-tight line-clamp-1 mb-1.5"
                      >
                        {product.name}
                      </h3>

                      {/* Brief Slogan / Description */}
                      <p className="font-sans text-[11.5px] text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
                        {product.description}
                      </p>

                      {/* Stars Golden Rating Review count */}
                      <div className="flex items-center space-x-1.5 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < product.rating
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-slate-400 font-sans text-xs">
                          ({product.reviewsCount} đánh giá)
                        </span>
                      </div>
                    </div>

                    {/* Pricing & Add call-to-action button */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-[#f0ebde]">
                      <div className="flex flex-col">
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through tracking-wide">
                            {formatVND(product.originalPrice)}
                          </span>
                        )}
                        <span className="font-sans font-bold text-[#8f2d24] text-base">
                          {formatVND(product.price)}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-semibold py-2 px-3.5 rounded-lg flex items-center space-x-1 shadow-sm transition-all duration-300 transform cursor-pointer hover:-translate-y-0.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>MUA NGAY</span>
                      </button>
                    </div>
                  </div>
                </div>
              ); })}
            </div>

            {/* Xem thêm button to open the beautiful Full interactive Catalog Modal */}
            {products.length > 0 && (
              <div className="flex justify-center mt-12">
                <button
                  type="button"
                  id="view-more-products-btn"
                  onClick={() => {
                    if (onViewAllProducts) {
                      onViewAllProducts();
                      return;
                    }
                    setIsCatalogOpen(true);
                  }}
                  className="px-8 py-3.5 bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-bold tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center space-x-2.5 cursor-pointer uppercase border-b-2 border-[#0e2015] hover:shadow-lg hover:border-b-red-900"
                >
                  <span>Xem thêm sản phẩm</span>
                  <span className="text-[10px] font-sans">▼</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* GORGEOUS FULL STORE CATALOG MODAL */}
      {isCatalogOpen && (
        <div className="fixed inset-0 bg-[#153020]/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 transition-all duration-300 select-none">
          <div className="bg-[#faf8f4] w-full max-w-6xl max-h-[92vh] sm:max-h-[88vh] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#eadecc] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#ebdcb9] bg-[#fcfbf9] relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#153020] tracking-tight">
                  TẤT CẢ SẢN PHẨM THẢO DƯỢC
                </h2>
                <p className="font-sans text-[11px] sm:text-xs text-slate-500 mt-1">
                  Khám phá toàn bộ danh mục thảo mộc quý hiếm Tây Bắc tự nhiên chuẩn GACP-WHO.
                </p>
              </div>

              {/* Search input inside Catalog Modal */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Tìm thảo dược..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="w-full bg-white border border-[#c4bcae] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#153020] text-slate-700 font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                {catalogSearch && (
                  <button 
                    onClick={() => setCatalogSearch("")}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-bold text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Close Button top-right */}
              <button
                onClick={() => {
                  setIsCatalogOpen(false);
                  setCatalogSearch("");
                }}
                className="absolute top-4 right-4 md:static p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Catalog Sub-Category Filter Tabs (inside Modal) */}
            <div className="bg-[#f7f4ee] px-4 py-2 border-b border-[#ebe1cd] flex items-center space-x-2 overflow-x-auto scrollbar-none select-none">
              <button
                onClick={() => setCatalogActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                  catalogActiveTab === "all"
                    ? "bg-[#153020] text-white shadow-sm"
                    : "text-slate-600 hover:bg-[#eadecc]/50"
                }`}
              >
                TẤT CẢ
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCatalogActiveTab(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 shrink-0 cursor-pointer ${
                    catalogActiveTab === cat.id
                      ? "bg-[#153020] text-white shadow-sm"
                      : "text-slate-600 hover:bg-[#eadecc]/50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Modal Body: Products Grid scrollable */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#faf8f4]">
              {modalFilteredProducts.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <Leaf className="w-12 h-12 text-slate-300 mb-2 animate-bounce" />
                  <h3 className="font-serif text-lg font-bold text-slate-700">Không tìm thấy sản phẩm</h3>
                  <p className="text-xs text-slate-400 mt-1">Vui lòng nhập tên khác hoặc chọn danh mục thảo mộc khác.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {modalFilteredProducts.map((product) => {
                    const badge = getProductBadge(product);
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl overflow-hidden border border-[#e8dfcf] hover:border-[#153020]/25 hover:shadow-xl transition-all duration-300 flex flex-col relative group"
                      >
                        {/* Image area with interactive triggers */}
                        <div className="relative aspect-square bg-[#fbfbf9] overflow-hidden flex items-center justify-center p-4 border-b border-[#f3eee2]">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
                          />

                          {/* Float Custom Badge */}
                          {badge && (
                            <span className={`absolute top-3 left-3 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded shadow-md uppercase z-10 ${badge.bg}`}>
                              {badge.text}
                            </span>
                          )}

                          {/* Quick overlays */}
                          <div className="absolute inset-0 bg-[#153020]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                            <button
                              onClick={() => {
                                setIsCatalogOpen(false);
                                onProductClick(product);
                              }}
                              className="p-3 bg-white hover:bg-[#153020] text-[#153020] hover:text-white rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-all duration-200"
                              title="Xem chi tiết"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleCatalogAddToCart(product)}
                              className="p-3 bg-white hover:bg-[#8f2d24] text-[#153020] hover:text-white rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-all duration-200"
                              title="Thêm vào giỏ"
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Card copy details info */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3
                              onClick={() => {
                                setIsCatalogOpen(false);
                                onProductClick(product);
                              }}
                              className="font-serif text-sm sm:text-base font-bold text-[#153020] hover:text-[#8f2d24] cursor-pointer transition-colors leading-tight line-clamp-1 mb-1"
                            >
                              {product.name}
                            </h3>
                            <p className="font-sans text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
                              {product.description}
                            </p>
                            
                            <div className="flex items-center space-x-1.5 mb-3.5">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < product.rating
                                        ? "text-amber-500 fill-amber-500"
                                        : "text-slate-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-slate-400 font-sans text-[10px]">
                                ({product.reviewsCount} đánh giá)
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#f2edf0]/40">
                            <div className="flex flex-col">
                              {product.originalPrice && (
                                <span className="text-[10px] text-slate-400 line-through tracking-wide">
                                  {formatVND(product.originalPrice)}
                                </span>
                              )}
                              <span className="font-sans font-bold text-[#8f2d24] text-sm">
                                {formatVND(product.price)}
                              </span>
                            </div>
                            <button
                              onClick={() => handleCatalogAddToCart(product)}
                              className="bg-[#153020] hover:bg-[#8f2d24] text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg flex items-center space-x-1 shadow-sm transition-all duration-300 transform cursor-pointer hover:-translate-y-0.5"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>MUA NGAY</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer warning */}
            <div className="p-4 border-t border-[#ebdcb9] bg-[#fbf9f5] flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-2 text-slate-500 font-sans text-[10px] sm:text-xs">
              <span className="font-medium">
                🛡️ Cam kết thảo dược 100% tự nhiên nguyên chất, bảo quản nghiêm ngặt.
              </span>
              <button
                onClick={() => {
                  setIsCatalogOpen(false);
                  setCatalogSearch("");
                }}
                className="px-5 py-2 bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-bold rounded-lg transition-all duration-200 uppercase cursor-pointer"
              >
                Đóng cửa hàng
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
