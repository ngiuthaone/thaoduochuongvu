import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf8f4] shadow-2xl border-l border-[#dfd4c0] flex flex-col h-full transform transition-all duration-300">
          
          {/* Header */}
          <div className="px-5 py-6 bg-[#153020] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-yellow-400" />
              <h2 className="font-serif text-lg font-bold tracking-wide">GIỎ HÀNG CỦA BẠN</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-white/40 rounded-xl border border-dashed border-[#dfd4c0] max-w-sm mx-auto my-6">
                <ShoppingBag className="w-12 h-12 text-[#153020]/20 mb-3" />
                <h3 className="font-serif text-[#153020] font-bold text-sm">Giỏ hàng rỗng</h3>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-sans max-w-xs">
                  Hiện bạn chưa có sản phẩm nào trong giỏ. Vui lòng khám phá thảo dược bồi bổ sức khỏe của chúng tôi!
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 bg-[#153020] hover:bg-[#8f2d24] text-white rounded-lg text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  TIẾP TỤC MUA SẮM
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center bg-white border border-[#e8dfcf] p-3.5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#f4ece0] border border-[#e8dfcf] mr-3.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Product Metadata & Action row */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-serif text-xs font-bold text-[#153020] truncate mb-0.5">
                      {item.product.name}
                    </h4>
                    <p className="font-sans text-xs text-[#8f2d24] font-semibold mb-2">
                      {formatVND(item.product.price)}
                    </p>

                    {/* Quantity modifier controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-[#dfd4c0] rounded bg-white text-xs overflow-hidden h-7">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.product.id, item.quantity - 1);
                            } else {
                              onRemoveItem(item.product.id);
                            }
                          }}
                          className="px-2.5 py-0.5 hover:bg-slate-50 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-slate-700 font-bold select-none text-[11px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 hover:bg-slate-50 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-sans text-[11px] text-slate-400">
                        Tổng: <span className="font-semibold text-slate-700">{formatVND(item.product.price * item.quantity)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-label="Xóa sản phẩm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer Block */}
          {cart.length > 0 && (
            <div className="border-t border-[#dfd4c0] bg-white p-5 space-y-4">
              <div className="flex justify-between items-center text-sm font-sans">
                <span className="text-[#a1b8aa]/40 font-bold">TẠM TÍNH:</span>
                <span className="text-xl font-bold font-serif text-[#153020] tracking-tight">{formatVND(totalAmount)}</span>
              </div>
              <p className="text-[10.5px] text-[#2ebd5c] flex items-center space-x-1.5 bg-[#f0fcf4] px-3 py-1.5 rounded border border-[#bef3cc]/60 leading-relaxed font-sans">
                <span>✓</span>
                <span>Miễn phí giao hàng COD toàn quốc cho đơn hàng đạt tiêu chuẩn này!</span>
              </p>

              <button
                onClick={onCheckout}
                className="w-full h-12 bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-bold tracking-widest rounded-lg flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer"
              >
                <span>TIẾN HÀNH ĐẶT HÀNG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
