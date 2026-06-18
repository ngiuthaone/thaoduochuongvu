import { motion } from "motion/react";
import { ArrowRight, Star, Leaf, Award, Compass } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  heroImage: string;
}

export default function Hero({ onExploreClick, heroImage }: HeroProps) {
  return (
    <section className="relative min-h-[580px] md:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0d1f15] text-white">
      {/* Background Image with Ambient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Majestic Tây Bắc Mountains"
          className="w-full h-full object-cover object-center opacity-70 transform scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layered Vignettes for Visual Contrast and Readability of Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-[#0d1f15]/80 xl:to-black/30 md:bg-gradient-to-t md:from-[#0d1f15]/90 md:via-transparent md:to-black/30" />
      </div>

      {/* Decorative Floating Forest Leaves */}
      <div className="absolute right-8 top-10 pointer-events-none opacity-20 hidden lg:block">
        <Leaf className="w-24 h-24 text-[#d4af37] transform rotate-45" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Empty column on left to let the ethnic woman image stand out on large viewports */}
          <div className="hidden md:block md:col-span-5 h-[350px] lg:h-[450px]" />

          {/* Slogan and Brand Column on Right */}
          <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#8f2d24]/90 to-[#aa3f35]/90 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white shadow-md border border-[#b84a3e]"
            >
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              <span>100% Nguyên Liệu Thiên Nhiên Rừng Già</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2 select-none"
            >
              <h3 className="font-serif italic text-xl md:text-2xl text-[#d4af37] tracking-wider font-light">
                Thảo Dược Đông Y Tây Bắc
              </h3>
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight uppercase Drop-shadow-2xl">
                HƯƠNG VŨ
              </h2>
              <div className="h-0.5 w-24 bg-[#d4af37] mx-auto md:mx-0 my-3 rounded-full" />
              <p className="font-sans text-xs md:text-sm text-yellow-100 tracking-[0.2em] font-bold uppercase">
                TINH TÚY NÚI RỰNG TÂY BẮC
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 max-w-lg"
            >
              <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-sans font-light">
                Chuyên cung cấp sỉ lẻ thảo dược chất lượng cao - Đồ uống ngâm bổ Đông Y Tây Bắc thượng hạng. Được thu hái thủ công 100% tự nhiên bảo đảm vệ sinh - Uy tín đặt lên hàng đầu.
              </p>
              
              {/* Trust markers */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>Cam kết chính phẩm</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>Không chất bảo quản</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>Giao toàn quốc</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            >
              <button
                onClick={onExploreClick}
                className="group flex items-center space-x-3 bg-[#8f2d24] hover:bg-[#aa392e] text-white font-sans font-semibold tracking-wider text-sm px-8 py-4 rounded-lg shadow-xl cursor-pointer hover:shadow-[#8f2d24]/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>KHÁM PHÁ NGAY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Elegant Sieve/Curve Boundary Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#faf8f4] to-transparent pointer-events-none" />
    </section>
  );
}
