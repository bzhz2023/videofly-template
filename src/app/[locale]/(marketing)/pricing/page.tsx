import { PricingSection } from "@/components/landing/pricing-section";
import { DeferredFAQSection } from "@/components/landing/deferred-faq-section";
import type { Locale } from "@/config/i18n-config";
import { buildAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alternates = buildAlternates("/pricing", locale);
  const t = await getTranslations("Metadata");

  return {
    title: t("pricingTitle"),
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function PricingPage() {
  return (
    <div className="flex w-full flex-col gap-0">
      <PricingSection />
      <DeferredFAQSection />
    </div>
  );
}
