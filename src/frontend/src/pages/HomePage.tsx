import { useNavigate } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ShoppingCart, Star, Truck } from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { CartBar } from "../components/CartBar";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LanguageContext";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { t } from "../data/translations";

export function HomePage() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { lang, setLang } = useLang();
  const activeLang = lang ?? "en";

  const handleCheckout = () => {
    navigate({ to: "/checkout" });
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-border"
        style={{ background: "oklch(0.97 0.018 80 / 0.95)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo with glow ring */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-forest/20 scale-125 blur-sm" />
              <img
                src="/assets/uploads/InShot_20260219_002725822-5.jpg"
                alt="Fresh Choice Organic"
                className="relative w-11 h-11 rounded-full object-cover border-2 border-forest ring-2 ring-forest/40 shadow-md"
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg leading-none tracking-tight">
                {t("appName", activeLang)}
              </h1>
              <p className="text-xs text-forest/70 font-medium">
                {t("farmToDoorstep", activeLang)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex items-center bg-secondary rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeLang === "en"
                    ? "bg-forest text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <span className="text-border text-xs">|</span>
              <button
                type="button"
                onClick={() => setLang("te")}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeLang === "te"
                    ? "bg-forest text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                TE
              </button>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/licenses" })}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest/8 hover:bg-forest/12 text-forest text-xs font-medium transition-colors border border-forest/20"
            >
              <span>📜</span>
              {t("certifications", activeLang)}
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              className="relative p-2.5 rounded-xl bg-secondary hover:bg-accent transition-colors"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5 text-forest" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-forest text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <img
          src="/assets/generated/farm-hero.dim_1200x400.jpg"
          alt="Fresh Farm Products"
          className="w-full h-52 sm:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/50 to-transparent flex items-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Logo in hero */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/30 scale-110 blur-sm" />
                <img
                  src="/assets/uploads/InShot_20260219_002725822-5.jpg"
                  alt="Fresh Choice Organic Logo"
                  className="relative w-14 h-14 rounded-full object-cover border-2 border-white/80 shadow-lg"
                />
              </div>
              <div>
                <h2 className="font-display text-white text-xl sm:text-2xl font-bold leading-tight">
                  {t("appName", activeLang)}
                </h2>
                <p className="text-white/75 text-sm">
                  {t("heroTitle", activeLang)}
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                <Truck className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-xs font-medium">
                  {t("freeDelivery", activeLang)}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5 text-honey fill-honey" />
                <span className="text-white text-xs font-medium">
                  {t("rating", activeLang)}
                </span>
              </div>
              {/* FSSAI Badge */}
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                <img
                  src="/assets/uploads/food-safety-standards-authority-of-india-fssai-license-certification-services-909-1.jpg"
                  alt="FSSAI Certified"
                  className="h-4 w-auto object-contain"
                />
                <span className="text-white text-xs font-medium">
                  {t("fssaiCertified", activeLang)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {CATEGORIES.map((category) => {
          const products = PRODUCTS.filter((p) => p.category === category);
          const categoryIndex = CATEGORIES.indexOf(category);
          const icons: Record<string, string> = {
            Eggs: "🥚",
            Honey: "🍯",
            Chicken: "🍗",
          };
          const categoryKeys: Record<string, string> = {
            Eggs: "eggs",
            Honey: "honey",
            Chicken: "chicken",
          };

          return (
            <section key={category} className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.15, duration: 0.4 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="text-2xl">{icons[category]}</span>
                <div>
                  <h2
                    className="font-display font-bold text-xl"
                    style={{
                      color:
                        category === "Honey"
                          ? "oklch(0.55 0.15 75)"
                          : undefined,
                    }}
                  >
                    {t(categoryKeys[category], activeLang)}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {products.length}{" "}
                    {products.length !== 1
                      ? t("productsAvailablePlural", activeLang)
                      : t("productsAvailableSingular", activeLang)}
                  </p>
                </div>
                <div
                  className="flex-1 h-px ml-2"
                  style={{
                    background:
                      category === "Honey"
                        ? "linear-gradient(to right, oklch(0.75 0.18 80), oklch(0.88 0.12 90), transparent)"
                        : undefined,
                    backgroundColor:
                      category === "Honey" ? undefined : "var(--border)",
                  }}
                />
                {category === "Honey" && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.95 0.08 85)",
                      color: "oklch(0.45 0.15 75)",
                      border: "1px solid oklch(0.80 0.15 80)",
                    }}
                  >
                    🍯 {t("rawUnfiltered", activeLang)}
                  </span>
                )}
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={categoryIndex * 3 + i}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Rich Footer */}
      <footer className="border-t border-border mt-4 bg-gradient-to-b from-transparent to-forest/5">
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {/* Branding Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 sm:items-start sm:justify-between">
            {/* Brand Info */}
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-forest/15 scale-125 blur-sm" />
                <img
                  src="/assets/uploads/InShot_20260219_002725822-5.jpg"
                  alt="Fresh Choice Organic"
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-forest/50 shadow-md"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg leading-none mb-1">
                  {t("appName", activeLang)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                  {t("tagline", activeLang)}
                </p>
                {/* FSSAI Badge */}
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src="/assets/uploads/food-safety-standards-authority-of-india-fssai-license-certification-services-909-1.jpg"
                    alt="FSSAI Certified"
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-xs font-semibold text-forest">
                    {t("fssaiCertified", activeLang)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                {t("contactUs", activeLang)}
              </h4>
              <a
                href="tel:+917801099660"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-forest transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                +91 7801099660
              </a>
              <a
                href="mailto:Freshchoiceorg@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-forest transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Freshchoiceorg@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>{t("farmFreshDeliveries", activeLang)}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                {t("quickLinks", activeLang)}
              </h4>
              <button
                type="button"
                onClick={() => navigate({ to: "/licenses" })}
                className="block text-sm text-muted-foreground hover:text-forest transition-colors text-left"
              >
                📜 {t("certifications", activeLang)}
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/admin/orders" })}
                className="block text-sm text-muted-foreground hover:text-forest transition-colors text-left"
              >
                📦 {t("allOrders", activeLang)}
              </button>
            </div>
          </div>

          {/* Social & QR Section */}
          <div className="border-t border-border pt-6 grid sm:grid-cols-2 gap-6">
            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
                {t("followUs", activeLang)}
              </h4>
              <div className="flex items-center gap-3 mb-4">
                <a
                  href="https://www.instagram.com/freshchoiceorganic?igsh=cnV3MDdoY2ltNGs3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
                  aria-label="Follow on Instagram"
                >
                  <SiInstagram className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/1J5Bo4Za7w/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  aria-label="Follow on Facebook"
                >
                  <SiFacebook className="w-4 h-4" />
                  Facebook
                </a>
              </div>
              {/* WhatsApp link */}
              <a
                href="https://wa.me/917801099660"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors shadow-sm"
                aria-label="Contact on WhatsApp"
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>

            {/* QR Codes */}
            <div>
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
                {t("scanToConnect", activeLang)}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp QR */}
                <div className="bg-white rounded-xl border border-border p-2 text-center shadow-xs">
                  <img
                    src="/assets/uploads/1771904875975-2.jpg"
                    alt="WhatsApp QR Code"
                    className="w-full aspect-square object-contain rounded-lg"
                  />
                  <div className="flex items-center justify-center gap-1 mt-1.5">
                    <SiWhatsapp className="w-3 h-3 text-green-500" />
                    <p className="text-xs text-muted-foreground font-medium">
                      {t("scanToWhatsapp", activeLang)}
                    </p>
                  </div>
                </div>
                {/* Instagram QR */}
                <div className="bg-white rounded-xl border border-border p-2 text-center shadow-xs">
                  <img
                    src="/assets/uploads/IMG_20260223_002325_098-3.png"
                    alt="Instagram QR Code"
                    className="w-full aspect-square object-contain rounded-lg"
                  />
                  <div className="flex items-center justify-center gap-1 mt-1.5">
                    <SiInstagram className="w-3 h-3 text-pink-500" />
                    <p className="text-xs text-muted-foreground font-medium">
                      {t("instagramHandle", activeLang)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {t("appName", activeLang)}. All
              rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-forest transition-colors"
              >
                {t("builtWith", activeLang)}
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Cart Bar */}
      <CartBar onCheckout={handleCheckout} />
    </div>
  );
}
