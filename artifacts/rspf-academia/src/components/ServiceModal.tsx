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
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: serviceName,
    details: "",
    fileLink: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم تقديم طلبك بنجاح! سيتواصل معك فريق RSPF خلال 24 ساعة.");
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
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <button
              data-testid="button-service-modal-close"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <div className="text-right">
              <h2 className="text-lg font-bold text-[#1B5E37]">{serviceName}</h2>
              <p className="text-xs text-gray-500 mt-0.5">يرجى ملء النموذج لتقديم طلبك</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">الاسم الكامل</label>
            <input
              data-testid="input-service-name"
              type="text"
              required
              placeholder="الاسم الكامل"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">رقم الجوال (واتساب)</label>
            <input
              data-testid="input-service-phone"
              type="tel"
              required
              placeholder="+966 5X XXX XXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">البريد الإلكتروني</label>
            <input
              data-testid="input-service-email"
              type="email"
              required
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">نوع الخدمة</label>
            <select
              data-testid="select-service-type"
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37] bg-white"
            >
              {serviceTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">تفاصيل الطلب</label>
            <textarea
              data-testid="textarea-service-details"
              required
              rows={4}
              placeholder="يرجى وصف احتياجك بالتفصيل..."
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 text-right">
              رابط الملفات المرفقة <span className="text-gray-400 font-normal">(Google Drive / Dropbox) — اختياري</span>
            </label>
            <input
              data-testid="input-service-file-link"
              type="url"
              placeholder="https://drive.google.com/..."
              value={form.fileLink}
              onChange={(e) => setForm({ ...form, fileLink: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37]"
              dir="ltr"
            />
          </div>

          <button
            data-testid="button-submit-service"
            type="submit"
            className="w-full bg-[#D97706] text-white font-bold py-3.5 rounded-xl hover:bg-[#B45309] transition-colors text-base"
          >
            تقديم الطلب الآن 📤
          </button>
        </form>
      </div>
    </div>
  );
}
