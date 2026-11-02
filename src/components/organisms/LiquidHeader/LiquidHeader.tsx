"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowRight,
  House,
  Layers,
  Cpu,
  Building2,
  FolderKanban,
  Info,
} from "lucide-react";
import { LiquidNavbar } from "@/components/ui/liquid-glass-navbar";
import { Button } from "@/components/atoms/Button/Button";
const ICON = { size: 18, strokeWidth: 1.8 };

const links = [
  { label: "Home", href: "/", icon: <House {...ICON} />, fx: "glow" as const },
  {
    label: "Services",
    href: "/services",
    icon: <Layers {...ICON} />,
    fx: "pop" as const,
  },
  {
    label: "Technologies",
    href: "/technologies",
    icon: <Cpu {...ICON} />,
    fx: "spin" as const,
  },
  {
    label: "Industries",
    href: "/industries",
    icon: <Building2 {...ICON} />,
    fx: "wave" as const,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: <FolderKanban {...ICON} />,
    fx: "drop" as const,
  },
  {
    label: "About",
    href: "/about",
    icon: <Info {...ICON} />,
    fx: "pop" as const,
  },
];

export function LiquidHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = links.findIndex((l) =>
    l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-8">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center">
        <Link
          href="/"
          className={`pointer-events-auto hidden justify-self-start rounded-full px-4 py-2 font-heading text-2xl font-bold text-white transition-colors duration-300 sm:block ${
            scrolled ? "bg-charcoal/70 backdrop-blur-md" : ""
          }`}
        >
          Next<span className="text-orange">Gen</span>
        </Link>

        <div
          className={`pointer-events-auto col-start-2 justify-self-center ${
            scrolled ? "liquid-header-scrolled" : ""
          }`}
        >
          <LiquidNavbar
            tone="dark"
            active={active}
            onChange={(i) => router.push(links[i].href)}
            items={links.map(({ label, icon, fx }) => ({ label, icon, fx }))}
          />
        </div>

        <Button
          onClick={() => router.push("/contact")}
          className="pointer-events-auto hidden justify-self-end md:inline-flex"
        >
          Contact Us <ArrowRight size={18} />
        </Button>
      </div>
    </header>
  );
}
