import { ShieldCheck, Gem, Tag, Handshake } from "lucide-react";
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
              {data.paragraph1 || "Thảo Dược Hương Vũ bắt đầu từ niềm yêu quý những sản vật tự nhiên của vùng núi Bắc Hà, Lào Cai và kinh nghiệm tìm hiểu, lựa chọn các loại thảo dược được người dân địa phương sử dụng qua nhiều thế hệ."}
            </p>

<p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
              {data.paragraph2 || "Chúng tôi tập trung vào những sản phẩm thảo dược có nguồn gốc rõ ràng, được lựa chọn kỹ từ khâu nguyên liệu, làm sạch đến sơ chế và bảo quản. Với nhiều sản phẩm, Hương Vũ vẫn ưu tiên phương pháp chế biến thủ công nhằm giữ được đặc tính tự nhiên, màu sắc và hương thơm vốn có của nguyên liệu."}
            </p>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
              {data.paragraph3 || "Không chạy theo những lời quảng cáo phóng đại, Hương Vũ mong muốn khách hàng nhớ đến mình bằng sự chân thành, chất lượng ổn định và cách làm ăn lâu dài. Mỗi sản phẩm gửi đi đều là sự trân trọng dành cho thảo dược quê hương Bắc Hà và cho sự tin tưởng của từng khách hàng."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#dfd4c0]/60">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#8f2d24]/10 text-[#8f2d24] rounded-lg mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-extrabold text-[#153020] uppercase tracking-wide">Cam Kết Nguồn Gốc</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Sản phẩm được lựa chọn kỹ lưỡng, nguồn gốc rõ ràng và minh bạch ở từng khâu sơ chế, bảo quản trước khi đến tay khách hàng.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#8f2d24]/10 text-[#8f2d24] rounded-lg mt-0.5">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-extrabold text-[#153020] uppercase tracking-wide">Chọn Lọc Kỹ Càng</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Nguyên liệu được thu hái đúng mùa và chọn lọc cẩn thận để giữ được đặc tính tự nhiên vốn có của từng loại thảo dược.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Commitment boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f0f3f1] border border-[#d2dcd5] rounded-xl p-6 hover:shadow-md transition-shadow">
            <ShieldCheck className="w-8 h-8 text-[#8f2d24] mb-3.5" />
            <h4 className="font-serif text-sm font-bold text-[#153020] uppercase tracking-wider mb-2">Cam Kết Về Nguồn Gốc & Giá Trị Tự Nhiên</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Hương Vũ chú trọng lựa chọn thảo dược có nguồn gốc rõ ràng, đúng chủng loại và hạn chế tối đa qua xử lý không cần thiết. Mỗi loại thảo dược có thời gian sinh trưởng và mùa thu hái riêng, vì thế chúng tôi luôn ưu tiên nguyên liệu đạt độ trưởng thành phù hợp, chú trọng sơ chế và bảo quản để giữ trọn đặc tính tự nhiên.
            </p>
          </div>

          <div className="bg-[#f0f3f1] border border-[#d2dcd5] rounded-xl p-6 hover:shadow-md transition-shadow">
            <Handshake className="w-8 h-8 text-[#8f2d24] mb-3.5" />
            <h4 className="font-serif text-sm font-bold text-[#153020] uppercase tracking-wider mb-2">Đồng Hành Cùng Người Dân Bản Địa</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Một phần nguyên liệu được thu mua trực tiếp từ người dân và các hộ sản xuất tại Bắc Hà cùng khu vực Tây Bắc, tạo thêm đầu ra cho nông sản địa phương. Hương Vũ trân trọng những kinh nghiệm sử dụng cây cỏ truyền lại qua nhiều thế hệ, ghi chép và chọn lọc để gìn giữ giá trị truyền thống của sản vật quê hương.
            </p>
          </div>

          <div className="bg-[#f0f3f1] border border-[#d2dcd5] rounded-xl p-6 hover:shadow-md transition-shadow">
            <Tag className="w-8 h-8 text-[#8f2d24] mb-3.5" />
            <h4 className="font-serif text-sm font-bold text-[#153020] uppercase tracking-wider mb-2">Giá Hợp Lý, Làm Ăn Lâu Dài</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Thay vì đầu tư quá nhiều vào hình thức quảng cáo, Hương Vũ tập trung vào chất lượng nguyên liệu và duy trì mức giá hợp lý để khách hàng có thể sử dụng sản phẩm lâu dài.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
