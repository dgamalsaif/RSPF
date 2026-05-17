import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Plus, Pencil, Trash2, Eye, X, ChevronLeft, LogOut, Search,
  Users, BookOpen, TrendingUp, AlertCircle, Image as ImageIcon,
  Globe, CheckCircle2, Copy, UserCheck, Clock, ShieldCheck
} from "lucide-react";
import { getResearchOpportunities, saveResearchOpportunities, getNextId, ResearchOpportunity, SPECIALTY_COLORS } from "@/lib/researchData";
import {
  getCoordinatorRequests, saveCoordinatorRequests,
  getApprovedCodes, saveApprovedCodes,
  type CoordinatorRequest
} from "@/pages/CoordinatorPortal";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "COORD-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function CoordinatorsPanel() {
  const [requests, setRequests] = useState<CoordinatorRequest[]>([]);
  const [approved, setApproved] = useState<CoordinatorRequest[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [tab, setTab] = useState<"pending" | "approved">("pending");

  const reload = () => {
    setRequests(getCoordinatorRequests().filter((r) => r.status === "pending"));
    setApproved(getApprovedCodes());
  };

  useEffect(() => { reload(); }, []);

  const handleApprove = (req: CoordinatorRequest) => {
    const code = generateCode();
    const approvedItem: CoordinatorRequest = { ...req, status: "approved", code };
    const newApproved = [...getApprovedCodes(), approvedItem];
    saveApprovedCodes(newApproved);
    const remaining = getCoordinatorRequests().filter((r) => r.id !== req.id);
    saveCoordinatorRequests(remaining);
    reload();
    const msg = encodeURIComponent(
      `✅ تمت الموافقة على طلبك كمنسق في RSPF\n\n` +
      `👤 الاسم: ${req.name}\n` +
      `🔑 رمز الدخول الخاص بك: ${code}\n\n` +
      `ادخل على بوابة المنسق واستخدم هذا الرمز للدخول`
    );
    window.open(`https://wa.me/${req.phone.replace(/\D/g, "")}?text=${msg}`, "_blank");
  };

  const handleReject = (req: CoordinatorRequest) => {
    const remaining = getCoordinatorRequests().filter((r) => r.id !== req.id);
    saveCoordinatorRequests(remaining);
    reload();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-row-reverse">
        <div>
          <h2 className="text-lg font-black text-slate-900 text-right">إدارة المنسقين</h2>
          <p className="text-sm text-slate-400 text-right">الموافقة على طلبات المنسقين وتوليد رموز الوصول</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab("pending")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${tab === "pending" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>
            <Clock size={14} />
            بانتظار الموافقة
            {requests.length > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === "pending" ? "bg-white/30 text-white" : "bg-amber-200"}`}>{requests.length}</span>}
          </button>
          <button onClick={() => setTab("approved")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${tab === "approved" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>
            <ShieldCheck size={14} />
            موافق عليهم
            {approved.length > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === "approved" ? "bg-white/30 text-white" : "bg-emerald-200"}`}>{approved.length}</span>}
          </button>
        </div>
      </div>

      {tab === "pending" && (
        <>
          {requests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
              <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-300" />
              <p className="font-bold text-slate-500">لا توجد طلبات معلقة</p>
              <p className="text-xs text-slate-400 mt-1">ستظهر هنا طلبات المنسقين الجدد</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="bg-white rounded-2xl border border-amber-200 shadow-sm p-5 text-right">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleReject(req)}
                        className="flex items-center gap-1.5 border border-red-200 text-red-500 hover:bg-red-50 font-semibold px-3.5 py-2 rounded-xl text-sm transition-colors">
                        <X size={14} /> رفض
                      </button>
                      <button onClick={() => handleApprove(req)}
                        className="flex items-center gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm">
                        <UserCheck size={14} /> موافقة + إرسال الرمز
                      </button>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900">{req.name}</h3>
                      <p className="text-sm text-slate-500">{req.institution}</p>
                      <div className="flex gap-4 mt-2 text-xs text-slate-400">
                        <span>📧 {req.email}</span>
                        <span>📱 {req.phone}</span>
                        <span>📅 {req.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "approved" && (
        <>
          {approved.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
              <Users size={40} className="mx-auto mb-3 text-slate-200" />
              <p className="font-bold text-slate-500">لا يوجد منسقون معتمدون بعد</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-right">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {["الاسم", "الجهة", "رمز الوصول", "تاريخ التسجيل", "إجراء"].map((h) => (
                      <th key={h} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {approved.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{c.institution}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => copyCode(c.code!)}
                            className="text-slate-400 hover:text-[#0C3156] transition-colors">
                            {copiedCode === c.code ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                          <span className="font-mono font-bold text-[#0C3156] bg-[#0C3156]/8 px-3 py-1 rounded-lg text-sm border border-[#0C3156]/15">
                            {c.code}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">{c.createdAt}</td>
                      <td className="px-4 py-3">
                        <a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                          className="text-xs font-semibold text-[#25D366] hover:underline flex items-center gap-1">
                          📱 تواصل
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const EMPTY_FORM: Omit<ResearchOpportunity, "id" | "createdAt"> = {
  specialty: "",
  specialtyColor: "bg-gray-100 text-gray-700",
  title: "",
  description: "",
  seatsLeft: 12,
  totalSeats: 12,
  status: "open",
  journalTarget: "",
  indexedIn: [],
  benefits: ["", "", ""],
  duration: "",
  supervisor: "",
  imageUrl: "",
};

type FormData = Omit<ResearchOpportunity, "id" | "createdAt">;

function ResearchFormModal({
  initial, onSave, onClose, isEdit,
}: {
  initial: FormData;
  onSave: (data: FormData) => void;
  onClose: () => void;
  isEdit: boolean;
}) {
  const [form, setForm] = useState<FormData>({ ...initial, benefits: [...(initial.benefits || ["", "", ""])] });
  const [indexedStr, setIndexedStr] = useState((initial.indexedIn || []).join("، "));
  const [benefitsArr, setBenefitsArr] = useState<string[]>(
    initial.benefits?.length ? [...initial.benefits] : ["", "", ""]
  );
  const [imgPreview, setImgPreview] = useState(initial.imageUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const indexedIn = indexedStr.split(/[،,]/).map((s) => s.trim()).filter(Boolean);
    const benefits = benefitsArr.filter(Boolean);
    const specialtyColor = SPECIALTY_COLORS[form.specialty] || SPECIALTY_COLORS["Other"];
    onSave({ ...form, indexedIn, benefits, specialtyColor, imageUrl: imgPreview });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
          <div className="text-right">
            <h2 className="text-lg font-black text-slate-900">
              {isEdit ? "✏️ تعديل الفرصة البحثية" : "➕ إضافة فرصة بحثية جديدة"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">أدخل بيانات الفرصة البحثية كاملة</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Image URL */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 text-right flex items-center gap-2 justify-end">
              <ImageIcon size={15} className="text-slate-400" />
              صورة الفرصة البحثية (رابط URL)
            </label>
            <input
              type="url"
              value={imgPreview}
              onChange={(e) => { setImgPreview(e.target.value); setForm({ ...form, imageUrl: e.target.value }); }}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] font-mono"
              dir="ltr"
            />
            {imgPreview && (
              <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 h-36 bg-slate-50">
                <img
                  src={imgPreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            )}
            {!imgPreview && (
              <div className="mt-2 rounded-xl border-2 border-dashed border-slate-200 h-24 flex items-center justify-center bg-slate-50">
                <div className="text-center">
                  <ImageIcon size={24} className="text-slate-300 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">أضف رابط الصورة لمعاينتها</p>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">عنوان البحث (بالإنجليزية) *</label>
            <input
              required type="text" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Research title in English..."
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156]"
              dir="ltr" data-testid="input-admin-title"
            />
          </div>

          {/* Specialty + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">التخصص *</label>
              <select
                required value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] bg-white text-right"
                data-testid="select-admin-specialty"
              >
                <option value="">اختر التخصص...</option>
                {Object.keys(SPECIALTY_COLORS).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">الحالة *</label>
              <select
                required value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ResearchOpportunity["status"] })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] bg-white text-right"
                data-testid="select-admin-status"
              >
                <option value="open">🟢 مفتوح</option>
                <option value="closed">🔴 مغلق</option>
                <option value="draft">⚫ مسودة</option>
              </select>
            </div>
          </div>

          {/* Seats */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">المقاعد الإجمالية *</label>
              <input
                required type="number" min={1} value={form.totalSeats}
                onChange={(e) => setForm({ ...form, totalSeats: parseInt(e.target.value) || 12 })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] text-center"
                data-testid="input-admin-total-seats"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">المقاعد المتبقية *</label>
              <input
                required type="number" min={0} value={form.seatsLeft}
                onChange={(e) => setForm({ ...form, seatsLeft: parseInt(e.target.value) || 0 })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] text-center"
                data-testid="input-admin-seats-left"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">وصف الدراسة (بالعربية) *</label>
            <textarea
              required rows={4} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="وصف شامل للدراسة البحثية..."
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] text-right resize-none"
              data-testid="textarea-admin-description"
            />
          </div>

          {/* Journal + Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">المجلة المستهدفة *</label>
              <input
                required type="text" value={form.journalTarget}
                onChange={(e) => setForm({ ...form, journalTarget: e.target.value })}
                placeholder="Journal Name (Q1)"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156]"
                dir="ltr" data-testid="input-admin-journal"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">مدة الدراسة *</label>
              <input
                required type="text" value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="8 أشهر"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] text-right"
                data-testid="input-admin-duration"
              />
            </div>
          </div>

          {/* Supervisor */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">المشرف</label>
            <input
              type="text" value={form.supervisor}
              onChange={(e) => setForm({ ...form, supervisor: e.target.value })}
              placeholder="د. الاسم — التخصص"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] text-right"
              data-testid="input-admin-supervisor"
            />
          </div>

          {/* Indexed in */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 text-right">قواعد البيانات (مفصولة بفاصلة)</label>
            <input
              type="text" value={indexedStr}
              onChange={(e) => setIndexedStr(e.target.value)}
              placeholder="PubMed, Scopus, WoS"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156]"
              dir="ltr" data-testid="input-admin-indexed"
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 text-right">مزايا المشاركة</label>
            <div className="space-y-2 bg-slate-50 rounded-xl p-3">
              {benefitsArr.map((b, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <button type="button" onClick={() => setBenefitsArr((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-600 flex-shrink-0 p-1 hover:bg-red-50 rounded-lg transition-colors">
                    <X size={14} />
                  </button>
                  <input
                    type="text" value={b}
                    onChange={(e) => setBenefitsArr((prev) => prev.map((x, idx) => idx === i ? e.target.value : x))}
                    placeholder={`الميزة ${i + 1}`}
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] text-right bg-white"
                    data-testid={`input-admin-benefit-${i}`}
                  />
                </div>
              ))}
              <button type="button" onClick={() => setBenefitsArr((prev) => [...prev, ""])}
                className="text-sm text-[#0C3156] font-semibold hover:underline flex items-center gap-1.5 mt-1 px-1">
                <Plus size={14} /> إضافة ميزة
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2 sticky bottom-0 bg-white py-4 border-t border-slate-100 -mx-6 px-6">
            <button type="button" onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
              إلغاء
            </button>
            <button type="submit" data-testid="button-admin-save"
              className="flex-1 bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md shadow-[#0C3156]/20">
              {isEdit ? "💾 حفظ التعديلات" : "➕ إضافة الفرصة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ research, onConfirm, onClose }: { research: ResearchOpportunity; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="w-14 h-14 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h3 className="text-xl font-black text-slate-900 text-center mb-2">حذف الفرصة البحثية</h3>
        <p className="text-slate-500 text-sm text-center mb-4">هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.</p>
        <p className="text-xs text-slate-400 bg-slate-50 rounded-xl p-3 mb-6 line-clamp-2 text-center">{research.title}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
            إلغاء
          </button>
          <button onClick={onConfirm} data-testid="button-confirm-delete"
            className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors text-sm shadow-sm">
            🗑️ حذف نهائياً
          </button>
        </div>
      </div>
    </div>
  );
}

const STATUS_MAP = {
  open:   { label: "مفتوح",   className: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  closed: { label: "مغلق",   className: "bg-red-50 text-red-600 border border-red-200",             dot: "bg-red-500" },
  draft:  { label: "مسودة",  className: "bg-gray-50 text-gray-600 border border-gray-200",          dot: "bg-gray-400" },
};

export default function AdminDashboard() {
  const [mainTab, setMainTab] = useState<"research" | "coordinators">("research");
  const [research, setResearch] = useState<ResearchOpportunity[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ResearchOpportunity["status"]>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<ResearchOpportunity | null>(null);
  const [deleteItem, setDeleteItem] = useState<ResearchOpportunity | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setResearch(getResearchOpportunities());
    setPendingCount(getCoordinatorRequests().filter((r) => r.status === "pending").length);
    const interval = setInterval(() => {
      setPendingCount(getCoordinatorRequests().filter((r) => r.status === "pending").length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const save = (data: typeof research) => { setResearch(data); saveResearchOpportunities(data); };
  const handleAdd = (form: FormData) => {
    const now = new Date().toISOString().split("T")[0];
    save([...research, { ...form, id: getNextId(research), createdAt: now }]);
    setFormOpen(false);
  };
  const handleEdit = (form: FormData) => {
    if (!editItem) return;
    save(research.map((r) => r.id === editItem.id ? { ...form, id: editItem.id, createdAt: editItem.createdAt } : r));
    setEditItem(null);
  };
  const handleDelete = () => {
    if (!deleteItem) return;
    save(research.filter((r) => r.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const filtered = research.filter((r) => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.specialty.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: research.length,
    open: research.filter((r) => r.status === "open").length,
    totalParticipants: research.reduce((sum, r) => sum + (r.totalSeats - r.seatsLeft), 0),
    closed: research.filter((r) => r.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white px-4 sm:px-6 lg:px-8 py-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" data-testid="link-admin-site"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm transition-colors">
              <Globe size={14} /> الموقع
            </Link>
            <span className="text-blue-500">|</span>
            <Link href="/admin/submissions" data-testid="link-admin-submissions"
              className="flex items-center gap-1.5 text-[#E9A020] hover:text-white text-sm font-semibold transition-colors">
              <Users size={14} /> الطلبات والتسجيلات
            </Link>
            <span className="text-blue-500">|</span>
            <Link href="/coordinator-portal" data-testid="link-admin-logout"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm transition-colors">
              <LogOut size={14} /> خروج
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h1 className="text-base font-black tracking-tight">لوحة تحكم RSPF</h1>
              <p className="text-blue-300 text-xs">إدارة الفرص البحثية والمحتوى</p>
            </div>
            <div className="w-9 h-9 bg-[#E9A020] rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md">R</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "إجمالي الفرص",      value: stats.total,             icon: <BookOpen size={20} />,   color: "text-[#0C3156]", bg: "bg-blue-50",    border: "border-blue-100" },
            { label: "مفتوحة للتسجيل",    value: stats.open,              icon: <TrendingUp size={20} />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "مشارك مسجل",        value: stats.totalParticipants, icon: <Users size={20} />,      color: "text-orange-500", bg: "bg-orange-50",  border: "border-orange-100" },
            { label: "مكتملة / مغلقة",    value: stats.closed,            icon: <AlertCircle size={20} />,color: "text-red-500",    bg: "bg-red-50",     border: "border-red-100" },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-2xl p-5 border ${s.border} shadow-sm text-right hover:shadow-md transition-shadow`}>
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
              <div className="text-3xl font-black text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* MAIN TABS */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setMainTab("research")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${mainTab === "research" ? "bg-[#0C3156] text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            <BookOpen size={16} /> الفرص البحثية
          </button>
          <button onClick={() => setMainTab("coordinators")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all relative ${mainTab === "coordinators" ? "bg-[#0C3156] text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            <Users size={16} /> إدارة المنسقين
            {pendingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* COORDINATORS PANEL */}
        {mainTab === "coordinators" && <CoordinatorsPanel />}

        {/* RESEARCH SECTION */}
        {mainTab === "research" && <div className="contents">

        {/* TOOLBAR */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <button
              data-testid="button-add-research"
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-[#0C3156]/20 text-sm"
            >
              <Plus size={18} /> إضافة فرصة بحثية جديدة
            </button>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              {/* View toggle */}
              <div className="flex rounded-xl overflow-hidden border border-slate-200">
                <button onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 text-xs font-semibold transition-colors ${viewMode === "grid" ? "bg-[#0C3156] text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
                  ⊞ بطاقات
                </button>
                <button onClick={() => setViewMode("table")}
                  className={`px-3 py-2 text-xs font-semibold transition-colors ${viewMode === "table" ? "bg-[#0C3156] text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
                  ☰ جدول
                </button>
              </div>

              {/* Filter */}
              <select
                data-testid="select-admin-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 bg-white text-slate-700"
              >
                <option value="all">جميع الحالات</option>
                <option value="open">🟢 مفتوح</option>
                <option value="closed">🔴 مغلق</option>
                <option value="draft">⚫ مسودة</option>
              </select>

              {/* Search */}
              <div className="relative">
                <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  data-testid="input-admin-search"
                  type="text" placeholder="بحث..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  className="border border-slate-200 rounded-xl pr-9 pl-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] w-44"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COUNT */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-sm text-slate-500">
            يعرض <span className="font-bold text-slate-700">{filtered.length}</span> من {research.length} فرصة بحثية
          </span>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center text-slate-400">
                <BookOpen size={44} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold text-lg">لا توجد نتائج</p>
                <p className="text-sm mt-1">جرب تغيير الفلتر أو كلمة البحث</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item) => {
                  const pct = Math.round(((item.totalSeats - item.seatsLeft) / item.totalSeats) * 100);
                  const statusInfo = STATUS_MAP[item.status];
                  return (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group" data-testid={`row-research-${item.id}`}>
                      {/* Image */}
                      <div className="relative h-40 bg-gradient-to-br from-[#0C3156]/10 to-[#1A5FAE]/10 overflow-hidden">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.specialty} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <ImageIcon size={32} className="text-[#0C3156]/20 mx-auto mb-1" />
                              <p className="text-xs text-slate-300">لا توجد صورة</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm ${statusInfo.className}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.specialtyColor} shadow-sm`}>
                            {item.specialty}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-slate-800 text-sm line-clamp-2 text-right mb-1 leading-snug">{item.title}</h3>
                        <p className="text-xs text-slate-400 text-right mb-3" dir="ltr">{item.journalTarget}</p>

                        {/* Progress */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 flex-row-reverse">
                            <span>{item.seatsLeft}/{item.totalSeats} مقعد</span>
                            <span>{pct}% ممتلئ</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-l from-[#0C3156] to-[#1A5FAE] rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => setDeleteItem(item)} data-testid={`button-delete-${item.id}`}
                              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="حذف">
                              <Trash2 size={15} />
                            </button>
                            <button onClick={() => setEditItem(item)} data-testid={`button-edit-${item.id}`}
                              className="p-2 text-[#0C3156] hover:bg-[#0C3156]/5 rounded-xl transition-colors" title="تعديل">
                              <Pencil size={15} />
                            </button>
                            <Link href={`/research/${item.id}`} data-testid={`button-view-${item.id}`}
                              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors" title="عرض">
                              <Eye size={15} />
                            </Link>
                          </div>
                          <span className="text-xs text-slate-300">{item.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-bold">لا توجد فرص بحثية</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {["الصورة", "التخصص", "عنوان البحث", "المقاعد", "الحالة", "الإجراءات"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((item) => {
                      const pct = Math.round(((item.totalSeats - item.seatsLeft) / item.totalSeats) * 100);
                      const statusInfo = STATUS_MAP[item.status];
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors" data-testid={`row-research-${item.id}`}>
                          <td className="px-4 py-3">
                            <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon size={14} className="text-slate-300" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${item.specialtyColor}`}>
                              {item.specialty}
                            </span>
                          </td>
                          <td className="px-4 py-3 max-w-xs">
                            <p className="text-sm font-semibold text-slate-800 line-clamp-2">{item.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5" dir="ltr">{item.journalTarget}</p>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                                <div className="h-full bg-[#0C3156] rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-xs text-slate-600 whitespace-nowrap font-medium">{item.seatsLeft}/{item.totalSeats}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit ${statusInfo.className}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <Link href={`/research/${item.id}`} data-testid={`button-view-${item.id}`}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors" title="عرض">
                                <Eye size={15} />
                              </Link>
                              <button onClick={() => setEditItem(item)} data-testid={`button-edit-${item.id}`}
                                className="p-2 text-[#0C3156] hover:bg-[#0C3156]/8 rounded-xl transition-colors" title="تعديل">
                                <Pencil size={15} />
                              </button>
                              <button onClick={() => setDeleteItem(item)} data-testid={`button-delete-${item.id}`}
                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="حذف">
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        </div>}
      </div>

      {/* MODALS */}
      {formOpen && (
        <ResearchFormModal initial={EMPTY_FORM} onSave={handleAdd} onClose={() => setFormOpen(false)} isEdit={false} />
      )}
      {editItem && (
        <ResearchFormModal
          initial={{ ...editItem }}
          onSave={handleEdit}
          onClose={() => setEditItem(null)}
          isEdit={true}
        />
      )}
      {deleteItem && (
        <DeleteConfirmModal research={deleteItem} onConfirm={handleDelete} onClose={() => setDeleteItem(null)} />
      )}
    </div>
  );
}
