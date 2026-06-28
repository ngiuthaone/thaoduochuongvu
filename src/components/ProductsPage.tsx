import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  PackageSearch,
  Search,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { Category, Product } from "../types";

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
  initialCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onCategoryChange: (categoryId: string) => void;
}

function getProductBadge(product: Product) {
  if (product.badge === "không hiện") return null;
  if (product.badge) {
    const norm = product.badge.toLowerCase().trim();
    if (norm === "hot") return { text: "HOT", bg: "bg-orange-500 animate-pulse" };
    if (norm === "sắp cháy hàng") return { text: "Sắp cháy hàng", bg: "bg-amber-600 font-medium" };
    if (norm === "mới") return { text: "MỚI", bg: "bg-[#8f2d24]" };
    return { text: product.badge, bg: "bg-[#153020]" };
  }
  if (product.isNew) return { text: "MỚI", bg: "bg-[#8f2d24]" };
  return null;
}

const formatVND = (num: number) => num.toLocaleString("vi-VN") + "đ";
type SortMode = "recommended" | "price-asc" | "price-desc" | "reviews";

export default function ProductsPage({
  products,
  categories,
  initialCategory,
  searchQuery,
  setSearchQuery,
  onProductClick,
  onAddToCart,
  onCategoryChange,
}: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [sortMode, setSortMode] = useState<SortMode>("recommended");

  useEffect(() => {
    setActiveCategory(initialCategory || "all");
  }, [initialCategory]);

  const activeCategoryData = useMemo(() => {
    return categories.find((category) => category.id === activeCategory);
  }, [activeCategory, categories]);

  const activeCategoryName = useMemo(() => {
    if (activeCategory === "all") return "Tất cả sản phẩm";
    return activeCategoryData?.name || "Danh mục";
  }, [activeCategory, activeCategoryData]);

  const filteredProducts = useMemo(() => {
    const list = products.filter((product) => {
      if (activeCategory !== "all" && product.category !== activeCategory) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortMode === "price-asc") return a.price - b.price;
      if (sortMode === "price-desc") return b.price - a.price;
      if (sortMode === "reviews") return b.reviewsCount - a.reviewsCount;
      const aScore = (a.isBestSeller ? 100 : 0) + (a.isNew ? 20 : 0) + a.rating * 10 + a.reviewsCount;
      const bScore = (b.isBestSeller ? 100 : 0) + (b.isNew ? 20 : 0) + b.rating * 10 + b.reviewsCount;
      return bScore - aScore;
    });
  }, [activeCategory, products, sortMode]);

  const getCategoryCount = (categoryId: string) =>
    products.filter((product) => product.category === categoryId).length;

  const getCategoryName = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.name || "Thảo dược";

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <main className="bg-[#faf8f4] min-h-screen">
      <section className="bg-[#153020] text-white border-b border-[#d4af37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="max-w-2xl">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-2 leading-tight">
                {activeCategoryName}
              </h1>
            </div>

            <div className="relative w-full lg:w-[26rem]">
              <input
                type="text"
                placeholder="Tìm tên sản phẩm..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full bg-white text-[#153020] border border-[#d9cfbd] rounded-xl py-3.5 pl-11 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/70 placeholder-slate-400 shadow-sm"
              />
              <Search className="w-4.5 h-4.5 absolute left-4 top-4 text-[#6b7a70]" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 w-7 h-7 rounded-full bg-[#8f2d24] text-white flex items-center justify-center hover:bg-[#b43a2f] transition-colors cursor-pointer"
                  aria-label="Xóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="category-filter" className="sticky top-[82px] sm:top-[88px] z-30 border-b border-[#e8dfcf] bg-[#faf8f4]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#153020] text-white border-[#153020]"
                  : "bg-white text-[#153020] border-[#e1d7c6] hover:border-[#153020]/35"
              }`}
            >
              Tất cả <span className="ml-1 opacity-75">({products.length})</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === category.id
                    ? "bg-[#153020] text-white border-[#153020]"
                    : "bg-white text-[#153020] border-[#e1d7c6] hover:border-[#153020]/35"
                }`}
              >
                {category.name} <span className="ml-1 opacity-75">({getCategoryCount(category.id)})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#e8dfcf] rounded-xl p-10 text-center">
              <PackageSearch className="w-12 h-12 mx-auto text-[#a1b8aa]" />
              <h2 className="font-serif text-2xl font-bold text-[#153020] mt-4">Không tìm thấy sản phẩm</h2>
              <p className="text-sm text-slate-500 mt-2">Hãy thử danh mục khác hoặc xoá từ khóa tìm kiếm.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("all");
                }}
                className="mt-5 rounded-lg bg-[#153020] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#8f2d24] transition-colors cursor-pointer"
              >
                Xem lại tất cả
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((product) => {
                const badge = getProductBadge(product);
                return (
                  <article
                    key={product.id}
                    className="group relative flex flex-col bg-white border border-[#e8dfcf] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#153020]/25 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-[#f3eadc] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {badge && (
                        <span className={`absolute top-3 left-3 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow ${badge.bg}`}>
                          {badge.text}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-[#153020]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                        <button
                          type="button"
                          onClick={() => onProductClick(product)}
                          className="p-3 bg-white hover:bg-[#153020] text-[#153020] hover:text-white rounded-full shadow-lg cursor-pointer transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="p-3 bg-white hover:bg-[#8f2d24] text-[#153020] hover:text-white rounded-full shadow-lg cursor-pointer transition-colors"
                          title="Thêm vào giỏ"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 flex flex-1 flex-col">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#f1eadf] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8f2d24]">
                          {getCategoryName(product.category)}
                        </span>
                        {product.isBestSeller && (
                          <span className="rounded-full bg-[#153020] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            Bán chạy
                          </span>
                        )}
                      </div>
                      <h2
                        onClick={() => onProductClick(product)}
                        className="font-serif text-base font-bold text-[#153020] hover:text-[#8f2d24] cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h2>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-9">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-3.5 h-3.5 ${
                                index < product.rating
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#f1eadf]">
                        <div>
                          {product.originalPrice && (
                            <div className="text-[11px] text-slate-400 line-through">{formatVND(product.originalPrice)}</div>
                          )}
                          <div className="text-base font-bold text-[#8f2d24]">{formatVND(product.price)}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#153020] px-3 py-2 text-[11px] font-bold uppercase text-white hover:bg-[#8f2d24] transition-colors cursor-pointer shrink-0"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
