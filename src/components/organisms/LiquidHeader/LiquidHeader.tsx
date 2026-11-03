"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  House,
  Layers,
  Workflow,
  FolderKanban,
  Cpu,
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

// Ordered list of section IDs mapped to their corresponding navbar link index
const sectionEntries: Array<{ id: string; index: number }> = [
  { id: "faq", index: 5 },
  { id: "team", index: 5 },
  { id: "industries", index: 4 },
  { id: "tech-stack", index: 4 },
  { id: "portfolio", index: 3 },
  { id: "agentic-factory", index: 2 },
  { id: "process", index: 2 },
  { id: "why-nextgen", index: 1 },
  { id: "services", index: 1 },
  { id: "home", index: 0 },
];

export function LiquidHeader() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const isClickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Prevent scrollspy from overriding while an in-page click scroll is in flight
      if (isClickingRef.current) return;

      // If near the top, highlight Home
      if (window.scrollY < 180) {
        setActive(0);
        return;
      }

      // Check section bounding rects relative to viewport observation line
      const targetY = 160;

      for (const entry of sectionEntries) {
        const el = document.getElementById(entry.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY && rect.bottom > targetY) {
            setActive(entry.index);
            return;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavChange = (index: number) => {
    setActive(index);
    isClickingRef.current = true;
    const targetHash = links[index].href;

    if (window.location.pathname === "/") {
      if (targetHash === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetEl = document.querySelector(targetHash);
        if (targetEl) {
          const navOffset = 90;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }

      // Re-enable scrollspy after smooth scroll animation settles
      setTimeout(() => {
        isClickingRef.current = false;
      }, 850);
      return;
    }

    router.push(`/${targetHash}`);
  };

  const handleContactClick = () => {
    isClickingRef.current = true;
    if (window.location.pathname === "/") {
      const contactEl = document.querySelector("#contact");
      if (contactEl) {
        const navOffset = 90;
        const elementPosition = contactEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          isClickingRef.current = false;
        }, 850);
        return;
      }
    }
    router.push("/#contact");
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 sm:top-4 z-50 px-2 sm:px-8">
      <div className="mx-auto flex justify-center sm:grid max-w-[1280px] sm:grid-cols-[1fr_auto_1fr] items-center">
        {/* Brand Logo */}
        <Link
          href="/#home"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              setActive(0);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={`pointer-events-auto hidden justify-self-start rounded-full px-4 py-2 font-heading text-2xl font-bold text-white transition-colors duration-300 sm:block ${
            scrolled ? "bg-charcoal/70 backdrop-blur-md" : ""
          }`}
        >
          Next<span className="text-orange">Gen</span>
        </Link>

        {/* Liquid Glass Navigation Bar with Scrollspy */}
        <div className="pointer-events-auto">
          <LiquidNavbar
            items={links}
            active={active}
            onChange={handleNavChange}
            tone="dark"
            sound={false}
          />
        </div>

        {/* Contact CTA */}
        <div className="pointer-events-auto hidden justify-self-end sm:block">
          <Button
            variant="primary"
            size="sm"
            onClick={handleContactClick}
            className="!rounded-full px-6 shadow-orange-glow text-sm font-semibold"
          >
            Contact Us →
          </Button>
        </div>
      </div>
    </header>
  );
}
