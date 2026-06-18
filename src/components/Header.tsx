import { useState } from "react";
import { Search, ShoppingCart, ChevronDown, Menu, X, Leaf } from "lucide-react";
import { CartItem, Category } from "../types";

interface HeaderProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigate: (section: string) => void;
  categories: Category[];
}

export default function Header({
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  onNavigate,
  categories,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#153020] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate("hero")}
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] flex items-center justify-center bg-gradient-to-br from-[#1b432d] to-[#153020] shadow-inner transform group-hover:scale-105 transition-all duration-300">
              <Leaf className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-wider text-[#faf6f0] leading-tight">
                THẢO DƯỢC <span className="text-[#d4af37]">HƯƠNG VŨ</span>
              </h1>
              <p className="text-[10px] text-[#a1b8aa] tracking-widest uppercase font-sans">
                Tinh túy núi rừng Tây Bắc
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans font-medium text-[15px] tracking-wide">
            <button
              onClick={() => onNavigate("hero")}
              className="text-white hover:text-[#d4af37] cursor-pointer transition-colors duration-200"
            >
              TRANG CHỦ
            </button>
            <div className="relative">
              <button
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                onMouseEnter={() => setIsProductDropdownOpen(true)}
                className="flex items-center space-x-1 text-white hover:text-[#d4af37] cursor-pointer transition-colors duration-200"
              >
                <span>SẢN PHẨM</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isProductDropdownOpen && (
                <div
                  onMouseLeave={() => setIsProductDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-56 rounded-md bg-[#1c3f2b] border border-[#2d5c41] shadow-2xl py-2 z-50 text-slate-100"
                >
                  <button
                    onClick={() => {
                      onNavigate("products");
                      setIsProductDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#254f37] hover:text-[#d4af37] text-sm transition-colors font-bold"
                  >
                    Tất cả sản phẩm
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onNavigate(`cat-${cat.id}`);
                        setIsProductDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-[#254f37] hover:text-[#d4af37] text-sm transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => onNavigate("about")}
              className="text-white hover:text-[#d4af37] cursor-pointer transition-colors duration-200"
            >
              VỀ CHÚNG TÔI
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="text-white hover:text-[#d4af37] cursor-pointer transition-colors duration-200"
            >
              LIÊN HỆ
            </button>
          </nav>

          {/* Search Bar & Cart Icons - changed from hidden md:flex to hidden lg:flex for perfect responsive spacing */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 lg:w-64 bg-[#1b3d29] text-white border border-[#2c533c] rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent placeholder-slate-400 transition-all duration-300"
              />
              <Search className="w-4 h-4 text-[#a1b8aa] absolute right-3.5 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-9 top-2 text-[#a1b8aa] hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#1b3d29] transition-all duration-200 group cursor-pointer"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingCart className="w-6 h-6 text-[#faf6f0] group-hover:text-[#d4af37] transition-colors" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[11px] rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions (Hamburger Menu + Cart Icon) */}
          <div className="flex items-center space-x-4 lg:hidden">
            {/* Search on mobile toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-[#1b3d29] cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 text-[#faf6f0]" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-md">
                  {totalQuantity}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-[#1b3d29] transition-colors text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1c3f2b] border-t border-[#254f37] px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b3d29] text-white border border-[#2c533c] rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
            <Search className="w-4 h-4 text-[#a1b8aa] absolute right-3.5 top-3" />
          </div>

          <button
            onClick={() => {
              onNavigate("hero");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-md hover:bg-[#254f37] text-[#faf6f0] hover:text-[#d4af37]"
          >
            TRANG CHỦ
          </button>
          <div className="block py-2 px-3 text-[#a1b8aa] font-bold text-xs uppercase tracking-wider">
            DANH MỤC SẢN PHẨM
          </div>
          <button
            onClick={() => {
              onNavigate("products");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1.5 pl-6 pr-3 rounded-md hover:bg-[#254f37] text-[#faf6f0] text-sm font-bold text-[#d4af37]"
          >
            ▸ Tất cả sản phẩm
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onNavigate(`cat-${cat.id}`);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 pl-6 pr-3 rounded-md hover:bg-[#254f37] text-[#faf6f0] text-sm"
            >
              ▸ {cat.name}
            </button>
          ))}

          <button
            onClick={() => {
              onNavigate("about");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-md hover:bg-[#254f37] text-[#faf6f0] hover:text-[#d4af37]"
          >
            VỀ CHÚNG TÔI
          </button>
          <button
            onClick={() => {
              onNavigate("contact");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-md hover:bg-[#254f37] text-[#faf6f0] hover:text-[#d4af37]"
          >
            LIÊN HỆ
          </button>
        </div>
      )}
    </header>
  );
}
