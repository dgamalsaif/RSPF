import { useState } from "react";
import { X } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  researchTitle: string;
}

export default function RegistrationModal({ isOpen, onClose, researchTitle }: RegistrationModalProps) {
  const [form, setForm] = useState({
    fullName: "",
    specialization: "",
    email: "",
    whatsapp: "",
    affiliation: "",
    country: "المملكة العربية السعودية",
    city: "",
    orcid: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم استلام طلبك بنجاح! سيتواصل معك فريق RSPF قريباً عبر واتساب.");
    setForm({ fullName: "", specialization: "", email: "", whatsapp: "", affiliation: "", country: "المملكة العربية السعودية", city: "", orcid: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-start justify-between gap-3">
            <button data-testid="button-modal-close" onClick={onClose} className="text-slate-400 hover:text-slate-600 mt-1">
              <X size={20} />
            </button>
            <div className="text-right">
              <h2 className="text-lg font-bold text-[#0C3156]">التسجيل في الفرصة البحثية</h2>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{researchTitle}</p>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2 text-right">يرجى تعبئة بياناتك كاملاً للتسجيل في هذه الفرصة.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {[
            { label: "الاسم الكامل — Full Name", key: "fullName", placeholder: "د. أحمد محمد", type: "text" },
            { label: "التخصص الدقيق — Specialization", key: "specialization", placeholder: "مثال: طب القلب", type: "text" },
            { label: "البريد الإلكتروني — Email", key: "email", placeholder: "doctor@example.com", type: "email", ltr: true },
            { label: "جهة الانتساب — Affiliation", key: "affiliation", placeholder: "مستشفى الملك فيصل التخصصي", type: "text" },
          ].map(({ label, key, placeholder, type, ltr }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">{label}</label>
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

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">
              رقم واتساب — WhatsApp <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                data-testid="input-whatsapp"
                type="tel"
                required
                placeholder="578032336"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156]"
              />
              <span className="flex items-center px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 flex-shrink-0">
                🇸🇦 +966
              </span>
            </div>
          </div>

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
              <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">الدولة</label>
              <select
                data-testid="select-country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156] bg-white"
              >
                <option>المملكة العربية السعودية</option>
                <option>البحرين</option>
                <option>قطر</option>
                <option>عُمان</option>
                <option>الكويت</option>
                <option>الإمارات</option>
                <option>أخرى</option>
              </select>
            </div>
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
            className="w-full bg-[#0C3156] text-white font-bold py-3.5 rounded-xl hover:bg-[#0a2847] transition-colors text-base mt-2 shadow-sm"
          >
            تسجيل الآن 👤
          </button>
        </form>
      </div>
    </div>
  );
}
