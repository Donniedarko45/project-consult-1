import { PlansView } from "@/components/plans/plans-view";
import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FloatingIcons } from "@/components/ui/floating-icons";

export const dynamic = 'force-dynamic';

export default async function SegmentPlansPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params;
  const segmentSlug = segment;

  const displayTitle = (segmentSlug || "")
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen bg-background relative overflow-hidden font-sans">
      <FloatingIcons />
      <PageHeader 
        title={`${displayTitle} Research`}
        description={`Dedicated research setups and institutional grade signals for ${displayTitle}. Transparent, disciplined, and research-backed.`}
      />
      
      <PlansView segmentSlug={segmentSlug} />

      <DisclaimerStrip />
      <Footer />
    </main>
  );
}
