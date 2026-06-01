'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          KruTeekidCode
        </Link>

        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`navbar-link ${pathname.startsWith(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <span className="navbar-lang">TH | EN</span>
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="navbar-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <span className="navbar-lang" style={{ paddingTop: '0.5rem' }}>TH | EN</span>
      </div>
    </nav>
  );
}
