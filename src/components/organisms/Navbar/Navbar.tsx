'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { navigation } from '@/data/navigation';
import { useScrollY } from '@/hooks/useScrollY';
import { dropdownVariants, mobileMenuVariants } from '@/lib/animations';

/**
 * Floating glassmorphism Navbar with dropdown menus and mobile slide-in menu.
 * See docs/design.md Section 10 for the visual specification.
 */
export function Navbar() {
  const scrollY = useScrollY();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const isScrolled = scrollY > 80;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-4 left-4 right-4 z-50 transition-all duration-300',
        )}
        aria-label="Main navigation"
      >
        <div
          className={cn(
            'rounded-2xl px-5 py-3 transition-all duration-300',
            isScrolled
              ? 'bg-charcoal/85 backdrop-blur-xl border border-white/8 shadow-[0_2px_20px_rgba(0,0,0,0.15)]'
              : 'bg-transparent',
          )}
        >
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 font-heading font-bold text-xl text-warm-white hover:text-orange transition-colors duration-200"
              aria-label="NextGen Agency — Home"
            >
              Next<span className="text-orange">Gen</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.label} className="relative">
                  {item.dropdown ? (
                    <button
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.label ? null : item.label,
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setOpenDropdown(null);
                      }}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                        pathname.startsWith(item.href) && item.href !== '/'
                          ? 'text-orange'
                          : 'text-warm-white/80 hover:text-warm-white',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          openDropdown === item.label && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                        (pathname === item.href ||
                          (item.href !== '/' && pathname.startsWith(item.href)))
                          ? 'text-orange'
                          : 'text-warm-white/80 hover:text-warm-white',
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && openDropdown === item.label && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-white/8 bg-[#1a1a1a] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
                        role="menu"
                        aria-label={`${item.label} submenu`}
                      >
                        <div className="p-2">
                          {item.dropdown.map((dropItem) => (
                            <Link
                              key={dropItem.href}
                              href={dropItem.href}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                'flex flex-col px-3 py-2.5 rounded-lg transition-colors duration-150',
                                pathname === dropItem.href
                                  ? 'bg-orange/10 text-orange'
                                  : 'hover:bg-white/5 text-warm-white/80 hover:text-warm-white',
                              )}
                            >
                              <span className="text-sm font-medium">{dropItem.label}</span>
                              {dropItem.description && (
                                <span className="text-xs text-muted-grey mt-0.5">
                                  {dropItem.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/contact" className="hidden lg:block">
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Contact Us
                </Button>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg bg-surface-grey text-warm-white hover:bg-border-dark transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-charcoal/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-[#111111] border-l border-border-dark overflow-y-auto lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-dark">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="font-heading font-bold text-lg text-warm-white"
                >
                  Next<span className="text-orange">Gen</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-grey text-warm-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile nav links */}
              <nav className="px-4 py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpandedItem((prev) =>
                              prev === item.label ? null : item.label,
                            )
                          }
                          aria-expanded={mobileExpandedItem === item.label}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-warm-white/80 hover:text-warm-white hover:bg-white/5 transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200',
                              mobileExpandedItem === item.label && 'rotate-180',
                            )}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpandedItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="ml-3 mt-1 space-y-0.5 border-l border-border-dark pl-3">
                                {item.dropdown.map((dropItem) => (
                                  <Link
                                    key={dropItem.href}
                                    href={dropItem.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-sm text-warm-white/70 hover:text-warm-white hover:bg-white/5 transition-colors"
                                  >
                                    {dropItem.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                          pathname === item.href
                            ? 'text-orange bg-orange/10'
                            : 'text-warm-white/80 hover:text-warm-white hover:bg-white/5',
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="px-4 pb-6 mt-4">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Start a Project
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
