import { ArrowRight, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";

interface CartBarProps {
  onCheckout: () => void;
}

export function CartBar({ onCheckout }: CartBarProps) {
  const { items, totalItems, totalAmount } = useCart();
  const { lang } = useLang();
  const activeLang = lang ?? "en";

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-inset"
        >
          <div
            className="max-w-xl mx-auto rounded-2xl shadow-amber overflow-hidden"
            style={{
              background: "oklch(0.38 0.1 145)",
            }}
          >
            <button
              type="button"
              onClick={onCheckout}
              className="w-full flex items-center justify-between px-5 py-4 text-white group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-honey text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-80">
                    {items.length}{" "}
                    {items.length === 1
                      ? t("itemsInCartSingular", activeLang)
                      : t("itemsInCartPlural", activeLang)}
                  </div>
                  <div className="font-bold text-base font-display">
                    ₹{totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 font-semibold text-sm bg-white/20 px-4 py-2 rounded-xl group-hover:bg-white/30 transition-colors">
                {t("checkout", activeLang)}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
