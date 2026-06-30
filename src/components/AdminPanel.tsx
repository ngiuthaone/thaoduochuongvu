import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { 
  X, Plus, Edit, Trash2, Image, Receipt, ShoppingBag, 
  Save, Undo, CheckCircle, Sparkles, Sliders, Eye, BookOpen, FolderOpen, Phone, PhoneCall, Check,
  ChevronLeft, ChevronRight, Menu, TrendingUp, BarChart2, ArrowUp, ArrowDown
} from "lucide-react";
import { Product, OrderDetails, Category, AboutUsData, ContactData, ConsultationRequest } from "../types";

type MaybePromise<T = void | boolean> = T | Promise<T>;

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: (products: Product[]) => MaybePromise;
  orders: OrderDetails[];
  setOrders: (orders: OrderDetails[]) => MaybePromise;
  heroImage: string;
  setHeroImage: (url: string) => MaybePromise;
  categories: Category[];
  setCategories: (cats: Category[]) => MaybePromise;
  aboutUsData: AboutUsData;
  setAboutUsData: (data: AboutUsData) => MaybePromise;
  contactData: ContactData;
  setContactData: (data: ContactData) => MaybePromise;
  consultations: ConsultationRequest[];
  setConsultations: (consultation: ConsultationRequest[]) => MaybePromise;
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
  contactData,
  setContactData,
  consultations,
  setConsultations,
}: AdminPanelProps) {
  if (!isOpen) return null;

  // Authentication states
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Auth Form input states
  const [inputPhone, setInputPhone] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session", {
      credentials: "same-origin",
    })
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .catch(() => {});
  }, []);

  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "categories" | "aboutus" | "orders" | "appearance" | "contact" | "consultations">("dashboard");
  const [orderStatusFilter, setOrderStatusFilter] = useState<"all" | "preparing" | "delivering" | "delivered">("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth < 768 : false;
  });
  const [consultFilter, setConsultFilter] = useState<"all" | "pending" | "called" | "cancelled">("all");
  const [dashboardTimeframe, setDashboardTimeframe] = useState<"all" | "today" | "7days" | "month">("all");
  const [dashSearchProd, setDashSearchProd] = useState("");

  const [confirmModal, setConfirmModal] = useState<{
    title?: string;
    message: string;
    description?: string;
    confirmLabel?: string;
    confirmBg?: string;
    onConfirm: () => MaybePromise;
  } | null>(null);
  const [isSavingAdminChange, setIsSavingAdminChange] = useState(false);
  
  // Product Form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Form Fields
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number | undefined>(undefined);
  const [formImage, setFormImage] = useState("");
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formDescription, setFormDescription] = useState("");
  const [formBenefits, setFormBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState("");
  const [formUsage, setFormUsage] = useState("");
  const [formBadge, setFormBadge] = useState<string>("mới");
  const [formShowOnLanding, setFormShowOnLanding] = useState<boolean>(true);

  // Categories Form states
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catFormName, setCatFormName] = useState("");
  const [catFormTagline, setCatFormTagline] = useState("");
  const [catFormImage, setCatFormImage] = useState("");
  const [catFormShowOnLanding, setCatFormShowOnLanding] = useState(true);
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

  // Contact Form states
  const [contactCompany, setContactCompany] = useState(contactData?.companyName || "");
  const [contactTagline, setContactTagline] = useState(contactData?.tagline || "");
  const [contactAddress, setContactAddress] = useState(contactData?.address || "");
  const [contactPhone, setContactPhone] = useState(contactData?.phone || "");
  const [contactEmail, setContactEmail] = useState(contactData?.email || "");
  const [contactWorkingHours, setContactWorkingHours] = useState(contactData?.workingHours || "");
  const [footerDesc, setFooterDesc] = useState(contactData?.footerDesc || "");
  const [footerCopyright, setFooterCopyright] = useState(contactData?.footerCopyright || "");
  const [commitment1Title, setCommitment1Title] = useState(contactData?.commitment1Title || "");
  const [commitment1Desc, setCommitment1Desc] = useState(contactData?.commitment1Desc || "");
  const [commitment2Title, setCommitment2Title] = useState(contactData?.commitment2Title || "");
  const [commitment2Desc, setCommitment2Desc] = useState(contactData?.commitment2Desc || "");
  const [commitment3Title, setCommitment3Title] = useState(contactData?.commitment3Title || "");
  const [commitment3Desc, setCommitment3Desc] = useState(contactData?.commitment3Desc || "");
  const [zaloLink, setZaloLink] = useState(contactData?.zaloLink || "");
  const [facebookLink, setFacebookLink] = useState(contactData?.facebookLink || "");
  const [tiktokLink, setTiktokLink] = useState(contactData?.tiktokLink || "");

  // Banner Text states
  const [bannerBadge, setBannerBadge] = useState(contactData?.bannerBadge || "");
  const [bannerSubtitle, setBannerSubtitle] = useState(contactData?.bannerSubtitle || "");
  const [bannerTitle, setBannerTitle] = useState(contactData?.bannerTitle || "");
  const [bannerTagline, setBannerTagline] = useState(contactData?.bannerTagline || "");
  const [bannerDesc, setBannerDesc] = useState(contactData?.bannerDesc || "");

  // Home Page Component States & Titles
  const [sectionProductsTitle, setSectionProductsTitle] = useState(contactData?.sectionProductsTitle || "");
  const [sectionCategoriesTitle, setSectionCategoriesTitle] = useState(contactData?.sectionCategoriesTitle || "");
  const [showCategoriesSection, setShowCategoriesSection] = useState(contactData?.showCategoriesSection !== false);
  const [showProductsSection, setShowProductsSection] = useState(contactData?.showProductsSection !== false);
  const [showAboutSection, setShowAboutSection] = useState(contactData?.showAboutSection !== false);
  const [showContactSection, setShowContactSection] = useState(contactData?.showContactSection !== false);

  // Header Text states
  const [headerHome, setHeaderHome] = useState(contactData?.headerHome || "");
  const [headerProducts, setHeaderProducts] = useState(contactData?.headerProducts || "");
  const [headerAbout, setHeaderAbout] = useState(contactData?.headerAbout || "");
  const [headerContact, setHeaderContact] = useState(contactData?.headerContact || "");
  const [headerSearch, setHeaderSearch] = useState(contactData?.headerSearch || "");

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

  // Sync Contact Form inputs on dynamic reset / update
  useEffect(() => {
    if (contactData) {
      setContactCompany(contactData.companyName);
      setContactTagline(contactData.tagline);
      setContactAddress(contactData.address);
      setContactPhone(contactData.phone);
      setContactEmail(contactData.email);
      setContactWorkingHours(contactData.workingHours);
      setFooterDesc(contactData.footerDesc || "");
      setFooterCopyright(contactData.footerCopyright || "");
      setCommitment1Title(contactData.commitment1Title || "");
      setCommitment1Desc(contactData.commitment1Desc || "");
      setCommitment2Title(contactData.commitment2Title || "");
      setCommitment2Desc(contactData.commitment2Desc || "");
      setCommitment3Title(contactData.commitment3Title || "");
      setCommitment3Desc(contactData.commitment3Desc || "");
      setZaloLink(contactData.zaloLink || "");
      setFacebookLink(contactData.facebookLink || "");
      setTiktokLink(contactData.tiktokLink || "");
      setBannerBadge(contactData.bannerBadge || "");
      setBannerSubtitle(contactData.bannerSubtitle || "");
      setBannerTitle(contactData.bannerTitle || "");
      setBannerTagline(contactData.bannerTagline || "");
      setBannerDesc(contactData.bannerDesc || "");
      setSectionProductsTitle(contactData.sectionProductsTitle || "");
      setSectionCategoriesTitle(contactData.sectionCategoriesTitle || "");
      setShowCategoriesSection(contactData.showCategoriesSection !== false);
      setShowProductsSection(contactData.showProductsSection !== false);
      setShowAboutSection(contactData.showAboutSection !== false);
      setShowContactSection(contactData.showContactSection !== false);
      setHeaderHome(contactData.headerHome || "");
      setHeaderProducts(contactData.headerProducts || "");
      setHeaderAbout(contactData.headerAbout || "");
      setHeaderContact(contactData.headerContact || "");
      setHeaderSearch(contactData.headerSearch || "");
    }
  }, [contactData]);

  // Set default category when categories load or reset
  useEffect(() => {
    if (categories.length > 0 && !formCategory) {
      setFormCategory(categories[0].id);
    }
  }, [categories]);

  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  // Safe parse for multiple hero slideshow images
  const getHeroImagesArray = (val: string): string[] => {
    try {
      if (val && val.startsWith("[")) {
        return JSON.parse(val) as string[];
      }
    } catch (_) {}
    return [val || "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=1600"];
  };

  const [heroImagesList, setHeroImagesList] = useState<string[]>(() => getHeroImagesArray(heroImage));

  // Sync state whenever parent prop changes
  useEffect(() => {
    setHeroImagesList(getHeroImagesArray(heroImage));
  }, [heroImage]);

  const formatVND = (num: number) => num.toLocaleString("vi-VN") + "đ";

  // Parse custom Vietnamese date string to Date object safely
  const parseVNDate = (dateStr: string): Date => {
    if (!dateStr) return new Date();
    // Test if standard ISO string
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
    
    try {
      // Handles: "19:55:36 19/06/2026" or "19/06/2026, 19:55:36"
      const cleanStr = dateStr.replace(",", " ").trim();
      const parts = cleanStr.split(/\s+/);
      
      const datePart = parts.find(p => p.includes("/")) || "";
      if (datePart) {
        const dParts = datePart.split("/");
        if (dParts.length === 3) {
          const day = parseInt(dParts[0], 10);
          const month = parseInt(dParts[1], 10) - 1;
          const year = parseInt(dParts[2], 10);
          
          const timePart = parts.find(p => p.includes(":")) || "";
          let hours = 0, minutes = 0, seconds = 0;
          if (timePart) {
            const tParts = timePart.split(":");
            if (tParts.length >= 2) {
              hours = parseInt(tParts[0], 10);
              minutes = parseInt(tParts[1], 10);
              if (tParts[2]) {
                seconds = parseInt(tParts[2], 10);
              }
            }
          }
          return new Date(year, month, day, hours, minutes, seconds);
        }
      }
    } catch (e) {
      console.error("Error parsing VN date:", dateStr, e);
    }
    return new Date(); // fallback
  };

  // Trigger File Upload for product image
  const handleProductImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const promises = Array.from(files).map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              resolve("");
            }
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((results) => {
        const validResults = results.filter(Boolean);
        if (validResults.length > 0) {
          setFormImages((prev) => {
            const updated = [...prev, ...validResults];
            if (!formImage && updated.length > 0) {
              setFormImage(updated[0]);
            }
            return updated;
          });
          showToast(`Đã tải lên thành công ${validResults.length} hình ảnh mới!`);
        }
      });
    }
  };

  // Slideshow action functions
  const handleAddHeroImage = (base64Img: string) => {
    // If the existing list only contains a placeholder, replace it or append
    const newList = [...heroImagesList, base64Img];
    void persistAdminChange(
      () => setHeroImage(JSON.stringify(newList)),
      "Đã tải thêm ảnh bìa vào danh sách slideshow thành công!"
    );
  };

  const handleDeleteHeroImage = (index: number) => {
    if (heroImagesList.length <= 1) {
      showToast("Không thể xóa ảnh cuối cùng, trang chủ cần có ít nhất 1 ảnh bìa!");
      return;
    }
    const newList = heroImagesList.filter((_, idx) => idx !== index);
    void persistAdminChange(
      () => setHeroImage(JSON.stringify(newList)),
      "Đã xóa ảnh khỏi danh sách slideshow!"
    );
  };

  const handleMoveHeroImage = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === heroImagesList.length - 1) return;
    
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const newList = [...heroImagesList];
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    
    void persistAdminChange(
      () => setHeroImage(JSON.stringify(newList)),
      "Đã đổi thứ tự ảnh bìa thành công!"
    );
  };

  // Trigger File Upload for Hero Image
  const handleHeroImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          handleAddHeroImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const persistAdminChange = async (action: () => MaybePromise, successMessage: string) => {
    if (isSavingAdminChange) return false;
    setIsSavingAdminChange(true);
    try {
      await action();
      showToast(successMessage);
      return true;
    } catch (error) {
      console.error("Không thể lưu thay đổi quản trị:", error);
      return false;
    } finally {
      setIsSavingAdminChange(false);
    }
  };

  const handleLoginAdmin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);
    const cleanedPhone = inputPhone.trim();
    const cleanedPin = inputPin.trim();

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ phone: cleanedPhone, pin: cleanedPin }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      setIsAuthenticated(true);
      setAuthError("");
      setInputPhone("");
      setInputPin("");
      showToast("Đăng nhập thành công!");
    } catch (_) {
      setAuthError("Số điện thoại hoặc mã PIN đăng nhập không chính xác!");
    } finally {
      setIsLoggingIn(false);
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
    setFormImages(product.images || (product.image ? [product.image] : []));
    setFormDescription(product.description || "");
    setFormBenefits(product.benefits || []);
    setFormUsage(product.usage || "");
    setFormBadge(product.badge || (product.isNew ? "mới" : "không hiện"));
    setFormShowOnLanding(product.showOnLanding !== false);
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
    setFormImages([]);
    setFormDescription("");
    setFormBenefits(["Bồi bổ gan thận khí huyết", "Tăng cường miễn dịch tự nhiên"]);
    setFormUsage("Hãm trà nóng hoặc sắc nước uống hàng ngày.");
    setFormBadge("mới");
    setFormShowOnLanding(true);
  };

  // Save product details
  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    const finalImages = formImages.filter(Boolean);
    const primaryImage = finalImages[0] || formImage;

    if (!formName.trim() || formPrice < 0 || !primaryImage) {
      alert("Vui lòng điền đầy đủ tiêu đề, giá bán từ 0 trở lên và chọn ít nhất một hình ảnh!");
      return;
    }

    const payload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formName.trim(),
      category: formCategory,
      price: Number(formPrice),
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
      rating: 0,
      reviewsCount: 0,
      image: primaryImage,
      images: finalImages.length > 0 ? finalImages : [primaryImage],
      description: formDescription.trim(),
      benefits: formBenefits.length > 0 ? formBenefits : ["Nâng cao thể lực"],
      usage: formUsage.trim() || "Thưởng thức hàng ngày tốt cho sức khỏe.",
      isNew: formBadge === "mới",
      badge: formBadge,
      showOnLanding: formShowOnLanding,
    };

    const nextProducts = editingProduct
      ? products.map((p) => (p.id === editingProduct.id ? payload : p))
      : [payload, ...products];
    const saved = await persistAdminChange(
      () => setProducts(nextProducts),
      editingProduct ? "Đã cập nhật sản phẩm thành công!" : "Đã thêm mới sản phẩm thành công!"
    );

    if (saved) {
      setIsAddingNew(false);
      setEditingProduct(null);
    }
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    setConfirmModal({
      title: "Xác nhận xóa sản phẩm",
      message: "Bạn có chắc chắn muốn xóa sản phẩm thảo dược này khỏi menu cửa hàng?",
      description: "Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi danh sách hiển thị và không thể hoàn tác.",
      confirmLabel: "Xác nhận xóa",
      onConfirm: () => persistAdminChange(
        () => setProducts(products.filter((p) => p.id !== id)),
        "Đã xóa sản phẩm thành công!"
      )
    });
  };

  // Delete order
  const handleDeleteOrder = (orderToDelete: OrderDetails) => {
    setConfirmModal({
      title: "Xác nhận xóa đơn hàng",
      message: "Bạn muốn xóa thông tin hóa đơn lưu trữ này?",
      description: "Mọi thông tin chi tiết của đơn hàng này sẽ biến mất khỏi nhật ký.",
      confirmLabel: "Xác nhận xóa",
      onConfirm: () => persistAdminChange(
        () => setOrders(orders.filter(o => 
          !(o.createdAt === orderToDelete.createdAt && 
            o.fullName === orderToDelete.fullName && 
            o.phoneNumber === orderToDelete.phoneNumber)
        )),
        "Đã xóa đơn hàng lưu vết!"
      )
    });
  };

  // Update order status
  const handleUpdateOrderStatus = (orderToUpdate: OrderDetails, status: "preparing" | "delivering" | "delivered") => {
    const updated = orders.map(o => {
      if (o.createdAt === orderToUpdate.createdAt && 
          o.fullName === orderToUpdate.fullName && 
          o.phoneNumber === orderToUpdate.phoneNumber) {
        return { ...o, status };
      }
      return o;
    });
    void persistAdminChange(
      () => setOrders(updated),
      `Đã cập nhật trạng thái đơn hàng thành: ${
        status === "preparing" ? "Đang chuẩn bị" : status === "delivering" ? "Đang giao hàng" : "Đã giao hàng"
      }`
    );
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

  const handleSaveCategory = async (e: FormEvent) => {
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
      showOnLanding: catFormShowOnLanding,
    };

    const nextCategories = editingCategory
      ? categories.map((c) => (c.id === editingCategory.id ? payload : c))
      : [...categories, payload];
    const saved = await persistAdminChange(
      () => setCategories(nextCategories),
      editingCategory ? "Đã cập nhật danh mục thành công!" : "Đã thêm mới danh mục thành công!"
    );

    if (saved) {
      setIsAddingCategory(false);
      setEditingCategory(null);
      setCatFormName("");
      setCatFormTagline("");
      setCatFormImage("");
      setCatFormShowOnLanding(true);
    }
  };

  const handleDeleteCategory = (id: string) => {
    // Check if there are any products under this category
    const hasProducts = products.some((p) => p.category === id);
    if (hasProducts) {
      setConfirmModal({
        title: "Cảnh báo chứa sản phẩm",
        message: "Danh mục này đang chứa một số sản phẩm đang được bán. Nếu xóa, các sản phẩm thuộc danh mục sẽ không hiển thị trên bộ lọc. Bạn vẫn muốn xóa chứ?",
        description: "Các sản phẩm không bị xóa nhưng sẽ mất liên kết danh mục hiển thị.",
        confirmLabel: "Xác nhận xóa",
        onConfirm: () => persistAdminChange(
          () => setCategories(categories.filter((c) => c.id !== id)),
          "Đã xóa danh mục thành công!"
        )
      });
    } else {
      setConfirmModal({
        title: "Xác nhận xóa danh mục",
        message: "Bạn có chắc chắn muốn xóa danh mục phân loại này không?",
        confirmLabel: "Xác nhận xóa",
        onConfirm: () => persistAdminChange(
          () => setCategories(categories.filter((c) => c.id !== id)),
          "Đã xóa danh mục thành công!"
        )
      });
    }
  };

  // About Us Form Handler
  const handleSaveAboutUs = async (e: FormEvent) => {
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
    await persistAdminChange(
      () => setAboutUsData(payload),
      "Đã lưu đổi mới thông tin Giới thiệu thành công!"
    );
  };

  // Contact Form Handler
  const handleSaveContact = async (e: FormEvent) => {
    e.preventDefault();
    const payload: ContactData = {
      companyName: contactCompany.trim(),
      tagline: contactTagline.trim(),
      address: contactAddress.trim(),
      phone: contactPhone.trim(),
      email: contactEmail.trim(),
      workingHours: contactWorkingHours.trim(),
      footerDesc: footerDesc.trim(),
      footerCopyright: footerCopyright.trim(),
      commitment1Title: commitment1Title.trim(),
      commitment1Desc: commitment1Desc.trim(),
      commitment2Title: commitment2Title.trim(),
      commitment2Desc: commitment2Desc.trim(),
      commitment3Title: commitment3Title.trim(),
      commitment3Desc: commitment3Desc.trim(),
      zaloLink: zaloLink.trim(),
      facebookLink: facebookLink.trim(),
      tiktokLink: tiktokLink.trim(),
      bannerBadge: bannerBadge.trim(),
      bannerSubtitle: bannerSubtitle.trim(),
      bannerTitle: bannerTitle.trim(),
      bannerTagline: bannerTagline.trim(),
      bannerDesc: bannerDesc.trim(),
      headerHome: headerHome.trim(),
      headerProducts: headerProducts.trim(),
      headerAbout: headerAbout.trim(),
      headerContact: headerContact.trim(),
      headerSearch: headerSearch.trim(),
      sectionProductsTitle: sectionProductsTitle.trim(),
      sectionCategoriesTitle: sectionCategoriesTitle.trim(),
      showCategoriesSection,
      showProductsSection,
      showAboutSection,
      showContactSection,
    };
    await persistAdminChange(
      () => setContactData(payload),
      "Đã lưu đổi mới thông tin Liên hệ & Thương hiệu thành công!"
    );
  };

  const handleUpdateConsultStatus = (id: string, status: "pending" | "called" | "cancelled") => {
    const updated = consultations.map(c => c.id === id ? { ...c, status } : c);
    void persistAdminChange(
      () => setConsultations(updated),
      "Đã cập nhật trạng thái yêu cầu tư vấn thành công!"
    );
  };

  const handleDeleteConsultation = (id: string) => {
    const target = consultations.find(c => c.id === id);
    if (!target) return;

    if (target.status !== "cancelled") {
      setConfirmModal({
        title: "Hủy yêu cầu tư vấn",
        message: "Bạn có chắc chắn muốn hủy yêu cầu tư vấn này không?",
        description: "Yêu cầu sẽ được đưa vào mục 'Đã hủy' thay vì xóa vĩnh viễn khỏi danh sách.",
        confirmLabel: "Xác nhận hủy",
        onConfirm: () => {
          const updated = consultations.map(c => c.id === id ? { ...c, status: "cancelled" as const } : c);
          return persistAdminChange(
            () => setConsultations(updated),
            "Đã chuyển yêu cầu tư vấn vào danh sách 'Đã hủy' thành công!"
          );
        }
      });
    } else {
      setConfirmModal({
        title: "Xóa vĩnh viễn yêu cầu",
        message: "Yêu cầu này đã bị hủy. Bạn có muốn xóa vĩnh viễn nó khỏi dữ liệu hệ thống?",
        description: "Hành động này không thể hoàn tác, hồ sơ yêu cầu sẽ biến mất hoàn toàn.",
        confirmLabel: "Xóa vĩnh viễn",
        onConfirm: () => {
          const updated = consultations.filter(c => c.id !== id);
          return persistAdminChange(
            () => setConsultations(updated),
            "Đã xóa vĩnh viễn yêu cầu tư vấn thành công!"
          );
        }
      });
    }
  };

  // Restore defaults
  const handleRestoreDefaults = () => {
    setConfirmModal({
      title: "Khôi phục dữ liệu gốc",
      message: "Hành động này sẽ tải lại danh sách sản phẩm, các danh mục, trang giới thiệu và ảnh bìa mặc định ban đầu cho toàn bộ website. Bạn đồng ý chứ?",
      description: "Tất cả thay đổi hiện tại sẽ bị xóa khỏi dữ liệu chung và mọi khách hàng sẽ thấy dữ liệu gốc sau khi đồng bộ.",
      confirmLabel: "Đồng ý khôi phục",
      onConfirm: () => {
        return fetch("/api/reset", {
          method: "POST",
          credentials: "same-origin",
        })
          .then((res) => {
            if (res.status === 401) throw new Error("Phiên quản trị đã hết hạn. Vui lòng đăng nhập lại.");
            if (!res.ok) throw new Error("Không thể khôi phục dữ liệu gốc");
            return res.json();
          })
          .then((result) => {
            if (result.data) {
              setProducts(result.data.products);
              setCategories(result.data.categories);
              setAboutUsData(result.data.aboutUs);
              setHeroImage(result.data.heroImage);
              setContactData(result.data.contact);
              setConsultations(result.data.consultations || []);
              setOrders(result.data.orders || []);
            }
            showToast("Đã khôi phục dữ liệu gốc cho toàn bộ website!");
          })
          .catch((error) => {
            console.error("Restore default data failed:", error);
            alert(error.message || "Không thể khôi phục dữ liệu gốc. Vui lòng thử lại.");
            return false;
          });
      }
    });
  };

  const handleClose = () => {
    if (isAuthenticated) {
      void fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    }
    setIsAuthenticated(false);
    onClose();
  };

  // --- DASHBOARD DATA COMPUTATION ---
  const now = new Date();
  
  // Filter orders depending on dashboardTimeframe helper
  const filteredOrders = orders.filter(order => {
    if (dashboardTimeframe === "all") return true;
    
    const orderDate = parseVNDate(order.createdAt);
    const diffTime = Math.abs(now.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (dashboardTimeframe === "today") {
      return (
        orderDate.getDate() === now.getDate() &&
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }
    if (dashboardTimeframe === "7days") {
      return diffDays <= 7;
    }
    if (dashboardTimeframe === "month") {
      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }
    return true;
  });

  // Statistics calculation
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const ordersCount = filteredOrders.length;
  const averageOrderValue = ordersCount > 0 ? Math.round(totalRevenue / ordersCount) : 0;
  
  // Count total consultation requests
  const totalConsultsFilter = consultations.filter(c => {
    if (dashboardTimeframe === "all") return true;
    const cDate = parseVNDate(c.createdAt);
    const diffTime = Math.abs(now.getTime() - cDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (dashboardTimeframe === "today") {
      return (
        cDate.getDate() === now.getDate() &&
        cDate.getMonth() === now.getMonth() &&
        cDate.getFullYear() === now.getFullYear()
      );
    }
    if (dashboardTimeframe === "7days") {
      return diffDays <= 7;
    }
    if (dashboardTimeframe === "month") {
      return (
        cDate.getMonth() === now.getMonth() &&
        cDate.getFullYear() === now.getFullYear()
      );
    }
    return true;
  });

  const totalConsultsCount = totalConsultsFilter.length;
  const pendingConsultsCount = totalConsultsFilter.filter(c => c.status === "pending" || !c.status).length;
  const calledConsultsCount = totalConsultsFilter.filter(c => c.status === "called").length;

  // Product leaderboard logic
  const productSalesMap: Record<string, { name: string; category: string; quantity: number; revenue: number }> = {};
  
  filteredOrders.forEach(order => {
    order.items.forEach(item => {
      const key = item.productId || item.name;
      if (!productSalesMap[key]) {
        // Find matching master product to get category
        const masterProd = products.find(p => p.id === item.productId || p.name === item.name);
        productSalesMap[key] = {
          name: item.name,
          category: masterProd?.category || "Khác",
          quantity: 0,
          revenue: 0
        };
      }
      productSalesMap[key].quantity += item.quantity;
      productSalesMap[key].revenue += (item.price * item.quantity);
    });
  });

  const productSalesList = Object.values(productSalesMap)
    .sort((a, b) => b.revenue - a.revenue);

  const totalUnitsSold = productSalesList.reduce((sum, item) => sum + item.quantity, 0);

  // Group sales by Category for percentage distribution
  const categorySalesMap: Record<string, number> = {};
  productSalesList.forEach(item => {
    categorySalesMap[item.category] = (categorySalesMap[item.category] || 0) + item.revenue;
  });

  // Build dynamic revenue timeline values for the standard bar graph
  // Let's create an array of the last 7 periods
  const timelineData: { label: string; amount: number; count: number }[] = [];
  
  if (dashboardTimeframe === "today") {
    // Show hourly slots for today
    for (let h = 8; h <= 22; h += 2) {
      const slotLabel = `${h}h - ${h+2}h`;
      let slotRev = 0;
      let slotCnt = 0;
      filteredOrders.forEach(order => {
        const date = parseVNDate(order.createdAt);
        const hr = date.getHours();
        if (hr >= h && hr < h + 2) {
          slotRev += order.totalAmount;
          slotCnt++;
        }
      });
      timelineData.push({ label: slotLabel, amount: slotRev, count: slotCnt });
    }
  } else if (dashboardTimeframe === "7days") {
    // Last 7 days listing
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      let dayRev = 0;
      let dayCnt = 0;
      orders.forEach(order => {
        const oDate = parseVNDate(order.createdAt);
        if (
          oDate.getDate() === d.getDate() &&
          oDate.getMonth() === d.getMonth() &&
          oDate.getFullYear() === d.getFullYear()
        ) {
          dayRev += order.totalAmount;
          dayCnt++;
        }
      });
      timelineData.push({ label, amount: dayRev, count: dayCnt });
    }
  } else if (dashboardTimeframe === "month") {
    // Split the month into 4 weeks
    for (let w = 1; w <= 4; w++) {
      const label = `Tuần ${w}`;
      let wkRev = 0;
      let wkCnt = 0;
      orders.forEach(order => {
        const oDate = parseVNDate(order.createdAt);
        const dayOfMonth = oDate.getDate();
        if (
          oDate.getMonth() === now.getMonth() &&
          oDate.getFullYear() === now.getFullYear()
        ) {
          if (
            (w === 1 && dayOfMonth <= 7) ||
            (w === 2 && dayOfMonth > 7 && dayOfMonth <= 14) ||
            (w === 3 && dayOfMonth > 14 && dayOfMonth <= 21) ||
            (w === 4 && dayOfMonth > 21)
          ) {
            wkRev += order.totalAmount;
            wkCnt++;
          }
        }
      });
      timelineData.push({ label, amount: wkRev, count: wkCnt });
    }
  } else {
    // Group by month for "All Time"
    // Show last 6 months
    for (let m = 5; m >= 0; m--) {
      const tempDate = new Date();
      tempDate.setMonth(now.getMonth() - m);
      const keyMonth = tempDate.getMonth();
      const keyYear = tempDate.getFullYear();
      const label = `T${keyMonth + 1}/${keyYear.toString().slice(-2)}`;
      
      let mRev = 0;
      let mCnt = 0;
      orders.forEach(order => {
        const oDate = parseVNDate(order.createdAt);
        if (oDate.getMonth() === keyMonth && oDate.getFullYear() === keyYear) {
          mRev += order.totalAmount;
          mCnt++;
        }
      });
      timelineData.push({ label, amount: mRev, count: mCnt });
    }
  }

  const maxTimelineAmount = Math.max(...timelineData.map(d => d.amount), 100000);

  // Best-selling category and product for AI tips
  const topCategory = Object.entries(categorySalesMap)
    .sort((a,b) => b[1] - a[1])[0]?.[0] || "Chưa có";
  const topProduct = productSalesList[0];

  // Filter tab orders depending on selected filter (all, preparing, delivering, delivered)
  const tabOrdersFiltered = orders.filter(o => {
    const status = o.status || "preparing";
    if (orderStatusFilter === "all") return true;
    return status === orderStatusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-stretch">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Admin Panel container slide-right */}
      <div className="relative w-full max-w-5xl bg-[#faf8f4] border-l border-[#dfd4c0] flex flex-col h-dvh sm:h-full ml-auto shadow-2xl z-10 animate-fade-in text-slate-800">
        
        {/* Header Block */}
        <div className="px-3 sm:px-5 py-3 sm:py-4 bg-[#153020] text-white flex items-center justify-between shadow-md gap-3">
          <div className="flex items-center space-x-2.5 min-w-0">
            {isAuthenticated && (
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg bg-white/10 hover:bg-[#d4af37]/20 border border-white/15 hover:border-[#d4af37]/40 text-white cursor-pointer transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold tracking-wide"
                title={isSidebarCollapsed ? "Mở rộng danh mục quản lý" : "Ẩn danh mục quản lý để chỉnh sửa rộng hơn"}
              >
                {isSidebarCollapsed ? (
                  <>
                    <Menu className="w-4 h-4 text-[#d4af37] animate-pulse" />
                    <span className="hidden sm:inline text-[#d4af37]">Mở Menu</span>
                  </>
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Ẩn Menu</span>
                  </>
                )}
              </button>
            )}
            <div className="p-2 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-lg hidden xs:block">
              <Sliders className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif text-xs sm:text-base font-bold tracking-wide truncate">BẢNG QUẢN TRỊ TRANG WEB</h2>
              <p className="text-[9px] sm:text-[10px] text-slate-300 font-sans tracking-widest uppercase">Thảo Dược Hương Vũ</p>
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
          <div className="mx-3 sm:mx-6 mt-3 sm:mt-4 bg-emerald-600 border border-emerald-500 text-white font-sans text-xs px-4 py-3 rounded-lg flex items-center space-x-2.5 shadow-lg animate-bounce">
            <CheckCircle className="w-4 h-4 text-white" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Central columns */}
        {!isAuthenticated ? (
          /* Beautiful Offline Admin Auth Gate */
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-12 bg-[#faf8f4] overflow-y-auto text-slate-800">
            <div className="w-full max-w-md bg-white border border-[#e8dfcf] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl flex flex-col space-y-5 sm:space-y-6 relative overflow-hidden">
              {/* Trang trí góc mang đậm phong cách thảo mộc */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#153020]/5 rounded-bl-full pointer-events-none" />
              
              {/* Biểu tượng ổ khóa thảo dược */}
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="w-16 h-16 rounded-full bg-[#153020]/10 flex items-center justify-center border border-[#153020]/20">
                  <span className="text-3xl">🔑</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#153020] tracking-wide uppercase mt-2">
                  XÁC THỰC QUẢN TRỊ VIÊN
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Trang đăng nhập riêng của quản trị viên. Thông tin đăng nhập được kiểm tra trên server.
                </p>
              </div>

              {/* Thông báo lỗi nếu có */}
              {authError && (
                <div className="px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-sans font-medium">
                  ⚠️ {authError}
                </div>
              )}

              {/* Form xử lý */}
              <form onSubmit={handleLoginAdmin} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Tài khoản đăng nhập *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Tài khoản đăng nhập"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Nhập mật khẩu đăng nhập *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Mã PIN/Mật khẩu"
                    value={inputPin}
                    onChange={(e) => setInputPin(e.target.value)}
                    className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-[#153020] hover:bg-[#8f2d24] disabled:opacity-70 disabled:cursor-wait text-white text-xs font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-md select-none mt-2 flex items-center justify-center space-x-1 uppercase"
                >
                  <span>{isLoggingIn ? "Đang kiểm tra..." : "Đăng nhập bảng quản trị"}</span>
                </button>
              </form>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed font-sans pt-2">
                Thông tin quản trị không hiển thị trên trang bán hàng dành cho khách.
              </p>
            </div>
          </div>
        ) : (
          /* Central columns */
          <div className="flex-1 flex overflow-hidden min-w-0">
          
          {/* Internal Sidebar tabs */}
          <div className={`transition-all duration-300 ease-in-out shrink-0 flex flex-col justify-between z-30 
            ${isSidebarCollapsed 
              ? "w-0 p-0 overflow-hidden border-r-0 opacity-0 pointer-events-none" 
              : "w-[min(86vw,16rem)] md:w-52 p-4 border-r border-[#dfd4c0] opacity-100"
            } 
            absolute md:relative left-0 top-0 bottom-0 h-full shadow-2xl md:shadow-none bg-[#f2ede4]/95 backdrop-blur-md md:bg-[#f2ede4]`
          }>
            <div className="space-y-1.5 font-sans">
              {/* Nút đóng nhanh menu trái chỉ hiển thị trên di động/màn hình nhỏ */}
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="w-full md:hidden flex items-center justify-between px-3 py-2 bg-[#8f2d24] hover:bg-[#aa392e] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer mb-3 shadow-sm"
              >
                <span>❌ Đóng Menu Trái</span>
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

               <button
                onClick={() => { 
                  setActiveTab("dashboard"); 
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "dashboard"
                    ? "bg-[#153020] text-white shadow-md font-extrabold"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#d4af37]" />
                <span className="flex-1">Báo Cáo Doanh Thu</span>
                <span className="bg-[#8f2d24] text-white text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">HOT</span>
              </button>

              <button
                onClick={() => { 
                  setActiveTab("products"); 
                  setIsAddingNew(false); 
                  setEditingProduct(null); 
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
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
                onClick={() => { 
                  setActiveTab("categories"); 
                  setIsAddingCategory(false); 
                  setEditingCategory(null); 
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
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
                onClick={() => { 
                  setActiveTab("aboutus");
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
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
                onClick={() => { 
                  setActiveTab("orders");
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
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
                onClick={() => { 
                  setActiveTab("appearance");
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "appearance"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Ảnh Giao Diện</span>
              </button>

              <button
                onClick={() => { 
                  setActiveTab("contact");
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "contact"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Liên Hệ & Brand</span>
              </button>

              <button
                onClick={() => { 
                  setActiveTab("consultations");
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setIsSidebarCollapsed(true);
                  }
                }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === "consultations"
                    ? "bg-[#153020] text-white shadow-md"
                    : "text-[#153020] hover:bg-[#e6decb]"
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Yêu cầu tư vấn ({consultations ? consultations.length : 0})</span>
              </button>
            </div>

            <div className="space-y-2 mt-4">
              <button
                onClick={handleRestoreDefaults}
                className="w-full flex items-center justify-center space-x-1 py-1.5 border border-[#8f2d24] text-[#8f2d24] hover:bg-[#8f2d24] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer font-sans"
              >
                <Undo className="w-3 h-3" />
                <span>Khôi phục gốc</span>
              </button>
            </div>
          </div>

          {/* Central Main Content area */}
          <div className="flex-1 min-w-0 overflow-y-auto p-3 sm:p-6 bg-white relative">
            {isSidebarCollapsed && (
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-[#153020]/5 border border-[#153020]/20 px-3.5 py-2.5 rounded-xl text-slate-700 font-sans text-xs shadow-sm animate-fade-in">
                <span className="flex items-center gap-1.5 font-sans leading-relaxed">
                  ✨ Bạn đang xem ở chế độ <strong>Toàn màn hình</strong> để chỉnh sửa rộng rãi.
                </span>
                <button 
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="bg-[#153020] text-white hover:bg-[#8f2d24] hover:shadow-md transition-all duration-300 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase cursor-pointer active:scale-95"
                >
                  Hiện Menu
                </button>
              </div>
            )}
            
            {/* ====== TAB 0: REVENUE & ANALYTICS DASHBOARD ====== */}
            {activeTab === "dashboard" && (
              <div className="space-y-6 animate-fade-in text-slate-700">
                {/* Dashboard Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#dfd4c0]/50 pb-5">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#153020] uppercase tracking-wide flex items-center gap-2">
                       <TrendingUp className="w-6 h-6 text-[#d4af37]" />
                       Báo Cáo Doanh Thu & Chỉ Số Kinh Doanh
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Thống kê doanh số bán ra, doanh thu, cơ cấu sản phẩm và hiệu suất tư vấn chăm sóc khách hàng của bạn.
                    </p>
                  </div>
                  
                  {/* Timeframe selector controls */}
                  <div className="flex items-center gap-1.5 bg-[#f2ede4] p-1 rounded-xl border border-[#dfd4c0]/70 shrink-0 font-sans">
                    <button
                      onClick={() => setDashboardTimeframe("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        dashboardTimeframe === "all"
                          ? "bg-[#153020] text-white shadow-sm"
                          : "text-[#153020] hover:bg-[#e6decb]"
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setDashboardTimeframe("today")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        dashboardTimeframe === "today"
                          ? "bg-[#153020] text-white shadow-sm"
                          : "text-[#153020] hover:bg-[#e6decb]"
                      }`}
                    >
                      Hôm nay
                    </button>
                    <button
                      onClick={() => setDashboardTimeframe("7days")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        dashboardTimeframe === "7days"
                          ? "bg-[#153020] text-white shadow-sm"
                          : "text-[#153020] hover:bg-[#e6decb]"
                      }`}
                    >
                      7 ngày qua
                    </button>
                    <button
                      onClick={() => setDashboardTimeframe("month")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        dashboardTimeframe === "month"
                          ? "bg-[#153020] text-white shadow-sm"
                          : "text-[#153020] hover:bg-[#e6decb]"
                      }`}
                    >
                      Tháng này
                    </button>
                  </div>
                </div>

                {/* Local Date Filter processing */}
                <div className="space-y-6">
                  {/* Grid Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* CARD 1: REVENUE */}
                    <div className="bg-gradient-to-br from-[#153020] to-[#1d412c] p-5 rounded-2xl text-white shadow-md relative overflow-hidden select-none">
                      <div className="absolute right-3 bottom-0 translate-y-3 opacity-10">
                        <TrendingUp className="w-24 h-24 text-white" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-yellow-400 font-sans tracking-widest block mb-1">
                        Tổng Doanh Thu ({dashboardTimeframe === "all" ? "Tất Cả" : dashboardTimeframe === "today" ? "Hôm nay" : dashboardTimeframe === "7days" ? "7 ngày" : "Tháng này"})
                      </span>
                      <h4 className="text-2xl font-serif font-extrabold tracking-tight">
                        {formatVND(totalRevenue)}
                      </h4>
                      <div className="h-px bg-white/10 my-3" />
                      <span className="text-[11px] text-slate-300 font-sans block">
                        Thu về từ <strong className="text-yellow-300 font-mono text-xs">{ordersCount}</strong> đơn đặt hàng thành công.
                      </span>
                    </div>

                    {/* CARD 2: ORDERS COUNT */}
                    <div className="bg-white border border-[#dfd4c0] p-5 rounded-2xl shadow-sm relative overflow-hidden select-none">
                      <div className="absolute right-3 bottom-0 translate-y-3 opacity-5 text-[#8f2d24]">
                        <Receipt className="w-24 h-24" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#8f2d24] font-sans tracking-widest block mb-1">
                        Đơn Đặt Hàng Mới
                      </span>
                      <h4 className="text-2xl font-sans font-extrabold text-slate-800 tracking-tight">
                        {ordersCount} <span className="text-xs font-normal text-slate-400">Đơn hàng</span>
                      </h4>
                      <div className="h-px bg-[#dfd4c0]/50 my-3" />
                      <span className="text-[11px] text-slate-500 font-sans block">
                        Đã bán ra được <strong className="text-slate-800 font-mono text-xs">{totalUnitsSold}</strong> đơn vị thảo dược.
                      </span>
                    </div>

                    {/* CARD 3: AVERAGE VALUE */}
                    <div className="bg-white border border-[#dfd4c0] p-5 rounded-2xl shadow-sm relative overflow-hidden select-none">
                      <div className="absolute right-3 bottom-0 translate-y-3 opacity-5 text-[#153020]">
                        <ShoppingBag className="w-24 h-24" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#153020] font-sans tracking-widest block mb-1">
                        Giá trị đơn trung bình
                      </span>
                      <h4 className="text-2xl font-sans font-extrabold text-[#153020] tracking-tight">
                        {formatVND(averageOrderValue)}
                      </h4>
                      <div className="h-px bg-[#dfd4c0]/50 my-3" />
                      <span className="text-[11px] text-slate-500 font-sans block">
                        Hiệu suất giỏ hàng ở mức <strong className="text-slate-800 font-sans text-xs">tốt</strong> & ổn định.
                      </span>
                    </div>

                    {/* CARD 4: CONSULTATIONS STATUS */}
                    <div className="bg-white border border-[#dfd4c0] p-5 rounded-2xl shadow-sm relative overflow-hidden select-none">
                      <div className="absolute right-3 bottom-0 translate-y-3 opacity-5 text-amber-600">
                        <PhoneCall className="w-24 h-24" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 font-sans tracking-widest block mb-1">
                        Tổng yêu cầu tư vấn
                      </span>
                      <h4 className="text-2xl font-sans font-extrabold text-slate-800 tracking-tight">
                        {totalConsultsCount} <span className="text-xs font-normal text-slate-400">Yêu cầu</span>
                      </h4>
                      <div className="h-px bg-[#dfd4c0]/50 my-3" />
                      <span className="text-[11px] text-slate-500 font-sans block flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-0.5 bg-yellow-50 text-amber-700 px-1 py-0.5 rounded font-bold text-[9px] border border-amber-200">
                          Chưa gọi: {pendingConsultsCount}
                        </span>
                        <span className="inline-flex items-center gap-0.5 bg-emerald-55 text-emerald-700 px-1 py-0.5 rounded font-bold text-[9px] border border-emerald-100">
                          Đã gọi: {calledConsultsCount}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Main Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* CHART COLUMN 1 & 2: Sales over time bar chart */}
                    <div className="lg:col-span-2 bg-[#fbf9f5] border border-[#dfd4c0] rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between font-sans">
                        <div>
                           <h4 className="font-serif text-sm font-bold text-[#153020] uppercase">Biểu Đồ Doanh Thu Qua Các Kỳ</h4>
                           <p className="text-[11px] text-slate-400">Trực quan hóa luồng tài chính & doanh số thu về theo thời gian.</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-[#153020] bg-[#dfd4c0]/30 px-2.5 py-1 rounded-full border border-[#dfd4c0]/70">
                          <BarChart2 className="w-3.5 h-3.5 text-[#153020]" />
                          Đơn vị: VNĐ
                        </span>
                      </div>

                      {/* SVG / Pure Tailwind Responsive interactive chart */}
                      <div className="h-64 flex flex-col justify-between pt-4 select-none">
                        <div className="flex-1 flex items-end gap-3 md:gap-5 px-2 relative border-b border-[#dfd4c0]/60 pb-1">
                          {/* Y-Axis Grid line triggers */}
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[8px] font-mono text-slate-300">
                            <div className="border-b border-dashed border-slate-200/50 w-full pt-1" />
                            <div className="border-b border-dashed border-slate-200/50 w-full" />
                            <div className="border-b border-dashed border-slate-200/50 w-full" />
                            <div className="w-full" />
                          </div>

                          {timelineData.map((data, index) => {
                            const barPercent = data.amount > 0 ? (data.amount / maxTimelineAmount) * 100 : 3;
                            return (
                              <div key={index} className="flex-1 flex flex-col items-center group relative z-10">
                                {/* Tooltip value */}
                                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-250 bg-[#153020] text-white text-[9px] font-bold px-3 py-2 rounded-lg shadow-md border border-yellow-400/25 whitespace-nowrap text-center">
                                  <p className="font-sans text-[8px] text-yellow-300 uppercase">Kỳ: {data.label}</p>
                                  <p className="font-mono text-xs font-bold">{formatVND(data.amount)}</p>
                                  <p className="text-[8px] text-slate-300 font-sans mt-0.5">Sản lượng: {data.count} đơn</p>
                                </div>

                                {/* Bar graphical item */}
                                <div 
                                  className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 relative cursor-pointer ${
                                    data.amount > 0 
                                      ? "bg-gradient-to-t from-[#153020] to-[#8f2d24] hover:shadow-lg group-hover:scale-105 group-hover:brightness-110" 
                                      : "bg-slate-200/60"
                                  }`}
                                  style={{ height: `${barPercent}%`, minHeight: "8px" }}
                                />
                                {/* Label */}
                                <span className="text-[10px] font-semibold text-slate-500 font-sans mt-1.5 truncate group-hover:text-slate-800">
                                  {data.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Legend */}
                        <div className="flex items-center gap-4 justify-center text-[10px] font-sans font-semibold pt-3 text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 bg-[#153020] rounded-sm" />
                            Doanh thu cốt lõi
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 bg-[#8f2d24] rounded-sm" />
                            Đột phá mùa Tây Bắc
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CHART COLUMN 3: Category contribution pie outline */}
                    <div className="bg-[#fbf9f5] border border-[#dfd4c0] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#153020] uppercase">Cơ Cấu Nhóm Danh Mục</h4>
                        <p className="text-[11px] text-slate-400">Tỷ trọng doanh số mang lại từ các nhóm sản phẩm Tây Bắc.</p>
                      </div>

                      <div className="space-y-3.5 my-4">
                        {Object.entries(categorySalesMap).length === 0 ? (
                          <p className="text-slate-404 text-xs italic text-center py-6 font-sans">Chưa có số liệu danh mục nào.</p>
                        ) : (
                          Object.entries(categorySalesMap).map(([catName, revenue], index) => {
                            const catPercent = Math.round((revenue / (totalRevenue || 1)) * 100);
                            const colors = [
                              "bg-[#153020]",
                              "bg-[#8f2d24]",
                              "bg-amber-600",
                              "bg-indigo-700",
                              "bg-cyan-600"
                            ];
                            const barColor = colors[index % colors.length];
                            return (
                              <div key={catName} className="space-y-1 font-sans text-xs">
                                <div className="flex justify-between items-center text-[11px] font-semibold">
                                  <span className="text-slate-700 truncate max-w-[124px] uppercase">{catName}</span>
                                  <span className="text-slate-500 font-mono">
                                    {formatVND(revenue)} ({catPercent}%)
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                  <div className={`h-full ${barColor} rounded-full`} style={{ width: `${catPercent}%` }} />
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      <div className="border-t border-dashed border-[#dfd4c0] pt-3 text-[11px] text-slate-500 font-sans leading-relaxed">
                        🌾 Các mặt hàng thảo dược rừng và sản vật ngâm rượu cổ truyền luôn cho biên lợi nhuận ròng đạt chỉ số xuất sắc nhất.
                      </div>
                    </div>
                  </div>

                  {/* Best Selling Products Leaderboard */}
                  <div className="bg-white border border-[#dfd4c0] rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#153020] uppercase">SẢN PHẨM BÁN CHẠY NHẤT TRONG KỲ</h4>
                        <p className="text-[11px] text-slate-400">Xếp hạng các mặt hàng đem lại sản lượng & doanh thu cao nhất.</p>
                      </div>
                      
                      {/* Search products filter */}
                      <div className="relative font-sans text-xs">
                        <input
                          type="text"
                          placeholder="Tìm sản phẩm thống kê..."
                          value={dashSearchProd}
                          onChange={(e) => setDashSearchProd(e.target.value)}
                          className="w-full md:w-60 bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-xs font-semibold"
                        />
                      </div>
                    </div>

                    {productSalesList.length === 0 ? (
                      <div className="text-center py-8 bg-[#fbf9f5] border border-dashed border-[#dfd4c0] rounded-xl text-slate-400 text-xs italic font-sans">
                        Chưa ghi nhận sản lượng xuất bán nào tương ứng bộ lọc hiện tại.
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-[#dfd4c0]/50">
                        <table className="w-full text-left border-collapse text-xs font-sans">
                          <thead>
                            <tr className="bg-[#f2ede4] text-[#153020] font-bold border-b border-[#dfd4c0]">
                              <th className="py-3 px-4 uppercase tracking-wider">Hạng</th>
                              <th className="py-3 px-4 uppercase tracking-wider">Sản phẩm</th>
                              <th className="py-3 px-4 uppercase tracking-wider">Danh mục</th>
                              <th className="py-3 px-4 uppercase tracking-wider text-center">Số lượng bán</th>
                              <th className="py-3 px-4 uppercase tracking-wider text-right">Doanh Thu Thu Về</th>
                              <th className="py-3 px-4 uppercase tracking-wider text-right">Đóng góp</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#dfd4c0]/30">
                            {productSalesList
                              .filter(item => item.name.toLowerCase().includes(dashSearchProd.toLowerCase()))
                              .map((item, idx) => {
                                const contributionPercent = Math.round((item.revenue / (totalRevenue || 1)) * 100);
                                return (
                                  <tr key={idx} className="hover:bg-[#fcfbf9]/80 transition-colors">
                                    <td className="py-3 px-4 font-mono font-bold text-[#8f2d24]">
                                      #{idx + 1}
                                    </td>
                                    <td className="py-3 px-4 font-bold text-slate-800">
                                      {item.name}
                                    </td>
                                    <td className="py-3 px-4">
                                      <span className="inline-block bg-[#153020]/5 text-[#153020] px-2 py-0.5 rounded font-semibold text-[10px] uppercase">
                                        {item.category}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-center font-bold font-mono">
                                      {item.quantity}
                                    </td>
                                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                                      {formatVND(item.revenue)}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                        {contributionPercent}%
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* AI Business Proactive Recommendations and Analysis */}
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-5 shadow-sm space-y-3.5">
                    <div className="flex items-center gap-2 text-[#78350f]">
                      <Sparkles className="w-5 h-5 text-amber-600 animate-pulse" />
                      <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Trợ Lý Phân Tích & Dự Báo Kinh Doanh AI</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs text-slate-700 leading-relaxed">
                      <div className="bg-white/60 p-3.5 rounded-xl border border-amber-200/50 space-y-1.5">
                        <h5 className="font-bold text-[#78350f] uppercase tracking-wider text-[10px]">💡 Chiến lược Tối ưu Doanh Thu</h5>
                        <p>
                          Sản phẩm bán nổi bật nhất hiện nay là <strong className="text-[#8f2d24]">{topProduct ? topProduct.name : "..."}</strong> mang lại doanh số đáng kể. Hãy cân nhắc đặt banner quảng cáo nổi bật ngoài trang chủ hoặc bổ sung chương trình khuyến mãi mua kèm để gia tăng kích thước giỏ hàng (AOV).
                        </p>
                      </div>
                      
                      <div className="bg-white/60 p-3.5 rounded-xl border border-amber-200/50 space-y-1.5">
                        <h5 className="font-bold text-[#78350f] uppercase tracking-wider text-[10px]">🌾 Quản lý Kho bãi Tây Bắc</h5>
                        <p>
                          Nhóm hàng <strong className="text-[#153020] uppercase">{topCategory}</strong> đang là trụ cột đóng góp doanh thu. Bạn nên liên hệ ngay với đầu thu mua thảo dược vùng cao để bảo đảm trữ lượng cung cấp ổn định, hạn chế tình trạng hết hàng trong đợt cao điểm bán sau.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

                    {/* Responsive Product List Display */}
                    <div className="space-y-4">
                      {/* Desktop Table View */}
                      <div className="hidden md:block border border-[#e8dfcf] rounded-xl overflow-hidden font-sans">
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
                                    <img src={product.image} alt="" className="w-full h-full object-cover ref-img" />
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
                                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                  <div className="inline-flex space-x-2">
                                    <button
                                      onClick={() => startEdit(product)}
                                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-[#153020]/5 hover:bg-[#153020] text-[#153020] hover:text-white rounded-md text-[11px] font-bold uppercase transition-all cursor-pointer"
                                      title="Chỉnh sửa chi tiết"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                      <span>SỬA</span>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(product.id)}
                                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-red-50 hover:bg-[#8f2d24] text-red-600 hover:text-white rounded-md text-[11px] font-bold uppercase transition-all cursor-pointer border border-red-150"
                                      title="Xóa thảo dược"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>XÓA</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card Stack View */}
                      <div className="block md:hidden space-y-3 font-sans">
                        <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Danh sách sản phẩm ({products.length}):</p>
                        {products.map((product) => {
                          const catName = categories.find((c) => c.id === product.category)?.name || product.category;
                          return (
                            <div 
                              key={product.id} 
                              className="bg-white border border-[#e8dfcf] rounded-xl p-3.5 shadow-sm space-y-3 relative overflow-hidden"
                            >
                              <div className="flex gap-3">
                                <div className="w-14 h-14 rounded-lg border border-slate-200 overflow-hidden shrink-0 bg-slate-50">
                                  <img referrerPolicy="no-referrer" src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-1">
                                  <span className="inline-block px-2 py-0.5 bg-[#153020]/5 border border-[#153020]/15 text-[#153020] rounded text-[9px] font-bold uppercase tracking-wider">
                                    {catName}
                                  </span>
                                  <h4 className="font-bold text-xs text-[#153020] uppercase leading-tight line-clamp-1">{product.name}</h4>
                                  <p className="font-bold text-sm text-[#8f2d24]">{formatVND(product.price)}</p>
                                </div>
                              </div>
                              
                              {product.description && (
                                <p className="text-[10.5px] text-slate-500 line-clamp-2 leading-relaxed bg-[#fdfcfa] p-2 rounded-lg border border-[#e6decb]/50">
                                  {product.description}
                                </p>
                              )}

                              {/* Easy tap touch target buttons */}
                              <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                                <button
                                  type="button"
                                  onClick={() => startEdit(product)}
                                  className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-[#f6f2e8] hover:bg-[#153020] text-[#153020] hover:text-white border border-[#c4bcae] rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span>CHỈNH SỬA</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-red-50 hover:bg-[#8f2d24] text-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>XÓA SẢN PHẨM</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
                              Ảnh sản phẩm (Tải một hoặc nhiều ảnh) *
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
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
                              <span>CHỌN NHIỀU ẢNH TẢI LÊN</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 uppercase mb-1">
                            Nhãn Tag hiển thị ở góc sản phẩm ở trang chủ
                          </label>
                          <select
                            value={formBadge}
                            onChange={(e) => setFormBadge(e.target.value)}
                            className="w-full bg-[#fdfcfa] border border-[#c4bcae] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020] mb-1 text-slate-700 font-medium"
                          >
                            <option value="mới">Mới (Màu đỏ sẫm)</option>
                            <option value="hot">HOT (Màu đỏ cam nổi bật, nhấp nháy)</option>
                            <option value="sắp cháy hàng">Sắp cháy hàng (Màu vàng sang trọng)</option>
                            <option value="không hiện">Không hiển thị (Ẩn nhãn tag)</option>
                          </select>
                        </div>

                        <div className="flex items-center space-x-2.5 bg-[#fcfbf9] border border-[#eaddca] p-3 rounded-lg">
                          <input
                            type="checkbox"
                            id="formShowOnLanding"
                            checked={formShowOnLanding}
                            onChange={(e) => setFormShowOnLanding(e.target.checked)}
                            className="w-4 h-4 text-[#153020] border-[#c4bcae] rounded focus:ring-[#153020] cursor-pointer"
                          />
                          <label htmlFor="formShowOnLanding" className="font-bold text-[#153020] text-xs cursor-pointer select-none uppercase tracking-wider">
                            Hiển thị sản phẩm này ở trang chủ
                          </label>
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
                        {/* Multiple Image Preview & Manager */}
                        <div>
                          <label className="block font-semibold text-slate-700 uppercase mb-1.5 inline-flex items-center space-x-1">
                            <span>Danh sách hình ảnh sản phẩm ({formImages.length})</span>
                          </label>
                          
                          {formImages.length === 0 ? (
                            <div className="border border-dashed border-[#dfd4c0] bg-[#faf8f4] py-14 rounded-xl text-center flex flex-col items-center justify-center text-slate-400">
                              <Image className="w-8 h-8 text-neutral-300 mb-1" />
                              <span className="text-[11px]">Chưa chọn hình ảnh nào cho sản phẩm này</span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {/* Primary image large preview */}
                              <div className="border border-[#dfd4c0] bg-white p-2 rounded-xl relative h-44 flex items-center justify-center overflow-hidden shadow-sm">
                                <img
                                  src={formImages[0]}
                                  alt="Ảnh chính"
                                  className="max-h-full max-w-full object-contain rounded"
                                />
                                <span className="absolute bottom-2 left-2 bg-[#153020]/90 text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow">
                                  Ảnh đại diện đại lý ngoài trang chủ
                                </span>
                              </div>

                              {/* Thumbnails grid with action buttons */}
                              <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1.5 bg-[#fbf9f5] rounded-xl border border-[#e8dfcf] list-none">
                                {formImages.map((img, index) => (
                                  <div
                                    key={index}
                                    className={`relative aspect-square rounded-lg overflow-hidden group border bg-white ${
                                      index === 0 ? "border-[#8f2d24] ring-2 ring-[#8f2d24]/20" : "border-slate-200"
                                    }`}
                                  >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    
                                    {/* Action overlay */}
                                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                      {index !== 0 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [img, ...formImages.filter((_, i) => i !== index)];
                                            setFormImages(updated);
                                            setFormImage(img);
                                          }}
                                          className="text-[8px] bg-emerald-600 hover:bg-emerald-700 text-white px-1.5 py-0.5 rounded font-bold cursor-pointer uppercase tracking-widest scale-90"
                                        >
                                          Chính
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = formImages.filter((_, i) => i !== index);
                                          setFormImages(updated);
                                          if (index === 0 && updated.length > 0) {
                                            setFormImage(updated[0]);
                                          } else if (updated.length === 0) {
                                            setFormImage("");
                                          }
                                        }}
                                        className="text-[8px] bg-[#8f2d24] hover:bg-red-700 text-white px-1.5 py-0.5 rounded font-bold cursor-pointer uppercase tracking-widest scale-90"
                                      >
                                        Xóa
                                      </button>
                                    </div>

                                    {index === 0 && (
                                      <span className="absolute top-1 left-1 bg-[#8f2d24] text-white text-[7px] font-bold px-1 py-0.5 rounded uppercase leading-none scale-90 tracking-wide">
                                        Ảnh chính
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
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
                          setCatFormShowOnLanding(true);
                        }}
                        className="flex items-center space-x-1.5 bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow cursor-pointer transition-colors font-sans"
                      >
                        <Plus className="w-4 h-4" />
                        <span>THÊM DANH MỤC MỚI</span>
                      </button>
                    </div>

                    {/* Responsive Category List Display */}
                    <div className="space-y-4">
                      {/* Desktop Table View */}
                      <div className="hidden md:block border border-[#e8dfcf] rounded-xl overflow-hidden font-sans">
                        <table className="w-full text-left text-xs bg-white">
                          <thead className="bg-[#fcfaf7] border-b border-[#e8dfcf] text-[#153020] uppercase font-bold tracking-wider">
                            <tr>
                              <th className="px-4 py-3">Ảnh bìa</th>
                              <th className="px-4 py-3">Mã danh mục (ID)</th>
                              <th className="px-4 py-3">Tên danh mục</th>
                              <th className="px-4 py-3">Tagline giới thiệu</th>
                              <th className="px-4 py-3">Trang chính</th>
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
                                <td className="px-4 py-2.5">
                                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                                    cat.showOnLanding !== false
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                      : "bg-slate-100 text-slate-500 border border-slate-200"
                                  }`}>
                                    {cat.showOnLanding !== false ? "Hiện" : "Ẩn"}
                                  </span>
                                </td>
                                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                  <div className="inline-flex space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingCategory(cat);
                                        setIsAddingCategory(false);
                                        setCatFormName(cat.name);
                                        setCatFormTagline(cat.tagline);
                                        setCatFormImage(cat.image);
                                        setCatFormShowOnLanding(cat.showOnLanding !== false);
                                      }}
                                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-[#153020]/5 hover:bg-[#153020] text-[#153020] hover:text-white rounded-md text-[11px] font-bold uppercase transition-all cursor-pointer"
                                      title="Chỉnh sửa danh mục"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                      <span>SỬA</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCategory(cat.id)}
                                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-red-50 hover:bg-[#8f2d24] text-red-600 hover:text-white rounded-md text-[11px] font-bold uppercase transition-all cursor-pointer border border-red-150"
                                      title="Xóa danh mục"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>XÓA</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card Stack View */}
                      <div className="block md:hidden space-y-3 font-sans">
                        <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Danh sách danh mục ({categories.length}):</p>
                        {categories.map((cat) => (
                          <div 
                            key={cat.id}
                            className="bg-white border border-[#e8dfcf] rounded-xl p-3.5 shadow-sm space-y-3 relative"
                          >
                            <div className="flex gap-3">
                              <div className="w-14 h-14 rounded-lg border border-slate-200 overflow-hidden shrink-0 bg-slate-50">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="space-y-1">
                                <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-mono leading-none">
                                  ID: {cat.id}
                                </span>
                                <h4 className="font-bold text-xs text-[#153020] uppercase leading-tight">{cat.name}</h4>
                                <p className="text-[11px] text-slate-500 italic font-medium">"{cat.tagline}"</p>
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                                  cat.showOnLanding !== false
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-slate-100 text-slate-500"
                                }`}>
                                  {cat.showOnLanding !== false ? "Hiện ở trang chính" : "Ẩn khỏi trang chính"}
                                </span>
                              </div>
                            </div>

                            {/* Easy tap touch target buttons */}
                            <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCategory(cat);
                                  setIsAddingCategory(false);
                                  setCatFormName(cat.name);
                                  setCatFormTagline(cat.tagline);
                                  setCatFormImage(cat.image);
                                  setCatFormShowOnLanding(cat.showOnLanding !== false);
                                }}
                                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-[#f6f2e8] hover:bg-[#153020] text-[#153020] hover:text-white border border-[#c4bcae] rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>CHỈNH SỬA</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-red-50 hover:bg-[#8f2d24] text-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>XÓA DANH MỤC</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
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
                        onClick={() => { setIsAddingCategory(false); setEditingCategory(null); setCatFormShowOnLanding(true); }}
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

                        <label className="flex items-start gap-3 rounded-lg border border-[#dfd4c0] bg-[#fcfaf7] p-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={catFormShowOnLanding}
                            onChange={(e) => setCatFormShowOnLanding(e.target.checked)}
                            className="mt-0.5 h-4 w-4 accent-[#153020]"
                          />
                          <span>
                            <span className="block font-bold uppercase tracking-wide text-[#153020]">
                              Hiển thị ở trang chính
                            </span>
                            <span className="mt-1 block text-[11px] leading-relaxed text-slate-500">
                              Trang chủ chỉ hiển thị tối đa 4 danh mục đang bật. Các danh mục khác vẫn xuất hiện trong trang sản phẩm.
                            </span>
                          </span>
                        </label>
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
                        onClick={() => { setIsAddingCategory(false); setEditingCategory(null); setCatFormShowOnLanding(true); }}
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#153020]">DANH SÁCH BÁN HÀNG - ĐƠN ĐẶT HÀNG</h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Nơi liệt kê các đơn hàng khách gửi qua form ĐẶT HÀNG NHANH để Dược sĩ liên hệ chốt đóng gói.
                    </p>
                  </div>
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
                  <div className="space-y-4">
                    {/* Status Tabs Filters */}
                    <div className="flex flex-wrap border-b border-[#dfd4c0] gap-1 sm:gap-2 select-none">
                      <button
                        type="button"
                        onClick={() => setOrderStatusFilter("all")}
                        className={`px-4 py-2 sm:py-2.5 text-xs font-bold tracking-wider rounded-t-lg transition-all font-sans cursor-pointer ${
                          orderStatusFilter === "all"
                            ? "bg-[#153020] text-white"
                            : "text-slate-500 hover:text-[#153020] hover:bg-slate-50 border-b-2 border-transparent"
                        }`}
                      >
                        TẤT CẢ ({orders.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderStatusFilter("preparing")}
                        className={`px-4 py-2 sm:py-2.5 text-xs font-bold tracking-wider rounded-t-lg transition-all font-sans cursor-pointer ${
                          orderStatusFilter === "preparing"
                            ? "bg-amber-600 text-white"
                            : "text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 border-b-2 border-transparent"
                        }`}
                      >
                        ĐANG CHUẨN BỊ ({orders.filter(o => (o.status || "preparing") === "preparing").length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderStatusFilter("delivering")}
                        className={`px-4 py-2 sm:py-2.5 text-xs font-bold tracking-wider rounded-t-lg transition-all font-sans cursor-pointer ${
                          orderStatusFilter === "delivering"
                            ? "bg-blue-600 text-white"
                            : "text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 border-b-2 border-transparent"
                        }`}
                      >
                        ĐANG GIAO HÀNG ({orders.filter(o => o.status === "delivering").length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderStatusFilter("delivered")}
                        className={`px-4 py-2 sm:py-2.5 text-xs font-bold tracking-wider rounded-t-lg transition-all font-sans cursor-pointer ${
                          orderStatusFilter === "delivered"
                            ? "bg-emerald-600 text-white"
                            : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-50/50 border-b-2 border-transparent"
                        }`}
                      >
                        ĐÃ GIAO HÀNG ({orders.filter(o => o.status === "delivered").length})
                      </button>
                    </div>

                    {/* Orders listing matching filter */}
                    {tabOrdersFiltered.length === 0 ? (
                      <div className="text-center py-12 bg-[#faf8f4]/60 border border-dashed border-[#dfd4c0]/50 rounded-2xl max-w-md mx-auto">
                        <Receipt className="w-10 h-10 text-[#153020]/15 mx-auto mb-2.5" />
                        <p className="text-slate-500 font-sans font-medium text-xs">
                          Không tìm thấy đơn đặt hàng nào trong trạng thái này.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 font-sans">
                        {tabOrdersFiltered.map((order, orderIdx) => (
                          <div 
                            key={orderIdx} 
                            className="bg-white border border-[#e8dfcf] rounded-xl hover:shadow-md transition-shadow overflow-hidden"
                          >
                            {/* Header card indicator with total price */}
                            <div className="bg-[#fcfaf7] px-5 py-3 border-b border-[#e8dfcf] flex flex-wrap justify-between items-center text-xs">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono font-bold text-[#8f2d24] text-sm tracking-wider">
                                  #{orders.findIndex(o => o.createdAt === order.createdAt && o.fullName === order.fullName && o.phoneNumber === order.phoneNumber) + 1}
                                </span>
                                <span className="bg-[#153020] text-emerald-400 font-mono px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                                  HÓA ĐƠN TRỰC TUYẾN
                                </span>
                                {/* Status design elements */}
                                {(order.status === "preparing" || !order.status) && (
                                  <span className="bg-amber-100 text-amber-800 border border-amber-200 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide">
                                    ĐANG CHUẨN BỊ
                                  </span>
                                )}
                                {order.status === "delivering" && (
                                  <span className="bg-blue-100 text-blue-800 border border-blue-200 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide">
                                    ĐANG GIAO HÀNG
                                  </span>
                                )}
                                {order.status === "delivered" && (
                                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide">
                                    ĐÃ GIAO HÀNG
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <span className="text-slate-400">{order.createdAt}</span>
                                <button
                                  onClick={() => handleDeleteOrder(order)}
                                  className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center space-x-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Xóa</span>
                                </button>
                              </div>
                            </div>

                            {/* Customer Information detail body */}
                            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-slate-700">
                              {/* Col 1: Customer info & status updater */}
                              <div className="md:col-span-5 space-y-2 border-r md:border-r border-slate-100 pr-4">
                                <p><span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wide">Người Nhận:</span> <strong className="text-[#153020] text-sm block mt-0.5">{order.fullName}</strong></p>
                                <p><span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wide">Số điện thoại:</span> <strong className="text-[#8f2d24] text-sm block mt-0.5">{order.phoneNumber}</strong></p>
                                <p className="leading-relaxed"><span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wide block">Địa Chỉ Giao và chốt đơn:</span> {order.address}</p>
                                {order.note && (
                                  <p className="bg-amber-50 text-amber-800 p-2 rounded-lg border border-amber-200 mt-2 italic leading-relaxed text-[11px] font-medium">
                                    &ldquo;{order.note}&rdquo;
                                  </p>
                                )}

                                {/* Quick status controls */}
                                <div className="pt-3.5 border-t border-slate-100/70 mt-3.5 space-y-2 font-sans select-none">
                                  <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider block">
                                    CẬP NHẬT TRẠNG THÁI:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateOrderStatus(order, "preparing")}
                                      className={`px-3 py-1.5 text-[10px] font-bold rounded duration-200 transition-colors cursor-pointer ${
                                        (order.status || "preparing") === "preparing"
                                          ? "bg-amber-600 text-white shadow-sm"
                                          : "bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800"
                                      }`}
                                    >
                                      Chuẩn bị
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateOrderStatus(order, "delivering")}
                                      className={`px-3 py-1.5 text-[10px] font-bold rounded duration-200 transition-colors cursor-pointer ${
                                        order.status === "delivering"
                                          ? "bg-blue-600 text-white shadow-sm"
                                          : "bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-800"
                                      }`}
                                    >
                                      Giao hàng
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateOrderStatus(order, "delivered")}
                                      className={`px-3 py-1.5 text-[10px] font-bold rounded duration-200 transition-colors cursor-pointer ${
                                        order.status === "delivered"
                                          ? "bg-emerald-600 text-white shadow-sm"
                                          : "bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800"
                                      }`}
                                    >
                                      Đã giao
                                    </button>
                                  </div>
                                </div>
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

                <div className="space-y-6">
                  {/* Slideshow Image List */}
                  <div className="bg-[#fcfaf7] border border-[#e8dfcf] p-5 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-[#153020] uppercase tracking-wide text-xs">
                        Danh sách chuỗi ảnh bìa chuyển cảnh ({heroImagesList.length} ảnh)
                      </h4>
                      <input
                        type="file"
                        accept="image/*"
                        ref={heroFileInputRef}
                        onChange={handleHeroImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => heroFileInputRef.current?.click()}
                        className="px-4 py-2 bg-[#8f2d24] hover:bg-[#aa392e] text-white text-xs font-bold tracking-wider rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5"
                      >
                        <Image className="w-4 h-4 text-white" />
                        <span>TẢI THÊM ẢNH BÌA MỚI</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans text-xs">
                      {heroImagesList.map((img, index) => (
                        <div
                          key={index}
                          className="bg-white border border-[#dfd4c0] rounded-xl overflow-hidden p-3 flex flex-col justify-between relative group hover:shadow-md transition-all duration-200"
                        >
                          {/* Image preview box */}
                          <div className="aspect-16/9 w-full bg-[#153020] rounded-lg overflow-hidden border border-slate-200 shadow-inner relative mb-2.5">
                            <img
                              src={img}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 left-2 bg-[#153020] text-emerald-400 font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
                              SLIDE #{index + 1}
                            </div>
                          </div>

                          {/* Controls buttons row */}
                          <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-auto">
                            <div className="flex space-x-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => handleMoveHeroImage(index, "up")}
                                className={`p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer ${
                                  index === 0 ? "opacity-30 cursor-not-allowed" : ""
                                }`}
                                title="Di chuyển lên trước"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={index === heroImagesList.length - 1}
                                onClick={() => handleMoveHeroImage(index, "down")}
                                className={`p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer ${
                                  index === heroImagesList.length - 1 ? "opacity-30 cursor-not-allowed" : ""
                                }`}
                                title="Di chuyển lùi sau"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteHeroImage(index)}
                              className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100/70 p-1.5 px-2.5 rounded font-extrabold flex items-center space-x-1 cursor-pointer transition-colors"
                              title="Xóa slide này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Xóa</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-[10.5px] text-slate-400 font-light flex items-start space-x-1.5">
                      <span className="text-[#8f2d24]">💡</span>
                      <span>Mẹo: Chuỗi ảnh của bạn sẽ tự động chuyển tiếp/mờ ẩn mềm mại (cross-fade slideshow) trên trang chủ mỗi 4.5 giây để tạo dấu ấn trực quan chuyển cảnh sang trọng!</span>
                    </div>
                  </div>
                </div>

                {/* Text customization on banner */}
                <div className="border-t border-[#dfd4c0]/50 pt-8 mt-8 space-y-6">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#153020]">CẤU HÌNH CHỮ TRÊN BANNER TRANG CHỦ</h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Điều chỉnh các tiêu đề, thông điệp ngắn, dòng giới thiệu và mô tả hiển thị trên Banner của trang chủ.
                    </p>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Huy hiệu Banner (Badge)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: 100% Nguyên Liệu Thiên Nhiên Rừng Già"
                          value={bannerBadge}
                          onChange={(e) => setBannerBadge(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Tiêu đề phụ (Subtitle)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Thảo Dược Đông Y Tây Bắc"
                          value={bannerSubtitle}
                          onChange={(e) => setBannerSubtitle(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Tiêu đề chính (Main Title)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: HƯƠNG VŨ"
                          value={bannerTitle}
                          onChange={(e) => setBannerTitle(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-bold uppercase"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Dòng Tagline thương hiệu (Banner Tagline)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: TINH TÚY NÚI RỰNG TÂY BẮC"
                          value={bannerTagline}
                          onChange={(e) => setBannerTagline(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1.5">
                        Đoạn mô tả chi tiết (Banner Description)
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Mô tả chính cho biểu ngữ..."
                        value={bannerDesc}
                        onChange={(e) => setBannerDesc(e.target.value)}
                        className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm leading-relaxed"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSaveContact}
                        className="px-6 py-2.5 bg-[#153020] hover:bg-[#204931] text-white text-xs font-bold tracking-wider rounded-lg transition-colors cursor-pointer w-full md:w-auto"
                      >
                        CẬP NHẬT CHỮ BANNER
                      </button>
                    </div>
                  </div>
                </div>

                {/* Text customization on Header Navbar */}
                <div className="border-t border-[#dfd4c0]/50 pt-8 mt-8 space-y-6">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#153020] uppercase">Cấu hình chữ trên thanh Menu (Header)</h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Điều chỉnh các nhãn nút điều hướng và câu nhắc tìm kiếm hiển thị trên thanh Header đầu trang.
                    </p>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Nút Trang Chủ (Trang Chủ Link)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mặc định: TRANG CHỦ"
                          value={headerHome}
                          onChange={(e) => setHeaderHome(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold uppercase"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Nút Sản Phẩm (Sản Phẩm Link)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mặc định: SẢN PHẨM"
                          value={headerProducts}
                          onChange={(e) => setHeaderProducts(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Nút Về Chúng Tôi (Về Chúng Tôi Link)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mặc định: VỀ CHÚNG TÔI"
                          value={headerAbout}
                          onChange={(e) => setHeaderAbout(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold uppercase"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Nút Liên Hệ (Liên Hệ Link)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mặc định: LIÊN HỆ"
                          value={headerContact}
                          onChange={(e) => setHeaderContact(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1.5">
                        Gợi ý tìm kiếm (Search Placeholder)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Mặc định: Tìm kiếm sản phẩm..."
                        value={headerSearch}
                        onChange={(e) => setHeaderSearch(e.target.value)}
                        className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSaveContact}
                        className="px-6 py-2.5 bg-[#153020] hover:bg-[#204931] text-white text-xs font-bold tracking-wider rounded-lg transition-colors cursor-pointer w-full md:w-auto"
                      >
                        CẬP NHẬT MENU HEADER
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual Section Customizations on Home page */}
                <div className="border-t border-[#dfd4c0]/50 pt-8 mt-8 space-y-6">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#153020] uppercase">Cấu hình Tiêu đề & Ẩn hiện các phần trên Trang Chủ</h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Tùy chọn ẩn hiện linh hoạt các vùng nội dung hoặc đổi tên tiêu đề đề mục lớn trên giao diện trang chủ của khách hàng.
                    </p>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Tiêu đề Vùng Danh mục nổi bật
                        </label>
                        <input
                          type="text"
                          placeholder="Mặc định: DANH MỤC NỔI BẬT"
                          value={sectionCategoriesTitle}
                          onChange={(e) => setSectionCategoriesTitle(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">
                          Tiêu đề Vùng Sản phẩm mới
                        </label>
                        <input
                          type="text"
                          placeholder="Mặc định: SẢN PHẨM MỚI THU HOẠCH"
                          value={sectionProductsTitle}
                          onChange={(e) => setSectionProductsTitle(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                        />
                      </div>
                    </div>

                    <div className="bg-[#fbfcfa] border border-[#d2dcd5] rounded-xl p-4.5 space-y-3">
                      <h4 className="font-bold text-[#153020] text-xs uppercase tracking-wide">Tùy chọn hiển thị các vùng nội dung</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <label className="flex items-center space-x-2.5 p-2 bg-white rounded-lg border border-[#e2ece5] cursor-pointer hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={showCategoriesSection}
                            onChange={(e) => setShowCategoriesSection(e.target.checked)}
                            className="rounded text-[#153020] focus:ring-[#153020] h-4 w-4"
                          />
                          <span className="font-semibold text-[#153020]">Hiện Danh Mục</span>
                        </label>

                        <label className="flex items-center space-x-2.5 p-2 bg-white rounded-lg border border-[#e2ece5] cursor-pointer hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={showProductsSection}
                            onChange={(e) => setShowProductsSection(e.target.checked)}
                            className="rounded text-[#153020] focus:ring-[#153020] h-4 w-4"
                          />
                          <span className="font-semibold text-[#153020]">Hiện Sản Phẩm</span>
                        </label>

                        <label className="flex items-center space-x-2.5 p-2 bg-white rounded-lg border border-[#e2ece5] cursor-pointer hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={showAboutSection}
                            onChange={(e) => setShowAboutSection(e.target.checked)}
                            className="rounded text-[#153020] focus:ring-[#153020] h-4 w-4"
                          />
                          <span className="font-semibold text-[#153020]">Hiện Về Chúng Tôi</span>
                        </label>

                        <label className="flex items-center space-x-2.5 p-2 bg-white rounded-lg border border-[#e2ece5] cursor-pointer hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={showContactSection}
                            onChange={(e) => setShowContactSection(e.target.checked)}
                            className="rounded text-[#153020] focus:ring-[#153020] h-4 w-4"
                          />
                          <span className="font-semibold text-[#153020]">Hiện Bản Đồ/Liên Hệ</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSaveContact}
                        className="px-6 py-2.5 bg-[#153020] hover:bg-[#204931] text-white text-xs font-bold tracking-wider rounded-lg transition-colors cursor-pointer w-full md:w-auto"
                      >
                        LƯU CẤU HÌNH TRANG CHỦ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ====== TAB 4: CONTACT & BRAND MANAGEMENTS ====== */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#153020]">LIÊN HỆ & THÔNG TIN THƯƠNG HIỆU</h3>
                  <p className="text-xs text-slate-500 font-sans font-light">
                    Nơi cho phép bạn tùy chỉnh đổi thông tin thương hiệu, hotline, địa chỉ trụ sở, email và thời gian làm việc hiển thị trên toàn bộ các trang.
                  </p>
                </div>

                <form onSubmit={handleSaveContact} className="space-y-5 font-sans text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1.5">
                        Tên Thương Hiệu (Company Name)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: NHÀ THUỐC THẢO DƯỢC HƯƠNG VŨ"
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1.5">
                        Khẩu Hiệu / Slogan Thương Hiệu
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Tổng Kho Thảo Dược Đông Y Tây Bắc"
                        value={contactTagline}
                        onChange={(e) => setContactTagline(e.target.value)}
                        className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1.5">
                        Hotline Điện Thoại Tư Vấn
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: (+84) 987 654 321"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1.5">
                        Địa Chỉ Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ví dụ: thaoduochuongvu.taybac@gmail.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1.5">
                      Trụ sở khai thác / Địa chỉ chính
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Bản Cát Cát, Thị xã Sa Pa, Tỉnh Lào Cai, Việt Nam."
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1.5">
                      Thời Gian Tiếp Nhận Lịch Tư Vấn
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: 7h30 sáng - 22h00 đêm hàng ngày (kể cả Thứ 7 và Chủ nhật)."
                      value={contactWorkingHours}
                      onChange={(e) => setContactWorkingHours(e.target.value)}
                      className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                    />
                  </div>

                  {/* Footer & Commitment Badge Customization Sections */}
                  <div className="border-t border-slate-200 pt-6 mt-6 space-y-6">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#153020]">CẤU HÌNH CHÂN TRANG (FOOTER & CAM KẾT)</h4>
                      <p className="text-[11px] text-slate-500 font-sans font-light mt-1">
                        Tùy chỉnh nội dung mô tả ở chân trang, dòng bản quyền và nội dung của 3 cam kết ở đầu Footer.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Footer desc and Rating and copyright */}
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5 font-sans text-xs">
                          Lời mô tả ngắn ở chân trang (Footer Description)
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Ví dụ: Nguồn dược liệu hoang dã sấy hữu cơ mang nguyên vẹn dược tính thượng hạng bồi bổ thể trạng cho gia đình bạn."
                          value={footerDesc}
                          onChange={(e) => setFooterDesc(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5 font-sans text-xs">
                          Bản quyền chân trang (Copyright Text)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: © 2026 Thảo Dược Hương Vũ. Bản quyền thiết kế vận hành bởi đội ngũ Hương Vũ."
                          value={footerCopyright}
                          onChange={(e) => setFooterCopyright(e.target.value)}
                          className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                        />
                      </div>

                      {/* Three commitments inputs */}
                      <div className="bg-[#faf8f0] border border-[#c4bcae]/40 rounded-xl p-5 space-y-4">
                        <h5 className="font-serif text-sm font-bold text-[#153020] border-b border-[#c4bcae]/25 pb-2">NỘI DUNG 3 KHỐI CAM KẾT (COMMITMENT BADGES)</h5>
                        
                        {/* Commitment 1 */}
                        <div className="space-y-2">
                          <p className="font-bold text-[#8f2d24] text-[11px] uppercase font-sans">Cam kết 1 (Biểu tượng Khiên bảo vệ)</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Tiêu đề (Ví dụ: CAM KẾT CHÍNH HÃNG)"
                              value={commitment1Title}
                              onChange={(e) => setCommitment1Title(e.target.value)}
                              className="md:col-span-1 w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-bold uppercase placeholder:font-normal"
                            />
                            <input
                              type="text"
                              required
                              placeholder="Mô tả chi tiết lời cam kết..."
                              value={commitment1Desc}
                              onChange={(e) => setCommitment1Desc(e.target.value)}
                              className="md:col-span-2 w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                            />
                          </div>
                        </div>

                        {/* Commitment 2 */}
                        <div className="space-y-2 pt-2 border-t border-[#c4bcae]/20">
                          <p className="font-bold text-[#8f2d24] text-[11px] uppercase font-sans">Cam kết 2 (Biểu tượng Xe vận chuyển)</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Tiêu đề (Ví dụ: GIAO HÀNG ĐỒNG KIỂM)"
                              value={commitment2Title}
                              onChange={(e) => setCommitment2Title(e.target.value)}
                              className="md:col-span-1 w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-bold uppercase placeholder:font-normal"
                            />
                            <input
                              type="text"
                              required
                              placeholder="Mô tả chi tiết lời cam kết..."
                              value={commitment2Desc}
                              onChange={(e) => setCommitment2Desc(e.target.value)}
                              className="md:col-span-2 w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                            />
                          </div>
                        </div>

                        {/* Commitment 3 */}
                        <div className="space-y-2 pt-2 border-t border-[#c4bcae]/20">
                          <p className="font-bold text-[#8f2d24] text-[11px] uppercase font-sans">Cam kết 3 (Biểu tượng Đổi trả hàng)</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Tiêu đề (Ví dụ: ĐỔI TRẢ MIỄN PHÍ)"
                              value={commitment3Title}
                              onChange={(e) => setCommitment3Title(e.target.value)}
                              className="md:col-span-1 w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm font-bold uppercase placeholder:font-normal"
                            />
                            <input
                              type="text"
                              required
                              placeholder="Mô tả chi tiết lời cam kết..."
                              value={commitment3Desc}
                              onChange={(e) => setCommitment3Desc(e.target.value)}
                              className="md:col-span-2 w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#153020] text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Links Customization */}
                      <div className="bg-[#faf8f0] border border-[#c4bcae]/40 rounded-xl p-5 space-y-4">
                        <h5 className="font-serif text-sm font-bold text-[#153020] border-b border-[#c4bcae]/25 pb-2">LIÊN KẾT MẠNG XÃ HỘI (SOCIAL LINKS)</h5>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 uppercase mb-1 font-sans text-[10px]">
                              Đường dẫn liên kết Zalo (Zalo Link)
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ví dụ: https://zalo.me/84569315315"
                              value={zaloLink}
                              onChange={(e) => setZaloLink(e.target.value)}
                              className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020] text-xs font-mono"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 uppercase mb-1 font-sans text-[10px]">
                              Đường dẫn liên kết Facebook (Facebook Link)
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ví dụ: https://www.facebook.com/thaoduochuongvu"
                              value={facebookLink}
                              onChange={(e) => setFacebookLink(e.target.value)}
                              className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020] text-xs font-mono"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 uppercase mb-1 font-sans text-[10px]">
                              Đường dẫn liên kết TikTok (TikTok Link)
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ví dụ: https://www.tiktok.com/@huonggoluanongsantaybac"
                              value={tiktokLink}
                              onChange={(e) => setTiktokLink(e.target.value)}
                              className="w-full bg-[#faf8f4] border border-[#c4bcae] rounded-lg px-3.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#153020] text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full h-11 bg-[#153020] hover:bg-[#8f2d24] text-white text-xs font-bold tracking-widest rounded-lg flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer uppercase"
                    >
                      <Save className="w-4 h-4 text-white" />
                      <span>Lưu Lại Đổi Mới Toàn Trang</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ====== TAB 5: CONSULTATION SCHEDULER LIST ====== */}
            {activeTab === "consultations" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#153020] uppercase">DANH SÁCH ĐĂNG KÝ TƯ VẤN</h3>
                    <p className="text-xs text-slate-500 font-sans font-light mt-0.5">
                      Danh sách ghi lại chi tiết các yêu cầu khách hàng đăng ký gọi điện bắt mạch & tư vấn thảo dược trực tiếp.
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 text-xs font-sans">
                  <button
                    onClick={() => setConsultFilter("all")}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                      consultFilter === "all"
                        ? "bg-[#153020] text-white"
                        : "bg-[#faf8f4] text-[#153020] hover:bg-[#e6decb] border border-[#c4bcae]/40"
                    }`}
                  >
                    Tất cả ({consultations ? consultations.length : 0})
                  </button>
                  <button
                    onClick={() => setConsultFilter("pending")}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                      consultFilter === "pending"
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-[#faf8f4] text-[#153020] hover:bg-[#e6decb] border border-[#c4bcae]/40"
                    }`}
                  >
                    Chờ liên hệ ({(consultations || []).filter(c => c.status === "pending").length})
                  </button>
                  <button
                    onClick={() => setConsultFilter("called")}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                      consultFilter === "called"
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-[#faf8f4] text-[#153020] hover:bg-[#e6decb] border border-[#c4bcae]/40"
                    }`}
                  >
                    Đã tư vấn ({(consultations || []).filter(c => c.status === "called").length})
                  </button>
                  <button
                    onClick={() => setConsultFilter("cancelled")}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                      consultFilter === "cancelled"
                        ? "bg-slate-100 text-slate-900 border border-slate-300"
                        : "bg-[#faf8f4] text-[#153020] hover:bg-[#e6decb] border border-[#c4bcae]/40"
                    }`}
                  >
                    Đã hủy ({(consultations || []).filter(c => c.status === "cancelled").length})
                  </button>
                </div>

                {/* Consultations lists */}
                {(!consultations || consultations.filter(c => consultFilter === "all" || c.status === consultFilter).length === 0) ? (
                  <div className="bg-[#fbf9f5] border border-[#dfd4c0] rounded-xl py-12 text-center text-slate-400 font-sans text-xs">
                    <PhoneCall className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#153020]" />
                    <p className="font-semibold text-slate-600">Không tìm thấy yêu cầu tư vấn nào.</p>
                    <p className="font-light text-slate-400 mt-1">Khi khách hàng điền form Đăng ký nhận tư vấn ở trang chủ, yêu cầu sẽ lập tức xuất hiện tại đây.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {consultations
                      .filter(c => consultFilter === "all" || c.status === consultFilter)
                      .map((consult) => (
                        <div
                          key={consult.id}
                          className={`p-5 rounded-xl border transition-all ${
                            consult.status === "pending"
                              ? "bg-amber-50/40 border-amber-200/60 hover:bg-amber-50"
                              : consult.status === "called"
                              ? "bg-emerald-50/20 border-emerald-100 hover:bg-emerald-50/40"
                              : "bg-slate-50/50 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 font-sans text-xs">
                            <div className="space-y-2.5 flex-1">
                              {/* Header Title with ID & Time details */}
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="font-mono font-bold text-slate-500 text-[10px] bg-slate-100 px-2 py-0.5 rounded uppercase">
                                  {consult.id}
                                </span>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-500 font-light text-[11px]">{consult.createdAt}</span>
                                
                                {/* Status badge */}
                                {consult.status === "pending" && (
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Chờ liên hệ
                                  </span>
                                )}
                                {consult.status === "called" && (
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Đã tư vấn
                                  </span>
                                )}
                                {consult.status === "cancelled" && (
                                  <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Đã hủy
                                  </span>
                                )}
                              </div>

                              {/* Target Customer Info */}
                              <div>
                                <h4 className="text-sm font-bold text-[#153020] uppercase flex items-center flex-wrap">
                                  <span>{consult.name}</span>
                                  <span className="mx-2 text-slate-300 font-normal">|</span>
                                  <a
                                    href={`tel:${consult.phone}`}
                                    className="text-[#8f2d24] hover:underline font-bold text-sm tracking-wide"
                                    title="Nhấp để thực hiện cuộc gọi"
                                  >
                                    {consult.phone}
                                  </a>
                                </h4>
                              </div>

                              {/* Customer Symptom Message */}
                              <div className="bg-white/70 rounded-lg p-3 border border-dashed border-[#dfd4c0] text-slate-700 leading-relaxed">
                                <p className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-1 select-none">
                                  NỘI DUNG YÊU CẦU / TRIỆU CHỨNG:
                                </p>
                                <p className="font-light italic text-xs whitespace-pre-line">
                                  {consult.message || "(Không kèm ghi chú thêm)"}
                                </p>
                              </div>
                            </div>

                            {/* Actions Buttons */}
                            <div className="flex md:flex-col items-center md:items-end justify-start gap-2 flex-shrink-0 flex-wrap">
                              {consult.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => handleUpdateConsultStatus(consult.id, "called")}
                                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg flex items-center space-x-1.5 font-bold transition-all cursor-pointer uppercase text-[10px] tracking-wider"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Xác nhận đã gọi</span>
                                  </button>
                                  <button
                                    onClick={() => handleUpdateConsultStatus(consult.id, "cancelled")}
                                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg flex items-center space-x-1 font-semibold transition-all cursor-pointer text-[10px]"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                    <span>Huỷ bỏ</span>
                                  </button>
                                </>
                              )}

                              {consult.status !== "pending" && (
                                <button
                                  onClick={() => handleUpdateConsultStatus(consult.id, "pending")}
                                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg flex items-center space-x-1 font-semibold transition-all cursor-pointer text-[10px]"
                                >
                                  <Undo className="w-3.5 h-3.5" />
                                  <span>Đặt lại chờ gọi</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteConsultation(consult.id)}
                                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold transition-all cursor-pointer text-[10px] ${
                                  consult.status === "cancelled"
                                    ? "bg-red-50 hover:bg-[#8f2d24] hover:text-white text-[#8f2d24] border border-[#8f2d24]/20"
                                    : "bg-slate-50 hover:bg-slate-200 text-slate-600 border border-slate-200"
                                }`}
                                title={consult.status === "cancelled" ? "Xóa vĩnh viễn khỏi dữ liệu" : "Chuyển vào danh sách Đã hủy"}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>{consult.status === "cancelled" ? "Xóa vĩnh viễn" : "Hủy yêu cầu"}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Reusable, Sandbox-resistant beautiful confirmation modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
            onClick={() => setConfirmModal(null)} 
          />
          <div className="bg-[#fdfcfa] border-2 border-[#dfd4c0] rounded-2xl max-w-sm w-full p-6 relative z-10 shadow-2xl font-sans animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#8f2d24] flex items-center justify-center mx-auto mb-4 border border-[#8f2d24]/20">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-800 leading-snug">
                {confirmModal.title || "Xác nhận hành động"}
              </h4>
              <p className="text-xs text-[#8f2d24] mt-2 font-medium bg-red-50/50 py-1.5 px-3 rounded-lg border border-red-100">
                {confirmModal.message}
              </p>
              {confirmModal.description && (
                <p className="text-[11px] text-slate-500 mt-2 font-light italic">
                  {confirmModal.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                disabled={isSavingAdminChange}
                className="flex-1 py-2 px-4 border border-[#c4bcae] hover:bg-[#f6f2e8] rounded-xl font-semibold text-xs text-slate-600 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isSavingAdminChange}
                onClick={async () => {
                  const action = confirmModal.onConfirm;
                  const result = await action();
                  if (result !== false) setConfirmModal(null);
                }}
                className={`flex-1 py-2 px-4 ${confirmModal.confirmBg || "bg-[#8f2d24] hover:bg-[#722019]"} rounded-xl font-bold text-xs text-white transition-colors cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-wait`}
              >
                {isSavingAdminChange ? "Đang lưu..." : (confirmModal.confirmLabel || "Xác nhận")}
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
