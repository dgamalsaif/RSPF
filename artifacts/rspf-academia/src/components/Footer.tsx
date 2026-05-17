import { Link } from "wouter";
import { Stethoscope, Mail, Phone, Send } from "lucide-react";

const quickLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/participant-portal", label: "بوابة المشارك" },
  { href: "/coordinator-portal", label: "بوابة المنسق" },
  { href: "/special-requests", label: "الطلبات الخاصة" },
  { href: "/knowledge-center", label: "مركز المعرفة" },
  { href: "/about", label: "عن المنصة" },
  { href: "/faq", label: "الأسئلة الشائعة" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B5E37] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#D4A22A]">تواصل معنا</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@rspf.sa"
                data-testid="link-footer-email"
                className="flex items-center gap-2 text-green-100 hover:text-white text-sm"
              >
                <Mail size={15} />
                info@rspf.sa
              </a>
              <a
                href="tel:+966598409805"
                data-testid="link-footer-phone"
                className="flex items-center gap-2 text-green-100 hover:text-white text-sm"
              >
                <Phone size={15} />
                +966 59 840 9805
              </a>
              <a
                href="https://t.me/rspf_sa"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-telegram"
                className="flex items-center gap-2 text-green-100 hover:text-white text-sm"
              >
                <Send size={15} />
                @rspf_sa
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#D4A22A]">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`link-footer-${link.href.replace("/", "") || "home"}`}
                    className="text-green-100 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo & tagline */}
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-[#D4A22A] text-white px-1.5 py-0.5 rounded font-bold">2026</span>
                  <span className="text-2xl font-black text-white">RSPF</span>
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Stethoscope size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-green-100 text-sm text-right leading-relaxed">
              وجهتك الأولى في التدريب الصحي والبحث العلمي حيث الجودة والاحترافية واختيار أفضل الأسعار للمتدربين
            </p>
            <a
              href="https://t.me/rspf_sa"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-footer-telegram"
              className="flex items-center gap-2 border border-white/40 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              <Send size={14} />
              اشترك في قناتنا
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-green-200 text-sm">© RSPF 2026. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
