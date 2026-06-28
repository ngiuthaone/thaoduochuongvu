import { useState } from "react";
import { X, Star, CheckCircle, ShoppingBag, Info, AlertTriangle } from "lucide-react";
import { Product } from "../types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const formatVND = (num: number) => {
    return num > 0 ? num.toLocaleString("vi-VN") + "đ" : "Liên hệ";
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const submitAddToCart = () => {
    onAddToCart(product, quantity);
    setSuccessMsg(`Đã thêm thành công ${quantity} sản phẩm vào giỏ hàng của bạn!`);
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
    }, 2000);
  };

  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark overlay backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#faf8f4] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#e6dfd3] max-h-[90vh] overflow-y-auto z-10 transform scale-100 transition-all duration-300">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full bg-white/80 hover:bg-[#8f2d24] text-[#153020] hover:text-white transition-all shadow-md z-20 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {successMsg && (
          <div className="absolute top-4 left-4 right-16 bg-[#153020] border-l-4 border-yellow-400 text-white font-sans text-xs px-4 py-3 rounded-md shadow-lg z-30 flex items-center space-x-2 animate-bounce">
            <CheckCircle className="w-4 h-4 text-yellow-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Image & Health Benefits Checklist */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="aspect-4/3 w-full bg-[#f4ece0] rounded-xl overflow-hidden shadow border border-[#dfd4c0] relative group">
                  <img
                    src={productImages[activeImgIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Left/Right navigation for carousel if multiple images exist */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#153020] hover:text-[#8f2d24] shadow flex items-center justify-center transition-all cursor-pointer font-bold select-none text-sm z-10"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#153020] hover:text-[#8f2d24] shadow flex items-center justify-center transition-all cursor-pointer font-bold select-none text-sm z-10"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails below if multiple images exist */}
                {productImages.length > 1 && (
                  <div className="flex flex-wrap gap-2 justify-center max-h-24 overflow-y-auto p-1">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImgIndex(idx)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-white flex-shrink-0 ${
                          activeImgIndex === idx
                            ? "border-[#8f2d24] scale-105 shadow"
                            : "border-transparent opacity-70 hover:opacity-100 hover:border-slate-300"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Health Benefits checklist box */}
              <div className="bg-gradient-to-br from-[#153020]/5 to-[#153020]/10 border border-[#e6dfd3] rounded-xl p-5">
                <h4 className="font-serif text-sm font-bold text-[#153020] tracking-wider uppercase mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#8f2d24]" />
                  <span>CÔNG DỤNG CHO SỨC KHỎE</span>
                </h4>
                <ul className="space-y-2.5">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#2c3d31]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8f2d24] mt-1.5 flex-shrink-0" />
                      <span className="font-sans leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Detailed Product Information */}
            <div className="flex flex-col h-full justify-between space-y-6">
              <div>
                {/* Product Name & Badge */}
                <div className="flex items-center space-x-2.5 mb-2">
                  <span className="bg-[#8f2d24] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded uppercase shadow">
                    Cao Cấp
                  </span>
                  <span className="font-sans text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    Sản xuất tự nhiên
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#153020] leading-tight mb-2.5">
                  {product.name}
                </h3>

                {/* Rating component */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? "text-amber-500 fill-amber-500"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-slate-500">
                    ({product.reviewsCount} bình luận thực tế từ khách hàng)
                  </span>
                </div>

                {/* Product Prices */}
                <div className="flex items-baseline space-x-4 mb-4">
                  <span className="font-sans font-extrabold text-[#8f2d24] text-2xl">
                    {formatVND(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-sm text-slate-400 line-through tracking-wide">
                      {formatVND(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Main Product Description */}
                <p className="font-sans text-xs sm:text-sm text-[#4b554d] leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Usage instructions header & card */}
                <div className="border-t border-[#dfd4c0] pt-4.5 mb-5 space-y-2">
                  <h4 className="font-serif text-xs font-bold text-[#153020] uppercase tracking-wider flex items-center space-x-2">
                    <Info className="w-3.5 h-3.5 text-[#153020]" />
                    <span>HƯỚNG DẪN SỬ DỤNG HOÀN HẢO</span>
                  </h4>
                  <p className="bg-[#faf6ee] border border-[#e8dfcf] text-xs leading-relaxed text-[#555f56] p-3 rounded-lg font-sans">
                    {product.usage}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Quantity, Add to Cart */}
              <div className="border-t border-[#dfd4c0] pt-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Quantity adjustment buttons */}
                  <div className="flex items-center justify-between border border-[#c4bcae] rounded-lg bg-white h-11 w-full sm:w-36 overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      className="px-4 text-[#153020] hover:bg-[#faf6ee] text-lg font-bold"
                      aria-label="Giảm"
                    >
                      -
                    </button>
                    <span className="font-sans font-bold text-[#153020] text-sm select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="px-4 text-[#153020] hover:bg-[#faf6ee] text-lg font-bold"
                      aria-label="Tăng"
                    >
                      +
                    </button>
                  </div>

                  {/* Add into cart button */}
                  <button
                    onClick={submitAddToCart}
                    className="flex-1 h-11 bg-[#153020] hover:bg-[#8f2d24] text-[#faf6f0] text-xs font-bold tracking-wider rounded-lg flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>THÊM VÀO GIỎ HÀNG</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 mt-4 text-[10px] text-slate-500 justify-center sm:justify-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sản phẩm thiên nhiên sấy hữu cơ đặc sản Tây Bắc, bồi bổ dài lâu.</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
