import { ArrowRight, Boxes, Leaf, PackageSearch } from "lucide-react";
import { Category, Product } from "../types";

interface CategoriesPageProps {
  categories: Category[];
  products: Product[];
  onCategorySelect: (categoryId: string) => void;
  onViewProducts: () => void;
}

export default function CategoriesPage({
  categories,
  products,
  onCategorySelect,
  onViewProducts,
}: CategoriesPageProps) {
  const getCategoryCount = (categoryId: string) =>
    products.filter((product) => product.category === categoryId).length;

  return (
    <main className="bg-[#faf8f4] min-h-screen">
      <section className="bg-[#153020] text-white border-b border-[#d4af37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
              <Boxes className="w-3.5 h-3.5" />
              Danh mục sản phẩm
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
              Chọn nhóm thảo dược phù hợp nhu cầu của bạn
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#cbd8cf] leading-relaxed">
              Toàn bộ danh mục được quản trị viên cập nhật tập trung. Khi thêm danh mục mới trong bảng quản trị, khách hàng sẽ nhìn thấy tại đây.
            </p>
            <button
              type="button"
              onClick={onViewProducts}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#d4af37] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#153020] shadow-lg hover:bg-[#e7c756] transition-colors cursor-pointer"
            >
              Xem tất cả sản phẩm
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length === 0 ? (
            <div className="bg-white border border-[#e8dfcf] rounded-xl p-10 text-center">
              <PackageSearch className="w-12 h-12 mx-auto text-[#a1b8aa]" />
              <h2 className="font-serif text-2xl font-bold text-[#153020] mt-4">Chưa có danh mục</h2>
              <p className="text-sm text-slate-500 mt-2">Danh mục mới sẽ hiển thị sau khi quản trị viên cập nhật.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {categories.map((category) => {
                const count = getCategoryCount(category.id);
                return (
                  <article
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className="group bg-white border border-[#e8dfcf] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#153020]/25 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] bg-[#efe7d8] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#153020]/75 via-[#153020]/10 to-transparent" />
                      <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
                        <h2 className="font-serif text-2xl font-bold text-white uppercase leading-tight">
                          {category.name}
                        </h2>
                        <span className="shrink-0 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#153020]">
                          {count} sản phẩm
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm text-slate-600 leading-relaxed min-h-10">{category.tagline}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-[#f0eadf] pt-4">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8f2d24]">
                          <Leaf className="w-4 h-4" />
                          Xem sản phẩm
                        </span>
                        <span className="w-9 h-9 rounded-full bg-[#153020] text-white flex items-center justify-center group-hover:bg-[#8f2d24] transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </span>
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
