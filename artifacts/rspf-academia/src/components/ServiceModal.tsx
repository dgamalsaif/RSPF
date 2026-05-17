import { useState } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

const API_BASE = "/api";

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
  const { t } = useLang();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: serviceName,
    details: "",
    fileLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setForm({ fullName: "", phone: "", email: "", serviceType: serviceName, details: "", fileLink: "" });
    setDone(false);
    setError("");
    setLoading(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/service-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || t.service.submit);
      }

      setDone(true);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.service.submit);
    } finally {
      setLoading(false);
    }
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
          <div className="flex items-center justify-between">
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
              <X size={18} />
            </button>
            <div className="text-right">
              <h2 className="text-base sm:text-lg font-black text-[#0C3156]">{form.serviceType || serviceName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.service.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Success state */}
        {done ? (
          <div className="px-6 py-12 text-center animate-in fade-in zoom-in-90 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-100">
              <CheckCircle2 size={38} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">✅ {t.service.success}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{t.service.successDesc}</p>
            <button
              onClick={handleClose}
              className="bg-[#E9A020] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#d08e10] transition-colors shadow-sm"
            >
              {t.service.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm text-right animate-in slide-in-from-top-2 duration-200">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.service.fullName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text" required
                placeholder="الاسم الكامل"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#E9A020]/25 focus:border-[#E9A020] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.service.phone} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel" required
                placeholder="+966 57 803 2336"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                dir="ltr"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#E9A020]/25 focus:border-[#E9A020] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.service.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email" required
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                dir="ltr"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#E9A020]/25 focus:border-[#E9A020] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">{t.service.serviceType}</label>
              <select
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#E9A020]/25 focus:border-[#E9A020] bg-white transition-all"
              >
                {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.service.details} <span className="text-red-500">*</span>
              </label>
              <textarea
                required rows={4}
                placeholder="يرجى وصف احتياجك بالتفصيل..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#E9A020]/25 focus:border-[#E9A020] resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
                {t.service.fileLink} <span className="text-slate-400 font-normal text-xs">{t.service.optional}</span>
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                value={form.fileLink}
                onChange={(e) => setForm({ ...form, fileLink: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E9A020]/25 focus:border-[#E9A020] transition-all"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-l from-[#E9A020] to-[#f0b435] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all text-base shadow-lg shadow-[#E9A020]/25 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> {t.service.submitting}</>
              ) : (
                t.service.submit
              )}
            </button>
            <p className="text-center text-xs text-slate-400">
              {t.service.afterSubmit}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
