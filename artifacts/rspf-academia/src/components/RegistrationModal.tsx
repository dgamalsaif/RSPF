import { useState, useRef, useEffect } from "react";
import { X, CheckCircle2, Loader2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang, ACADEMIC_DEGREES, UNIVERSITIES } from "@/contexts/LanguageContext";

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
  const { t } = useLang();
  const degrees = ACADEMIC_DEGREES(t);

  const [form, setForm] = useState({
    fullName: "",
    specialization: "",
    academicDegree: "",
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

  const [uniSearch, setUniSearch] = useState("");
  const [uniOpen, setUniOpen] = useState(false);
  const uniRef = useRef<HTMLDivElement>(null);

  const filteredUnis = UNIVERSITIES.filter((u) =>
    u.name.toLowerCase().includes(uniSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (uniRef.current && !uniRef.current.contains(e.target as Node)) {
        setUniOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectUniversity = (uni: typeof UNIVERSITIES[0]) => {
    setUniSearch(uni.name);
    setForm((f) => ({
      ...f,
      affiliation: uni.name,
      city: uni.city || f.city,
      country: uni.country || f.country,
    }));
    setUniOpen(false);
  };

  const selectedCountry = COUNTRIES.find((c) => c.name === form.country) ?? COUNTRIES[0];
  const fullWhatsapp = `${selectedCountry.code}${form.whatsappLocal.replace(/^0+/, "")}`;

  const reset = () => {
    setForm({ fullName: "", specialization: "", academicDegree: "", email: "", whatsappLocal: "", affiliation: "", country: "المملكة العربية السعودية", city: "", orcid: "" });
    setUniSearch("");
    setDone(false);
    setError("");
    setLoading(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const saveToLocalStorage = (data: Record<string, unknown>) => {
    try {
      const existing = JSON.parse(localStorage.getItem("rspf_registrations") || "[]");
      existing.push({ ...data, id: Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem("rspf_registrations", JSON.stringify(existing));
    } catch {}
  };

  const sendWhatsAppNotification = (data: typeof form) => {
    const msg = encodeURIComponent(
      `📋 تسجيل جديد في RSPF\n\n` +
      `👤 الاسم: ${data.fullName}\n` +
      `🎓 التخصص: ${data.specialization}\n` +
      `📚 الدرجة العلمية: ${data.academicDegree}\n` +
      `📧 البريد: ${data.email}\n` +
      `📱 واتساب: ${fullWhatsapp}\n` +
      `🏥 الجهة: ${data.affiliation}\n` +
      `🌍 الدولة: ${data.country}${data.city ? ` — ${data.city}` : ""}\n` +
      `${data.orcid ? `🔗 ORCID: ${data.orcid}\n` : ""}` +
      `\n📄 الدراسة: ${researchTitle}`
    );
    window.open(`https://wa.me/966578032336?text=${msg}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      fullName: form.fullName,
      specialization: form.specialization,
      academicDegree: form.academicDegree,
      email: form.email,
      whatsapp: fullWhatsapp,
      affiliation: form.affiliation,
      country: form.country,
      city: form.city,
      orcid: form.orcid,
      researchId,
      researchTitle,
    };

    // Always save to localStorage
    saveToLocalStorage(payload);

    // Try API (non-blocking)
    fetch(`${API_BASE}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    // Send WhatsApp notification to admin
    sendWhatsAppNotification(form);

    setDone(true);
    setLoading(false);
    toast({
      title: "✅ " + t.registration.success,
      description: t.registration.successDesc,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 rounded-t-2xl z-10">
          <div className="flex items-start justify-between gap-3">
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 mt-1 flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 transition-colors">
              <X size={18} />
            </button>
            <div className="text-right">
              <h2 className="text-base sm:text-lg font-black text-[#0C3156]">{t.registration.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{researchTitle}</p>
            </div>
          </div>
        </div>

        {/* Success state */}
        {done ? (
          <div className="px-6 py-12 text-center animate-in fade-in zoom-in-90 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-100">
              <CheckCircle2 size={38} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">✅ {t.registration.success}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{t.registration.successDesc}</p>
            <button
              onClick={handleClose}
              className="bg-[#0C3156] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#0a2847] transition-colors shadow-sm"
            >
              {t.registration.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm text-right animate-in slide-in-from-top-2 duration-200">
                ⚠️ {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.registration.fullName} — <span className="text-slate-400 font-normal">{t.registration.fullNameEn}</span> <span className="text-red-500">*</span>
              </label>
              <input
                type="text" required
                placeholder="د. أحمد محمد / Dr. Ahmed"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] transition-all"
              />
            </div>

            {/* Specialization + Academic Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                  {t.registration.specializationEn} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" required
                  placeholder="Cardiology / طب القلب"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                  {t.registration.academicDegreeEn} <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.academicDegree}
                  onChange={(e) => setForm({ ...form, academicDegree: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] bg-white transition-all"
                >
                  <option value="">اختر / Select...</option>
                  {degrees.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.registration.emailEn} <span className="text-red-500">*</span>
              </label>
              <input
                type="email" required
                placeholder="doctor@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                dir="ltr"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] transition-all"
              />
            </div>

            {/* Affiliation (University Autocomplete) */}
            <div ref={uniRef} className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.registration.affiliationEn} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text" required
                  placeholder="ابحث عن جامعتك / Search your university..."
                  value={uniSearch}
                  onChange={(e) => {
                    setUniSearch(e.target.value);
                    setForm((f) => ({ ...f, affiliation: e.target.value }));
                    setUniOpen(true);
                  }}
                  onFocus={() => setUniOpen(true)}
                  className="w-full border border-slate-200 rounded-xl pr-9 pl-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] transition-all"
                />
              </div>
              {uniOpen && filteredUnis.length > 0 && (
                <div className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
                  {filteredUnis.map((uni) => (
                    <button
                      key={uni.name}
                      type="button"
                      onClick={() => selectUniversity(uni)}
                      className="w-full text-right px-4 py-2.5 text-sm hover:bg-[#0C3156]/5 transition-colors border-b border-slate-50 last:border-0"
                    >
                      <span className="font-medium text-slate-800">{uni.name}</span>
                      {uni.city && (
                        <span className="text-xs text-slate-400 mr-2">{uni.city} — {uni.country}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Country + City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                  {t.registration.city}
                </label>
                <input
                  type="text"
                  placeholder="الرياض / Riyadh"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                  {t.registration.country} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] bg-white transition-all"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.registration.whatsappEn} <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2" dir="ltr">
                <input
                  type="tel" required
                  placeholder="5xxxxxxxx"
                  value={form.whatsappLocal}
                  onChange={(e) => setForm({ ...form, whatsappLocal: e.target.value })}
                  className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] transition-all"
                />
                <span className="flex items-center gap-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 flex-shrink-0 whitespace-nowrap">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.code}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 text-right">
                {t.registration.fullNumber}: <span dir="ltr" className="font-mono">{fullWhatsapp}{form.whatsappLocal ? "" : "xxxxxxxx"}</span>
              </p>
            </div>

            {/* ORCID */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                ORCID Number <span className="text-slate-400 font-normal text-xs">({t.registration.optional})</span>
              </label>
              <input
                type="text"
                placeholder="0000-0000-0000-0000"
                value={form.orcid}
                onChange={(e) => setForm({ ...form, orcid: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] transition-all"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-l from-[#0C3156] to-[#1A5FAE] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all text-base mt-1 shadow-lg shadow-[#0C3156]/20 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> {t.registration.submitting}</>
              ) : (
                t.registration.submit
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              {t.registration.afterSubmit}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
