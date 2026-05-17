import { useState, useEffect } from "react";
import { Shield, Eye, EyeOff, Copy, CheckCircle2, X, ChevronDown, ChevronUp, Users, Link as LinkIcon, UserPlus, LogIn, Star, Award } from "lucide-react";
import RegistrationModal from "@/components/RegistrationModal";
import { getResearchOpportunities, ResearchOpportunity } from "@/lib/researchData";
import { useToast } from "@/hooks/use-toast";

/* ============================================================
   TYPES & STORAGE
   ============================================================ */
export interface CoordinatorRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  status: "pending" | "approved";
  code?: string;
  createdAt: string;
}

const REQUESTS_KEY = "rspf_coordinator_requests";
const CODES_KEY = "rspf_coordinator_codes";

export function getCoordinatorRequests(): CoordinatorRequest[] {
  try { return JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]"); } catch { return []; }
}
export function saveCoordinatorRequests(data: CoordinatorRequest[]) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(data));
}
export function getApprovedCodes(): CoordinatorRequest[] {
  try { return JSON.parse(localStorage.getItem(CODES_KEY) || "[]"); } catch { return []; }
}
export function saveApprovedCodes(data: CoordinatorRequest[]) {
  localStorage.setItem(CODES_KEY, JSON.stringify(data));
}
export function validateCode(code: string): CoordinatorRequest | null {
  const approved = getApprovedCodes();
  return approved.find((c) => c.code === code.trim().toUpperCase()) || null;
}

/* ============================================================
   LINK MODAL
   ============================================================ */
function LinkModal({ research, onClose }: { research: ResearchOpportunity; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/research/${research.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
            <X size={20} />
          </button>
          <div className="flex items-center gap-2 text-right">
            <h3 className="font-black text-slate-900">رابط التسجيل</h3>
            <LinkIcon size={18} className="text-[#0C3156]" />
          </div>
        </div>

        <p className="text-slate-500 text-sm text-right mb-1">
          رابط التسجيل في: <span className="font-semibold text-slate-700">{research.title.slice(0, 60)}...</span>
        </p>
        <p className="text-slate-500 text-sm text-right mb-4">انسخ الرابط أدناه وشاركه مع المشاركين للتسجيل مباشرة:</p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex items-center gap-2 justify-between">
          <button onClick={handleCopy} className="text-slate-400 hover:text-[#0C3156] flex-shrink-0">
            <Copy size={16} />
          </button>
          <span className="text-sm text-slate-700 font-mono text-right truncate">{link}</span>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 text-sm">
            ✕ إغلاق
          </button>
          <button onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 font-bold py-2.5 rounded-xl text-sm transition-all ${
              copied ? "bg-emerald-500 text-white" : "bg-[#0C3156] text-white hover:opacity-90"
            }`}>
            {copied ? <><CheckCircle2 size={16} /> تم النسخ!</> : <><Copy size={16} /> نسخ الرابط</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BENEFITS MODAL
   ============================================================ */
function BenefitsModal({ onClose }: { onClose: () => void }) {
  const benefits = [
    "مطابقة لمعايير هيئة التخصصات الصحية السعودية للتقديم على برامج البورد السعودي والريزدنسي والزمالة والترقية الأكاديمية والمهنية والابتعاث.",
    "متوافقة مع معايير الـ (ERAS · Oriel · RCPI · RCSI · NHS · NRMP) للتقديم على برامج المعادلات والبورد والزمالات الخارجية.",
    "مثالية للراغبين في تطوير سيرتهم الذاتية وبناء ملف بحثي قوي.",
    "👑 باقة التميز للمجالس الطلابية والأندية الأكاديمية — خصومات تصل إلى 25% مع تقارير متابعة دورية لمنسق المجلس.",
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
            <X size={20} />
          </button>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            امتيازات الباحث المشارك
            <Star size={20} className="text-[#E9A020]" />
          </h3>
        </div>

        <ul className="space-y-4 mb-6">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-3 flex-row-reverse">
              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm leading-relaxed text-right">{b}</span>
            </li>
          ))}
        </ul>

        <button onClick={onClose}
          className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
          فهمت ذلك، إغلاق
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   COORDINATOR DASHBOARD
   ============================================================ */
function CoordinatorDashboard({ coordinator, onLogout }: { coordinator: CoordinatorRequest; onLogout: () => void }) {
  const [opportunities, setOpportunities] = useState<ResearchOpportunity[]>([]);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [linkModal, setLinkModal] = useState<ResearchOpportunity | null>(null);
  const [regModal, setRegModal] = useState<{ title: string; id: number } | null>(null);
  const [benefitsModal, setBenefitsModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    setOpportunities(getResearchOpportunities().filter((r) => r.status === "open"));
  }, []);

  const toggleExpand = (id: number) =>
    setExpandedCards((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 shadow-sm px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onLogout}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors font-medium border border-slate-200 px-3 py-1.5 rounded-lg hover:border-red-200 hover:bg-red-50">
            <X size={14} /> خروج
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-black text-slate-900">{coordinator.name}</p>
              <p className="text-xs text-slate-400">{coordinator.institution}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0C3156]/8 border border-[#0C3156]/15 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-mono font-bold text-[#0C3156]">رمز الدخول: {coordinator.code}</span>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-[#0C3156] to-[#1A5FAE] rounded-xl flex items-center justify-center font-black text-white text-sm shadow-sm">
              {coordinator.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white py-8 px-4 text-right">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black mb-1">لوحة تحكم المنسق 🎯</h1>
          <p className="text-blue-200 text-sm">سجل الطلاب في الفرص البحثية وشارك الروابط المباشرة معهم</p>
          <div className="flex gap-6 mt-5">
            {[
              { val: opportunities.length, label: "فرصة متاحة" },
              { val: opportunities.reduce((s, r) => s + r.seatsLeft, 0), label: "مقعد متبقي" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black">{s.val}</div>
                <div className="text-xs text-blue-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex gap-2">
          {[
            { label: "🔬 الفرص البحثية", count: opportunities.length },
            { label: "📚 تدريب باحث" },
            { label: "🎓 دورات CME" },
          ].map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === i ? "bg-[#0C3156] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}>
              {tab.label}
              {tab.count !== undefined && <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === i ? "bg-white/20" : "bg-slate-200"}`}>{tab.count}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {activeTab === 0 && (
          <>
            {/* Benefits banner */}
            <button onClick={() => setBenefitsModal(true)}
              className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl px-5 py-4 text-right hover:shadow-md transition-all flex items-center justify-between group">
              <span className="text-amber-600 font-semibold text-sm flex items-center gap-1.5">
                اضغط لعرضها <ChevronDown size={14} />
              </span>
              <div className="flex items-center gap-2">
                <span className="font-black text-amber-800">⭐ امتيازات الباحث المشارك</span>
                <Star size={18} className="text-[#E9A020]" />
              </div>
            </button>

            {/* Research cards */}
            {opportunities.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
                <div className="text-4xl mb-3">🔬</div>
                <p className="font-bold text-slate-600">لا توجد فرص بحثية مفتوحة حالياً</p>
              </div>
            ) : (
              opportunities.map((opp) => {
                const isExpanded = expandedCards.includes(opp.id);
                const seatsUsed = opp.totalSeats - opp.seatsLeft;
                const pct = Math.round((seatsUsed / opp.totalSeats) * 100);
                const isAlmostFull = opp.seatsLeft <= 3;

                return (
                  <div key={opp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
                    {/* Specialty header */}
                    <div className="bg-slate-50 border-b border-slate-100 px-5 py-2.5 flex items-center justify-between flex-row-reverse">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${opp.specialtyColor}`}>{opp.specialty}</span>
                      {opp.status === "open" ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> مفتوح للتسجيل
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">اكتملت المقاعد</span>
                      )}
                    </div>

                    <div className="px-5 py-4">
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-right leading-snug text-sm mb-3">{opp.title}</h3>

                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                        {[
                          { label: "التخصص", value: opp.specialty },
                          { label: "المشرف", value: opp.supervisor?.split("—")[0]?.trim() || "—" },
                          { label: "المقاعد", value: `${opp.seatsLeft} / ${opp.totalSeats}` },
                          { label: "المدة", value: opp.duration },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-slate-50 rounded-xl px-3 py-2 text-right">
                            <span className="text-slate-400 block">{label}</span>
                            <span className="font-bold text-slate-700">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${pct > 80 ? "bg-gradient-to-l from-red-500 to-orange-400" : "bg-gradient-to-l from-[#0C3156] to-[#1A5FAE]"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {isAlmostFull && <p className="text-xs text-red-600 font-semibold text-right mt-1">⚠️ مقاعد محدودة — {opp.seatsLeft} متبقية فقط</p>}
                      </div>

                      {/* Expand details */}
                      <button onClick={() => toggleExpand(opp.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0C3156] mb-3 flex-row-reverse w-full justify-end transition-colors">
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        التفاصيل
                      </button>
                      {isExpanded && opp.benefits.length > 0 && (
                        <ul className="space-y-1.5 mb-4 bg-[#EFF6FF] rounded-xl p-3.5">
                          {opp.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-2 flex-row-reverse text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0C3156] flex-shrink-0 mt-1.5" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setRegModal({ title: opp.title, id: opp.id })}
                          disabled={opp.status !== "open"}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md shadow-[#0C3156]/15 disabled:opacity-40 disabled:cursor-not-allowed">
                          <Users size={15} /> تسجيل طالب
                        </button>
                        <button
                          onClick={() => setLinkModal(opp)}
                          className="flex items-center justify-center gap-2 border border-[#0C3156]/20 text-[#0C3156] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0C3156]/5 transition-colors text-sm">
                          <Copy size={14} /> نسخ رابط
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {activeTab !== 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
            <div className="text-5xl mb-4">{activeTab === 1 ? "📚" : "🎓"}</div>
            <h3 className="text-xl font-black text-slate-700 mb-2">{activeTab === 1 ? "برنامج تدريب باحث" : "دورات CME معتمدة"}</h3>
            <p className="text-slate-400 text-sm mb-6">سيتم إضافة المحتوى قريباً</p>
            <a href="https://wa.me/966578032336" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-full text-sm">
              📱 تواصل معنا
            </a>
          </div>
        )}
      </div>

      {linkModal && <LinkModal research={linkModal} onClose={() => setLinkModal(null)} />}
      {benefitsModal && <BenefitsModal onClose={() => setBenefitsModal(false)} />}
      {regModal && (
        <RegistrationModal
          isOpen={true}
          onClose={() => setRegModal(null)}
          researchTitle={regModal.title}
          researchId={regModal.id}
        />
      )}
    </div>
  );
}

/* ============================================================
   MAIN COORDINATOR PORTAL (Login / Register)
   ============================================================ */
export default function CoordinatorPortal() {
  const [view, setView] = useState<"login" | "register" | "pending">("login");
  const [coordinator, setCoordinator] = useState<CoordinatorRequest | null>(null);
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", institution: "" });
  const { toast } = useToast();

  // Persist session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("rspf_coordinator_session");
      if (saved) setCoordinator(JSON.parse(saved));
    } catch {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const found = validateCode(code);
      if (found) {
        setCoordinator(found);
        sessionStorage.setItem("rspf_coordinator_session", JSON.stringify(found));
        setError("");
      } else {
        setError("رمز الوصول غير صحيح أو لم تتم الموافقة عليه بعد. تأكد من الرمز أو تواصل مع الإدارة.");
      }
      setLoading(false);
    }, 600);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newRequest: CoordinatorRequest = {
      id: `req-${Date.now()}`,
      ...form,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    const requests = getCoordinatorRequests();
    requests.push(newRequest);
    saveCoordinatorRequests(requests);

    // Send WhatsApp notification to admin
    const msg = encodeURIComponent(
      `🆕 طلب منسق جديد على RSPF\n\n` +
      `👤 الاسم: ${form.name}\n` +
      `📧 البريد: ${form.email}\n` +
      `📱 الجوال: ${form.phone}\n` +
      `🏥 الجهة: ${form.institution}\n\n` +
      `يرجى الموافقة وإرسال رمز الوصول`
    );
    window.open(`https://wa.me/966578032336?text=${msg}`, "_blank");

    setLoading(false);
    setView("pending");
  };

  const handleLogout = () => {
    setCoordinator(null);
    sessionStorage.removeItem("rspf_coordinator_session");
    setCode("");
  };

  if (coordinator) {
    return <CoordinatorDashboard coordinator={coordinator} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0C3156] to-[#1A5FAE] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield size={30} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">بوابة المنسقين</h1>
          <p className="text-slate-500 text-sm mt-1">
            {view === "login" ? "سجّل دخولك برمز الوصول الخاص بك" :
             view === "register" ? "أنشئ حساب منسق جديد" :
             "تم إرسال طلبك بنجاح"}
          </p>
        </div>

        {/* PENDING VIEW */}
        {view === "pending" && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center animate-scale-in">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">تم إرسال طلبك ✅</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              تم إشعار الإدارة عبر واتساب ببياناتك. ستتلقى رمز الوصول الخاص بك على واتساب بعد الموافقة.
            </p>

            {/* Steps */}
            <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-right space-y-4 border border-slate-100">
              <p className="text-xs font-black text-slate-500 text-center uppercase tracking-widest mb-3">خطوات الحصول على رمز الدخول</p>
              {[
                { num: "١", text: "تواصلت الإدارة معك وأرسلت طلبك ✅", done: true },
                { num: "٢", text: "الإدارة ستراجع طلبك وتوافق عليه خلال 24 ساعة", done: false },
                { num: "٣", text: "ستصلك رسالة واتساب تحتوي على رمز الدخول الخاص بك", done: false },
                { num: "٤", text: "ادخل الرمز في خانة 'رمز الدخول' أدناه وادخل للوحة التحكم", done: false },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-3 flex-row-reverse">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step.done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {step.done ? "✓" : step.num}
                  </div>
                  <span className={`text-sm ${step.done ? "text-emerald-700 font-semibold" : "text-slate-600"}`}>{step.text}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/966578032336"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity mb-3 text-sm"
            >
              <span>📱</span> تواصل مع الإدارة عبر واتساب
            </a>

            <button onClick={() => setView("login")}
              className="w-full border border-[#0C3156]/20 text-[#0C3156] font-semibold py-3 rounded-xl hover:bg-[#0C3156]/5 transition-colors text-sm">
              لديّ رمز وصول — سجّل الدخول الآن
            </button>
          </div>
        )}

        {/* LOGIN VIEW */}
        {view === "login" && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-right mb-2">
                <label className="text-sm font-bold text-slate-700">رمز الدخول</label>
              </div>
              <div className="relative">
                <input
                  data-testid="input-coordinator-code"
                  type={showCode ? "text" : "password"}
                  required
                  placeholder="أدخل الرمز هنا ..."
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(""); }}
                  className={`w-full border rounded-xl px-5 py-3.5 text-right text-sm font-mono focus:outline-none focus:ring-2 transition-colors ${
                    error ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-[#0C3156]/20 focus:border-[#0C3156]"
                  }`}
                />
                <button type="button" onClick={() => setShowCode(!showCode)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs text-right bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>}
              <button data-testid="button-coordinator-login" type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md shadow-[#0C3156]/20 disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? <><span className="animate-spin">⏳</span> جاري التحقق...</> : <><LogIn size={16} /> دخول إلى لوحة التحكم</>}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <button onClick={() => setView("register")}
                className="text-sm text-[#0C3156] font-semibold hover:underline">
                لا تملك حساباً؟ سجّل الآن
              </button>
            </div>
          </div>
        )}

        {/* REGISTER VIEW */}
        {view === "register" && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              {[
                { label: "الاسم الكامل", key: "name", placeholder: "د. أحمد محمد العلي", type: "text" },
                { label: "البريد الإلكتروني", key: "email", placeholder: "email@example.com", type: "email" },
                { label: "رقم الجوال (واتساب)", key: "phone", placeholder: "05xxxxxxxx", type: "tel" },
                { label: "الجهة الأكاديمية / المستشفى", key: "institution", placeholder: "جامعة الملك سعود، مستشفى الملك فهد...", type: "text" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-bold text-slate-700 text-right mb-1.5">{label}</label>
                  <input
                    required type={type} placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156]"
                  />
                </div>
              ))}

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? <><span className="animate-spin">⏳</span> جاري الإرسال...</> : <><UserPlus size={16} /> إنشاء حساب وإرسال طلب الموافقة</>}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <button onClick={() => setView("login")}
                className="text-sm text-[#0C3156] font-semibold hover:underline">
                لديك رمز وصول؟ سجّل دخولك
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-4">
          هذه البوابة مخصصة لمنسقي RSPF الموافق عليهم من الإدارة فقط
        </p>
      </div>
    </div>
  );
}
