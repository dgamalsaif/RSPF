import { useState } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  researchTitle: string;
  researchId?: number;
}

const API_BASE = "/api";

const COUNTRIES = [
  { name: "المملكة العربية السعودية", code: "+966", flag: "🇸🇦" },
  { name: "البحرين",                  code: "+973", flag: "🇧🇭" },
  { name: "قطر",                      code: "+974", flag: "🇶🇦" },
  { name: "عُمان",                    code: "+968", flag: "🇴🇲" },
  { name: "الكويت",                   code: "+965", flag: "🇰🇼" },
  { name: "الإمارات",                 code: "+971", flag: "🇦🇪" },
  { name: "الأردن",                   code: "+962", flag: "🇯🇴" },
  { name: "مصر",                      code: "+20",  flag: "🇪🇬" },
  { name: "السودان",                  code: "+249", flag: "🇸🇩" },
  { name: "اليمن",                    code: "+967", flag: "🇾🇪" },
  { name: "العراق",                   code: "+964", flag: "🇮🇶" },
  { name: "سوريا",                    code: "+963", flag: "🇸🇾" },
  { name: "لبنان",                    code: "+961", flag: "🇱🇧" },
  { name: "ليبيا",                    code: "+218", flag: "🇱🇾" },
  { name: "تونس",                     code: "+216", flag: "🇹🇳" },
  { name: "الجزائر",                  code: "+213", flag: "🇩🇿" },
  { name: "المغرب",                   code: "+212", flag: "🇲🇦" },
  { name: "موريتانيا",                code: "+222", flag: "🇲🇷" },
  { name: "الصومال",                  code: "+252", flag: "🇸🇴" },
  { name: "أخرى",                     code: "+",    flag: "🌍" },
];

export default function RegistrationModal({ isOpen, onClose, researchTitle, researchId = 0 }: RegistrationModalProps) {
  const { toast } = useToast();

  const [form, setForm] = useState({
    fullName: "",
    specialization: "",
    email: "",
    whatsappLocal: "",
    affiliation: "",
    country: "المملكة العربية السعودية",
    city: "",
    orcid: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const selectedCountry = COUNTRIES.find((c) => c.name === form.country) ?? COUNTRIES[0];

  const fullWhatsapp = `${selectedCountry.code}${form.whatsappLocal.replace(/^0+/, "")}`;

  const reset = () => {
    setForm({ fullName: "", specialization: "", email: "", whatsappLocal: "", affiliation: "", country: "المملكة العربية السعودية", city: "", orcid: "" });
    setDone(false);
    setError("");
    setLoading(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleCountryChange = (countryName: string) => {
    setForm((f) => ({ ...f, country: countryName }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          specialization: form.specialization,
          email: form.email,
          whatsapp: fullWhatsapp,
          affiliation: form.affiliation,
          country: form.country,
          city: form.city,
          orcid: form.orcid,
          researchId,
          researchTitle,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || "حدث خطأ أثناء الإرسال");
      }

      setDone(true);

      toast({
        title: "✅ تم استلام طلبك بنجاح!",
        description: "سيتواصل معك فريق RSPF قريباً عبر البريد أو الواتساب.",
      });

      const waMessage = encodeURIComponent(
        `مرحباً، أنا ${form.fullName} — ${form.specialization}\n` +
        `أودّ التسجيل في الفرصة البحثية:\n${researchTitle}\n\n` +
        `📧 ${form.email}\n📱 ${fullWhatsapp}\n🏥 ${form.affiliation}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/966578032336?text=${waMessage}`, "_blank");
      }, 1200);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      toast({
        title: "⚠️ حدث خطأ",
        description: err instanceof Error ? err.message : "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-start justify-between gap-3">
            <button data-testid="button-modal-close" onClick={handleClose} className="text-slate-400 hover:text-slate-600 mt-1 flex-shrink-0">
              <X size={20} />
            </button>
            <div className="text-right">
              <h2 className="text-lg font-bold text-[#0C3156]">التسجيل في الفرصة البحثية</h2>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{researchTitle}</p>
            </div>
          </div>
        </div>

        {/* Success state */}
        {done ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">تم استلام طلبك بنجاح!</h3>
            <p className="text-slate-500 text-sm mb-2">تم حفظ بياناتك وسيتواصل معك فريق RSPF قريباً.</p>
            <p className="text-slate-500 text-sm mb-6">سيفتح واتساب تلقائياً مع رسالتك...</p>
            <div className="flex gap-3 justify-center">
              <a
                href={`https://wa.me/966578032336?text=${encodeURIComponent(`مرحباً، أنا ${form.fullName} — أودّ التسجيل في: ${researchTitle}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-[#1eb856] transition-colors"
              >
                فتح واتساب يدوياً
              </a>
              <button onClick={handleClose} className="border border-slate-200 text-slate-600 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-slate-50">
                إغلاق
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm text-right">
                ⚠️ {error}
              </div>
            )}

            {[
              { label: "الاسم الكامل — Full Name", key: "fullName", placeholder: "د. أحمد محمد", type: "text" },
              { label: "التخصص الدقيق — Specialization", key: "specialization", placeholder: "مثال: طب القلب", type: "text" },
              { label: "البريد الإلكتروني — Email", key: "email", placeholder: "doctor@example.com", type: "email", ltr: true },
              { label: "جهة الانتساب — Affiliation", key: "affiliation", placeholder: "مستشفى الملك فيصل التخصصي", type: "text" },
            ].map(({ label, key, placeholder, type, ltr }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">{label} <span className="text-red-500">*</span></label>
                <input
                  data-testid={`input-${key}`}
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  dir={ltr ? "ltr" : undefined}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156] transition-colors"
                />
              </div>
            ))}

            {/* Country + City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">المدينة</label>
                <input
                  data-testid="input-city"
                  type="text"
                  placeholder="الرياض"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">الدولة <span className="text-red-500">*</span></label>
                <select
                  data-testid="select-country"
                  value={form.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156] bg-white"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* WhatsApp with dynamic country code */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">
                رقم واتساب — WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2" dir="ltr">
                <input
                  data-testid="input-whatsapp"
                  type="tel"
                  required
                  placeholder="5xxxxxxxx"
                  value={form.whatsappLocal}
                  onChange={(e) => setForm({ ...form, whatsappLocal: e.target.value })}
                  className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156]"
                />
                <span className="flex items-center gap-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 flex-shrink-0 whitespace-nowrap">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.code}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 text-right">
                الرقم الكامل: <span dir="ltr" className="font-mono">{fullWhatsapp}{form.whatsappLocal ? "" : "xxxxxxxx"}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">
                ORCID Number <span className="text-slate-400 font-normal">(اختياري)</span>
              </label>
              <input
                data-testid="input-orcid"
                type="text"
                placeholder="0000-0000-0000-0000"
                value={form.orcid}
                onChange={(e) => setForm({ ...form, orcid: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156]"
                dir="ltr"
              />
            </div>

            <button
              data-testid="button-submit-registration"
              type="submit"
              disabled={loading}
              className="w-full bg-[#0C3156] text-white font-bold py-3.5 rounded-xl hover:bg-[#0a2847] transition-colors text-base mt-2 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> جاري الإرسال...</>
              ) : (
                "تسجيل الآن 👤"
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-1">
              بعد التسجيل سيفتح واتساب تلقائياً مع بياناتك
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
