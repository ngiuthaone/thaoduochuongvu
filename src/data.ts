import { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "tra-thao-duoc",
    name: "TRÀ THẢO DƯỢC",
    tagline: "Thanh lọc cơ thể, tăng cường sức khỏe",
    image: "/src/assets/images/category_tea_1781778559006.jpg",
  },
  {
    id: "re-thao-duoc",
    name: "RỄ THẢO DƯỢC",
    tagline: "Bồi bổ cơ thể, hỗ trợ điều trị",
    image: "/src/assets/images/category_roots_1781778577888.jpg",
  },
  {
    id: "thao-duoc-ngam-ruou",
    name: "THẢO DƯỢC NGÂM RƯỢU",
    tagline: "Tăng cường sinh lực, bồi bổ sức khỏe",
    image: "/src/assets/images/category_liquor_1781778591770.jpg",
  },
  {
    id: "nam-duoc-lieu",
    name: "NẤM DƯỢC LIỆU",
    tagline: "Tăng cường miễn dịch, phòng chống bệnh tật",
    image: "/src/assets/images/category_mushrooms_1781778605959.jpg",
  },
];

export const products: Product[] = [
  {
    id: "tra-atiso",
    name: "Trà Atiso Túi Lọc",
    category: "tra-thao-duoc",
    price: 120000,
    rating: 0,
    reviewsCount: 0,
    image: "/src/assets/images/product_atiso_tea_1781778642518.jpg",
    description: "Trà Atiso túi lọc cao cấp được chế biến từ những đóa hoa atiso tươi ngon nhất của vùng núi cao, đem đến vị ngọt thanh khiết, hỗ trợ mát gan, thải độc và mang lại giấc ngủ an giấc.",
    benefits: [
      "Thanh nhiệt, giải độc gan hiệu quả",
      "Giúp hạ cholesterol trong máu",
      "Cải thiện hệ tiêu hóa tự nhiên",
      "Giúp ngủ ngon và sâu giấc hơn"
    ],
    usage: "Nhúng túi trà vào 150ml - 200ml nước sôi ở 95°C. Đợi 3-5 phút cho dưỡng chất tan đều ra nước rồi tận hưởng. Có thể dùng hàng ngày thay nước lọc.",
    isNew: true,
  },
  {
    id: "sam-ngoc-linh",
    name: "Sâm Ngọc Linh",
    category: "re-thao-duoc",
    price: 1500000,
    originalPrice: 1800000,
    rating: 0,
    reviewsCount: 0,
    image: "/src/assets/images/product_sam_ngoc_linh_1781778655932.jpg",
    description: "Sâm Ngọc Linh - Quốc bảo Việt Nam, được đánh giá là một trong những loài sâm tốt nhất thế giới với hàm lượng saponin vượt trội. Sâm giúp điều hòa tim mạch, bồi bổ sinh lực tuyệt đối.",
    benefits: [
      "Tăng cường đề kháng, bổ sung nguồn năng lượng dồi dào",
      "Chống stress, cải thiện trí nhớ và tăng khả năng tập trung",
      "Hỗ trợ bảo vệ gan, tăng sinh hồng cầu tốt cho tim mạch",
      "Chống lão hóa mạnh mẽ, níu giữ nét xuân"
    ],
    usage: "Thái lát ngậm trực tiếp, ngâm mật ong rừng nguyên chất, hãm trà nóng hoặc ngâm rượu nếp cái hoa vàng cao cấp trong 3 tháng trở lên.",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "saffron-tay-tuan",
    name: "Nhụy Hoa Nghệ Tây Tây Tạng",
    category: "tra-thao-duoc",
    price: 350000,
    originalPrice: 420000,
    rating: 0,
    reviewsCount: 0,
    image: "/src/assets/images/product_saffron_1781778622356.jpg",
    description: "Nhụy hoa nghệ tây (Saffron) organic cao cấp thu hoạch thủ công tại các đỉnh núi cao Tây Tạng. Thảo dược quý giá giúp làn da tươi sáng rạng ngời, cải thiện tâm trạng và đồng hồ sinh học cơ thể.",
    benefits: [
      "Đánh bay mất ngủ kinh niên, giúp giấc ngủ êm dịu",
      "Dưỡng trắng da, mờ thâm nám từ sâu bên trong",
      "Điều hòa huyết áp và cải thiện thị lực",
      "Hỗ trợ giảm cân lành mạnh nhờ giảm thèm ăn"
    ],
    usage: "Thả 3-5 sợi Saffron vào 300ml nước ấm (khoảng 70-80°C). Chờ 5 phút cho nước chuyển màu vàng óng là có thể thưởng thức. Có thể uống thêm mật ong.",
    isNew: true,
  },
  {
    id: "binh-ngam-sam",
    name: "Bình Ngâm Sâm Thượng Hạng",
    category: "thao-duoc-ngam-ruou",
    price: 2500000,
    rating: 0,
    reviewsCount: 0,
    image: "/src/assets/images/category_liquor_1781778591770.jpg",
    description: "Bình rượu ngâm sâm ngọc linh và sâm đá tự nhiên trong cồn nếp sạch cao độ thượng hạng. Thiết kế bình thủy tinh sang trọng, là món quà quý giá thể hiện đẳng cấp cho gia chủ.",
    benefits: [
      "Tăng cường sinh lực, bổ thận tráng dương",
      "Giúp khí huyết lưu thông, mạnh gân cốt",
      "Phục hồi thể trạng nhanh chóng sau mệt mỏi",
      "Thích hợp làm quà biếu tặng sang trọng lịch thiệp"
    ],
    usage: "Mỗi ngày dùng 1-2 ly nhỏ (khoảng 20-30ml) trong hoặc sau bữa ăn tối. Nên duy trì đều đặn để có kết quả phục hồi sinh lực tốt nhất.",
    isNew: true,
  },
  {
    id: "thao-duoc-ngam",
    name: "Combo Thảo Dược Ngâm Rượu",
    category: "thao-duoc-ngam-ruou",
    price: 450000,
    originalPrice: 550000,
    rating: 0,
    reviewsCount: 0,
    image: "/src/assets/images/category_roots_1781778577888.jpg",
    description: "Tổng hợp các loại thảo dược ngâm rượu bổ dưỡng nhất Tây Bắc bao gồm: sâm đá, dâm dương hoắc, ba kích tím, nhục thung dung. Giúp bổ thận tráng dương mạnh gân cốt.",
    benefits: [
      "Bồi bổ sức khỏe toàn diện, tráng dương dồi dào",
      "Hỗ trợ giảm đau mỏi xương khớp khi thay đổi thời tiết",
      "Tăng tuần hoàn máu giúp da dẻ hồng hào ấm áp",
      "Làm sạch đường ruột, kích thích bữa ăn thêm ngon"
    ],
    usage: "Rửa sạch qua rượu nhẹ, cho tất cả nguyên liệu vào bình thủy tinh 5-10 lít. Đổ đầy rượu nếp ngon từ 40 độ trở lên, đậy kín nắp ngâm trong 1-2 tháng.",
    isNew: true,
  },
  {
    id: "nam-linh-chi",
    name: "Nấm Linh Chi Tây Bắc",
    category: "nam-duoc-lieu",
    price: 280000,
    rating: 0,
    reviewsCount: 0,
    image: "/src/assets/images/category_mushrooms_1781778605959.jpg",
    description: "Nấm Linh Chi tự nhiên khai thác tại rừng già Tây Bắc. Sản phẩm bảo đảm sấy thô nguyên tai, giữ nguyên vẹn lớp bào tử màu nâu bổ dưỡng bên trên bề mặt nấm.",
    benefits: [
      "Kích thích hệ thống miễn dịch hoạt động trơn tru",
      "Hạ huyết áp và ổn định đường huyết lý tưởng",
      "Giải trừ độc tố, chống oxy hóa gốc tự do",
      "Chống lão hóa vượt trội cho cả nam và nữ"
    ],
    usage: "Thái lát hoặc đập nhỏ, đun sôi kỹ với nước sạch trong 15-20 phút rồi uống lúc ấm. Có thể lọc bã rồi cho chất nước bảo quản tủ lạnh uống trong ngày.",
    isNew: true,
  },
];
