import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ChevronLeft, Users, Clock, BookOpen, CheckCircle2, ArrowLeft, ExternalLink, Share2, Copy } from "lucide-react";
import { getResearchOpportunities, ResearchOpportunity } from "@/lib/researchData";
import RegistrationModal from "@/components/RegistrationModal";
import { useToast } from "@/hooks/use-toast";

export default function ResearchDetail() {
  const params = useParams<{ id: string }>();
  const [research, setResearch] = useState<ResearchOpportunity | null>(null);
  const [allResearch, setAllResearch] = useState<ResearchOpportunity[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const data = getResearchOpportunities();
    setAllResearch(data);
    const found = data.find((r) => r.id === parseInt(params.id || "0"));
    setResearch(found || null);
  }, [params.id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "✅ تم نسخ الرابط", description: "يمكنك مشاركة رابط هذه الفرصة البحثية" });
  };

  if (!research) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white rounded-2xl p-10 border border-slate-200 shadow-sm">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-slate-700 mb-4">الفرصة البحثية غير موجودة</h2>
          <Link href="/participant-portal" className="inline-flex items-center gap-2 bg-[#0C3156] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90">
            <ArrowLeft size={16} /> العودة للفرص البحثية
          </Link>
        </div>
      </div>
    );
  }

  const seatsUsed = research.totalSeats - research.seatsLeft;
  const pct = Math.round((seatsUsed / research.totalSeats) * 100);
  const isAlmostFull = research.seatsLeft <= 3;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={copyLink}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0C3156] transition-colors font-medium">
            <Copy size={13} /> نسخ الرابط
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-400 flex-row-reverse">
            <span className="text-slate-800 font-medium text-xs line-clamp-1 max-w-32">{research.specialty}</span>
            <span>›</span>
            <Link href="/participant-portal" className="hover:text-[#0C3156] transition-colors text-xs">بوابة المشارك</Link>
            <span>›</span>
            <Link href="/" className="hover:text-[#0C3156] transition-colors text-xs">الرئيسية</Link>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      {research.imageUrl && (
        <div className="relative h-64 sm:h-80 overflow-hidden bg-[#0C3156]">
          <img
            src={research.imageUrl}
            alt={research.specialty}
            className="w-full h-full object-cover opacity-70"
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C3156]/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-right">
            <div className="flex items-center gap-3 flex-row-reverse mb-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white border border-white/30`}>{research.specialty}</span>
              {research.status === "open" && <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-white">✓ مفتوح للتسجيل</span>}
              {research.status === "closed" && <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500 text-white">🔒 مغلق</span>}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-5">

            {/* Header (when no image) */}
            {!research.imageUrl && (
              <div className="bg-gradient-to-br from-[#0C3156] to-[#1A5FAE] rounded-2xl p-7 text-white text-right">
                <div className="flex items-center gap-3 flex-row-reverse mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">{research.specialty}</span>
                  {research.status === "open" && <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-white">✓ مفتوح</span>}
                  {research.status === "closed" && <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500 text-white">🔒 مغلق</span>}
                  {research.status === "draft" && <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-400 text-white">مسودة</span>}
                </div>
                <h1 className="text-xl sm:text-2xl font-black leading-snug mb-2">{research.title}</h1>
                <p className="text-blue-200 text-sm">تاريخ الإضافة: {research.createdAt}</p>
              </div>
            )}

            {/* Title (when image shown) */}
            {research.imageUrl && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-right">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-2">{research.title}</h1>
                <p className="text-slate-400 text-sm">تاريخ الإضافة: {research.createdAt}</p>
              </div>
            )}

            {/* Description */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-right shadow-sm">
              <h2 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2 flex-row-reverse">
                <BookOpen size={18} className="text-[#0C3156]" /> وصف الدراسة
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">{research.description}</p>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-[#EFF6FF] to-blue-50 border border-[#0C3156]/12 rounded-2xl p-6 text-right shadow-sm">
              <h2 className="text-base font-black text-slate-900 mb-4">💡 مزايا وقيمة المشاركة</h2>
              <ul className="space-y-3">
                {research.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 flex-row-reverse">
                    <CheckCircle2 size={17} className="text-[#0C3156] flex-shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indexed in */}
            {research.indexedIn.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 text-right shadow-sm">
                <h2 className="text-base font-black text-slate-900 mb-4">🗄️ مفهرسة في</h2>
                <div className="flex flex-wrap gap-2 flex-row-reverse">
                  {research.indexedIn.map((db) => (
                    <span key={db} className="bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">{db}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-right shadow-md sticky top-20">
              <h3 className="text-base font-black text-slate-900 mb-4">📋 تفاصيل الفرصة</h3>

              <div className="space-y-3 mb-5 text-sm">
                {[
                  { icon: <Users size={13} />, label: "المقاعد المتاحة", value: `${research.seatsLeft} / ${research.totalSeats}` },
                  { icon: <Clock size={13} />, label: "مدة الدراسة", value: research.duration },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between flex-row-reverse py-2 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">{icon} {label}</span>
                    <span className="font-bold text-slate-900 text-sm">{value}</span>
                  </div>
                ))}
                <div className="py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5">المجلة المستهدفة</span>
                  <span className="font-semibold text-slate-800 text-xs">{research.journalTarget}</span>
                </div>
                {research.supervisor && (
                  <div className="py-2">
                    <span className="text-xs text-slate-500 block mb-0.5">المشرف</span>
                    <span className="font-semibold text-[#0C3156] text-xs">{research.supervisor}</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-slate-500 mb-2 flex-row-reverse">
                  <span>تبقى <span className={`font-bold ${isAlmostFull ? "text-red-600" : "text-[#0C3156]"}`}>{research.seatsLeft}</span> من {research.totalSeats}</span>
                  <span>{pct}% ممتلئ</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct > 80 ? "bg-gradient-to-l from-red-500 to-orange-400" : "bg-gradient-to-l from-[#0C3156] to-[#1A5FAE]"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {research.status === "open" ? (
                <button
                  data-testid="button-detail-register"
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-lg shadow-[#0C3156]/20 mb-3"
                >
                  سجل الآن 👤
                </button>
              ) : (
                <div className="w-full bg-slate-100 text-slate-400 font-bold py-3.5 rounded-xl text-center text-sm mb-3">
                  🔒 مغلق التسجيل
                </div>
              )}

              <a
                href="https://wa.me/966578032336"
                target="_blank" rel="noopener noreferrer"
                data-testid="link-detail-whatsapp"
                className="w-full border border-[#25D366] text-[#25D366] font-semibold py-2.5 rounded-xl text-sm text-center hover:bg-[#25D366]/5 transition-colors flex items-center justify-center gap-2"
              >
                <span>📱</span> تواصل لمعرفة السعر
              </a>
            </div>
          </div>
        </div>

        {/* RELATED */}
        {allResearch.filter((r) => r.id !== research.id && r.status === "open").length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-black text-slate-900 text-right mb-5">🔬 فرص بحثية مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allResearch.filter((r) => r.id !== research.id && r.status === "open").slice(0, 3).map((r) => (
                <Link key={r.id} href={`/research/${r.id}`} data-testid={`card-related-${r.id}`}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all hover:border-[#0C3156]/20 block group">
                  {r.imageUrl && (
                    <div className="h-28 overflow-hidden">
                      <img src={r.imageUrl} alt={r.specialty} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }} />
                    </div>
                  )}
                  <div className="p-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-2 ${r.specialtyColor}`}>{r.specialty}</span>
                    <p className="font-semibold text-slate-800 text-xs line-clamp-2 text-right mb-2 leading-relaxed">{r.title}</p>
                    <div className="flex items-center justify-between flex-row-reverse text-xs text-slate-400">
                      <span>{r.seatsLeft} مقعد متبقي</span>
                      <span className="text-[#0C3156] font-semibold flex items-center gap-1">
                        عرض <ChevronLeft size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} researchTitle={research.title} researchId={research.id} />
    </div>
  );
}
