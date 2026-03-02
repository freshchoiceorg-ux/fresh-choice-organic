import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Copy,
  Maximize2,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { OrderItem } from "../backend.d.ts";
import { EggCrackLoader } from "../components/EggCrackLoader";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";
import { usePlaceOrder } from "../hooks/useQueries";

type PaymentMethod = "UPI" | "COD";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const { lang } = useLang();
  const activeLang = lang ?? "en";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [upiRef, setUpiRef] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const UPI_ID = "9392226360-3@ibl";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success(t("upiCopied", activeLang));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = t("fullNameRequired", activeLang);
    if (!phone.trim()) newErrors.phone = t("phoneRequired", activeLang);
    else if (!/^[6-9]\d{9}$/.test(phone.trim()))
      newErrors.phone = t("validPhone", activeLang);
    if (!address.trim()) newErrors.address = t("addressRequired", activeLang);
    if (paymentMethod === "UPI" && !upiRef.trim())
      newErrors.upiRef = t("enterUpiRef", activeLang);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error(t("pleaseFixErrors", activeLang));
      return;
    }

    if (items.length === 0) {
      toast.error(t("cartIsEmpty", activeLang));
      return;
    }

    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: BigInt(item.quantity),
        unitPrice: BigInt(item.product.price),
        totalPrice: BigInt(item.product.price * item.quantity),
      }));

      const orderId = await placeOrder({
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        items: orderItems,
        totalAmount: BigInt(totalAmount),
        paymentMethod,
        upiTransactionRef: paymentMethod === "UPI" ? upiRef.trim() : "",
      });

      clearCart();
      navigate({
        to: "/order-confirmation/$orderId",
        params: { orderId: orderId.toString() },
      });
    } catch (_err) {
      toast.error(t("failedToPlaceOrder", activeLang));
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
        <div className="text-5xl">🛒</div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {t("cartIsEmpty", activeLang)}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t("addBeforeCheckout", activeLang)}
        </p>
        <Button
          onClick={() => navigate({ to: "/" })}
          className="bg-forest text-white hover:bg-forest/90 rounded-xl mt-2"
        >
          {t("browseProducts", activeLang)}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-border"
        style={{ background: "oklch(0.97 0.018 80 / 0.95)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
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
              <h1 className="font-display font-bold text-foreground text-base leading-none">
                {t("appName", activeLang)}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("checkout", activeLang)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Order Summary */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display font-bold text-foreground text-base">
              {t("orderSummary", activeLang)}
            </h2>
          </div>
          <div className="px-5 py-3 space-y-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover border border-border"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {t(`product.${item.product.id}.name`, activeLang)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.product.price} × {item.quantity}{" "}
                      {item.product.unit}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-forest">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border bg-secondary/50 flex items-center justify-between">
            <span className="font-semibold text-foreground">
              {t("total", activeLang)}
            </span>
            <span className="font-display font-bold text-xl text-forest">
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>
        </motion.section>

        {/* Customer Details */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card rounded-2xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display font-bold text-foreground text-base">
              {t("deliveryDetails", activeLang)}
            </h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                {t("fullName", activeLang)}
              </Label>
              <Input
                id="name"
                placeholder="Ramesh Kumar"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                }}
                className={`rounded-xl h-11 ${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                {t("phoneNumber", activeLang)}
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center justify-center bg-secondary border border-input rounded-xl px-3 text-sm text-muted-foreground font-medium">
                  +91
                </div>
                <Input
                  id="phone"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
                  }}
                  className={`rounded-xl h-11 flex-1 ${errors.phone ? "border-destructive" : ""}`}
                  type="tel"
                  inputMode="numeric"
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-foreground"
              >
                {t("deliveryAddress", activeLang)}
              </Label>
              <Textarea
                id="address"
                placeholder="House no, Street, Area, City, Pincode"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors((p) => ({ ...p, address: "" }));
                }}
                className={`rounded-xl resize-none min-h-[90px] ${errors.address ? "border-destructive" : ""}`}
              />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address}</p>
              )}
            </div>
          </div>
        </motion.section>

        {/* Payment Method */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-card rounded-2xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display font-bold text-foreground text-base">
              {t("paymentMethod", activeLang)}
            </h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            {/* UPI Option */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === "UPI"
                  ? "border-forest bg-forest/5"
                  : "border-border bg-secondary/30 hover:border-forest/50"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={() => setPaymentMethod("UPI")}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                  paymentMethod === "UPI"
                    ? "border-forest bg-forest"
                    : "border-muted-foreground"
                }`}
              >
                {paymentMethod === "UPI" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-forest" />
                  <span className="font-semibold text-foreground text-sm">
                    {t("upiPayment", activeLang)}
                  </span>
                  <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full font-medium">
                    {t("recommended", activeLang)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("payViaUpi", activeLang)}
                </p>
              </div>
            </label>

            {/* UPI Payment Details */}
            {paymentMethod === "UPI" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mx-1"
              >
                <div className="bg-gradient-to-br from-forest/8 to-honey/10 rounded-xl border border-forest/20 p-4 space-y-4">
                  {/* Real QR Code with golden shimmer */}
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      {t("scanAndPay", activeLang)}
                    </p>
                    <div className="relative inline-block">
                      {/* Animated golden shimmer ring */}
                      <div
                        className="absolute -inset-1.5 rounded-2xl animate-pulse"
                        style={{
                          background:
                            "conic-gradient(from 0deg, oklch(0.75 0.18 75), oklch(0.85 0.20 85), oklch(0.92 0.15 90), oklch(0.75 0.18 75))",
                          padding: "2px",
                          borderRadius: "18px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setQrModalOpen(true)}
                        className="relative block p-3 bg-white rounded-2xl border-2 border-amber-300/60 shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
                        aria-label="Tap to enlarge QR code"
                      >
                        <img
                          src="/assets/uploads/1772397069041-2.jpg"
                          alt="UPI QR Code"
                          className="w-48 h-48 object-contain rounded-xl"
                        />
                        {/* Enlarge hint overlay */}
                        <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl">
                          <span className="flex items-center gap-1 text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Maximize2 className="w-3 h-3" />
                            {t("tapToEnlarge", activeLang)}
                          </span>
                        </div>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQrModalOpen(true)}
                      className="flex items-center gap-1 mx-auto mt-2 text-xs text-amber-700 font-medium hover:text-amber-900 transition-colors"
                    >
                      <Maximize2 className="w-3 h-3" />
                      {t("tapToEnlarge", activeLang)}
                    </button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Scan with PhonePe / GPay / Paytm / any UPI app
                    </p>
                  </div>

                  {/* QR Enlarge Modal */}
                  <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
                    <DialogContent className="max-w-xs mx-auto rounded-3xl border-0 p-6 bg-white shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-center text-base font-bold text-foreground">
                          {t("scanToPay", activeLang)}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="relative mt-2">
                        <div
                          className="absolute -inset-2 rounded-3xl animate-pulse"
                          style={{
                            background:
                              "conic-gradient(from 0deg, oklch(0.75 0.18 75), oklch(0.85 0.20 85), oklch(0.92 0.15 90), oklch(0.75 0.18 75))",
                          }}
                        />
                        <div className="relative bg-white rounded-2xl p-3">
                          <img
                            src="/assets/uploads/1772397069041-2.jpg"
                            alt="UPI QR Code — enlarged"
                            className="w-full aspect-square object-contain rounded-xl"
                          />
                        </div>
                      </div>
                      <p className="text-center text-xs text-muted-foreground mt-3">
                        {t("openUpiAndScan", activeLang)} ₹
                        {totalAmount.toLocaleString()}
                      </p>
                      <p className="text-center text-xs font-mono font-bold text-amber-700 mt-1">
                        {UPI_ID}
                      </p>
                    </DialogContent>
                  </Dialog>

                  <Separator />

                  {/* UPI ID */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {t("orPayToUpiId", activeLang)}
                    </p>
                    <div className="flex items-center gap-2 bg-white rounded-xl border border-forest/20 px-4 py-3">
                      <span className="font-mono font-bold text-forest text-sm flex-1 break-all">
                        {UPI_ID}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUPI}
                        className="text-muted-foreground hover:text-forest transition-colors p-1 flex-shrink-0"
                        aria-label="Copy UPI ID"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t("hdfcBankUpi", activeLang)}
                    </p>
                  </div>

                  <div className="bg-honey/10 rounded-xl p-3 border border-honey/30">
                    <p className="text-xs text-earth font-medium">
                      💡 {t("afterPaymentEnterUtr", activeLang)}
                    </p>
                  </div>

                  {/* UPI Ref Input */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="upiRef"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("upiTransactionRef", activeLang)}
                    </Label>
                    <Input
                      id="upiRef"
                      placeholder="e.g. 425236789012"
                      value={upiRef}
                      onChange={(e) => {
                        setUpiRef(e.target.value);
                        if (errors.upiRef)
                          setErrors((p) => ({ ...p, upiRef: "" }));
                      }}
                      className={`rounded-xl h-11 font-mono ${errors.upiRef ? "border-destructive" : ""}`}
                    />
                    {errors.upiRef && (
                      <p className="text-xs text-destructive">
                        {errors.upiRef}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* COD Option */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === "COD"
                  ? "border-forest bg-forest/5"
                  : "border-border bg-secondary/30 hover:border-forest/50"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                  paymentMethod === "COD"
                    ? "border-forest bg-forest"
                    : "border-muted-foreground"
                }`}
              >
                {paymentMethod === "COD" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base">💵</span>
                  <span className="font-semibold text-foreground text-sm">
                    {t("cashOnDelivery", activeLang)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("payWithCash", activeLang)}
                </p>
              </div>
            </label>
          </div>
        </motion.section>

        {/* Place Order Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full h-14 text-base font-semibold rounded-2xl bg-forest text-white hover:bg-forest/90 shadow-card-hover"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <EggCrackLoader size="sm" label="" inline />
                {t("placingOrder", activeLang)}
              </span>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                {t("placeOrder", activeLang)} · ₹{totalAmount.toLocaleString()}
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            {t("agreeToTerms", activeLang)}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
