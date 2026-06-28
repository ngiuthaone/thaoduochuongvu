import { Heart, ShieldCheck, Gem, UserCheck, Flame } from "lucide-react";
import { AboutUsData } from "../types";

interface AboutUsProps {
  heroImage: string;
  data: AboutUsData;
}

export default function AboutUs({ heroImage, data }: AboutUsProps) {
  const aboutTitle = data.title || "VỀ CHÚNG TÔI - THẢO DƯỢC HƯƠNG VŨ";
  const titleParts = aboutTitle.split(/\s+-\s+/);

  return (
    <section id="about" className="py-16 bg-[#fbfbf9] border-t border-[#dfd4c0]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <span className="font-serif italic text-sm text-[#8f2d24] font-medium uppercase tracking-widest block mb-2">
            {data.subtitle || "Hành Trình Gìn Giữ Di Sản"}
          </span>
          <h2 className="font-serif text-[2rem] sm:text-[2.65rem] lg:text-5xl font-extrabold text-[#153020] tracking-tight leading-[1.05] [text-wrap:balance]">
            {titleParts.length > 1 ? (
              <>
                <span className="block">{titleParts[0]}</span>
                <span className="block mt-1">{titleParts.slice(1).join(" - ")}</span>
              </>
            ) : (
              aboutTitle
            )}
          </h2>
          <div className="h-0.5 w-16 bg-[#d4af37] mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4 leading-relaxed font-sans font-light whitespace-pre-line">
            {data.description || "Sứ mệnh mang từng giọt tinh túy, thảo mộc quý của núi cao hoang dã Tây Bắc tiếp cận hàng triệu gia đình Việt mong muốn tăng tuổi thọ và bồi bổ sức khỏe tự nhiên."}
          </p>
        </div>

        {/* Narrative Split row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 relative">
            <div className="aspect-4/3 w-full bg-[#f4ece0] rounded-2xl overflow-hidden border border-[#dfd4c0] shadow-xl">
              <img
                src={heroImage}
                alt="Herbal extraction origin"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Elegant overlay card statistic */}
            <div className="absolute -bottom-6 right-2 sm:right-4 md:right-4 lg:-right-6 bg-[#153020] text-white rounded-xl p-4.5 border border-[#dfd4c0]/40 shadow-xl max-w-[180px]">
              <p className="text-2xl font-extrabold font-serif text-[#d4af37]">{data.statNumber || "15+ Năm"}</p>
              <p className="text-[10px] uppercase font-sans text-slate-300 font-light mt-1">{data.statLabel || "Châm cứu & thảo dược thuần tự nhiên rừng sâu"}</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#153020] italic">
              {data.quote || "“Chất lượng từ chữ TÂM, uy tín gầy dựng qua năm tháng”"}
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
              {data.paragraph1 || "Khởi đầu từ những chuyến đi rừng dài ngày của dòng họ Vũ tìm kiếm các phương thuốc trân quý của người Dao đỏ, người H'mông bản địa vùng núi Sapa, Hà Giang. Thảo Dược Hương Vũ đã nâng tầm chế biến thủ công giữ trọn vẹn lớp dược lý cao nhất mà không lạm dụng bất kỳ hóa chất diệt cỏ hay sấy lưu huỳnh công nghiệp độc hại nào."}
            </p>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
              {data.paragraph2 || "Sản phẩm của Hương Vũ đạt kiểm định an toàn vệ sinh thực phẩm khắt khe và được các chuyên khoa Đông y viện Trung Ương tin dùng kê đơn nâng cao thể trạng."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#dfd4c0]/60">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#8f2d24]/10 text-[#8f2d24] rounded-lg mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-extrabold text-[#153020] uppercase tracking-wide">Tuyệt đối Cam Kết</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Đến bù gấp 10 lần giá trị hóa đơn nếu phát hiện hàng giả, sâm giả hay tẩm hóa chất bảo quản.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#8f2d24]/10 text-[#8f2d24] rounded-lg mt-0.5">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-extrabold text-[#153020] uppercase tracking-wide">Giá trị quý hiếm</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Mỗi một tai nấm hay củ sâm được kiểm định nghiêm ngặt đủ tuổi sinh trưởng mới khai thác.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f0f3f1] border border-[#d2dcd5] rounded-xl p-6 hover:shadow-md transition-shadow">
            <Heart className="w-8 h-8 text-[#8f2d24] mb-3.5" />
            <h4 className="font-serif text-sm font-bold text-[#153020] uppercase tracking-wider mb-2">Vì Sức Khỏe Cộng Đồng</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Chúng tôi luôn tối giản chiết khấu, tiết kiệm chi phí marketing xa xỉ để mang lại mức giá bán sỉ lẻ thảo dược tốt hàng đầu thị trường cho người dùng có hoàn cảnh khó khăn.
            </p>
          </div>

          <div className="bg-[#f0f3f1] border border-[#d2dcd5] rounded-xl p-6 hover:shadow-md transition-shadow">
            <UserCheck className="w-8 h-8 text-[#8f2d24] mb-3.5" />
            <h4 className="font-serif text-sm font-bold text-[#153020] uppercase tracking-wider mb-2">Hỗ Trợ Người Bản Địa</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Trực tiếp bao tiêu sản phẩm nông sản rừng rào cho bà con đồng bào dân tộc thiểu số Tây Bắc giúp cải thiện kinh tế, bảo vệ rừng phòng hộ hoang dã.
            </p>
          </div>

          <div className="bg-[#f0f3f1] border border-[#d2dcd5] rounded-xl p-6 hover:shadow-md transition-shadow">
            <Flame className="w-8 h-8 text-[#8f2d24] mb-3.5" />
            <h4 className="font-serif text-sm font-bold text-[#153020] uppercase tracking-wider mb-2">Bảo Tồn Y Học Cổ Truyền</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Số hóa và duy trì các bài thuốc nam bản địa chân quý, kết nạp dược lý hiện đại bảo chứng khoa học hiệu quả cao.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
