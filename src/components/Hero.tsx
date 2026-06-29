import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Leaf, Award } from "lucide-react";
import { ContactData } from "../types";

interface HeroProps {
  onExploreClick: () => void;
  heroImage: string;
  contactData: ContactData;
}

export default function Hero({ onExploreClick, heroImage, contactData }: HeroProps) {
  const bannerBadge = contactData.bannerBadge || "100% Nguyên Liệu Thiên Nhiên Rừng Già";
  const bannerSubtitle = contactData.bannerSubtitle || "Thảo Dược Đông Y Tây Bắc";
  const bannerTitle = contactData.bannerTitle || "HƯƠNG VŨ";
  const bannerTagline = contactData.bannerTagline || "TINH TÚY NÚI RỰNG TÂY BẮC";
  const bannerDesc = contactData.bannerDesc || "Chuyên cung cấp sỉ lẻ thảo dược chất lượng cao - Đồ uống ngâm bổ Đông Y Tây Bắc thượng hạng. Được thu hái thủ công 100% tự nhiên bảo đảm vệ sinh - Uy tín đặt lên hàng đầu.";

  // Safe parse for multiple images in hero slider
  const images = (() => {
    try {
      if (heroImage && heroImage.startsWith("[")) {
        return (JSON.parse(heroImage) as string[]).filter(Boolean);
      }
    } catch (e) {
      console.warn("Failed to parse hero images list:", e);
    }
    return heroImage ? [heroImage] : [];
  })();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 12000); // Tự động chuyển slide sau mỗi 12 giây để hoàn thành di chuyển chiều ngang
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const firstImage = images[0];
    if (!firstImage || firstImage.startsWith("data:")) return;

    const existing = document.querySelector<HTMLLinkElement>(`link[rel="preload"][href="${firstImage}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = firstImage;
    link.fetchPriority = "high";
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [images]);

  return (
    <>
    <section className="relative min-h-[calc(100svh-88px)] md:min-h-[calc(100svh-96px)] flex items-center justify-center overflow-hidden bg-[#0d1f15] text-white">
      {/* Background Slideshow with crossfade motion transitions and left-to-right panning */}
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <motion.img
            key={img + idx}
            src={img}
            alt="Majestic Tây Bắc Mountains"
            initial={false}
            animate={{ 
              opacity: idx === currentIndex ? 1 : 0
            }}
            transition={{ 
              opacity: { duration: images.length > 1 ? 0.6 : 0, ease: "easeOut" }
            }}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "auto"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover ${
              idx === currentIndex 
                ? (images.length > 1 ? "animate-pan-horizontal" : "animate-pan-horizontal-loop") 
                : ""
            }`}
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      {/* Slide Index Dot Navigation indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 flex space-x-2.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "bg-amber-400 scale-125 shadow shadow-amber-400/55" : "bg-white/40 hover:bg-white/70"
              }`}
              title={`Trang ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Decorative Floating Forest Leaves */}
      <div className="absolute right-8 top-10 pointer-events-none opacity-20 hidden lg:block">
        <Leaf className="w-24 h-24 text-[#d4af37] transform rotate-45" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Empty column on left to let the ethnic woman image stand out on large viewports */}
          <div className="hidden md:block md:col-span-5 h-[350px] lg:h-[450px]" />

          {/* Slogan and Brand Column on Right */}
          <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-6 [text-shadow:_0_2px_16px_rgb(0_0_0_/_55%)]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#8f2d24]/90 to-[#aa3f35]/90 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white shadow-md border border-[#b84a3e]"
            >
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              <span>{bannerBadge}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2 select-none"
            >
              <h3 className="font-serif italic text-xl md:text-2xl text-[#d4af37] tracking-wider font-light">
                {bannerSubtitle}
              </h3>
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight uppercase drop-shadow-2xl">
                {bannerTitle}
              </h2>
              <div className="h-0.5 w-24 bg-[#d4af37] mx-auto md:mx-0 my-3 rounded-full" />
              <p className="font-sans text-xs md:text-sm text-yellow-100 tracking-[0.2em] font-bold uppercase w-full max-w-[280px] sm:max-w-none truncate sm:whitespace-normal">
                {bannerTagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 max-w-lg"
            >
              <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-sans font-light">
                {bannerDesc}
              </p>
              
              {/* Trust markers */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Cam kết chính phẩm</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Không chất bảo quản</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
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

    </section>
    <div className="h-14 sm:h-16 bg-[linear-gradient(180deg,#28451f_0%,#6f8a62_42%,#e5eadf_78%,#faf8f4_100%)]" aria-hidden="true" />
    </>
  );
}
