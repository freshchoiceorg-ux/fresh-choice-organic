import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  LogOut,
  Package,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { EggCrackLoader } from "../components/EggCrackLoader";
import { OTPLoginModal } from "../components/OTPLoginModal";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";
import { useGetOrdersByPhone } from "../hooks/useQueries";

function getStatusStyle(status: string) {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "out for delivery":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function formatDate(createdAt: bigint) {
  const ms = Number(createdAt);
  const date = ms > 1e15 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MyOrdersPage() {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();
  const { lang } = useLang();
  const activeLang = lang ?? "en";
  const [loginOpen, setLoginOpen] = useState(false);

  const {
    data: orders = [],
    isLoading,
    refetch,
    isFetching,
  } = useGetOrdersByPhone(user?.phone ?? null);

  const sortedOrders = [...orders].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );

  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-border"
        style={{ background: "oklch(0.97 0.018 80 / 0.92)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="p-2 rounded-xl bg-secondary hover:bg-accent transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-forest/15 scale-125 blur-sm" />
                <img
                  src="/assets/uploads/InShot_20260219_002725822-5.jpg"
                  alt="Fresh Choice Organic"
                  className="relative w-9 h-9 rounded-full object-cover border-2 border-forest ring-1 ring-forest/30"
                />
              </div>
              <div>
                <h1 className="font-display font-bold text-foreground text-lg leading-none">
                  {t("myOrders", activeLang)}
                </h1>
                {isLoggedIn && (
                  <p className="text-xs text-muted-foreground">
                    +91 {user?.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <>
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="p-2 rounded-xl bg-secondary hover:bg-accent transition-colors"
                  aria-label="Refresh orders"
                >
                  <RefreshCw
                    className={`w-4 h-4 text-forest ${isFetching ? "animate-spin" : ""}`}
                  />
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors border border-red-100"
                  aria-label="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {t("logout", activeLang)}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Not logged in state */}
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-5 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-forest/8 flex items-center justify-center border border-forest/15">
              <Package className="w-10 h-10 text-forest/50" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-foreground">
                {t("loginToViewOrders", activeLang)}
              </h2>
              <p className="text-muted-foreground text-sm mt-1.5 max-w-xs mx-auto">
                {t("enterPhone", activeLang)}{" "}
                {activeLang === "te"
                  ? "మీ ఆర్డర్ ట్రాక్ చేయండి"
                  : "to track your orders"}
              </p>
            </div>
            <Button
              onClick={() => setLoginOpen(true)}
              className="bg-forest text-white hover:bg-forest/90 rounded-xl h-11 px-8 font-semibold gap-2"
            >
              <span>📱</span>
              {t("login", activeLang)}
            </Button>
          </motion.div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <EggCrackLoader size="lg" label={t("loadingOrders", activeLang)} />
          </div>
        ) : sortedOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground">
              {t("noOrdersYet", activeLang)}
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {activeLang === "te"
                ? "మీరు ఇంకా ఆర్డర్ చేయలేదు. ఇప్పుడే షాప్ చేయండి!"
                : "You haven't placed any orders yet. Shop now!"}
            </p>
            <Button
              onClick={() => navigate({ to: "/" })}
              className="bg-forest text-white hover:bg-forest/90 rounded-xl mt-2 gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {activeLang === "te" ? "షాప్ చేయండి" : "Shop Now"}
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Summary bar */}
            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-medium text-muted-foreground">
                {sortedOrders.length}{" "}
                {sortedOrders.length === 1
                  ? t("totalOrderSingular", activeLang)
                  : t("totalOrderPlural", activeLang)}
              </p>
            </div>

            {sortedOrders.map((order, idx) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
              >
                {/* Order Header */}
                <div className="px-5 py-3 border-b border-border flex flex-wrap items-center justify-between gap-2 bg-secondary/30">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground font-semibold">
                      #{order.orderId.toString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(order.status)}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* Order Body */}
                <div className="px-5 py-4 space-y-3">
                  {/* Items */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
                      {t("items", activeLang)}
                    </p>
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li
                          key={item.productId}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-foreground font-medium">
                            {item.productName}
                            <span className="text-muted-foreground text-xs ml-1.5">
                              ×{item.quantity.toString()}
                            </span>
                          </span>
                          <span className="text-forest font-semibold">
                            ₹{Number(item.totalPrice).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Summary row */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      {order.paymentMethod}
                      {order.paymentMethod === "UPI" &&
                        order.upiTransactionRef && (
                          <span className="block font-mono text-xs">
                            Ref: {order.upiTransactionRef}
                          </span>
                        )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {t("total", activeLang)}
                      </p>
                      <p className="font-display font-bold text-lg text-forest">
                        ₹{Number(order.totalAmount).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Delivery address */}
                  <p className="text-xs text-muted-foreground truncate">
                    📍 {order.address}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <OTPLoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}
