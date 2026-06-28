import { useState } from "react";
import { Shield, Truck, RefreshCw, Facebook, MessageSquare, LockKeyhole, FileText, X, PhoneCall, CheckCircle2 } from "lucide-react";
import { ContactData } from "../types";

interface FooterProps {
  onNavigate: (section: string) => void;
  contactData: ContactData;
  onAddConsultation?: (newConsult: { name: string; phone: string; message: string }) => void;
}

export default function Footer({ onNavigate, contactData, onAddConsultation }: FooterProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activePolicy, setActivePolicy] = useState<"shipping" | "privacy" | "terms" | null>(null);

  const handleRegister = () => {
    setErrorMsg("");
    setSuccessMsg("");
    const cleaned = phoneNumber.replace(/\s+/g, "").trim();
    if (!cleaned) {
      setErrorMsg("Vui lòng nhập số điện thoại!");
      return;
    }
    const phoneRegex = /^[0-9+]{9,15}$/;
    if (!phoneRegex.test(cleaned)) {
      setErrorMsg("Số điện thoại không hợp lệ!");
      return;
    }

    if (onAddConsultation) {
      onAddConsultation({
        name: "Yêu cầu từ chân trang",
        phone: cleaned,
        message: "Yêu cầu tư vấn nhanh gửi từ form chân trang (Footer) của trang web."
      });
    }
    setSuccessMsg("Đăng ký thành công! Chúng tôi sẽ liên hệ tư vấn sớm nhất.");
    setPhoneNumber("");
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
  };

  const commitment1Title = contactData.commitment1Title || "CAM KẾT CHÍNH HÃNG";
  const commitment1Desc = contactData.commitment1Desc || "Đền bù ngay gấp 10 lần giá trị hóa đơn nếu phát hiện hàng giả, sâm giả hay không rõ nguồn gốc.";
  const commitment2Title = contactData.commitment2Title || "GIAO HÀNG ĐỒNG KIỂM";
  const commitment2Desc = contactData.commitment2Desc || "Nhận hàng toàn quốc nhanh chóng, được bóc hộp kiểm tra và ngửi chất lượng dược phẩm trước khi thanh toán.";
  const commitment3Title = contactData.commitment3Title || "ĐỔI TRẢ MIỄN PHÍ";
  const commitment3Desc = contactData.commitment3Desc || "Đổi trả sản phẩm trong vòng 7 ngày nếu bị bung gói chân không hoặc sấy ẩm mốc do lỗi vận chuyển.";
  const zaloLink = contactData.zaloLink || "https://zalo.me/84569315315";
  const facebookLink = contactData.facebookLink || "https://www.facebook.com/thaoduochuongvu";
  const tiktokLink = contactData.tiktokLink || "https://www.tiktok.com/@huonggoluanongsantaybac";
  const supportPhone = contactData.phone || "0569315315";

  const policyContent = {
    shipping: {
      title: "Chính Sách Vận Chuyển",
      subtitle: "Giao hàng toàn quốc, đồng kiểm trước khi thanh toán và luôn xác nhận phí vận chuyển trước khi gửi.",
      icon: Truck,
      updatedAt: "Cập nhật lần cuối: 28/06/2026",
      sections: [
        {
          heading: "Phạm vi & thời gian giao hàng",
          points: [
            "Hỗ trợ giao hàng toàn quốc qua các đơn vị vận chuyển phù hợp theo khu vực.",
            "Miền Bắc dự kiến 1-3 ngày làm việc; Miền Trung/Nam dự kiến 3-4 ngày làm việc.",
            "Khu vực vùng sâu, vùng xa hoặc thời điểm lễ Tết có thể phát sinh thêm thời gian vận chuyển."
          ]
        },
        {
          heading: "Phí vận chuyển & xác nhận đơn",
          points: [
            "Phí vận chuyển phụ thuộc trọng lượng, kích thước gói hàng và địa chỉ nhận hàng.",
            "Shop sẽ gọi điện hoặc nhắn Zalo xác nhận thông tin, phí giao hàng và thời gian dự kiến trước khi gửi.",
            "Khách hàng có thể chọn COD hoặc hình thức thanh toán khác theo thỏa thuận khi xác nhận đơn."
          ]
        },
        {
          heading: "Đồng kiểm khi nhận hàng",
          points: [
            "Khách được kiểm tra tình trạng đóng gói, tem niêm phong và đúng sản phẩm trước khi thanh toán.",
            "Nếu phát hiện gói hàng móp méo, rách, ẩm mốc hoặc sai sản phẩm, vui lòng chụp ảnh và liên hệ shop ngay.",
            "Thảo Dược Hương Vũ ưu tiên xử lý nhanh các trường hợp hư hỏng do vận chuyển."
          ]
        }
      ]
    },
    privacy: {
      title: "Bảo Mật Thông Tin",
      subtitle: "Thông tin khách hàng chỉ dùng để xác nhận đơn, giao hàng và chăm sóc tư vấn, không mua bán dữ liệu.",
      icon: LockKeyhole,
      updatedAt: "Cập nhật lần cuối: 28/06/2026",
      sections: [
        {
          heading: "Thông tin được thu thập",
          points: [
            "Họ tên, số điện thoại, địa chỉ nhận hàng, ghi chú đơn hàng và nội dung yêu cầu tư vấn.",
            "Thông tin sản phẩm đã đặt, tổng giá trị đơn hàng và trạng thái xử lý đơn.",
            "Các thông tin này được khách hàng chủ động cung cấp khi đặt hàng hoặc gửi form tư vấn."
          ]
        },
        {
          heading: "Mục đích sử dụng",
          points: [
            "Xác nhận đơn hàng, tư vấn sản phẩm phù hợp và giao hàng đúng địa chỉ.",
            "Gửi thông báo nội bộ cho bộ phận xử lý đơn hàng và chăm sóc khách hàng.",
            "Hỗ trợ đổi trả, bảo hành đóng gói hoặc xử lý khiếu nại nếu có phát sinh."
          ]
        },
        {
          heading: "Cam kết bảo mật",
          points: [
            "Không bán, trao đổi hoặc chia sẻ thông tin khách hàng cho bên thứ ba ngoài mục đích giao hàng.",
            "Chỉ nhân sự phụ trách xử lý đơn và tư vấn mới được tiếp cận thông tin cần thiết.",
            "Khách hàng có thể yêu cầu kiểm tra, chỉnh sửa hoặc xóa thông tin bằng cách liên hệ hotline/Zalo."
          ]
        }
      ]
    },
    terms: {
      title: "Điều Khoản Mua Hàng",
      subtitle: "Quy trình mua hàng rõ ràng, minh bạch giá bán và có hỗ trợ đổi trả khi phát sinh lỗi từ shop hoặc vận chuyển.",
      icon: FileText,
      updatedAt: "Cập nhật lần cuối: 28/06/2026",
      sections: [
        {
          heading: "Quy trình đặt hàng",
          points: [
            "Khách chọn sản phẩm, thêm vào giỏ hàng và để lại thông tin nhận hàng chính xác.",
            "Shop tiếp nhận đơn, gọi điện hoặc nhắn Zalo xác nhận trước khi đóng gói.",
            "Đơn hàng chỉ được gửi đi sau khi hai bên thống nhất sản phẩm, giá trị đơn và phí vận chuyển."
          ]
        },
        {
          heading: "Giá bán & thanh toán",
          points: [
            "Giá sản phẩm có thể thay đổi theo mùa vụ, nguồn dược liệu và chương trình ưu đãi tại từng thời điểm.",
            "Khách có thể thanh toán khi nhận hàng hoặc theo hình thức chuyển khoản nếu được shop xác nhận.",
            "Mọi thay đổi về giá hoặc phí sẽ được thông báo trước khi đơn hàng được gửi."
          ]
        },
        {
          heading: "Đổi trả & lưu ý sức khỏe",
          points: [
            "Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm sai mẫu, bung gói, hư hỏng do vận chuyển hoặc lỗi đóng gói.",
            "Không áp dụng đổi trả với sản phẩm đã sử dụng, bảo quản sai hướng dẫn hoặc quá thời hạn thông báo.",
            "Sản phẩm thảo dược không thay thế thuốc chữa bệnh; người có bệnh nền, phụ nữ mang thai hoặc đang dùng thuốc nên hỏi ý kiến chuyên môn trước khi dùng."
          ]
        }
      ]
    }
  } as const;

  const activePolicyData = activePolicy ? policyContent[activePolicy] : null;

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
              <h4 className="font-serif text-sm font-bold tracking-wide uppercase text-[#faf6f0]">{commitment1Title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{commitment1Desc}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3.5 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white/5 rounded-full text-[#d4af37]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold tracking-wide uppercase text-[#faf6f0]">{commitment2Title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{commitment2Desc}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3.5 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white/5 rounded-full text-[#d4af37]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold tracking-wide uppercase text-[#faf6f0]">{commitment3Title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{commitment3Desc}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 lg:gap-12 pb-8 border-b border-white/5">
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#faf6f0] uppercase">Kết nối nhanh</h4>
            <div className="h-0.5 w-6 bg-[#d4af37] mx-auto md:mx-0 rounded" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Gọi hoặc nhắn tin để được tư vấn sản phẩm, đơn hàng và chính sách giao hàng.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <a
                href={zaloLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#0068ff] hover:bg-[#0051c7] text-white font-sans text-xs font-semibold flex items-center space-x-1 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Zalo</span>
              </a>
              <a
                href={facebookLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#1877f2] hover:bg-[#115fc3] text-white font-sans text-xs font-semibold flex items-center space-x-1 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href={tiktokLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-black border border-white/10 text-white font-sans text-xs font-semibold flex items-center space-x-1 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.51-.15-.11-.29-.24-.42-.37v7.35c.01 4.54-3.55 8.52-8.1 8.97-4.88.58-9.45-3.05-9.79-7.95-.39-4.87 3.25-9.39 8.11-9.74.88-.07 1.77.03 2.63.29v4c-.78-.28-1.64-.32-2.42-.11-2.07.48-3.41 2.69-2.93 4.76.4 1.75 2.1 2.92 3.9 2.63 1.55-.17 2.67-1.48 2.65-3.04V.02z" />
                </svg>
                <span>TikTok</span>
              </a>
              <a
                href={`tel:${supportPhone.replace(/[^0-9+]/g, "")}`}
                className="px-3 py-1.5 rounded-full bg-[#d4af37] hover:bg-[#e0bd4c] text-[#0b1f14] font-sans text-xs font-bold flex items-center space-x-1 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{supportPhone}</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#faf6f0] uppercase text-center md:text-left">ĐĂNG KÝ TƯ VẤN</h4>
            <div className="h-0.5 w-6 bg-[#d4af37] mx-auto md:mx-0 rounded" />
            <p className="text-xs text-slate-400 leading-relaxed text-center md:text-left font-sans font-light">
              Để lại Số điện thoại để nhận được tư vấn nhanh nhất hoặc liên hệ số điện thoại{" "}
              <a href="tel:0569315315" className="text-yellow-400 font-bold hover:underline font-mono">
                0569315315
              </a>
            </p>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Số điện thoại của bạn..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] focus:outline-none flex-1 text-slate-100 placeholder-slate-500 font-sans font-mono"
                />
                <button 
                  onClick={handleRegister}
                  className="bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-semibold px-4.5 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                >
                  ĐĂNG KÝ
                </button>
              </div>
              {errorMsg && (
                <p className="text-red-400 text-[10px] font-sans text-center md:text-left">{errorMsg}</p>
              )}
              {successMsg && (
                <p className="text-green-400 text-[10px] font-sans text-center md:text-left bg-green-500/10 border border-green-500/20 px-2 py-1.5 rounded">
                  {successMsg}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-6 text-[11px] text-slate-500 text-center leading-relaxed">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans">
            <button onClick={() => setActivePolicy("shipping")} className="hover:text-[#d4af37] cursor-pointer">Chính sách vận chuyển</button>
            <button onClick={() => setActivePolicy("privacy")} className="hover:text-[#d4af37] cursor-pointer">Bảo mật thông tin</button>
            <button onClick={() => setActivePolicy("terms")} className="hover:text-[#d4af37] cursor-pointer">Điều khoản mua hàng</button>
          </div>
        </div>

      </div>

      {activePolicyData && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActivePolicy(null)}
          />
          <div className="relative w-full max-w-3xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto bg-[#faf8f4] text-[#153020] rounded-t-2xl sm:rounded-2xl border border-[#dfd4c0] shadow-2xl">
            <div className="sticky top-0 z-10 bg-[#153020] text-white px-4 sm:px-6 py-4 flex items-start justify-between gap-4 border-b border-[#d4af37]/30">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                  <activePolicyData.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight">{activePolicyData.title}</h3>
                  <p className="text-[11px] sm:text-xs text-[#cbd8cf] mt-1 leading-relaxed">{activePolicyData.updatedAt}</p>
                </div>
              </div>
              <button
                onClick={() => setActivePolicy(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer shrink-0"
                aria-label="Đóng chính sách"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <p className="text-sm sm:text-base text-[#445449] leading-relaxed bg-white border border-[#e8dfcf] rounded-xl p-4 shadow-sm">
                {activePolicyData.subtitle}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4">
                {activePolicyData.sections.map((section) => (
                  <section key={section.heading} className="bg-white border border-[#e8dfcf] rounded-xl p-4 sm:p-5 shadow-sm">
                    <h4 className="font-serif text-base font-bold text-[#153020] mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8f2d24] shrink-0" />
                      {section.heading}
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#d4af37] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="mt-5 bg-[#153020] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#d4af37]">Cần hỗ trợ nhanh?</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Gọi hoặc nhắn Zalo để được tư vấn chính sách, đơn hàng và sản phẩm phù hợp.
                  </p>
                </div>
                <a
                  href={`tel:${supportPhone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#8f2d24] hover:bg-[#aa392e] text-white rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  <PhoneCall className="w-4 h-4" />
                  Gọi hỗ trợ
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
