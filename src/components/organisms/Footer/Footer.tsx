import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { footerLinks } from '@/data/navigation';

// ─── Inline social icons (lucide-react v1.66 removed Linkedin/Twitter/Github) ─
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/**
 * Site Footer — dark background, 4-column layout, social links, legal.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-deep border-t border-border-dark" aria-label="Site footer">
      <div className="container-site py-16 lg:py-20">
        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="NextGen Agency home" className="inline-block mb-4">
              <span className="font-heading font-bold text-2xl text-warm-white tracking-tight">
                Next<span className="text-orange">Gen</span>
              </span>
            </Link>
            <p className="text-muted-grey text-sm leading-relaxed max-w-xs mb-6">
              Modern software engineering meets practical AI. We build products that perform.
            </p>
            {/* Contact info */}
            <div className="space-y-2 text-sm text-muted-grey">
              <a
                href="mailto:hello@nextgenagency.dev"
                className="flex items-center gap-2 hover:text-orange transition-colors duration-200"
                aria-label="Send us an email"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                hello@nextgenagency.dev
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                India · Available worldwide
              </div>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-warm-white font-semibold text-sm uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-grey text-sm hover:text-orange transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="text-warm-white font-semibold text-sm uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-grey text-sm hover:text-orange transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h3 className="text-warm-white font-semibold text-sm uppercase tracking-widest mb-5">
              Connect
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-grey text-sm hover:text-orange transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3" aria-label="Social media links">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-grey text-muted-grey hover:bg-orange hover:text-white transition-all duration-200"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-grey text-muted-grey hover:bg-orange hover:text-white transition-all duration-200"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-grey text-muted-grey hover:bg-orange hover:text-white transition-all duration-200"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-grey text-sm">
            &copy; {currentYear} NextGen Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-grey text-sm hover:text-orange transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
