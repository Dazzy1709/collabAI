import { useState } from 'react';
import { Link } from 'react-router';

type Props = {}

const ReturnHomeMenu = (props: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/signup', label: 'Sign up' },
    { to: '/login', label: 'Log in' },
  ];

  return (
    <header className="w-full border-b border-neutral-100 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-[#0a0a0a] rounded-lg flex items-center justify-center transition-opacity group-hover:opacity-80">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 3h12M1 7h8M1 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[15px] font-medium text-[#0a0a0a] tracking-tight">Nexus Chat</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link
            to="/"
            className="px-3.5 py-2 text-sm text-neutral-500 hover:text-[#0a0a0a] hover:bg-neutral-50 rounded-lg transition-all"
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="px-3.5 py-2 text-sm text-neutral-500 hover:text-[#0a0a0a] hover:bg-neutral-50 rounded-lg transition-all"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="ml-2 px-4 py-2 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            Log in
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-neutral-50 transition-colors"
        >
          {menuOpen ? (
            /* X icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3l10 10M13 3L3 13" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-neutral-100 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={
                label === 'Log in'
                  ? 'w-full text-center px-4 py-2.5 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-all mt-1'
                  : 'w-full text-left px-4 py-2.5 text-sm text-neutral-600 hover:text-[#0a0a0a] hover:bg-neutral-50 rounded-lg transition-all'
              }
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default ReturnHomeMenu;
