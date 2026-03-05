import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";

interface OTPLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function generateOTP(): string {
  return Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0");
}

export function OTPLoginModal({ open, onOpenChange }: OTPLoginModalProps) {
  const { login } = useAuth();
  const { lang } = useLang();
  const activeLang = lang ?? "en";

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleClose = (val: boolean) => {
    if (!val) {
      // Reset state on close
      setStep("phone");
      setPhone("");
      setOtp("");
      setGeneratedOtp("");
      setPhoneError("");
      setOtpError("");
    }
    onOpenChange(val);
  };

  const handleGetOTP = () => {
    const cleaned = phone.trim().replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setPhoneError(t("validPhone", activeLang));
      return;
    }
    setPhoneError("");
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setStep("otp");
  };

  const handleVerifyOTP = async () => {
    if (otp.trim() !== generatedOtp) {
      setOtpError(t("wrongOtp", activeLang));
      return;
    }
    setOtpError("");
    setIsVerifying(true);
    // Small delay for UX feel
    await new Promise((res) => setTimeout(res, 600));
    login(phone.trim().replace(/\D/g, ""));
    toast.success(t("loginSuccess", activeLang));
    setIsVerifying(false);
    handleClose(false);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleGetOTP();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleVerifyOTP();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm rounded-2xl border-border p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-forest to-forest/80 px-6 pt-6 pb-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-white/20 scale-110 blur-sm" />
              <img
                src="/assets/uploads/InShot_20260219_002725822-5.jpg"
                alt="Fresh Choice Organic"
                className="relative w-10 h-10 rounded-full object-cover border-2 border-white/60"
              />
            </div>
            <div>
              <DialogHeader>
                <DialogTitle className="text-white font-display font-bold text-lg leading-none">
                  {t("login", activeLang)}
                </DialogTitle>
              </DialogHeader>
              <p className="text-white/70 text-xs mt-0.5">
                Fresh Choice Organic
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.div
                key="phone-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">
                    {t("enterPhone", activeLang)}
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 bg-secondary rounded-xl text-sm font-medium text-foreground border border-border">
                      +91
                    </span>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        setPhone(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        );
                        setPhoneError("");
                      }}
                      onKeyDown={handlePhoneKeyDown}
                      className="rounded-xl border-border text-base"
                      autoFocus
                    />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-red-500 font-medium">
                      {phoneError}
                    </p>
                  )}
                </div>

                {/* Admin hint */}
                <div className="bg-forest/5 border border-forest/15 rounded-xl px-3 py-2.5">
                  <p className="text-xs text-forest/80 font-medium">
                    🔑 {t("adminLogin", activeLang)}:{" "}
                    <span className="font-mono">7801099660</span>
                  </p>
                </div>

                <Button
                  onClick={handleGetOTP}
                  className="w-full h-11 rounded-xl bg-forest text-white hover:bg-forest/90 font-semibold"
                >
                  {t("getOtp", activeLang)}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* OTP sent notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-3">
                  <p className="text-xs text-amber-800 font-medium">
                    📱 {t("otpSentTo", activeLang)}:{" "}
                    <span className="font-mono font-bold">+91 {phone}</span>
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    {t("otpDemo", activeLang)}{" "}
                    <span className="font-mono font-bold text-base text-amber-900 tracking-widest">
                      {generatedOtp}
                    </span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">
                    {t("enterOtp", activeLang)}
                  </Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="6-digit OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setOtpError("");
                    }}
                    onKeyDown={handleOtpKeyDown}
                    className="rounded-xl border-border text-center text-xl tracking-widest font-mono h-12 text-base"
                    autoFocus
                  />
                  {otpError && (
                    <p className="text-xs text-red-500 font-medium">
                      {otpError}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                      setOtpError("");
                    }}
                    className="flex-1 h-11 rounded-xl border-border"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6 || isVerifying}
                    className="flex-1 h-11 rounded-xl bg-forest text-white hover:bg-forest/90 font-semibold"
                  >
                    {isVerifying ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-label="Verifying"
                          role="img"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      t("verifyOtp", activeLang)
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
