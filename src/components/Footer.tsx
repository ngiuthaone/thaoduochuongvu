import { Leaf, Shield, Truck, RefreshCw, Star } from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0b1f14] text-white border-t border-white/5 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top commitment badges column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-white/10 text-center md:text-left mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3.5 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white/5 rounded-full text-[#d4af37]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold tracking-wide uppercase text-[#faf6f0]">CAM KẾT CHÍNH HÃNG</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Đền bù ngay gấp 10 lần giá trị hóa đơn nếu phát hiện hàng giả, sâm giả hay không rõ nguồn gốc.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3.5 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white/5 rounded-full text-[#d4af37]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold tracking-wide uppercase text-[#faf6f0]">GIAO HÀNG ĐỒNG KIỂM</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Nhận hàng toàn quốc nhanh chóng, được bóc hộp kiểm tra và ngửi chất lượng dược phẩm trước khi thanh toán.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3.5 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white/5 rounded-full text-[#d4af37]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold tracking-wide uppercase text-[#faf6f0]">ĐỔI TRẢ MIỄN PHÍ</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Đổi trả sản phẩm trong vòng 7 ngày nếu bị bung gói chân không hoặc sấy ẩm mốc do lỗi vận chuyển.</p>
            </div>
          </div>
        </div>

        {/* Brand columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/5">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4 text-center md:text-left">
            <div 
              className="flex items-center justify-center md:justify-start space-x-3 cursor-pointer group"
              onClick={() => onNavigate("hero")}
            >
              <div className="w-11 h-11 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#153020]">
                <Leaf className="w-5.5 h-5.5 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wider text-[#faf6f0]">THẢO DƯỢC HƯƠNG VŨ</h3>
                <p className="text-[10px] text-slate-400 tracking-widest uppercase font-sans">Tinh túy núi rừng Tây Bắc</p>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
              Nguồn dược liệu hoang dã sấy hữu cơ mang nguyên vẹn dược tính thượng hạng bồi bổ thể trạng cho gia đình bạn.
            </p>

            <div className="flex justify-center md:justify-start items-center space-x-1 text-xs text-yellow-400">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-slate-300 font-sans text-xs ml-1.5">(4.9/5 điểm uy tín từ 1.200+ khách hàng)</span>
            </div>
          </div>

          {/* Col 2: Navigation link lists */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#faf6f0] uppercase text-center md:text-left">Bản Đồ Trang</h4>
            <div className="h-0.5 w-6 bg-[#d4af37] mx-auto md:mx-0 rounded" />
            <ul className="space-y-2.5 text-xs text-slate-400 text-center md:text-left font-sans">
              <li><button onClick={() => onNavigate("hero")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Trang chủ</button></li>
              <li><button onClick={() => onNavigate("products")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Sản phẩm thảo dược</button></li>
              <li><button onClick={() => onNavigate("about")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Về chúng tôi</button></li>
              <li><button onClick={() => onNavigate("contact")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Liên hệ tư vấn</button></li>
            </ul>
          </div>

          {/* Col 3: Product Subcategories lists */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#faf6f0] uppercase text-center md:text-left">Dòng Thảo Dược Quý</h4>
            <div className="h-0.5 w-6 bg-[#d4af37] mx-auto md:mx-0 rounded" />
            <ul className="space-y-2.5 text-xs text-slate-400 text-center md:text-left font-sans">
              <li><button onClick={() => onNavigate("cat-tra-thao-duoc")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Sâm Ngọc Linh Sấy Khô</button></li>
              <li><button onClick={() => onNavigate("cat-tra-thao-duoc")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Nhụy Hoa Nghệ Tây Saffron Premium</button></li>
              <li><button onClick={() => onNavigate("cat-thao-duoc-ngam-ruou")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Đồ Ngâm Bình Thủy Tinh Cao Cấp</button></li>
              <li><button onClick={() => onNavigate("cat-nam-duoc-lieu")} className="hover:text-[#d4af37] cursor-pointer block w-full text-center md:text-left">Nấm Linh Chi Rừng Sấy Thô</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#faf6f0] uppercase text-center md:text-left">Đăng Ký Đọc Bản Tin</h4>
            <div className="h-0.5 w-6 bg-[#d4af37] mx-auto md:mx-0 rounded" />
            <p className="text-xs text-slate-400 leading-relaxed text-center md:text-left font-sans font-light">
              Nhận ngay các mẹo Đông Y bồi bổ gan thận hữu ích nhất từ các dược sĩ hàng tháng.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] focus:outline-none flex-1 text-slate-100 placeholder-slate-500 font-sans"
              />
              <button 
                onClick={() => alert("Cảm ơn bạn đã quan tâm đăng ký chuyên mục mẹo Đông y Hương Vũ!")}
                className="bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-semibold px-4.5 py-2 rounded-lg cursor-pointer transition-colors"
              >
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </div>

        {/* Copy rights text */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-slate-500 text-center leading-relaxed">
          <p>© 2026 Thảo Dược Hương Vũ. Bản quyền thiết kế ván hàng thuộc Sapa Organic Farm.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0 font-sans">
            <a href="#about" className="hover:text-[#d4af37]">Chính sách vận chuyển</a>
            <a href="#about" className="hover:text-[#d4af37]">Bảo mật thông tin</a>
            <a href="#about" className="hover:text-[#d4af37]">Điều khoản mua hàng</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
