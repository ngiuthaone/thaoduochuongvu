import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { 
  X, Plus, Edit, Trash2, Image, Receipt, ShoppingBag, 
  Save, Undo, CheckCircle, Sparkles, Sliders, Eye, BookOpen, FolderOpen
} from "lucide-react";
import { Product, OrderDetails, Category, AboutUsData } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  orders: OrderDetails[];
  setOrders: (orders: OrderDetails[]) => void;
  heroImage: string;
  setHeroImage: (url: string) => void;
  categories: Category[];
  setCategories: (cats: Category[]) => void;
  aboutUsData: AboutUsData;
  setAboutUsData: (data: AboutUsData) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  products,
  setProducts,
  orders,
  setOrders,
  heroImage,
  setHeroImage,
  categories,
  setCategories,
  aboutUsData,
  setAboutUsData,
}: AdminPanelProps) {
  if (!isOpen) return null;

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedPhone, setSavedPhone] = useState(() => localStorage.getItem("huongvu_admin_phone") || "");
  const [savedPin, setSavedPin] = useState(() => localStorage.getItem("huongvu_admin_pin") || "");
  
  // Auth Form input states
  const [inputPhone, setInputPhone] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"products" | "categories" | "aboutus" | "orders" | "appearance">("products");
  
  // Product Form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Form Fields
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number | undefined>(undefined);
  const [formImage, setFormImage] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formBenefits, setFormBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState("");
  const [formUsage, setFormUsage] = useState("");

  // Categories Form states
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catFormName, setCatFormName] = useState("");
  const [catFormTagline, setCatFormTagline] = useState("");
  const [catFormImage, setCatFormImage] = useState("");
  const catFileInputRef = useRef<HTMLInputElement>(null);

  // About Us Form states
  const [aboutSubtitle, setAboutSubtitle] = useState(aboutUsData.subtitle);
  const [aboutTitle, setAboutTitle] = useState(aboutUsData.title);
  const [aboutDescription, setAboutDescription] = useState(aboutUsData.description);
  const [aboutQuote, setAboutQuote] = useState(aboutUsData.quote);
  const [aboutParagraph1, setAboutParagraph1] = useState(aboutUsData.paragraph1);
  const [aboutParagraph2, setAboutParagraph2] = useState(aboutUsData.paragraph2);
  const [aboutStatNumber, setAboutStatNumber] = useState(aboutUsData.statNumber);
  const [aboutStatLabel, setAboutStatLabel] = useState(aboutUsData.statLabel);

  // Sync AboutUs Form inputs on dynamic reset / update
  useEffect(() => {
    setAboutSubtitle(aboutUsData.subtitle);
    setAboutTitle(aboutUsData.title);
    setAboutDescription(aboutUsData.description);
    setAboutQuote(aboutUsData.quote);
    setAboutParagraph1(aboutUsData.paragraph1);
    setAboutParagraph2(aboutUsData.paragraph2);
    setAboutStatNumber(aboutUsData.statNumber);
    setAboutStatLabel(aboutUsData.statLabel);
  }, [aboutUsData]);

  // Set default category when categories load or reset
  useEffect(() => {
    if (categories.length > 0 && !formCategory) {
      setFormCategory(categories[0].id);
    }
  }, [categories]);

  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  const formatVND = (num: number) => num.toLocaleString("vi-VN") + "đ";

  // Trigger File Upload for product image
  const handleProductImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger File Upload for Hero Image
  const handleHeroImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setHeroImage(reader.result);
          showToast("Đã thay đổi ảnh nền trang chủ thành công!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleRegisterAdmin = (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const cleanedPhone = inputPhone.trim();
    const cleanedPin = inputPin.trim();
    const cleanedConfirm = confirmPin.trim();

    if (!cleanedPhone) {
      setAuthError("Vui lòng nhập Số điện thoại của mẹ!");
      return;
    }
    if (cleanedPin.length < 4) {
      setAuthError("Mã PIN đăng nhập phải có ít nhất 4 ký tự bảo mật!");
      return;
    }
    if (cleanedPin !== cleanedConfirm) {
      setAuthError("Mã PIN xác nhận không khớp!");
      return;
    }

    localStorage.setItem("huongvu_admin_phone", cleanedPhone);
    localStorage.setItem("huongvu_admin_pin", cleanedPin);
    setSavedPhone(cleanedPhone);
    setSavedPin(cleanedPin);
    setIsAuthenticated(true);
    setInputPhone("");
    setInputPin("");
    setConfirmPin("");
    showToast("Khởi tạo tài khoản Quản trị cho mẹ thành công!");
  };

  const handleLoginAdmin = (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const cleanedPhone = inputPhone.trim();
    const cleanedPin = inputPin.trim();

    if (cleanedPhone === savedPhone && cleanedPin === savedPin) {
      setIsAuthenticated(true);
      setAuthError("");
      setInputPhone("");
      setInputPin("");
      showToast("Đăng nhập thành công!");
    } else {
      setAuthError("Số điện thoại hoặc mã PIN đăng nhập không chính xác!");
    }
  };

  // Add Benefit Tag
  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormBenefits([...formBenefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  // Remove Benefit Tag
  const removeBenefit = (index: number) => {
    setFormBenefits(formBenefits.filter((_, i) => i !== index));
  };

  // Start edit flow
  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddingNew(false);
    
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price);
    setFormOriginalPrice(product.originalPrice);
    setFormImage(product.image);
    setFormDescription(product.description || "");
    setFormBenefits(product.benefits || []);
    setFormUsage(product.usage || "");
  };

  // Open add new flow
  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    
    setFormName("");
    setFormCategory(categories[0]?.id || "tra-thao-duoc");
    setFormPrice(0);
    setFormOriginalPrice(undefined);
    setFormImage("");
    setFormDescription("");
    setFormBenefits(["Bồi bổ gan thận khí huyết", "Tăng cường miễn dịch tự nhiên"]);
    setFormUsage("Hãm trà nóng hoặc sắc nước uống hàng ngày.");
  };

  // Save product details
  const handleSaveProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPrice <= 0 || !formImage) {
      alert("Vui lòng điền đầy đủ tiêu đề, giá bán lớn hơn 0 và chọn một hình ảnh!");
      return;
    }

    const payload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formName.trim(),
      category: formCategory,
      price: Number(formPrice),
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
      rating: editingProduct ? editingProduct.rating : 5,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 1,
      image: formImage,
      description: formDescription.trim(),
      benefits: formBenefits.length > 0 ? formBenefits : ["Nâng cao thể lực"],
      usage: formUsage.trim() || "Thưởng thức hàng ngày tốt cho sức khỏe.",
      isNew: true,
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? payload : p)));
      showToast("Đã cập nhật sản phẩm thành công!");
    } else {
      setProducts([payload, ...products]);
      showToast("Đã thêm mới sản phẩm thành công!");
    }

    // Reset forms
    setIsAddingNew(false);
    setEditingProduct(null);
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm thảo dược này khỏi menu cửa hàng?")) {
      setProducts(products.filter((p) => p.id !== id));
      showToast("Đã xóa sản phẩm thành công!");
    }
  };

  // Delete order
  const handleDeleteOrder = (idx: number) => {
    if (confirm("Bạn muốn xóa thông tin hóa đơn lưu trữ này?")) {
      setOrders(orders.filter((_, i) => i !== idx));
      showToast("Đã xóa đơn hàng lưu vết!");
    }
  };

  // Categories Form Handlers
  const handleCatImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setCatFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCategory = (e: FormEvent) => {
    e.preventDefault();
    if (!catFormName.trim() || !catFormTagline.trim() || !catFormImage) {
      alert("Vui lòng nhập tên danh mục, khẩu hiệu và hình ảnh minh họa!");
      return;
    }

    const catId = editingCategory ? editingCategory.id : `cat-${Date.now()}`;
    const payload: Category = {
      id: catId,
      name: catFormName.trim(),
      tagline: catFormTagline.trim(),
      image: catFormImage,
    };

    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? payload : c)));
      showToast("Đã cập nhật danh mục thành công!");
    } else {
      setCategories([...categories, payload]);
      showToast("Đã thêm mới danh mục thành công!");
    }

    setIsAddingCategory(false);
    setEditingCategory(null);
    setCatFormName("");
    setCatFormTagline("");
    setCatFormImage("");
  };

  const handleDeleteCategory = (id: string) => {
    // Check if there are any products under this category
    const hasProducts = products.some((p) => p.category === id);
    if (hasProducts) {
      if (!confirm(`Cảnh báo: Danh mục này đang chứa một số sản phẩm đang được bán. Nếu xóa, các sản phẩm thuộc danh mục sẽ không hiển thị trên bộ lọc. Mẹ vẫn muốn xóa danh mục này chứ?`)) {
        return;
      }
    } else {
      if (!confirm("Mẹ có chắc chắn muốn xóa danh mục phân loại này không?")) {
        return;
      }
    }

    setCategories(categories.filter((c) => c.id !== id));
    showToast("Đã xóa danh mục thành công!");
  };

  // About Us Form Handler
  const handleSaveAboutUs = (e: FormEvent) => {
    e.preventDefault();
    const payload: AboutUsData = {
      subtitle: aboutSubtitle.trim(),
      title: aboutTitle.trim(),
      description: aboutDescription.trim(),
      quote: aboutQuote.trim(),
      paragraph1: aboutParagraph1.trim(),
      paragraph2: aboutParagraph2.trim(),
      statNumber: aboutStatNumber.trim(),
      statLabel: aboutStatLabel.trim(),
    };
    setAboutUsData(payload);
    showToast("Đã lưu đổi mới thông tin Giới thiệu thành công!");
  };

  // Restore defaults
  const handleRestoreDefaults = () => {
    if (confirm("Hành động này sẽ tải lại danh sách sản phẩm, các danh mục, trang giới thiệu và ảnh bìa mặc định ban đầu. Bạn đồng ý?")) {
      localStorage.removeItem("huongvu_products");
      localStorage.removeItem("huongvu_categories");
      localStorage.removeItem("huongvu_about_us");
      localStorage.removeItem("huongvu_hero_image");
      window.location.reload();
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-stretch">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Admin Panel container slide-right */}
      <div className="relative w-full max-w-5xl bg-[#faf8f4] border-l border-[#dfd4c0] flex flex-col h-full ml-auto shadow-2xl z-10 animate-fade-in text-slate-800">
        
        {/* Header Block */}
        <div className="px-6 py-5 bg-[#153020] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-lg">
              <Sliders className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-wide">BẢNG QUẢN TRỊ TRANG WEB</h2>
              <p className="text-[10px] text-slate-300 font-sans tracking-widest uppercase">Thảo Dược Hương Vũ</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Toast feedback */}
        {successMsg && (
          <div className="mx-6 mt-4 bg-emerald-600 border border-emerald-500 text-white font-sans text-xs px-4 py-3 rounded-lg flex items-center space-x-2.5 shadow-lg animate-bounce">
            <CheckCircle className="w-4 h-4 text-white" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Central columns */}
        {!isAuthenticated ? (
          /* Beautiful Offline Admin Auth Gate */
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-[#faf8f4] overflow-y-auto text-slate-800">
            <div className="w-full max-w-md bg-white border border-[#e8dfcf] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-6 relative overflow-hidden">
              {/* Trang trí góc mang đậm phong cách thảo mộc */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#153020]/5 rounded-bl-full pointer-events-none" />
              
              {/* Biểu tượng ổ khóa thảo dược */}
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="w-16 h-16 rounded-full bg-[#153020]/10 flex items-center justify-center border border-[#153020]/20">
                  <span className="text-3xl">🔑</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#153020] tracking-wide uppercase mt-2">
                  {!savedPhone ? "KHỞI TẠO TÀI KHOẢN MẸ" : "XÁC THỰC QUẢN TRỊ VIÊN"}
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  {!savedPhone 
                    ? "Chào mừng bạn! Hãy đăng ký Số điện thoại của mẹ để làm chìa khóa quản trị duy nhất cho trang web." 
                    : "Trang đăng nhập của quản trị viên, khách hàng vui lòng không đăng nhập"}
                </p>
              </div>

              {/* Thông báo lỗi nếu có */}
              {authError && (
                <div className="px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-sans font-medium">
                  ⚠️ {authError}
                </div>
              )}

              {/* Form xử lý */}
              {!savedPhone ? (
                /* GIAO DIỆN ĐĂNG KÍ LẦN ĐẦU */
                <form onSubmit={handleRegisterAdmin} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Số điện thoại của mẹ *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912345678"
                      value={inputPhone}
                      onChange={(e) => setInputPhone(e.target.value)}
                      className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Thiết lập mã khóa PIN (ít nhất 4 chữ số) *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Nhập mã PIN bí mật"
                      value={inputPin}
                      onChange={(e) => setInputPin(e.target.value)}
                      className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Nhập lại mã PIN để xác nhận *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Xác nhận mã PIN bên trên"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-md select-none mt-2 flex items-center justify-center space-x-1 uppercase"
                  >
                    <span>Khởi tạo bảo mật</span>
                  </button>
                </form>
              ) : (
                /* GIAO DIỆN ĐĂNG NHẬP */
                <form onSubmit={handleLoginAdmin} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Nhập số điện thoại của mẹ *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại của mẹ"
                      value={inputPhone}
                      onChange={(e) => setInputPhone(e.target.value)}
                      className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1 flex justify-between">
                      <span>Nhập mã khóa PIN đăng nhập *</span>
                      <button 
                        type="button" 
                        onClick={() => {
                          if (confirm("Mẹ muốn đặt lại số điện thoại và mã PIN? Hành động này sẽ xóa vĩnh viễn cấu hình cũ và đưa về trạng thái đăng ký ban đầu.")) {
                            localStorage.removeItem("huongvu_admin_phone");
                            localStorage.removeItem("huongvu_admin_pin");
                            setSavedPhone("");
                            setSavedPin("");
                            setInputPhone("");
                            setInputPin("");
                            setAuthError("");
                          }
                        }}
                        className="text-[10px] text-[#8f2d24] hover:underline font-bold"
                      >
                        Đặt lại (Reset)
                      </button>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Mã PIN bảo mật"
                      value={inputPin}
                      onChange={(e) => setInputPin(e.target.value)}
                      className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-md select-none mt-2 flex items-center justify-center space-x-1 uppercase"
                  >
                    <span>Đăng nhập bảng quản trị</span>
                  </button>
                </form>
              )}

              <p className="text-[10px] text-slate-400 text-center leading-relaxed font-sans pt-2">
                🔒 Hệ thống mã hóa cục bộ hoàn toàn để bảo đảm tính riêng tư tối đa. Người ngoài hay khách mua hàng thông thường không thể xâm phạm trang này.
              </p>
            </div>
          </div>
        ) : (
          /* Central columns */
          <div className="flex-1 flex overflow-hidden">
          
          {/* Internal Sidebar tabs */}
          <div className="w-48 bg-[#f2ede4] border-r border-[#dfd4c0] p-4 flex flex-col justify-between">
            <div className="space-y-1.5 font-sans">
              <button
                onClick={() => { setActiveTab("products"); setIsAddingNew(false); setEditingProduct(null); }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "products"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sản Phẩm</span>
              </button>

              <button
                onClick={() => { setActiveTab("categories"); setIsAddingCategory(false); setEditingCategory(null); }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "categories"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Danh Mục Hàng</span>
              </button>

              <button
                onClick={() => setActiveTab("aboutus")}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "aboutus"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Giới Thiệu</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "orders"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>Đơn hàng ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("appearance")}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "appearance"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Ảnh Giao Diện</span>
              </button>
            </div>

            <button
              onClick={handleRestoreDefaults}
              className="w-full flex items-center justify-center space-x-1 py-2 border border-[#8f2d24] text-[#8f2d24] hover:bg-[#8f2d24] hover:text-white rounded-lg text-[10.5px] font-bold uppercase tracking-widest transition-all cursor-pointer font-sans"
            >
              <Undo className="w-3.5 h-3.5" />
              <span>Khôi phục gốc</span>
            </button>
          </div>

          {/* Central Main Content area */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            
            {/* ====== TAB 1: PRODUCT LIST & EDITOR ====== */}
            {activeTab === "products" && (
              <div className="space-y-6">
                
                {!isAddingNew && !editingProduct ? (
                  /* list view products */
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#153020]">QUẢN LÝ DANH SÁCH THẢO DƯỢC</h3>
                        <p className="text-xs text-slate-500 font-sans">Bạn có thể tùy ý sửa đổi hay thêm bớt sản phẩm của mình.</p>
                      </div>
                      <button
                        onClick={startAddNew}
                        className="flex items-center space-x-1.5 bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow cursor-pointer transition-colors font-sans"
                      >
                        <Plus className="w-4 h-4" />
                        <span>THÊM SẢN PHẨM MỚI</span>
                      </button>
                    </div>

                    <div className="border border-[#e8dfcf] rounded-xl overflow-hidden font-sans">
                      <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-[#fcfaf7] border-b border-[#e8dfcf] text-[#153020] uppercase font-bold tracking-wider">
                          <tr>
                            <th className="px-4 py-3">Ảnh</th>
                            <th className="px-4 py-3">Tên thảo dược</th>
                            <th className="px-4 py-3">Phân loại</th>
                            <th className="px-4 py-3">Giá bán</th>
                            <th className="px-4 py-3 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f2efe6] text-slate-600">
                          {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-2.5">
                                <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden bg-slate-50">
                                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                                </div>
                              </td>
                              <td className="px-4 py-2.5 font-bold text-[#153020]">
                                {product.name}
                              </td>
                              <td className="px-4 py-2.5 text-slate-400 font-medium">
                                {categories.find((c) => c.id === product.category)?.name || product.category}
                              </td>
                              <td className="px-4 py-2.5 font-bold text-[#8f2d24]">
                                {formatVND(product.price)}
                              </td>
                              <td className="px-4 py-2.5 text-right space-x-2.5">
                                <button
                                  onClick={() => startEdit(product)}
                                  className="p-1 hover:bg-[#153020]/10 text-[#153020] rounded-md transition-colors inline-block"
                                  title="Chỉnh sửa"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="p-1 hover:bg-red-50 text-red-600 rounded-md transition-colors inline-block"
                                  title="Xóa"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Create / Update product form */
                  <form onSubmit={handleSaveProduct} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#e8dfcf] pb-3">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#153020]">
                        {editingProduct ? `CHỈNH SỬA: ${editingProduct.name}` : "THÊM SẢN PHẨM HOÀN TOÀN MỚI"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => { setIsAddingNew(false); setEditingProduct(null); }}
                        className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                      >
                        Huỷ bỏ
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
                      {/* Left Column values */}
                      <div className="space-y-4">
                        <div>
                          <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                            Tên sản phẩm thảo dược quý *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Đông Trùng Hạ Thảo Sâm Đá"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-semibold text-slate-700 uppercase mb-1">
                              Danh mục phân loại
                            </label>
                            <select
                              value={formCategory}
                              onChange={(e) => setFormCategory(e.target.value)}
                              className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                            >
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 uppercase mb-1">
                              Giá bán thực tế (VND) *
                            </label>
                            <input
                              type="number"
                              required
                              min="1000"
                              placeholder="Giá bán VND"
                              value={formPrice}
                              onChange={(e) => setFormPrice(Number(e.target.value))}
                              className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020] font-bold text-[#8f2d24]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 col-span-2">
                          <div>
                            <label className="block font-semibold text-slate-700 uppercase mb-1">
                              Giá gốc (VND - Tùy chọn gạch chéo)
                            </label>
                            <input
                              type="number"
                              placeholder="Hủy giảm giá"
                              value={formOriginalPrice || ""}
                              onChange={(e) => setFormOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                              className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020] text-slate-400"
                            />
                          </div>
                          
                          {/* File input click trigger */}
                          <div>
                            <label className="block font-semibold text-slate-700 uppercase mb-1">
                              Ảnh sản phẩm (Tự Tải File Máy Tính) *
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={handleProductImageUpload}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full px-3 py-2 bg-[#fdfcfa] hover:bg-[#f6f2e8] border border-[#c4bcae] rounded-lg font-semibold text-slate-700 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                            >
                              <Image className="w-4 h-4 text-slate-500" />
                              <span>BẤM TẢI ẢNH LÊN</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 uppercase mb-1">
                            Mô tả tóm tắt tác dụng dược phẩm
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Mô tả công hiệu thảo mộc của sản phẩm này phát huy cho người dùng bồi bổ..."
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020] resize-none"
                          />
                        </div>
                      </div>

                      {/* Right Column Form values */}
                      <div className="space-y-4">
                        {/* Image preview check */}
                        <div className="border border-[#dfd4c0] bg-[#faf8f4] p-3.5 rounded-xl text-center flex flex-col items-center justify-center h-44 overflow-hidden relative">
                          {formImage ? (
                            <>
                              <img src={formImage} alt="Xem trước" className="max-h-full max-w-full object-contain rounded" />
                              <button 
                                type="button" 
                                onClick={() => setFormImage("")}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 cursor-pointer"
                              >
                                ✕
                              </button>
                            </>
                          ) : (
                            <div className="text-slate-400 flex flex-col items-center">
                              <Image className="w-8 h-8 text-neutral-300 mb-1" />
                              <span> Chưa chọn hình ảnh cho sản phẩm này</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 uppercase mb-1.5">
                            Liệt kê Công Dụng Sức Khỏe (Ấn + Thêm)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Ví dụ: Đánh tan chứng đau nhức xương khớp"
                              value={benefitInput}
                              onChange={(e) => setBenefitInput(e.target.value)}
                              className="flex-1 bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addBenefit();
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={addBenefit}
                              className="px-3 py-2 bg-[#153020] hover:bg-[#8f2d24] text-white font-bold rounded-lg cursor-pointer"
                            >
                              Thêm
                            </button>
                          </div>
                          
                          {/* Tags container */}
                          <div className="flex flex-wrap gap-1.5 mt-2.5 max-h-16 overflow-y-auto">
                            {formBenefits.map((benefit, idx) => (
                              <span 
                                key={idx} 
                                className="bg-[#153020]/5 text-[#153020] px-2 py-1 rounded border border-[#153020]/20 flex items-center space-x-1 text-[10.5px] font-medium"
                              >
                                <span>{benefit}</span>
                                <button type="button" onClick={() => removeBenefit(idx)} className="text-red-600 hover:text-red-800 font-bold ml-1">✕</button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 uppercase mb-1">
                            Cách dùng cụ thể đúng tỉ lệ
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Cho 3 túi rễ pha với 1 lít nước sôi ấm hãm sâm nấu uống..."
                            value={formUsage}
                            onChange={(e) => setFormUsage(e.target.value)}
                            className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA container buttons */}
                    <div className="flex justify-end space-x-4 border-t border-[#dfd4c0] pt-4.5 select-none font-sans">
                      <button
                        type="button"
                        onClick={() => { setIsAddingNew(false); setEditingProduct(null); }}
                        className="px-4 py-2.5 border border-[#dfd4c0] text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        HỦY BỎ
                      </button>
                      
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#153020] hover:bg-[#8f2d24] text-white rounded-lg text-xs font-bold tracking-widest flex items-center space-x-1 hover:shadow shadow-md transition-shadow cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>LƯU SẢN PHẨM</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

            {/* ====== TAB 1B: CATEGORIES LIST & EDITOR ====== */}
            {activeTab === "categories" && (
              <div className="space-y-6">
                {!isAddingCategory && !editingCategory ? (
                  /* list categories */
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#153020]">QUẢN LÝ DANH MỤC HÀNG</h3>
                        <p className="text-xs text-slate-500 font-sans">Mẹ có thể quản lý, thêm mới hay xoá bớt các nhóm danh mục thảo dược.</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsAddingCategory(true);
                          setEditingCategory(null);
                          setCatFormName("");
                          setCatFormTagline("");
                          setCatFormImage("");
                        }}
                        className="flex items-center space-x-1.5 bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow cursor-pointer transition-colors font-sans"
                      >
                        <Plus className="w-4 h-4" />
                        <span>THÊM DANH MỤC MỚI</span>
                      </button>
                    </div>

                    <div className="border border-[#e8dfcf] rounded-xl overflow-hidden font-sans">
                      <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-[#fcfaf7] border-b border-[#e8dfcf] text-[#153020] uppercase font-bold tracking-wider">
                          <tr>
                            <th className="px-4 py-3">Ảnh bìa</th>
                            <th className="px-4 py-3">Mã danh mục (ID)</th>
                            <th className="px-4 py-3">Tên danh mục</th>
                            <th className="px-4 py-3">Tagline giới thiệu</th>
                            <th className="px-4 py-3 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f2efe6] text-slate-600">
                          {categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-2.5">
                                <div className="w-12 h-12 rounded border border-slate-200 overflow-hidden bg-slate-50">
                                  <img src={cat.image} alt="" className="w-full h-full object-cover" />
                                </div>
                              </td>
                              <td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">
                                {cat.id}
                              </td>
                              <td className="px-4 py-2.5 font-bold text-[#153020] uppercase">
                                {cat.name}
                              </td>
                              <td className="px-4 py-2.5 font-medium text-slate-500 italic max-w-xs truncate font-sans">
                                {cat.tagline}
                              </td>
                              <td className="px-4 py-2.5 text-right space-x-2.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCategory(cat);
                                    setIsAddingCategory(false);
                                    setCatFormName(cat.name);
                                    setCatFormTagline(cat.tagline);
                                    setCatFormImage(cat.image);
                                  }}
                                  className="p-1 hover:bg-[#153020]/10 text-[#153020] rounded-md transition-colors inline-block cursor-pointer"
                                  title="Chỉnh sửa danh mục"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  className="p-1 hover:bg-red-50 text-red-600 rounded-md transition-colors inline-block cursor-pointer"
                                  title="Xóa danh mục"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Form edit/add category */
                  <form onSubmit={handleSaveCategory} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#e8dfcf] pb-3">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#153020]">
                        {editingCategory ? `CHỈNH SỬA DANH MỤC: ${editingCategory.name}` : "THÊM DANH MỤC MỚI"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => { setIsAddingCategory(false); setEditingCategory(null); }}
                        className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                      >
                        Huỷ bỏ
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
                      <div className="space-y-4">
                        <div>
                          <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                            Tên danh mục *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: TRÀ THẢO DƯỢC"
                            value={catFormName}
                            onChange={(e) => setCatFormName(e.target.value)}
                            className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                            Khẩu hiệu / Tagline ngắn *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Thanh lọc cơ thể, tăng cường sức khỏe"
                            value={catFormTagline}
                            onChange={(e) => setCatFormTagline(e.target.value)}
                            className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block font-semibold text-slate-700 uppercase mb-1">
                            Hình ảnh minh hoạ danh mục *
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            ref={catFileInputRef}
                            onChange={handleCatImageUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => catFileInputRef.current?.click()}
                            className="w-full py-2.5 border border-[#dfd4c0] hover:bg-[#153020] hover:text-white rounded-lg font-bold transition-all text-center cursor-pointer block"
                          >
                            Tải Ảnh Thảo Dược/Phân loại
                          </button>
                        </div>

                        <div className="border border-dashed border-[#dfd4c0] bg-slate-50 rounded-lg h-32 flex items-center justify-center p-2 overflow-hidden">
                          {catFormImage ? (
                            <img src={catFormImage} alt="" className="h-full object-contain max-w-full rounded" />
                          ) : (
                            <div className="text-slate-400 flex flex-col items-center">
                              <Image className="w-8 h-8 text-neutral-300 mb-1" />
                              <span>Chưa chọn hình ảnh</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 border-t border-[#dfd4c0] pt-4.5">
                      <button
                        type="button"
                        onClick={() => { setIsAddingCategory(false); setEditingCategory(null); }}
                        className="px-4 py-2.5 border border-[#dfd4c0] text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        HỦY BỎ
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#153020] hover:bg-[#8f2d24] text-white rounded-lg text-xs font-bold tracking-widest flex items-center space-x-1 hover:shadow shadow-md transition-shadow cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>LƯU DANH MỤC</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ====== TAB 1C: ABOUT US WRITING GENERALS ====== */}
            {activeTab === "aboutus" && (
              <form onSubmit={handleSaveAboutUs} className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#153020]">QUẢN LÝ THÔNG TIN GIỚI THIỆU (VỀ CHÚNG TÔI)</h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Nơi cho phép mẹ tùy chỉnh thay đổi các văn bản giới thiệu về câu chuyện Thảo Dược Hương Vũ trên trang chủ.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                        Tiêu đề phụ (màu đỏ nhỏ phía trên)
                      </label>
                      <input
                        type="text"
                        value={aboutSubtitle}
                        onChange={(e) => setAboutSubtitle(e.target.value)}
                        className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                        Tiêu đề chính (chữ in hoa)
                      </label>
                      <input
                        type="text"
                        value={aboutTitle}
                        onChange={(e) => setAboutTitle(e.target.value)}
                        className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                        Khẩu hiệu trích dẫn (chữ nghiêng)
                      </label>
                      <textarea
                        rows={2}
                        value={aboutQuote}
                        onChange={(e) => setAboutQuote(e.target.value)}
                        className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                        Mô tả ngắn ở đầu trang giới thiệu
                      </label>
                      <textarea
                        rows={3}
                        value={aboutDescription}
                        onChange={(e) => setAboutDescription(e.target.value)}
                        className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                          Con số thống kê (nổi bật)
                        </label>
                        <input
                          type="text"
                          value={aboutStatNumber}
                          onChange={(e) => setAboutStatNumber(e.target.value)}
                          className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] font-bold text-[#8f2d24]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                          Thống kê nhãn (nhỏ bên dưới)
                        </label>
                        <input
                          type="text"
                          value={aboutStatLabel}
                          onChange={(e) => setAboutStatLabel(e.target.value)}
                          className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                        Đoạn văn câu chuyện kể 1
                      </label>
                      <textarea
                        rows={4}
                        value={aboutParagraph1}
                        onChange={(e) => setAboutParagraph1(e.target.value)}
                        className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 tracking-wide uppercase mb-1">
                        Đoạn văn câu chuyện kể 2
                      </label>
                      <textarea
                        rows={3}
                        value={aboutParagraph2}
                        onChange={(e) => setAboutParagraph2(e.target.value)}
                        className="w-full bg-white border border-[#c4bcae] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-[#dfd4c0] pt-4.5 select-none font-sans">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#153020] hover:bg-[#8f2d24] text-white rounded-lg text-xs font-bold tracking-widest flex items-center space-x-1.5 hover:shadow shadow-md transition-all cursor-pointer uppercase font-sans"
                  >
                    <Save className="w-4 h-4" />
                    <span>LƯU TOÀN BỘ GIỚI THIỆU</span>
                  </button>
                </div>
              </form>
            )}

            {/* ====== TAB 2: INCOMING ORDERS TRACKING ====== */}
            {activeTab === "orders" && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#153020]">DANH SÁCH BÁN HÀNG - ĐƠN ĐẶT HÀNG</h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Nơi liệt kê các đơn hàng khách gửi qua form ĐẶT HÀNG NHANH để Dược sĩ liên hệ chốt đóng gói.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16 bg-[#faf8f4] border border-dashed border-[#dfd4c0] rounded-2xl max-w-md mx-auto">
                    <Receipt className="w-12 h-12 text-[#153020]/20 mx-auto mb-3" />
                    <p className="text-[#153020] font-sans font-bold text-sm">Chưa phát sinh lượt mua sắm nào</p>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-sans px-4">
                      Khi có người đặt hàng ở ngoài Landing Page, thông tin giao nhận tiền COD sẽ lập tức xuất hiện tự động tại đây!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 font-sans">
                    {orders.map((order, orderIdx) => (
                      <div 
                        key={orderIdx} 
                        className="bg-white border border-[#e8dfcf] rounded-xl hover:shadow-md transition-shadow overflow-hidden"
                      >
                        {/* Header card indicator with total price */}
                        <div className="bg-[#fcfaf7] px-5 py-3 border-b border-[#e8dfcf] flex flex-wrap justify-between items-center text-xs">
                          <div className="flex items-center space-x-2.5">
                            <span className="font-mono font-bold text-[#8f2d24] text-sm tracking-wider">
                              #{orderIdx + 1}
                            </span>
                            <span className="bg-[#153020] text-emerald-400 font-mono px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                              HÓA ĐƠN TRỰC TUYẾN
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-slate-400">{order.createdAt}</span>
                            <button
                              onClick={() => handleDeleteOrder(orderIdx)}
                              className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center space-x-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Xóa</span>
                            </button>
                          </div>
                        </div>

                        {/* Customer Information detail body */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-slate-700">
                          {/* Col 1: Customer info */}
                          <div className="md:col-span-5 space-y-2 border-r md:border-r border-slate-100 pr-4">
                            <p><span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wide">Người Nhận:</span> <strong className="text-[#153020] text-sm block mt-0.5">{order.fullName}</strong></p>
                            <p><span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wide">Số điện thoại:</span> <strong className="text-[#8f2d24] text-sm block mt-0.5">{order.phoneNumber}</strong></p>
                            <p className="leading-relaxed"><span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wide block">Địa Chỉ Giao và chốt đơn:</span> {order.address}</p>
                            {order.note && (
                              <p className="bg-amber-50 text-amber-800 p-2 rounded-lg border border-amber-200 mt-2 italic leading-relaxed text-[11px] font-medium">
                                &ldquo;{order.note}&rdquo;
                              </p>
                            )}
                          </div>

                          {/* Col 2: Products list list */}
                          <div className="md:col-span-7 space-y-4">
                            <h4 className="font-semibold text-[#153020] text-xs uppercase tracking-wider flex items-center space-x-1">
                              <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                              <span>Sản phẩm giao bọc ({order.items.length} chủng loại)</span>
                            </h4>
                            
                            <div className="space-y-1.5">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-1 border-b border-dashed border-slate-100 text-xs">
                                  <span className="text-slate-600 font-medium">{item.name} <strong className="text-slate-800 select-none">×{item.quantity}</strong></span>
                                  <span className="font-semibold text-slate-800">{formatVND(item.price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center pt-2 text-[#153020] border-t border-slate-100">
                              <strong className="text-slate-400 uppercase text-[10px] tracking-wider">Tổng vận đơn (Kiêm phí COD):</strong>
                              <strong className="text-[#8f2d24] text-base font-serif">{formatVND(order.totalAmount)}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ====== TAB 3: APPEARANCE IMAGE MANAGEMENTS ====== */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#153020]">ẢNH BÌA & BANNER TRANG CHỦ</h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Nơi cho phép bạn tùy chỉnh thay đổi hình ảnh phong cảnh ở phần Banner núi rừng Tây Bắc và cô gái Dao đỏ.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 font-sans text-xs">
                  {/* Left block thumbnail */}
                  <div className="md:col-span-7 space-y-4">
                    <h4 className="font-bold text-[#153020] uppercase tracking-wide">Xem trước banner hiện tại</h4>
                    <div className="aspect-16/9 w-full bg-[#153020] rounded-xl overflow-hidden shadow border border-[#dfd4c0] relative">
                      <img 
                        src={heroImage} 
                        alt="Ảnh bìa trang chủ hiện tại" 
                        className="w-full h-full object-cover opacity-80" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                        <span className="font-serif text-amber-400 font-bold uppercase tracking-wider text-xs md:text-sm">Thảo Dược Hương Vũ</span>
                        <span className="text-white text-[9px] md:text-[10px]">TINH TÚY NÚI RỰNG TÂY BẮC</span>
                      </div>
                    </div>
                  </div>

                  {/* Right block interaction details */}
                  <div className="md:col-span-5 space-y-5 flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="bg-[#fcfaf7] border border-[#e8dfcf] rounded-xl p-4.5 space-y-2">
                        <h5 className="font-bold text-[#153020] uppercase tracking-wide text-[11px] flex items-center">
                          <Sparkles className="w-4 h-4 text-[#8f2d24] mr-1" />
                          <span>HƯỚNG DẪN TỰ THAY ẢNH</span>
                        </h5>
                        <p className="text-[#3c493f] leading-relaxed font-sans text-[11.5px]">
                          1. Ấn vào nút <strong>BẮT ĐẦU TẢI BANNER MỚI</strong> bên dưới.<br />
                          2. Chọn tệp hình ảnh bất kỳ có độ phân giải ngang dài (Ví dụ ảnh nhóm, ảnh chân dung, ảnh dược thảo, ảnh của bạn...) từ máy tính/điện thoại.<br />
                          3. Hệ thống sẽ ngay lập tức mã hóa hình ảnh của bạn và lưu động làm hình ảnh thương hiệu Tây Bắc cho trang chủ!
                        </p>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        ref={heroFileInputRef}
                        onChange={handleHeroImageUpload}
                        className="hidden"
                      />
                      
                      <button
                        onClick={() => heroFileInputRef.current?.click()}
                        className="w-full py-4.5 bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <Image className="w-5 h-5 text-white" />
                        <span>BẮT ĐẦU TẢI BANNER MỚI</span>
                      </button>
                    </div>

                    <p className="text-[10.5px] text-slate-400 leading-relaxed text-center font-sans">
                      💡 Mẹo: Nên ưu tiên các hình ảnh có khung cảnh nằm ngang chất lượng cao để hiển thị sắc nét nhất trên cả giao diện Tablet & Máy tính bàn.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      </div>
    </div>
  );
}
