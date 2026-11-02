"use client"

import { LiquidNavbar, NimbusIcons } from "@/components/ui/liquid-glass-navbar"

export default function NavDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DCEBF5]">
      <LiquidNavbar
        tone="light"
        items={[
          { label: "Home", icon: NimbusIcons.home, fx: "glow" },
          { label: "Explore", icon: NimbusIcons.globe, fx: "spin" },
          { label: "Flights", icon: NimbusIcons.plane, fx: "plane" },
          { label: "Weather", icon: NimbusIcons.drop, fx: "drop" },
          { label: "Profile", icon: NimbusIcons.user, fx: "wave" },
        ]}
      />
    </div>
  )
}