import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Award, CheckCircle, FileText, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";

interface UploadedFile {
  name: string;
  url: string;
  type: string;
}

interface CertCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badgeLabel?: string;
  placeholder: string;
  uploadedFile: UploadedFile | null;
  onUpload: (file: File) => void;
  delay?: number;
  uploadLabel: string;
  replaceLabel: string;
  documentUploadedLabel: string;
  viewLabel: string;
}

function CertCard({
  icon,
  title,
  subtitle,
  badgeLabel = "Certified",
  placeholder,
  uploadedFile,
  onUpload,
  delay = 0,
  uploadLabel,
  replaceLabel,
  documentUploadedLabel,
  viewLabel,
}: CertCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
    >
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-forest/5 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-xl">
            {icon}
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground text-base">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
          <CheckCircle className="w-3 h-3" />
          {badgeLabel}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-5 py-5 space-y-4">
        {/* Uploaded file preview or placeholder */}
        {uploadedFile ? (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-forest/5 border border-forest/20">
            <FileText className="w-8 h-8 text-forest flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {documentUploadedLabel}
              </p>
            </div>
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-forest hover:underline flex-shrink-0"
            >
              {viewLabel}
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-border/70 bg-secondary/30 text-center justify-center min-h-[80px]">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{placeholder}</p>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          className="sr-only"
          aria-label={`Upload ${title}`}
        />
        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          variant="outline"
          className="w-full rounded-xl h-10 border-forest/30 text-forest hover:bg-forest/5 font-medium gap-2"
        >
          <Upload className="w-4 h-4" />
          {uploadedFile ? replaceLabel : uploadLabel}
        </Button>
      </div>
    </motion.div>
  );
}

export function LicensesPage() {
  const navigate = useNavigate();
  const [fssaiFile, setFssaiFile] = useState<UploadedFile | null>(null);
  const [honeyFile, setHoneyFile] = useState<UploadedFile | null>(null);
  const { lang } = useLang();
  const activeLang = lang ?? "en";

  const handleFssaiUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setFssaiFile({ name: file.name, url, type: file.type });
  };

  const handleHoneyUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setHoneyFile({ name: file.name, url, type: file.type });
  };

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
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/InShot_20260219_002725822-5.jpg"
              alt="Fresh Choice Organic"
              className="w-9 h-9 rounded-full object-cover border-2 border-forest ring-1 ring-forest/30"
            />
            <div>
              <h1 className="font-display font-bold text-foreground text-lg leading-none">
                {t("certifications", activeLang)}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("licensesTitle", activeLang)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Intro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden border border-forest/20 bg-gradient-to-br from-forest/8 to-forest/4 p-5 flex items-center gap-4"
        >
          <img
            src="/assets/uploads/food-safety-standards-authority-of-india-fssai-license-certification-services-909-1.jpg"
            alt="FSSAI Certified"
            className="w-16 h-16 object-contain rounded-xl flex-shrink-0"
          />
          <div>
            <h2 className="font-display font-bold text-foreground text-base">
              {t("qualityYouCanTrust", activeLang)}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("freshChoiceCertified", activeLang)}
            </p>
          </div>
        </motion.div>

        {/* FSSAI License Card */}
        <CertCard
          icon={
            <img
              src="/assets/uploads/food-safety-standards-authority-of-india-fssai-license-certification-services-909-1.jpg"
              alt="FSSAI"
              className="w-8 h-8 object-contain"
            />
          }
          title={t("fssaiFoodSafety", activeLang)}
          subtitle={t("foodSafetyAuthority", activeLang)}
          badgeLabel={t("certified", activeLang)}
          placeholder={t("fssaiLicensePlaceholder", activeLang)}
          uploadedFile={fssaiFile}
          onUpload={handleFssaiUpload}
          delay={0.1}
          uploadLabel={t("uploadDocument", activeLang)}
          replaceLabel={t("replaceDocument", activeLang)}
          documentUploadedLabel={t("documentUploaded", activeLang)}
          viewLabel={t("view", activeLang)}
        />

        {/* Honey Lab Certificate Card */}
        <CertCard
          icon={<span className="text-2xl">🍯</span>}
          title={t("honeyLabCert", activeLang)}
          subtitle="Certified Organic Lab Analysis Report"
          badgeLabel={t("certified", activeLang)}
          placeholder={t("labCertPlaceholder", activeLang)}
          uploadedFile={honeyFile}
          onUpload={handleHoneyUpload}
          delay={0.2}
          uploadLabel={t("uploadDocument", activeLang)}
          replaceLabel={t("replaceDocument", activeLang)}
          documentUploadedLabel={t("documentUploaded", activeLang)}
          viewLabel={t("view", activeLang)}
        />

        {/* Quality Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-green-50 border border-green-100"
        >
          <Award className="w-5 h-5 text-green-600" />
          <p className="text-sm font-semibold text-green-800 text-center">
            {t("allProductsCertified", activeLang)}
          </p>
        </motion.div>

        {/* Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Badge
            variant="outline"
            className="px-3 py-1.5 rounded-full border-forest/30 text-forest bg-forest/5 text-xs"
          >
            🌱 {t("hundredPercentNatural", activeLang)}
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1.5 rounded-full border-forest/30 text-forest bg-forest/5 text-xs"
          >
            🔬 {t("labTested", activeLang)}
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1.5 rounded-full border-forest/30 text-forest bg-forest/5 text-xs"
          >
            ✅ {t("fssaiCertified", activeLang)}
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1.5 rounded-full border-forest/30 text-forest bg-forest/5 text-xs"
          >
            🚜 {t("farmDirect", activeLang)}
          </Badge>
        </motion.div>
      </main>

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
