import { motion } from "motion/react";

interface EggCrackLoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  inline?: boolean;
}

export function EggCrackLoader({
  size = "md",
  label = "Loading...",
  inline = false,
}: EggCrackLoaderProps) {
  const dimensions = {
    sm: { egg: 32, yolk: 10, crack: 12 },
    md: { egg: 64, yolk: 20, crack: 24 },
    lg: { egg: 96, yolk: 30, crack: 36 },
  };

  const d = dimensions[size];

  if (inline) {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          style={{ width: d.egg * 0.5, height: d.egg * 0.6 }}
          className="relative inline-block"
        >
          <EggSVG size={size} />
        </span>
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div style={{ width: d.egg, height: d.egg * 1.2 }} className="relative">
        <EggSVG size={size} />
      </div>
      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-sm text-muted-foreground font-medium"
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

function EggSVG({ size }: { size: "sm" | "md" | "lg" }) {
  const scale = { sm: 0.5, md: 1, lg: 1.5 }[size];
  const w = 64 * scale;
  const h = 80 * scale;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Egg cracking loading animation"
    >
      <style>{`
        @keyframes eggCrack {
          0%, 20% { opacity: 0; }
          30%, 70% { opacity: 1; }
          80%, 100% { opacity: 0; }
        }
        @keyframes yolkPop {
          0%, 35% { transform: translateY(20px) scale(0); opacity: 0; }
          50% { transform: translateY(-4px) scale(1.1); opacity: 1; }
          60%, 80% { transform: translateY(0px) scale(1); opacity: 1; }
          90%, 100% { transform: translateY(-8px) scale(0.8); opacity: 0; }
        }
        @keyframes eggShake {
          0%, 25% { transform: rotate(0deg); }
          27% { transform: rotate(-3deg); }
          30% { transform: rotate(3deg); }
          33% { transform: rotate(-2deg); }
          36% { transform: rotate(2deg); }
          40%, 100% { transform: rotate(0deg); }
        }
        @keyframes topHalfLift {
          0%, 30% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-6deg); }
          70% { transform: translateY(-6px) rotate(-4deg); }
          90%, 100% { transform: translateY(0px) rotate(0deg); }
        }
        .egg-body { animation: eggShake 2s ease-in-out infinite; transform-origin: center bottom; }
        .crack-line { animation: eggCrack 2s ease-in-out infinite; }
        .yolk { animation: yolkPop 2s ease-in-out infinite; transform-origin: center bottom; }
        .egg-top { animation: topHalfLift 2s ease-in-out infinite; transform-origin: center center; }
      `}</style>

      {/* Egg shadow */}
      <ellipse
        cx="32"
        cy="76"
        rx="18"
        ry="4"
        fill="oklch(0.38 0.1 145 / 0.12)"
      />

      {/* Egg body group */}
      <g className="egg-body">
        {/* Bottom half of egg */}
        <path
          d="M8 50 C8 68 14 78 32 78 C50 78 56 68 56 50 L56 50 L8 50 Z"
          fill="oklch(0.97 0.015 85)"
          stroke="oklch(0.82 0.05 80)"
          strokeWidth="1"
        />

        {/* Yolk - pops up */}
        <g className="yolk">
          <circle cx="32" cy="48" r="13" fill="oklch(0.82 0.16 75)" />
          <circle cx="32" cy="48" r="10" fill="oklch(0.78 0.18 68)" />
          <circle cx="28" cy="44" r="3" fill="oklch(0.92 0.1 75 / 0.6)" />
        </g>

        {/* Top half of egg */}
        <g className="egg-top">
          <path
            d="M8 50 C8 28 14 8 32 8 C50 8 56 28 56 50 L8 50 Z"
            fill="oklch(0.98 0.01 80)"
            stroke="oklch(0.82 0.05 80)"
            strokeWidth="1"
          />

          {/* Shine on egg */}
          <ellipse
            cx="24"
            cy="26"
            rx="6"
            ry="10"
            fill="white"
            opacity="0.35"
            transform="rotate(-15, 24, 26)"
          />
        </g>

        {/* Crack lines on top half */}
        <g className="crack-line">
          <path
            d="M32 50 L28 44 L33 39 L30 32 L34 28"
            stroke="oklch(0.45 0.06 60)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M32 50 L36 43 L31 37"
            stroke="oklch(0.45 0.06 60)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
