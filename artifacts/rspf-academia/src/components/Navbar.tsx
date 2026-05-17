import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Microscope, Languages } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/knowledge-center", label: t.nav.knowledge },
    { href: "/about", label: t.nav.about },
    { href: "/participant-portal", label: t.nav.participant, highlight: true },
    { href: "/coordinator-portal", label: t.nav.coordinator },
    { href: "/special-requests", label: t.nav.special },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Nav links desktop */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#0C3156] text-white shadow-sm"
                      : link.highlight
                      ? "bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white hover:opacity-90 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0C3156]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Logo + Language Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:border-[#0C3156] hover:text-[#0C3156] transition-all text-xs font-bold group"
              title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Languages size={14} className="group-hover:scale-110 transition-transform" />
              <span>{lang === "ar" ? "EN" : "عر"}</span>
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-[#E9A020] text-white px-1.5 py-0.5 rounded-md font-bold tracking-wider">2026</span>
                  <span className="text-xl font-black text-[#0C3156] tracking-tight">RSPF</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0C3156] to-[#1A5FAE] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                    <Microscope size={15} className="text-white" />
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-medium tracking-widest uppercase">Research · Science · Publishing</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-5 pt-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#0C3156] text-white"
                      : link.highlight
                      ? "bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
            <a
              href="https://wa.me/966578032336"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-2.5 px-4 rounded-xl text-sm hover:bg-[#1eb856] transition-colors"
            >
              <span>📱</span> {t.nav.whatsapp}
            </a>
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:border-[#0C3156]"
            >
              <Languages size={15} />
              {lang === "ar" ? "EN" : "عر"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
