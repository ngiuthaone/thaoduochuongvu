import express from "express";
import path from "path";
import fs from "fs";
import { randomBytes, timingSafeEqual } from "crypto";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import { products as initialProducts, categories as initialCategories } from "./src/data";

const DB_FILE = path.join(process.cwd(), "db.json");
const SITE_STATE_ID = "main";
const ADMIN_SESSION_COOKIE = "huongvu_admin_session";
const ADMIN_SESSION_HOURS = Number(process.env.ADMIN_SESSION_HOURS || 8);
const adminSessions = new Map<string, number>();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

interface DBState {
  products: any[];
  categories: any[];
  aboutUs: any;
  heroImage: string;
  orders: any[];
  contact: any;
  consultations: any[];
}

const defaultAboutUs = {
  subtitle: "Hành Trình Gìn Giữ Di Sản",
  title: "VỀ CHÚNG TÔI - THẢO DƯỢC HƯƠNG VŨ",
  description: "Sứ mệnh mang từng giọt tinh túy, thảo mộc quý của núi cao hoang dã Tây Bắc tiếp cận hàng triệu gia đình Việt mong muốn tăng tuổi thọ và bồi bổ sức khỏe tự nhiên.",
  quote: "“Chất lượng từ chữ TÂM, uy tín gầy dựng qua năm tháng”",
  paragraph1: "Khởi đầu từ những chuyến đi rừng dài ngày của dòng họ Vũ tìm kiếm các phương thuốc trân quý của người Dao đỏ, người H'mông bản địa vùng núi Sapa, Hà Giang. Thảo Dược Hương Vũ đã nâng tầm chế biến thủ công giữ trọn vẹn lớp dược lý cao nhất mà không lạm dụng bất kỳ hóa chất diệt cỏ hay sấy lưu huỳnh công nghiệp độc hại nào.",
  paragraph2: "Sản phẩm của Hương Vũ đạt kiểm định an toàn vệ sinh thực phẩm khắt khe và được các chuyên khoa Đông y viện Trung Ương tin dùng kê đơn nâng cao thể trạng.",
  statNumber: "15+ Năm",
  statLabel: "Châm cứu & thảo dược thuần tự nhiên rừng sâu"
};

const defaultContact = {
  companyName: "THẢO DƯỢC HƯƠNG VŨ",
  tagline: "Tổng Kho Thảo Dược Đông Y Tây Bắc",
  address: "Bản Cát Cát, Thị xã Sa Pa, Tỉnh Lào Cai, Việt Nam.",
  phone: "(+84)569315315",
  email: "thaoduochuongvu.taybac@gmail.com",
  workingHours: "7h30 sáng - 22h00 đêm hàng ngày (kể cả Thứ 7 và Chủ nhật).",
  footerDesc: "Nguồn dược liệu hoang dã sấy hữu cơ mang nguyên vẹn dược tính thượng hạng bồi bổ thể trạng cho gia đình bạn.",
  footerRatingText: "(4.9/5 điểm uy tín từ 1.200+ khách hàng)",
  footerCopyright: "© 2026 Thảo Dược Hương Vũ. Bản quyền thiết kế ván hàng thuộc Sapa Organic Farm.",
  commitment1Title: "CAM KẾT CHÍNH HÃNG",
  commitment1Desc: "Đền bù ngay gấp 10 lần giá trị hóa đơn nếu phát hiện hàng giả, sâm giả hay không rõ nguồn gốc.",
  commitment2Title: "GIAO HÀNG ĐỒNG KIỂM",
  commitment2Desc: "Nhận hàng toàn quốc nhanh chóng, được bóc hộp kiểm tra và ngửi chất lượng dược phẩm trước khi thanh toán.",
  commitment3Title: "ĐỔI TRẢ MIỄN PHÍ",
  commitment3Desc: "Đổi trả sản phẩm trong vòng 7 ngày nếu bị bung gói chân không hoặc sấy ẩm mốc do lỗi vận chuyển.",
  zaloLink: "https://zalo.me/84569315315",
  facebookLink: "https://www.facebook.com/thaoduochuongvu",
  tiktokLink: "https://www.tiktok.com/@huonggoluanongsantaybac",
  bannerBadge: "100% Nguyên Liệu Thiên Nhiên Rừng Già",
  bannerSubtitle: "Thảo Dược Đông Y Tây Bắc",
  bannerTitle: "HƯƠNG VŨ",
  bannerTagline: "TINH TÚY NÚI RỰNG TÂY BẮC",
  bannerDesc: "Chuyên cung cấp sỉ lẻ thảo dược chất lượng cao - Đồ uống ngâm bổ Đông Y Tây Bắc thượng hạng. Được thu hái thủ công 100% tự nhiên bảo đảm vệ sinh - Uy tín đặt lên hàng đầu.",
  headerHome: "TRANG CHỦ",
  headerProducts: "SẢN PHẨM",
  headerAbout: "VỀ CHÚNG TÔI",
  headerContact: "LIÊN HỆ",
  headerSearch: "Tìm kiếm sản phẩm...",
  sectionProductsTitle: "SẢN PHẨM MỚI THU HOẠCH",
  sectionCategoriesTitle: "DANH MỤC NỔI BẬT",
  showCategoriesSection: true,
  showProductsSection: true,
  showAboutSection: true,
  showContactSection: true
};

const defaultHeroImage = "/src/assets/images/hero_vietnam_mountains_new_1781779741604.jpg";

function getDefaultDB(): DBState {
  return {
    products: initialProducts,
    categories: initialCategories,
    aboutUs: defaultAboutUs,
    heroImage: defaultHeroImage,
    orders: [],
    contact: defaultContact,
    consultations: []
  };
}

function normalizeDB(parsed: Partial<DBState>): DBState {
  const defaults = getDefaultDB();
  return {
    products: Array.isArray(parsed.products) ? parsed.products : defaults.products,
    categories: Array.isArray(parsed.categories) ? parsed.categories : defaults.categories,
    aboutUs: { ...defaults.aboutUs, ...(parsed.aboutUs || {}) },
    heroImage: typeof parsed.heroImage === "string" ? parsed.heroImage : defaults.heroImage,
    orders: Array.isArray(parsed.orders) ? parsed.orders : defaults.orders,
    contact: { ...defaults.contact, ...(parsed.contact || {}) },
    consultations: Array.isArray(parsed.consultations) ? parsed.consultations : defaults.consultations
  };
}

function getHeroImagesArray(value: string): string[] {
  try {
    if (value && value.startsWith("[")) {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch (err) {
    console.warn("Failed to parse hero image list:", err);
  }

  return value ? [value] : [];
}

function asHeroImageResponse(value: string) {
  const images = getHeroImagesArray(value);
  if (images.length <= 1) {
    const firstImage = images[0] || value;
    return firstImage.startsWith("data:") ? "/api/hero-image/0" : firstImage;
  }
  return JSON.stringify(images.map((_, index) => `/api/hero-image/${index}`));
}

function getPublicDB(state: DBState): DBState {
  return {
    ...state,
    heroImage: asHeroImageResponse(state.heroImage),
    orders: [],
    consultations: [],
  };
}

function parseDataUrlImage(value: string) {
  const match = value.match(/^data:([^;,]+)(;base64)?,(.*)$/);
  if (!match) return null;

  const [, mimeType, isBase64, payload] = match;
  const buffer = isBase64
    ? Buffer.from(payload, "base64")
    : Buffer.from(decodeURIComponent(payload), "utf-8");

  return { buffer, mimeType };
}

async function loadDB(): Promise<DBState> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_state")
        .select("data")
        .eq("id", SITE_STATE_ID)
        .maybeSingle();

      if (error) throw error;
      if (data?.data) return normalizeDB(data.data as Partial<DBState>);

      const defaults = getDefaultDB();
      await saveDB(defaults);
      return defaults;
    } catch (err) {
      console.error("Error reading Supabase, falling back to db.json: ", err);
    }
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      return normalizeDB(parsed);
    }
  } catch (err) {
    console.error("Error reading db.json, returning defaults: ", err);
  }
  return getDefaultDB();
}

async function saveDB(state: DBState) {
  const normalized = normalizeDB(state);

  if (supabase) {
    try {
      const { error } = await supabase
        .from("site_state")
        .upsert({
          id: SITE_STATE_ID,
          data: normalized,
          updated_at: new Date().toISOString(),
        });
      if (error) throw error;
      return;
    } catch (err) {
      console.error("Error saving Supabase, falling back to db.json: ", err);
    }
  }

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(normalized, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving db.json: ", err);
  }
}

function formatVND(num: number) {
  return Number(num || 0).toLocaleString("vi-VN") + "đ";
}

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        if (index === -1) return [part, ""];
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function safeCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function createAdminSession() {
  const token = randomBytes(32).toString("hex");
  const expiresAt = Date.now() + ADMIN_SESSION_HOURS * 60 * 60 * 1000;
  adminSessions.set(token, expiresAt);
  return { token, expiresAt };
}

function getAdminSession(req: express.Request) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[ADMIN_SESSION_COOKIE];
  if (!token) return null;

  const expiresAt = adminSessions.get(token);
  if (!expiresAt || expiresAt < Date.now()) {
    adminSessions.delete(token);
    return null;
  }

  return { token, expiresAt };
}

function setAdminCookie(res: express.Response, token: string, expiresAt: number) {
  const cookieParts = [
    `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))}`,
  ];

  if (process.env.NODE_ENV === "production") {
    cookieParts.push("Secure");
  }

  res.setHeader("Set-Cookie", cookieParts.join("; "));
}

function clearAdminCookie(res: express.Response) {
  res.setHeader("Set-Cookie", `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!getAdminSession(req)) {
    res.status(401).json({ success: false, error: "Admin session required" });
    return;
  }

  next();
}

async function sendTelegramMessage(text: string) {
  if (process.env.TELEGRAM_NOTIFY_ENABLED !== "true") return;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.warn("Telegram notification skipped: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) {
      console.error("Telegram notification failed:", result);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Telegram notification request failed:", err);
    return false;
  }
}

async function notifyTelegramNewOrder(order: any) {
  const itemsText = (order.items || [])
    .map((item: any) => `- ${item.name} x${item.quantity}: ${formatVND(item.price * item.quantity)}`)
    .join("\n");

  const text = [
    "ĐƠN HÀNG MỚI - THẢO DƯỢC HƯƠNG VŨ",
    `Khách: ${order.fullName}`,
    `SĐT: ${order.phoneNumber}`,
    `Địa chỉ: ${order.address}`,
    `Tổng tiền: ${formatVND(order.totalAmount)}`,
    `Thời gian: ${order.createdAt}`,
    order.note ? `Ghi chú: ${order.note}` : "",
    "",
    itemsText,
  ].filter(Boolean).join("\n");

  await sendTelegramMessage(text);
}

async function notifyTelegramNewConsultation(consultation: any) {
  const text = [
    "YÊU CẦU TƯ VẤN MỚI - THẢO DƯỢC HƯƠNG VŨ",
    `Khách: ${consultation.name}`,
    `SĐT: ${consultation.phone}`,
    `Thời gian: ${consultation.createdAt}`,
    consultation.message ? `Nội dung: ${consultation.message}` : "",
  ].filter(Boolean).join("\n");

  await sendTelegramMessage(text);
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // Let's set request limits larger, as images are uploaded in base64 format.
  app.use(express.json({ limit: "60mb" }));
  app.use(express.urlencoded({ limit: "60mb", extended: true }));

  // API Routes
  app.get("/api/data", async (req, res) => {
    const db = await loadDB();
    res.json(getAdminSession(req) ? db : getPublicDB(db));
  });

  app.get("/api/hero-image/:index", async (req, res) => {
    const index = Number(req.params.index || 0);
    const db = await loadDB();
    const images = getHeroImagesArray(db.heroImage);
    const image = images[index];

    if (!image) {
      res.status(404).send("Hero image not found");
      return;
    }

    if (!image.startsWith("data:")) {
      res.redirect(image);
      return;
    }

    const parsed = parseDataUrlImage(image);
    if (!parsed) {
      res.status(400).send("Invalid hero image");
      return;
    }

    res.setHeader("Content-Type", parsed.mimeType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(parsed.buffer);
  });

  app.post("/api/admin/login", (req, res) => {
    const { phone, pin } = req.body || {};
    const adminPhone = process.env.ADMIN_PHONE || (process.env.NODE_ENV === "production" ? "" : "0569315315");
    const adminPin = process.env.ADMIN_PIN || (process.env.NODE_ENV === "production" ? "" : "28082004");

    if (!adminPhone || !adminPin) {
      res.status(500).json({ success: false, error: "Admin credentials are not configured" });
      return;
    }

    if (safeCompare(String(phone || "").trim(), adminPhone) && safeCompare(String(pin || "").trim(), adminPin)) {
      const session = createAdminSession();
      setAdminCookie(res, session.token, session.expiresAt);
      res.json({ success: true, expiresAt: session.expiresAt });
      return;
    }

    res.status(401).json({ success: false, error: "Invalid admin credentials" });
  });

  app.post("/api/admin/logout", (req, res) => {
    const session = getAdminSession(req);
    if (session) adminSessions.delete(session.token);
    clearAdminCookie(res);
    res.json({ success: true });
  });

  app.get("/api/admin/session", (req, res) => {
    const session = getAdminSession(req);
    if (!session) {
      res.status(401).json({ success: false });
      return;
    }

    res.json({ success: true, expiresAt: session.expiresAt });
  });

  app.post("/api/products", requireAdmin, async (req, res) => {
    const { products } = req.body;
    if (!Array.isArray(products)) {
       res.status(400).json({ error: "Invalid products array" });
       return;
    }
    const db = await loadDB();
    db.products = products;
    await saveDB(db);
    res.json({ success: true, products: db.products });
  });

  app.post("/api/categories", requireAdmin, async (req, res) => {
    const { categories } = req.body;
    if (!Array.isArray(categories)) {
       res.status(400).json({ error: "Invalid categories array" });
       return;
    }
    const db = await loadDB();
    db.categories = categories;
    await saveDB(db);
    res.json({ success: true, categories: db.categories });
  });

  app.post("/api/about_us", requireAdmin, async (req, res) => {
    const { aboutUs } = req.body;
    if (!aboutUs) {
       res.status(400).json({ error: "Invalid aboutUs data" });
       return;
    }
    const db = await loadDB();
    db.aboutUs = aboutUs;
    await saveDB(db);
    res.json({ success: true, aboutUs: db.aboutUs });
  });

  app.post("/api/contact", requireAdmin, async (req, res) => {
    const { contact } = req.body;
    if (!contact) {
       res.status(400).json({ error: "Invalid contact data" });
       return;
    }
    const db = await loadDB();
    db.contact = contact;
    await saveDB(db);
    res.json({ success: true, contact: db.contact });
  });

  app.post("/api/hero_image", requireAdmin, async (req, res) => {
    const { heroImage } = req.body;
    if (typeof heroImage !== "string") {
       res.status(400).json({ error: "Invalid heroImage string" });
       return;
    }
    const db = await loadDB();
    db.heroImage = heroImage;
    await saveDB(db);
    res.json({ success: true, heroImage: db.heroImage });
  });

  app.get("/api/orders", async (req, res) => {
    const db = await loadDB();
    res.json(db.orders);
  });

  app.post("/api/orders", async (req, res) => {
    const { order } = req.body;
    if (!order) {
       res.status(400).json({ error: "Invalid order data" });
       return;
    }
    const db = await loadDB();
    db.orders = [order, ...db.orders];
    await saveDB(db);
    void notifyTelegramNewOrder(order);
    res.json({ success: true, orders: db.orders });
  });

  app.post("/api/set_orders", requireAdmin, async (req, res) => {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      res.status(400).json({ error: "Invalid orders array" });
      return;
    }
    const db = await loadDB();
    db.orders = orders;
    await saveDB(db);
    res.json({ success: true, orders: db.orders });
  });

  app.post("/api/consultations", async (req, res) => {
    const { consultation } = req.body;
    if (!consultation) {
      res.status(400).json({ error: "Invalid consultation data" });
      return;
    }
    const db = await loadDB();
    db.consultations = [consultation, ...(db.consultations || [])];
    await saveDB(db);
    void notifyTelegramNewConsultation(consultation);
    res.json({ success: true, consultations: db.consultations });
  });

  app.post("/api/telegram/test", requireAdmin, async (req, res) => {
    const ok = await sendTelegramMessage(
      "Tin nhắn test Telegram từ website Thảo Dược Hương Vũ. Kết nối thông báo đã hoạt động."
    );

    if (!ok) {
      res.status(400).json({
        success: false,
        error: "Telegram chưa gửi được. Kiểm tra TELEGRAM_NOTIFY_ENABLED, TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID.",
      });
      return;
    }

    res.json({ success: true });
  });

  app.post("/api/set_consultations", requireAdmin, async (req, res) => {
    const { consultations } = req.body;
    if (!Array.isArray(consultations)) {
      res.status(400).json({ error: "Invalid consultations array" });
      return;
    }
    const db = await loadDB();
    db.consultations = consultations;
    await saveDB(db);
    res.json({ success: true, consultations: db.consultations });
  });

  app.post("/api/reset", requireAdmin, async (req, res) => {
    const freshDB = getDefaultDB();
    await saveDB(freshDB);
    res.json({ success: true, data: freshDB });
  });

  // Vite middle-layer integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
