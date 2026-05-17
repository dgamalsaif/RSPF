import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Lock, Flame, ChevronLeft, Search, Filter } from "lucide-react";
import { Link } from "wouter";
import { getResearchOpportunities, ResearchOpportunity, SPECIALTY_COLORS } from "@/lib/researchData";
import RegistrationModal from "@/components/RegistrationModal";

const hallOfFame = [
  { specialty: "ENT – Head and Neck Surgery", specialtyColor: "bg-indigo-100 text-indigo-700", title: "Efficacy of Biologic Therapy versus Conventional Treatment in Chronic Rhinosinusitis" },
  { specialty: "Obesity Surgery", specialtyColor: "bg-yellow-100 text-yellow-700", title: "Endoscopic Versus Surgical Bariatric Procedures: Long-term Outcomes Comparison" },
  { specialty: "Anesthesiology", specialtyColor: "bg-emerald-100 text-emerald-700", title: "Comparative Effectiveness of Regional vs. General Anesthesia in Major Orthopedic Procedures" },
  { specialty: "Clinical Cardiology", specialtyColor: "bg-red-100 text-red-700", title: "Comparative Efficacy and Safety of Patiromer vs. Sodium Zirconium Cyclosilicate" },
];

const SPECIALTY_FILTER_OPTIONS = ["الكل", ...Object.keys(SPECIALTY_COLORS)];

export default function ParticipantPortal() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState({ title: "", id: 0 });
  const [opportunities, setOpportunities] = useState<ResearchOpportunity[]>([]);
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("الكل");

  useEffect(() => {
    setOpportunities(getResearchOpportunities().filter((r) => r.status === "open"));
  }, []);

  const toggleExpand = (id: number) =>
    setExpandedCards((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const openModal = (title: string, id: number) => { setSelectedResearch({ title, id }); setModalOpen(true); };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchSearch = !search || opp.title.toLowerCase().includes(search.toLowerCase()) || opp.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specialtyFilter === "الكل" || opp.specialty === specialtyFilter;
    return matchSearch && matchSpec;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-[#0C3156] via-[#0f3d6e] to-[#1A5FAE] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            🔬 بوابة المشارك — RSPF 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">الفرص البحثية المتاحة</h1>
          <p className="text-blue-200 max-w-xl mx-auto text-sm leading-relaxed">
            اكتشف الفرص البحثية المتاحة وسجل في البرنامج المناسب لتخصصك وأهدافك المهنية
          </p>
          <div className="flex justify-center gap-6 mt-8">
            {[
              { value: opportunities.length.toString(), label: "فرصة متاحة", icon: "🔬" },
              { value: "5", label: "نقاط SCFHS", icon: "🏅" },
              { value: "Q1/Q2", label: "مجلات مفهرسة", icon: "📄" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-blue-300 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-16 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          {[
            { label: "🔬 الفرص البحثية",        activeClass: "bg-[#0C3156] text-white" },
            { label: "📚 برنامج تدريب باحث",   activeClass: "bg-[#0369A1] text-white" },
            { label: "🎓 دورات CME معتمدة",    activeClass: "bg-violet-600 text-white" },
          ].map((tab, i) => (
            <button key={i} data-testid={`button-tab-${i}`} onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                activeTab === i ? tab.activeClass : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TICKER */}
      <div className="bg-[#0C3156] text-white py-2.5 overflow-hidden">
        <div className="animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-block mx-10 text-sm font-medium whitespace-nowrap">
              ⚡ انضم لأكثر من 500 طبيب وباحث حققوا متطلبات الهيئة السعودية للتخصصات الصحية مع RSPF &nbsp;|&nbsp; سجل الآن وابدأ رحلتك البحثية اليوم
            </span>
          ))}
        </div>
      </div>

      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">

          {/* TAB 0: RESEARCH OPPORTUNITIES */}
          {activeTab === 0 && (
            <>
              {/* Search + Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text" placeholder="ابحث عن فرصة بحثية أو تخصص..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 focus:border-[#0C3156] shadow-sm"
                    dir="rtl"
                  />
                </div>
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3156]/20 shadow-sm text-slate-700"
                >
                  {SPECIALTY_FILTER_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s === "الكل" ? "🔍 كل التخصصات" : s}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between mb-5 flex-row-reverse">
                <h2 className="text-lg font-black text-slate-900">✨ الفرص البحثية المتاحة</h2>
                <span className="bg-[#0C3156]/8 text-[#0C3156] text-xs font-bold px-3 py-1.5 rounded-full border border-[#0C3156]/12">
                  {filteredOpportunities.length} فرصة
                </span>
              </div>

              {filteredOpportunities.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                  <div className="text-5xl mb-4">🔬</div>
                  <p className="font-bold text-slate-700">لا توجد فرص مطابقة</p>
                  <p className="text-sm text-slate-400 mt-1">جرب تغيير كلمة البحث أو التخصص</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredOpportunities.map((opp) => {
                    const isExpanded = expandedCards.includes(opp.id);
                    const seatsUsed = opp.totalSeats - opp.seatsLeft;
                    const pct = Math.round((seatsUsed / opp.totalSeats) * 100);
                    const isAlmostFull = opp.seatsLeft <= 3;

                    return (
                      <div key={opp.id}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                        data-testid={`card-research-${opp.id}`}>

                        {/* Image */}
                        {opp.imageUrl && (
                          <div className="h-44 overflow-hidden">
                            <img
                              src={opp.imageUrl}
                              alt={opp.specialty}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                            />
                          </div>
                        )}

                        <div className="p-5">
                          {/* Badges */}
                          <div className="flex items-center justify-between gap-2 mb-3 flex-row-reverse">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${opp.specialtyColor}`}>{opp.specialty}</span>
                            {isAlmostFull && (
                              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
                                <Flame size={10} /> مقاعد محدودة
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <Link href={`/research/${opp.id}`} data-testid={`link-research-title-${opp.id}`}>
                            <h3 className="font-bold text-slate-900 text-right leading-snug mb-2 hover:text-[#0C3156] transition-colors cursor-pointer text-sm sm:text-base line-clamp-2">
                              {opp.title}
                            </h3>
                          </Link>

                          <p className="text-[#0C3156] text-xs italic text-right mb-1 font-medium">
                            🏆 {opp.journalTarget}
                          </p>

                          <a href="https://wa.me/966578032336" target="_blank" rel="noopener noreferrer"
                            data-testid={`link-price-${opp.id}`}
                            className="text-[#0C3156] text-xs underline underline-offset-2 text-right block mb-3 font-semibold hover:text-[#E9A020] transition-colors">
                            💬 تواصل لمعرفة السعر
                          </a>

                          {/* Seats progress */}
                          <div className="mb-4">
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                              <div
                                className={`h-full rounded-full transition-all ${pct > 80 ? "bg-gradient-to-l from-red-500 to-orange-400" : "bg-gradient-to-l from-[#0C3156] to-[#1A5FAE]"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-500 text-right">
                              تبقى <span className={`font-bold ${isAlmostFull ? "text-red-600" : "text-[#0C3156]"}`}>{opp.seatsLeft} مقاعد</span> من أصل {opp.totalSeats}
                            </p>
                          </div>

                          {/* Benefits toggle */}
                          <button data-testid={`button-expand-benefits-${opp.id}`} onClick={() => toggleExpand(opp.id)}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0C3156] mb-3 flex-row-reverse w-full justify-end transition-colors">
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            مزايا وقيمة المشاركة 💡
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

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button data-testid={`button-register-${opp.id}`} onClick={() => openModal(opp.title, opp.id)}
                              className="flex-1 bg-gradient-to-r from-[#0C3156] to-[#1A5FAE] text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md shadow-[#0C3156]/15">
                              سجل الآن 👤
                            </button>
                            <Link href={`/research/${opp.id}`} data-testid={`button-detail-${opp.id}`}
                              className="flex items-center gap-1 border border-[#0C3156]/20 text-[#0C3156] font-semibold px-3 py-2.5 rounded-xl hover:bg-[#0C3156]/5 transition-colors text-xs">
                              التفاصيل <ChevronLeft size={12} />
                            </Link>
                          </div>

                          <button data-testid={`button-copy-link-${opp.id}`}
                            className="w-full text-xs text-slate-300 hover:text-slate-500 py-2 mt-1 transition-colors"
                            onClick={() => { navigator.clipboard.writeText(window.location.origin + `/research/${opp.id}`); }}>
                            🔗 نسخ رابط الفرصة
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* TAB 1 */}
          {activeTab === 1 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-5xl mb-5">📚</div>
              <h2 className="text-2xl font-black text-slate-900 mb-3">برنامج تدريب باحث مع النشر</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed text-sm">
                برنامج تدريبي متكامل يأخذك من الصفر إلى النشر الدولي. تدريب عملي مع إشراف متخصص وفرصة نشر حقيقية في نهاية البرنامج.
              </p>
              <a href="https://wa.me/966578032336" target="_blank" rel="noopener noreferrer" data-testid="button-trainer-whatsapp"
                className="inline-flex items-center gap-2 bg-[#0369A1] text-white px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg shadow-[#0369A1]/25">
                تواصل معنا للتسجيل ←
              </a>
            </div>
          )}

          {/* TAB 2 */}
          {activeTab === 2 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-5xl mb-5">🎓</div>
              <h2 className="text-2xl font-black text-slate-900 mb-3">دورات طبية بساعات CME معتمدة</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed text-sm">
                دورات طبية معتمدة من الهيئة السعودية للتخصصات الصحية. احصل على نقاطك CME مع شهادة رسمية معتمدة.
              </p>
              <a href="https://wa.me/966578032336" target="_blank" rel="noopener noreferrer" data-testid="button-cme-whatsapp"
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg shadow-violet-600/25">
                تواصل معنا للتسجيل ←
              </a>
            </div>
          )}
        </div>
      </section>

      {/* HALL OF FAME */}
      <section className="py-12 px-4 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-row-reverse">
            <div>
              <h2 className="text-xl font-black text-slate-900 text-right">مشاريع اكتمل فريقها 🏆</h2>
              <p className="text-slate-500 text-sm mt-0.5 text-right">أبحاث سابقة تم إغلاق التسجيل فيها بنجاح</p>
            </div>
            <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-100">
              لوحة الشرف
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hallOfFame.map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-slate-300 transition-colors" data-testid={`card-hall-${i}`}>
                <div className="flex items-center justify-between mb-3 flex-row-reverse">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.specialtyColor}`}>{item.specialty}</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                    <Lock size={9} /> مكتمل
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-600 line-clamp-3 text-right leading-relaxed">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        researchTitle={selectedResearch.title}
        researchId={selectedResearch.id}
      />
    </div>
  );
}
