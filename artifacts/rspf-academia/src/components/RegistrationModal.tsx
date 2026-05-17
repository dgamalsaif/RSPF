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
    alert("تم استلام طلبك بنجاح! سيتواصل معك فريق RSPF قريباً.");
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
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-start justify-between gap-3">
            <button
              data-testid="button-modal-close"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 mt-1 flex-shrink-0"
            >
              <X size={20} />
            </button>
            <div className="text-right">
              <h2 className="text-lg font-bold text-[#1B5E37]">التسجيل في الفرصة البحثية</h2>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{researchTitle}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-right">يرجى تعبئة بياناتك كاملاً للتسجيل في هذه الفرصة.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">
              الاسم الكامل — Full Name
            </label>
            <input
              data-testid="input-full-name"
              type="text"
              required
              placeholder="د. أحمد محمد"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">
              التخصص الدقيق — Specialization
            </label>
            <input
              data-testid="input-specialization"
              type="text"
              required
              placeholder="مثال: طب القلب، الجراحة العامة"
              value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">
              البريد الإلكتروني — Email
            </label>
            <input
              data-testid="input-email"
              type="email"
              required
              placeholder="doctor@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">
              رقم واتساب — WhatsApp <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                data-testid="input-whatsapp"
                type="tel"
                required
                placeholder="5XXXXXXXX"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
              />
              <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 flex-shrink-0">
                🇸🇦 +966
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">
              جهة الانتساب — Affiliation
            </label>
            <input
              data-testid="input-affiliation"
              type="text"
              required
              placeholder="مثال: مستشفى الملك فيصل التخصصي"
              value={form.affiliation}
              onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">المدينة</label>
              <input
                data-testid="input-city"
                type="text"
                placeholder="الرياض"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">الدولة</label>
              <select
                data-testid="select-country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37] bg-white"
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
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">
              ORCID Number <span className="text-gray-400 font-normal">(اختياري)</span>
            </label>
            <input
              data-testid="input-orcid"
              type="text"
              placeholder="0000-0000-0000-0000"
              value={form.orcid}
              onChange={(e) => setForm({ ...form, orcid: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
              dir="ltr"
            />
          </div>

          <button
            data-testid="button-submit-registration"
            type="submit"
            className="w-full bg-[#1B5E37] text-white font-bold py-3.5 rounded-xl hover:bg-[#155030] transition-colors text-base mt-2"
          >
            تسجيل الآن 👤
          </button>
        </form>
      </div>
    </div>
  );
}
