import { PlansView } from "@/components/plans/plans-view";
import { Footer } from "@/components/layout/footer";
import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { PageHeader } from "@/components/layout/page-header";
import { FloatingIcons } from "@/components/ui/floating-icons";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

function toDisplayTitle(slug: string) {
  return (slug || "")
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }): Promise<Metadata> {
  const { segment } = await params;
  const displayTitle = toDisplayTitle(segment);
  return {
    title: `${displayTitle} Research Plans`,
    description: `Dedicated research setups and institutional grade signals for ${displayTitle}.`,
  };
}

export default async function SegmentPlansPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params;
  const segmentSlug = segment;

  const displayTitle = toDisplayTitle(segmentSlug);

  return (
    <>
    <main id="main-content" className="min-h-screen bg-background relative overflow-hidden font-sans">
      <FloatingIcons />
      <PageHeader 
        title={`${displayTitle} Research`}
        description={`Dedicated research setups and institutional grade signals for ${displayTitle}. Transparent, disciplined, and research-backed.`}
      />
      
      <PlansView segmentSlug={segmentSlug} />

      <DisclaimerStrip />
    </main>
    <Footer />
    </>
  );
}
