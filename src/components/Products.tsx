import { useState, useRef, useEffect } from "react";
import { Leaf, ArrowRight, Eye, Star, ShoppingCart, Filter } from "lucide-react";
import { Product, Category } from "../types";

interface ProductsProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  products: Product[];
  categories: Category[];
}

export default function Products({
  onProductClick,
  onAddToCart,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  products,
  categories,
}: ProductsProps) {
  const [activeTab, setActiveTab] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  // Currency Formatter
  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <section id="products-section" className="py-14 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-3 border-b border-[#e6dfd3]">
          <div className="flex items-center space-x-2.5 mb-4 md:mb-0">
            <span className="p-1.5 rounded-full bg-[#153020]/10 text-[#153020] inline-flex">
              <Leaf className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#153020]">
              SẢN PHẨM MỚI THU HOẠCH
            </h2>
          </div>

          {/* Tab Filter buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-[#153020] text-white shadow-md"
                  : "bg-[#eadecc]/30 text-[#153020] hover:bg-[#eadecc]/75 border border-[#dfd4c0]"
              }`}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${
                  activeTab === cat.id
                    ? "bg-[#153020] text-white shadow-md"
                    : "bg-[#eadecc]/30 text-[#153020] hover:bg-[#eadecc]/75 border border-[#dfd4c0]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Wrapper */}
        {filteredProducts.length === 0 ? (
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-center"
            >
              {filteredProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-[#fdfcfa] border border-[#e8e1d2] hover:border-[#153020]/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Floating New Tag top-left */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10 bg-[#8f2d24] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md animate-pulse">
                      MỚI
                    </div>
                  )}

                  {/* Thumbnail Container */}
                  <div className="relative aspect-4/3 w-full bg-[#f4ece0] overflow-hidden">
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
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Product Name */}
                      <h3 
                        onClick={() => onProductClick(product)} 
                        className="font-serif text-base sm:text-lg font-bold text-[#153020] hover:text-[#8f2d24] cursor-pointer transition-colors leading-tight line-clamp-1 mb-1.5"
                      >
                        {product.name}
                      </h3>

                      {/* Brief Slogan / Description */}
                      <p className="font-sans text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                        {product.description}
                      </p>

                      {/* Stars Golden Rating Review count */}
                      <div className="flex items-center space-x-1.5 mb-4">
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
                    <div className="flex items-center justify-between pt-3 border-t border-[#f0ebde]">
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
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
