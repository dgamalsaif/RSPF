import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";

const ADMIN_PASSWORD = "RSPF2026";

export default function CoordinatorPortal() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError("");
      setLocation("/admin");
    } else {
      setError("رمز الدخول غير صحيح. يرجى التحقق والمحاولة مجدداً.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#0C3156]/8 border border-[#0C3156]/15 text-[#0C3156] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            بوابة المنسق
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0C3156] to-[#1A5FAE] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
            <Shield size={30} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">بوابة المنسقين</h1>
          <p className="text-slate-500 text-sm mb-7">سجل دخولك برمز الوصول الخاص بك للوصول إلى لوحة التحكم</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                data-testid="input-coordinator-password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="رمز الدخول"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={`w-full border rounded-xl px-5 py-3.5 text-right text-sm focus:outline-none focus:ring-2 transition-colors ${
                  error ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-[#0C3156]/20 focus:border-[#0C3156]"
                }`}
              />
              <button
                type="button"
                data-testid="button-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-right bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}
            <button
              data-testid="button-coordinator-login"
              type="submit"
              className="w-full bg-[#0C3156] text-white font-bold py-3.5 rounded-xl hover:bg-[#0a2847] transition-colors text-base shadow-sm"
            >
              دخول إلى لوحة التحكم
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              هل تحتاج مساعدة؟{" "}
              <a href="https://t.me/RSPF_Services" target="_blank" rel="noopener noreferrer"
                data-testid="link-coordinator-help"
                className="text-[#0C3156] font-semibold hover:underline">
                تواصل مع الإدارة
              </a>
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          هذه البوابة مخصصة لمنسقي RSPF فقط — كلمة المرور: RSPF2026
        </p>
      </div>
    </div>
  );
}
