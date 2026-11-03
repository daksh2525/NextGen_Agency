"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  House,
  Layers,
  Workflow,
  Cpu,
  FolderKanban,
  Users,
} from "lucide-react";
import { LiquidNavbar } from "@/components/ui/liquid-glass-navbar";
import { Button } from "@/components/atoms/Button/Button";

const ICON = { size: 18, strokeWidth: 1.8 };

const links = [
  { label: "Home", href: "#home", icon: <House {...ICON} />, fx: "glow" as const },
  { label: "Services", href: "#services", icon: <Layers {...ICON} />, fx: "pop" as const },
  { label: "Process", href: "#process", icon: <Workflow {...ICON} />, fx: "wave" as const },
  { label: "Portfolio", href: "#portfolio", icon: <FolderKanban {...ICON} />, fx: "drop" as const },
  { label: "Tech", href: "#tech-stack", icon: <Cpu {...ICON} />, fx: "spin" as const },
  { label: "About", href: "#team", icon: <Users {...ICON} />, fx: "pop" as const },
];

export function LiquidHeader() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Scrollspy: detect which section is currently in view
      const sectionMapping: Record<string, number> = {
        home: 0,
        services: 1,
        'why-nextgen': 1,
        process: 2,
        'agentic-factory': 2,
        portfolio: 3,
        'tech-stack': 4,
        industries: 4,
        team: 5,
        faq: 5,
      };

      const sections = Object.keys(sectionMapping);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(sectionMapping[sections[i]]);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavChange = (index: number) => {
    setActive(index);
    const targetHash = links[index].href;
    if (window.location.pathname === "/") {
      const targetEl = document.querySelector(targetHash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(`/${targetHash}`);
  };

  const handleContactClick = () => {
    if (window.location.pathname === "/") {
      const contactEl = document.querySelector("#contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push("/#contact");
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 sm:top-4 z-50 px-2 sm:px-8">
      <div className="mx-auto flex justify-center sm:grid max-w-[1280px] sm:grid-cols-[1fr_auto_1fr] items-center">
        <Link
          href="/#home"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
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
            onChange={handleNavChange}
            items={links.map(({ label, icon, fx }) => ({ label, icon, fx }))}
          />
        </div>

        <Button
          onClick={handleContactClick}
          className="pointer-events-auto hidden justify-self-end md:inline-flex"
        >
          Contact Us <ArrowRight size={18} />
        </Button>
      </div>
    </header>
  );
}

export default LiquidHeader;
