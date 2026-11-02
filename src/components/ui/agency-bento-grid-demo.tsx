import { AgencyBentoGrid } from "@/components/ui/agency-bento-grid";

export default function DemoOne() {
  return (
    <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-10 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <AgencyBentoGrid />
      </div>
    </div>
  );
}
