import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, MapPin, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { EggCrackLoader } from "../components/EggCrackLoader";
import { OTPLoginModal } from "../components/OTPLoginModal";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";
import { useGetOrderById } from "../hooks/useQueries";

export function OrderConfirmationPage() {
  const { orderId } = useParams({ strict: false }) as { orderId: string };
  const navigate = useNavigate();
  const { data: order, isLoading } = useGetOrderById(orderId);
  const { lang } = useLang();
  const activeLang = lang ?? "en";
  const { isLoggedIn } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <EggCrackLoader size="lg" label={t("loadingYourOrder", activeLang)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-border"
        style={{ background: "oklch(0.97 0.018 80 / 0.92)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="p-2 rounded-xl bg-secondary hover:bg-accent transition-colors"
            aria-label="Go home"
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
            <h1 className="font-display font-bold text-foreground text-lg">
              {t("orderConfirmed", activeLang)}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
          className="text-center py-6"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-10 h-10 text-forest" />
            </motion.div>
            {/* Ripple */}
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 rounded-full border-2 border-forest"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-display font-bold text-2xl text-foreground mt-4">
              {t("orderPlaced", activeLang)}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">
              {t("productsOnWay", activeLang)}
            </p>
          </motion.div>

          {/* Order ID Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 inline-block bg-forest/10 border border-forest/20 rounded-2xl px-6 py-3"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              {t("orderId", activeLang)}
            </p>
            <p className="font-mono font-bold text-forest text-sm mt-0.5">
              #{orderId}
            </p>
          </motion.div>
        </motion.div>

        {/* Order Details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-forest" />
              <h3 className="font-display font-bold text-foreground text-base">
                {t("orderDetails", activeLang)}
              </h3>
            </div>

            {/* Items */}
            <div className="px-5 py-3 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.unitPrice.toString()} × {item.quantity.toString()}
                    </p>
                  </div>
                  <span className="font-semibold text-forest">
                    ₹{Number(item.totalPrice).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            {/* Summary */}
            <div className="px-5 py-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {t("totalAmount", activeLang)}
                </span>
                <span className="font-display font-bold text-lg text-forest">
                  ₹{Number(order.totalAmount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {t("payment", activeLang)}
                </span>
                <span className="font-medium text-foreground text-sm">
                  {order.paymentMethod}
                  {order.paymentMethod === "UPI" && order.upiTransactionRef && (
                    <span className="text-xs text-muted-foreground ml-1 font-mono">
                      (Ref: {order.upiTransactionRef})
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {t("deliveryTo", activeLang)}
                </span>
                <span className="font-medium text-foreground text-sm text-right max-w-[60%]">
                  {order.customerName}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="px-5 py-3 border-t border-border bg-secondary/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("status", activeLang)}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {order.status || "Pending"}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate({ to: "/" })}
            className="w-full h-12 rounded-2xl bg-forest text-white hover:bg-forest/90 font-semibold gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {t("continueShopping", activeLang)}
          </Button>
          <Button
            onClick={() => {
              if (isLoggedIn) {
                navigate({ to: "/my-orders" });
              } else {
                setLoginOpen(true);
              }
            }}
            variant="outline"
            className="w-full h-12 rounded-2xl border-forest/30 text-forest hover:bg-forest/5 font-semibold gap-2"
          >
            <MapPin className="w-4 h-4" />
            {t("trackMyOrder", activeLang)}
          </Button>
        </motion.div>
      </main>

      <OTPLoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}
