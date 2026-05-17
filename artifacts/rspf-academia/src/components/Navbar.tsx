import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Stethoscope } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/knowledge-center", label: "مركز المعرفة" },
  { href: "/about", label: "عن المنصة" },
  { href: "/participant-portal", label: "بوابة المشارك", highlight: true },
  { href: "/coordinator-portal", label: "بوابة المنسق" },
  { href: "/special-requests", label: "الطلبات الخاصة ⭐" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile hamburger */}
          <button
            data-testid="button-mobile-menu"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive || (link.highlight && location === link.href)
                      ? "bg-[#1B5E37] text-white"
                      : link.highlight
                      ? "bg-[#1B5E37] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Logo (right side in RTL) */}
          <Link href="/" data-testid="link-logo" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <span className="text-xs bg-[#1B5E37] text-white px-1.5 py-0.5 rounded font-bold">2026</span>
                <span className="text-xl font-black text-[#1B5E37]">RSPF</span>
                <div className="w-8 h-8 bg-[#1B5E37] rounded-full flex items-center justify-center">
                  <Stethoscope size={16} className="text-white" />
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-medium">بوابتك للتميز البحثي</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`link-mobile-${link.href.replace("/", "") || "home"}`}
              className="block py-2.5 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
