import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Lang } from "../context/LanguageContext";

interface SplashScreenProps {
  onSelect: (lang: Lang) => void;
}

export function SplashScreen({ onSelect }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);

  const handleSelect = (lang: Lang) => {
    setExiting(true);
    setTimeout(() => onSelect(lang), 350);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6"
          style={{ background: "oklch(0.35 0.12 145)" }}
        >
          {/* Decorative background circles */}
          <div
            className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 -translate-x-1/3 -translate-y-1/3"
            style={{ background: "oklch(0.55 0.14 145)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"
            style={{ background: "oklch(0.55 0.14 145)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.72 0.17 145 / 0.6) 0%, transparent 70%)",
                  transform: "scale(1.5)",
                }}
              />
              {/* Logo image */}
              <div
                className="relative w-32 h-32 rounded-full border-4 overflow-hidden shadow-2xl"
                style={{ borderColor: "oklch(0.65 0.16 145)" }}
              >
                <img
                  src="/assets/uploads/InShot_20260219_002725822-5.jpg"
                  alt="Fresh Choice Organic"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
            >
              <h1
                className="font-display font-bold text-3xl leading-tight"
                style={{ color: "oklch(0.98 0.02 100)" }}
              >
                Fresh Choice Organic
              </h1>
              <p
                className="mt-1 text-base font-medium"
                style={{ color: "oklch(0.85 0.04 140)" }}
              >
                ఫ్రెష్ చాయిస్ ఆర్గానిక్
              </p>
            </motion.div>

            {/* Subtitle / language prompt */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.72 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.92 0.03 140)" }}
            >
              Choose your language / మీ భాషను ఎంచుకోండి
            </motion.p>

            {/* Language buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
              className="flex gap-4 w-full mt-2"
            >
              <button
                type="button"
                onClick={() => handleSelect("en")}
                className="flex-1 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 hover:scale-105 shadow-lg"
                style={{
                  background: "oklch(0.98 0.02 100)",
                  color: "oklch(0.28 0.12 145)",
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleSelect("te")}
                className="flex-1 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 hover:scale-105 shadow-lg"
                style={{
                  background: "transparent",
                  color: "oklch(0.98 0.02 100)",
                  border: "2.5px solid oklch(0.65 0.16 145)",
                }}
              >
                తెలుగు
              </button>
            </motion.div>

            {/* FSSAI Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex items-center gap-2 mt-2"
            >
              <img
                src="/assets/uploads/food-safety-standards-authority-of-india-fssai-license-certification-services-909-1.jpg"
                alt="FSSAI Certified"
                className="h-6 w-auto object-contain rounded"
                style={{ filter: "brightness(1.1)" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "oklch(0.85 0.04 140)" }}
              >
                FSSAI Certified
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
