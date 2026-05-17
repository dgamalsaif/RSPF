import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function CoordinatorPortal() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("رمز الدخول غير صحيح. يرجى التواصل مع الإدارة.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0FAF4] to-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            بوابة المنسق
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          {/* Shield icon */}
          <div className="w-16 h-16 bg-[#1B5E37]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield size={32} className="text-[#1B5E37]" />
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-2">بوابة المنسقين</h1>
          <p className="text-gray-500 text-sm mb-7">سجل دخولك برمز الوصول الخاص بك</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                data-testid="input-coordinator-password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="رمز الدخول"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E37]/30 focus:border-[#1B5E37] pr-12"
              />
              <button
                type="button"
                data-testid="button-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              data-testid="button-coordinator-login"
              type="submit"
              className="w-full bg-[#1B5E37] text-white font-bold py-3.5 rounded-xl hover:bg-[#155030] transition-colors text-base"
            >
              دخول
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              لا تملك حساباً؟{" "}
              <a
                href="https://wa.me/966598409805"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-coordinator-register"
                className="text-[#1B5E37] font-semibold hover:underline"
              >
                سجل الآن
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          هذه البوابة مخصصة لمنسقي RSPF فقط
        </p>
      </div>
    </div>
  );
}
