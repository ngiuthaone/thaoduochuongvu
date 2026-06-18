import { useState, FormEvent } from "react";
import { X, CheckCircle, PhoneCall, Calendar, Receipt, Gift, ShoppingBag } from "lucide-react";
import { CartItem, OrderDetails } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (orderId: string, orderDetails: OrderDetails) => void;
  clearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
  clearCart,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedOrderCode, setGeneratedOrderCode] = useState("");
  const [errorText, setErrorText] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  const handleOrderSubmission = (e: FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!fullName.trim() || !phoneNumber.trim() || !address.trim()) {
      setErrorText("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    // Basic phone validation
    const phoneRegex = /^[0-9+ ]{9,13}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setErrorText("Số điện thoại không khả dụng. Vui lòng nhập đúng 9 - 11 chữ số.");
      return;
    }

    // Generate real invoice order code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `HV-${randomNum}`;
    
    const newOrder: OrderDetails = {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      note: note.trim(),
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: totalAmount,
      createdAt: new Date().toLocaleString("vi-VN")
    };

    setGeneratedOrderCode(code);
    setIsSubmitted(true);
    onOrderSuccess(code, newOrder);
  };

  const handleSuccessClose = () => {
    clearCart();
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleSuccessClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#faf8f4] w-full max-w-xl rounded-2xl shadow-2xl border border-[#e6dfd3] max-h-[90vh] overflow-y-auto z-10 transform scale-100 transition-all duration-300">
        
        {/* Close button icon */}
        <button
          onClick={handleSuccessClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {!isSubmitted ? (
            /* PHASE 1: FILL FORM */
            <form onSubmit={handleOrderSubmission} className="space-y-6">
              <div className="text-center">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#153020]">ĐẶT HÀNG NHANH</h3>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-sans">
                  Gửi thông tin giao hàng để được chuyên gia Hương Vũ tư vấn & nhận ưu đãi quà tặng kèm!
                </p>
                <div className="h-0.5 w-16 bg-[#8f2d24] mx-auto mt-2.5 rounded-full" />
              </div>

              {/* Error label */}
              {errorText && (
                <div className="bg-red-50 text-red-700 text-xs px-4 py-2.5 rounded-md border border-red-200 font-sans">
                  ⚠ {errorText}
                </div>
              )}

              {/* Form Input fields */}
              <div className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-[#153020] uppercase tracking-wide mb-1.5">
                    Họ và tên của bạn <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#c4bcae] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#153020] placeholder-slate-400 font-sans"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-xs font-semibold text-[#153020] uppercase tracking-wide mb-1.5">
                    Số điện thoại liên hệ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0987654321"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white border border-[#c4bcae] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#153020] placeholder-slate-400 font-sans"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#153020] uppercase tracking-wide mb-1.5">
                    Địa chỉ nhận hàng chi tiết <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, ngõ ngách, tên đường, xã, huyện, tỉnh"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-[#c4bcae] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#153020] placeholder-slate-400 font-sans"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#153020] uppercase tracking-wide mb-1.5">
                    Ghi chú yêu cầu thêm
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Nhập ghi chú hoặc yêu cầu bọc quà riêng cho đơn hàng..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-white border border-[#c4bcae] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#153020] placeholder-slate-400 font-sans resize-none"
                  />
                </div>
              </div>

              {/* Order Invoice Brief Preview */}
              <div className="bg-[#f2efe6] border border-[#e0d9cd] rounded-xl p-4.5 space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#153020] uppercase">
                  <Receipt className="w-4 h-4 text-slate-700" />
                  <span>Tóm tắt đơn hàng ({cart.reduce((sum, i) => sum + i.quantity, 0)} món)</span>
                </div>
                
                <div className="max-h-24 overflow-y-auto space-y-1 text-xs text-[#3d4940] pr-1 font-sans">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center py-0.5 border-b border-white/40">
                      <span className="truncate max-w-[320px]">{item.product.name} ×{item.quantity}</span>
                      <span className="font-semibold text-slate-700">{formatVND(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 text-sm font-sans">
                  <span className="font-semibold text-[#153020]">TỔNG THANH TOÁN (COD):</span>
                  <span className="text-base font-bold text-[#8f2d24]">{formatVND(totalAmount)}</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                type="submit"
                className="w-full h-12 bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-bold tracking-widest rounded-lg flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer"
              >
                <span>XÁC NHẬN ĐẶT HÀNG</span>
              </button>
            </form>
          ) : (
            /* PHASE 2: SUBMITTED SUCCESS */
            <div className="text-center py-4 space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#153020] text-emerald-400 flex items-center justify-center shadow-xl border border-white">
                <CheckCircle className="w-9 h-9 fill-transparent" />
              </div>

              <div className="space-y-2 select-none">
                <h3 className="font-serif text-2xl font-bold text-[#153020]">ĐẶT HÀNG THÀNH CÔNG!</h3>
                <p className="text-slate-500 text-xs font-sans">
                  Cảm ơn <span className="font-semibold text-[#153020]">{fullName}</span>, Đơn hàng của bạn đã được tiếp nhận thành phẩm.
                </p>
              </div>

              {/* Order Invoice Block cards */}
              <div className="bg-white border border-[#dfd4c0] rounded-2xl p-5 space-y-3.5 max-w-sm mx-auto shadow-inner text-left text-xs text-slate-600 font-sans">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Mã vận đơn:</span>
                  <span className="font-mono font-bold text-[#8f2d24] tracking-wider">{generatedOrderCode}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Thời gian tạo:</span>
                  <span className="font-medium text-[#153020] flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    <span>Hành chính ngày hôm nay</span>
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Hình thức:</span>
                  <span className="font-medium text-slate-700">Thanh toán tại nhà (COD)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Tổng thanh toán:</span>
                  <span className="font-bold text-[#8f2d24] text-sm">{formatVND(totalAmount)}</span>
                </div>
                <div className="pt-1.5 flex items-start text-[11px] text-slate-400 leading-relaxed">
                  <span className="text-amber-500 font-bold mr-1.5">✓</span>
                  <span>Miễn phí đóng gói bảo mật và hướng dẫn Đông Y kèm theo bọc hàng.</span>
                </div>
              </div>

              {/* Reassuring Note Call widget */}
              <div className="bg-[#f0f9f3] border border-[#bef3cc]/70 p-4.5 rounded-xl max-w-sm mx-auto flex items-start space-x-3 text-left">
                <div className="bg-[#153020] p-2 rounded-full text-emerald-400 mt-1 flex-shrink-0 animate-bounce">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#153020] font-serif text-xs">XÁC MINH NHANH TRONG 15 PHÚT</h4>
                  <p className="text-[11px] text-[#2c3d31] leading-relaxed mt-1 font-sans">
                    Dược sĩ tư vấn thảo dược của chúng tôi sẽ liên hệ tới số điện thoại <span className="font-bold text-[#8f2d24]">{phoneNumber}</span> để xác minh địa chỉ giao hàng và bốc gói thảo dược đúng chuẩn cho bạn!
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col justify-center sm:flex-row gap-3">
                <button
                  onClick={handleSuccessClose}
                  className="px-6 py-3 bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-bold tracking-wider rounded-lg transition-all shadow cursor-pointer uppercase h-11"
                >
                  TIẾP TỤC MUA SẮM
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
