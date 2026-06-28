import { Leaf, ArrowRight } from "lucide-react";
import { Category } from "../types";

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void;
  categories: Category[];
  title?: string;
}

export default function Categories({ onCategorySelect, categories, title }: CategoriesProps) {
  return (
    <section className="pt-10 pb-7 sm:pt-12 sm:pb-8 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Grid */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e6dfd3]">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-full bg-[#153020]/10 text-[#153020] inline-flex">
              <Leaf className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#153020]">
              {title || "DANH MỤC NỔI BẬT"}
            </h2>
          </div>
          <button
            onClick={() => onCategorySelect("products")}
            className="flex items-center space-x-1 text-sm font-medium text-[#8f2d24] hover:text-[#b03a30] transition-colors cursor-pointer group"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured category list: compact on tablet, spacious on desktop */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category: Category) => (
            <div
              key={category.id}
              onClick={() => onCategorySelect(`cat-${category.id}`)}
              className="group relative flex items-center shrink-0 w-[320px] sm:w-[360px] lg:w-[390px] bg-gradient-to-br from-[#fbf9f5] to-[#f3ebd9] hover:to-[#ebdfc6] border border-[#e6dfd3] p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 h-[136px] sm:h-[148px] overflow-hidden"
            >
              {/* Semicircular / Styled Circular Left image thumbnail */}
              <div className="relative w-24 h-24 sm:w-26 sm:h-26 flex-shrink-0 mr-4 rounded-xl overflow-hidden border border-[#dfd4c0]/80 shadow-inner">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#153020]/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Text content Column */}
              <div className="flex-1 flex flex-col justify-center pr-10 min-w-0">
                <h3 className="font-serif text-[15px] sm:text-base font-bold tracking-wide text-[#153020] group-hover:text-[#8f2d24] transition-colors leading-tight mb-1.5 uppercase line-clamp-2">
                  {category.name}
                </h3>
                <p className="font-sans text-[12px] sm:text-[13px] leading-snug text-[#5a6a5e] font-light line-clamp-2">
                  {category.tagline}
                </p>
              </div>

              {/* Circular Arrow Button Bottom Right */}
              <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-[#153020] text-[#faf6f0] flex items-center justify-center transform group-hover:bg-[#8f2d24] group-hover:scale-105 transition-all duration-300 shadow">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
