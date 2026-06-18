import { Leaf, ArrowRight } from "lucide-react";
import { Category } from "../types";

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void;
  categories: Category[];
}

export default function Categories({ onCategorySelect, categories }: CategoriesProps) {
  return (
    <section className="py-14 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Grid */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e6dfd3]">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-full bg-[#153020]/10 text-[#153020] inline-flex">
              <Leaf className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#153020]">
              DANH MỤC NỔI BẬT
            </h2>
          </div>
          <button
            onClick={() => onCategorySelect("all")}
            className="flex items-center space-x-1 text-sm font-medium text-[#8f2d24] hover:text-[#b03a30] transition-colors cursor-pointer group"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Column Categories list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category: Category) => (
            <div
              key={category.id}
              onClick={() => onCategorySelect(`cat-${category.id}`)}
              className="group relative flex items-center bg-gradient-to-br from-[#fbf9f5] to-[#f3ebd9] hover:to-[#ebdfc6] border border-[#e6dfd3] p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 h-[145px] overflow-hidden"
            >
              {/* Semicircular / Styled Circular Left image thumbnail */}
              <div className="relative w-24 h-24 flex-shrink-0 mr-4 rounded-xl overflow-hidden border border-[#dfd4c0]/80 shadow-inner">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#153020]/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Text content Column */}
              <div className="flex-1 flex flex-col justify-center pr-4">
                <h3 className="font-serif text-sm font-bold tracking-wide text-[#153020] group-hover:text-[#8f2d24] transition-colors leading-tight mb-1.5 uppercase">
                  {category.name}
                </h3>
                <p className="font-sans text-[11.5px] leading-snug text-[#5a6a5e] font-light">
                  {category.tagline}
                </p>
              </div>

              {/* Circular Arrow Button Bottom Right */}
              <div className="absolute right-3.5 bottom-3.5 w-7 h-7 rounded-full bg-[#153020] text-[#faf6f0] flex items-center justify-center transform group-hover:bg-[#8f2d24] group-hover:scale-105 transition-all duration-300 shadow">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
