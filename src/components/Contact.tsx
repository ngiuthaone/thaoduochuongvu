import { useState, FormEvent } from "react";
import { Phone, MapPin, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSuccess(true);
    setName("");
    setPhone("");
    setMsg("");
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-[#faf8f4] border-t border-[#dfd4c0]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Contact */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif italic text-sm text-[#8f2d24] font-medium uppercase tracking-widest block mb-2 font-semibold">
            Kết Nối Trực Tiếp
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#153020] tracking-tight">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h2>
          <div className="h-0.5 w-16 bg-[#d4af37] mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4 leading-relaxed font-sans font-light">
            Chúng tôi luôn ở đây hỗ trợ giải đáp mọi thắc mắc về dược tính thảo dược quý của bạn. Gọi hotline hoặc điền biểu mẫu tư vấn ngay!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Store locations */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#153020] to-[#0c1f14] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-[#dfd4c0]/10">
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wider text-[#d4af37] mb-2 uppercase">
                  NHÀ THUỐC THẢO DƯỢC HƯƠNG VŨ
                </h3>
                <p className="font-sans text-[11px] uppercase tracking-widest text-[#a1b8aa]">
                  Tổng Kho Thảo Dược Đông Y Tây Bắc
                </p>
                <div className="h-0.5 w-12 bg-white/20 mt-3 rounded-full" />
              </div>

              {/* Information list contact widgets */}
              <div className="space-y-5">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-white/10 text-[#d4af37] mt-0.5 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Trụ sở khai thác</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">Bản Cát Cát, Thị xã Sa Pa, Tỉnh Lào Cai, Việt Nam.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-white/10 text-[#d4af37] mt-0.5 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Hotline Tư Vấn Thảo Dược</h4>
                    <p className="text-sm font-bold text-yellow-300 mt-0.5">(+84) 987 654 321</p>
                    <p className="text-[10px] text-slate-400">Ấn để gọi - Miễn phí 100% cuộc gọi tư vấn kê toa</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-white/10 text-[#d4af37] mt-0.5 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Email liên hệ</h4>
                    <p className="text-xs text-slate-300 mt-1">thaoduochuongvu.taybac@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-white/10 text-[#d4af37] mt-0.5 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Thời gian tiếp nhận</h4>
                    <p className="text-xs text-slate-300 mt-1">7h30 sáng - 22h00 đêm hàng ngày (kể cả Thứ 7 và Chủ nhật).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-center select-none">
              <span className="text-[11px] text-slate-400 font-sans tracking-widest uppercase block">
                ⭐ Thảo dược sấy bảo toàn dược tính hàng đầu ⭐
              </span>
            </div>
          </div>

          {/* Right Column: Contact/Inquiry forms */}
          <div className="lg:col-span-7 bg-[#fbf9f5] border border-[#dfd4c0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#153020] mb-1">BẢN ĐĂNG KÍ NHẬN TƯ VẤN ĐÔNG Y</h3>
                <p className="text-slate-500 text-xs font-sans">
                  Để lại thông tin triệu chứng hoặc câu hỏi của bạn để dược sĩ gọi điện bắt mạch tư vấn miễn phí.
                </p>
              </div>

              {isSuccess && (
                <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-3 rounded-lg border border-emerald-200 flex items-center space-x-3 font-sans">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Cảm ơn bạn! Thông tin của bạn đã gửi đi thành công. Dược sĩ của Hương Vũ sẽ bắt máy gọi cho bạn trong tối đa 1 tiếng nữa!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#153020] uppercase tracking-wide mb-1.5 font-sans">
                    Họ và tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#c4bcae] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#153020] placeholder-slate-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#153020] uppercase tracking-wide mb-1.5 font-sans">
                    Số điện thoại cần gọi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại của bạn"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#c4bcae] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#153020] placeholder-slate-400 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#153020] uppercase tracking-wide mb-1.5 font-sans">
                  Nội dung câu hỏi hoặc triệu chứng sức khỏe cần hỏi
                </label>
                <textarea
                  rows={4}
                  placeholder="Ví dụ: Tôi bị đau tức mỏi xương khớp khi giao mùa, hoặc tôi cần tìm mua củ Sâm Ngọc Linh rừng để ngâm mật ong..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-white border border-[#c4bcae] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#153020] placeholder-slate-400 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-bold tracking-widest rounded-lg flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span>GỬI ĐĂNG KÝ NGAY</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
