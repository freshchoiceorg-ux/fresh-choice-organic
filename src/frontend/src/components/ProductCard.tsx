import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LanguageContext";
import type { Product } from "../data/products";
import { t } from "../data/translations";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem, removeItem, updateQuantity, getQuantity } = useCart();
  const { lang } = useLang();
  const activeLang = lang ?? "en";
  const quantity = getQuantity(product.id);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    if (quantity === 0) {
      addItem(product, 1);
    }
  };

  const handleIncrease = () => updateQuantity(product.id, quantity + 1);
  const handleDecrease = () => {
    if (quantity === 1) removeItem(product.id);
    else updateQuantity(product.id, quantity - 1);
  };

  const isHoney = product.category === "Honey";
  const honeyGlow =
    isHoney && isHovered
      ? { boxShadow: "0 0 20px oklch(0.75 0.15 80 / 0.35)" }
      : {};

  const displayName = t(`product.${product.id}.name`, activeLang);
  const displayDesc = t(`product.${product.id}.desc`, activeLang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="bg-card rounded-2xl overflow-hidden shadow-card product-card-hover border border-border flex flex-col transition-shadow duration-300"
      style={honeyGlow}
      onMouseEnter={() => isHoney && setIsHovered(true)}
      onMouseLeave={() => isHoney && setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-secondary">
        {!imgError ? (
          <img
            src={product.image}
            alt={displayName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Leaf className="w-12 h-12 text-forest opacity-30" />
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-forest shadow-sm">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div>
          <h3 className="font-display font-semibold text-foreground text-base leading-tight">
            {displayName}
          </h3>
          <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span className="text-xl font-bold text-forest font-display">
              ₹{product.price}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              /{product.unit}
            </span>
          </div>
        </div>

        {/* Add to Cart / Quantity Controls */}
        <div className="mt-1">
          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              className="w-full bg-forest text-primary-foreground hover:bg-forest/90 rounded-xl h-10 font-semibold text-sm gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {t("addToCart", activeLang)}
            </Button>
          ) : (
            <div className="flex items-center justify-between bg-secondary rounded-xl px-3 py-2">
              <button
                type="button"
                onClick={handleDecrease}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-bold text-foreground text-sm min-w-[1.5rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
