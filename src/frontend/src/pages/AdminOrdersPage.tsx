import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ChevronUp,
  LogOut,
  Package,
  RefreshCw,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { EggCrackLoader } from "../components/EggCrackLoader";
import { OTPLoginModal } from "../components/OTPLoginModal";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";
import { useGetAllOrders, useUpdateOrderStatus } from "../hooks/useQueries";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

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
  // Handle nanoseconds from IC
  const date = ms > 1e15 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminOrdersPage() {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [notifExpanded, setNotifExpanded] = useState(false);
  const {
    data: orders = [],
    isLoading,
    refetch,
    isFetching,
  } = useGetAllOrders();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();
  const { lang } = useLang();
  const activeLang = lang ?? "en";

  // Admin guard – show login screen if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl border border-border shadow-card p-8 max-w-sm w-full text-center space-y-5"
        >
          <div className="relative inline-flex mx-auto">
            <div className="absolute inset-0 rounded-full bg-forest/15 scale-110 blur-sm" />
            <img
              src="/assets/uploads/InShot_20260219_002725822-5.jpg"
              alt="Fresh Choice Organic"
              className="relative w-20 h-20 rounded-full object-cover border-2 border-forest ring-2 ring-forest/30"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-forest" />
              <h2 className="font-display font-bold text-xl text-foreground">
                {t("adminLogin", activeLang)}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("adminAccessRequired", activeLang)}
            </p>
          </div>

          <Button
            onClick={() => setLoginOpen(true)}
            className="w-full h-12 rounded-xl bg-forest text-white hover:bg-forest/90 font-semibold gap-2"
          >
            <span>📱</span>
            {t("loginWithCompanyNumber", activeLang)}
          </Button>

          <div className="bg-forest/5 border border-forest/15 rounded-xl px-3 py-2.5">
            <p className="text-xs text-forest/80">
              🔑{" "}
              {activeLang === "te"
                ? "కంపెనీ నంబర్ వాడండి: "
                : "Use company number: "}
              <span className="font-mono font-bold">7801099660</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="text-sm text-muted-foreground hover:text-forest transition-colors"
          >
            ← {activeLang === "te" ? "హోమ్‌కి వెళ్ళు" : "Back to Home"}
          </button>
        </motion.div>
        <OTPLoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      </div>
    );
  }

  const handleStatusChange = async (orderId: bigint, newStatus: string) => {
    try {
      await updateStatus({ orderId, newStatus });
      toast.success(`${t("orderStatusUpdated", activeLang)} ${newStatus}`);
    } catch {
      toast.error(t("failedToUpdateStatus", activeLang));
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    return Number(b.createdAt) - Number(a.createdAt);
  });

  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-border"
        style={{ background: "oklch(0.97 0.018 80 / 0.92)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
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
                  {t("allOrders", activeLang)}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {orders.length}{" "}
                  {orders.length === 1
                    ? t("totalOrderSingular", activeLang)
                    : t("totalOrderPlural", activeLang)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium transition-colors border border-red-100"
            >
              <LogOut className="w-3.5 h-3.5" />
              {t("logout", activeLang)}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {isLoading ? (
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
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground">
              {t("noOrdersYet", activeLang)}
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {t("ordersWillAppear", activeLang)}
            </p>
            <Button
              onClick={() => navigate({ to: "/" })}
              className="bg-forest text-white hover:bg-forest/90 rounded-xl mt-2"
            >
              {t("goToShop", activeLang)}
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
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
                    <span className="font-mono text-xs text-muted-foreground">
                      #{order.orderId}
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
                <div className="px-5 py-4 grid sm:grid-cols-2 gap-4">
                  {/* Customer Info */}
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                      {t("customer", activeLang)}
                    </p>
                    <p className="font-semibold text-foreground">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +91 {order.phone}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {order.address}
                    </p>
                  </div>

                  {/* Order Info */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                          {t("items", activeLang)}
                        </p>
                        <ul className="mt-1 space-y-0.5">
                          {order.items.map((item) => (
                            <li
                              key={item.productId}
                              className="text-sm text-foreground"
                            >
                              {item.productName}
                              <span className="text-muted-foreground text-xs ml-1">
                                ×{item.quantity.toString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                          {t("total", activeLang)}
                        </p>
                        <p className="font-display font-bold text-lg text-forest">
                          ₹{Number(order.totalAmount).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {order.paymentMethod}
                          {order.paymentMethod === "UPI" &&
                            order.upiTransactionRef && (
                              <span className="block font-mono text-xs">
                                Ref: {order.upiTransactionRef}
                              </span>
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update Status */}
                <div className="px-5 py-3 border-t border-border bg-secondary/20 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground font-medium">
                    {t("updateStatus", activeLang)}
                  </p>
                  <Select
                    defaultValue={order.status || "Pending"}
                    onValueChange={(val) =>
                      handleStatusChange(order.orderId, val)
                    }
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-48 h-9 rounded-xl text-sm bg-white border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s} className="text-sm">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Notification Log */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button
            type="button"
            onClick={() => setNotifExpanded((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-forest" />
              <span className="font-semibold text-sm text-foreground">
                {t("orderNotifications", activeLang)}
              </span>
              <span className="bg-forest/10 text-forest text-xs font-bold px-2 py-0.5 rounded-full">
                {orders.length} {activeLang === "te" ? "ఆర్డర్లు" : "orders"}
              </span>
            </div>
            {notifExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {notifExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border px-5 py-4 space-y-3"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                <p className="text-sm text-blue-800 font-medium">
                  📧 {t("notificationsInfo", activeLang)}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {activeLang === "te"
                    ? "ఇమెయిల్ సర్వీస్ యాక్టివేట్ అయినప్పుడు, ఈ నోటిఫికేషన్లు స్వయంచాలకంగా డెలివరీ చేయబడతాయి."
                    : "When email service is activated, these will be delivered automatically."}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-display font-bold text-forest">
                    {orders.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activeLang === "te" ? "మొత్తం ఆర్డర్లు" : "Total Orders"}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-display font-bold text-green-600">
                    {orders.filter((o) => o.status === "Delivered").length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activeLang === "te" ? "డెలివరీ అయినవి" : "Delivered"}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-display font-bold text-amber-600">
                    {
                      orders.filter(
                        (o) =>
                          o.status === "Pending" || o.status === "Confirmed",
                      ).length
                    }
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activeLang === "te" ? "పెండింగ్" : "Pending"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Freshchoiceorg@gmail.com
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-forest transition-colors"
          >
            {t("builtWith", activeLang)}
          </a>
        </p>
      </footer>
    </div>
  );
}
