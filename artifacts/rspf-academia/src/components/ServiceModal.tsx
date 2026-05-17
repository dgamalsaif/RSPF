import { useState } from "react";
import { X } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

const serviceTypes = [
  "إعداد الدراسة البحثية",
  "رسائل الماجستير",
  "رسائل الدكتوراه",
  "التحكيم العلمي",
  "الترجمة الأكاديمية",
  "التدقيق والمراجعة",
  "التحليل الإحصائي",
  "خدمات أخرى",
];

export default function ServiceModal({ isOpen, onClose, serviceName }: ServiceModalProps) {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", serviceType: serviceName, details: "", fileLink: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم تقديم طلبك بنجاح! سيتواصل معك فريق RSPF خلال 24 ساعة.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <button data-testid="button-service-modal-close" onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
            <div className="text-right">
              <h2 className="text-lg font-bold text-[#0C3156]">{serviceName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">يرجى ملء النموذج لتقديم طلبك</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {[
            { label: "الاسم الكامل", key: "fullName", placeholder: "الاسم الكامل", type: "text" },
            { label: "رقم الجوال (واتساب)", key: "phone", placeholder: "+966 57 803 2336", type: "tel" },
            { label: "البريد الإلكتروني", key: "email", placeholder: "example@email.com", type: "email", ltr: true },
          ].map(({ label, key, placeholder, type, ltr }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">{label}</label>
              <input
                data-testid={`input-service-${key}`}
                type={type}
                required
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                dir={ltr ? "ltr" : undefined}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156]"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">نوع الخدمة</label>
            <select
              data-testid="select-service-type"
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156] bg-white"
            >
              {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">تفاصيل الطلب</label>
            <textarea
              data-testid="textarea-service-details"
              required
              rows={4}
              placeholder="يرجى وصف احتياجك بالتفصيل..."
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156] resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 text-right">
              رابط الملفات <span className="text-slate-400 font-normal">(Google Drive / Dropbox) — اختياري</span>
            </label>
            <input
              data-testid="input-service-file-link"
              type="url"
              placeholder="https://drive.google.com/..."
              value={form.fileLink}
              onChange={(e) => setForm({ ...form, fileLink: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/25 focus:border-[#0C3156]"
              dir="ltr"
            />
          </div>
          <button
            data-testid="button-submit-service"
            type="submit"
            className="w-full bg-[#E9A020] text-white font-bold py-3.5 rounded-xl hover:bg-[#d08e10] transition-colors text-base shadow-sm"
          >
            تقديم الطلب الآن 📤
          </button>
        </form>
      </div>
    </div>
  );
}
