"use client";

import dynamic from "next/dynamic";

const FeaturesSection = dynamic(() =>
  import("@/components/landing/features-section").then((mod) => mod.FeaturesSection),
  { ssr: false }
);
const HowItWorks = dynamic(() =>
  import("@/components/landing/how-it-works-section").then((mod) => mod.HowItWorks),
  { ssr: false }
);
const CTASection = dynamic(() =>
  import("@/components/landing/cta-section").then((mod) => mod.CTASection),
  { ssr: false }
);
const FAQSection = dynamic(() =>
  import("@/components/landing/faq-section").then((mod) => mod.FAQSection),
  { ssr: false }
);

export function DeferredIntroSections() {
  return (
    <>
      <FeaturesSection />
      <HowItWorks />
    </>
  );
}

export function DeferredClosingSections() {
  return (
    <>
      <CTASection />
      <FAQSection />
    </>
  );
}
