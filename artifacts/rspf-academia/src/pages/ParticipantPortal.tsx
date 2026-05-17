import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, Flame } from "lucide-react";
import RegistrationModal from "@/components/RegistrationModal";

const researchOpportunities = [
  {
    id: 1,
    specialty: "Emergency Medicine",
    specialtyColor: "bg-orange-100 text-orange-700",
    title: "Early Lactate-Guided vs. Standard Hemodynamic Resuscitation in Patients With Sepsis and Septic Shock",
    seatsLeft: 2,
    totalSeats: 12,
    benefits: [
      "نشر في مجلة Q2 مفهرسة في Scopus",
      "5 نقاط SCFHS معتمدة",
      "إشراف من استشاري طوارئ معتمد",
      "شهادة مشاركة رسمية",
    ],
  },
  {
    id: 2,
    specialty: "Plastic Surgery",
    specialtyColor: "bg-pink-100 text-pink-700",
    title: "Efficacy and Safety of Autologous Fat Grafting for Facial Rejuvenation: A Systematic Review and Meta-Analysis",
    seatsLeft: 2,
    totalSeats: 12,
    benefits: [
      "نشر في مجلة Q1 مفهرسة في PubMed",
      "5 نقاط SCFHS معتمدة",
      "إشراف من استشاري جراحة تجميل",
      "تحليل إحصائي كامل مشمول",
    ],
  },
  {
    id: 3,
    specialty: "Restorative Dentistry",
    specialtyColor: "bg-blue-100 text-blue-700",
    title: "Selective Caries Removal Versus Complete Caries Excavation in Permanent Teeth: A Systematic Review",
    seatsLeft: 6,
    totalSeats: 12,
    benefits: [
      "نشر في مجلة أسنان دولية محكمة",
      "5 نقاط SCFHS معتمدة",
      "منهجية Systematic Review متكاملة",
      "دعم البحث المنهجي وتقييم الأدلة",
    ],
  },
  {
    id: 4,
    specialty: "Pedodontics",
    specialtyColor: "bg-teal-100 text-teal-700",
    title: "Bioactive Glass-Based Materials vs. Conventional Materials in Primary Tooth Restorations: A Systematic Review",
    seatsLeft: 5,
    totalSeats: 12,
    benefits: [
      "نشر في مجلة أطفال دولية محكمة",
      "5 نقاط SCFHS معتمدة",
      "مقارنة بين مواد تحشية متقدمة",
      "إشراف من استشاري أسنان أطفال",
    ],
  },
  {
    id: 5,
    specialty: "Cardiac Surgery",
    specialtyColor: "bg-red-100 text-red-700",
    title: "Endoscopic aortic valve replacement with automated annular suture device versus conventional suturing",
    seatsLeft: 4,
    totalSeats: 12,
    benefits: [
      "نشر في مجلة قلب دولية عالية التصنيف",
      "5 نقاط SCFHS معتمدة",
      "إشراف من جراح قلب استشاري",
      "مقارنة تقنيات جراحية حديثة",
    ],
  },
  {
    id: 6,
    specialty: "Interventional Radiology",
    specialtyColor: "bg-purple-100 text-purple-700",
    title: "Safety and Feasibility and Clinical Outcomes of Stenting vs. Angloplasty for critical limb Ischemia",
    seatsLeft: 3,
    totalSeats: 12,
    benefits: [
      "نشر في مجلة أشعة تداخلية محكمة",
      "5 نقاط SCFHS معتمدة",
      "إشراف من استشاري أشعة تداخلية",
      "مقارنة نتائج سريرية متقدمة",
    ],
  },
];

const hallOfFame = [
  { specialty: "ENT – Head and Neck Surgery", specialtyColor: "bg-indigo-100 text-indigo-700", title: "Efficacy of Biologic Therapy versus Conventional Treatment in Chronic Rhinosinusitis" },
  { specialty: "Obesity Surgery", specialtyColor: "bg-yellow-100 text-yellow-700", title: "Endoscopic Versus Surgical Bariatric Procedures: Long-term Outcomes Comparison" },
  { specialty: "Anesthesiology", specialtyColor: "bg-green-100 text-green-700", title: "Comparative Effectiveness of Regional vs. General Anesthesia in Major Orthopedic Procedures" },
  { specialty: "Clinical Cardiology", specialtyColor: "bg-red-100 text-red-700", title: "Comparative Efficacy and Safety of Patiromer vs. Sodium Zirconium Cyclosilicate" },
];

export default function ParticipantPortal() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState("");

  const toggleExpand = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openModal = (title: string) => {
    setSelectedResearch(title);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <section className="bg-gradient-to-b from-[#F0FAF4] to-white py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            بوابة المشارك
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">بوابة المشارك</h1>
          <p className="text-gray-600 max-w-xl mx-auto">اكتشف الفرص البحثية المتاحة وسجل في البرنامج المناسب لتخصصك وأهدافك المهنية</p>
        </div>
      </section>

      {/* TABS */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          {[
            { label: "الفرص البحثية الجاهزة للنشر", color: "bg-[#1B5E37] text-white" },
            { label: "برنامج تدريب باحث مع النشر", color: "bg-[#0D9488] text-white" },
            { label: "دورات طبية بساعات طبية معتمدة CME", color: "bg-purple-600 text-white" },
          ].map((tab, i) => (
            <button
              key={i}
              data-testid={`button-tab-${i}`}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeTab === i
                  ? tab.color
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ANNOUNCEMENT MARQUEE */}
      <div className="bg-[#1B5E37] text-white py-2.5 overflow-hidden">
        <div className="animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-block mx-8 text-sm font-medium whitespace-nowrap">
              ⚡ انضم لأكثر من 500 طبيب وباحث حققوا متطلبات الهيئة السعودية للتخصصات الصحية مع RSPF &nbsp;|&nbsp; سجل الآن وابدأ رحلتك البحثية
            </span>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {activeTab === 0 && (
            <>
              <h2 className="text-xl font-black text-gray-900 mb-6 text-right">✨ الفرص البحثية المتاحة للتسجيل</h2>
              <div className="space-y-5">
                {researchOpportunities.map((opp) => {
                  const isExpanded = expandedCards.includes(opp.id);
                  const pct = Math.round(((opp.totalSeats - opp.seatsLeft) / opp.totalSeats) * 100);
                  return (
                    <div
                      key={opp.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                      data-testid={`card-research-${opp.id}`}
                    >
                      {/* Top badges */}
                      <div className="flex items-center justify-between gap-3 mb-3 flex-row-reverse">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${opp.specialtyColor}`}>
                          {opp.specialty}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                          <Flame size={12} />
                          متبقية مقاعد محدودة
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 text-right leading-snug mb-2">
                        {opp.title}
                      </h3>

                      {/* Italic tagline */}
                      <p className="text-[#1B5E37] text-sm italic text-right mb-3">
                        🏆 نحن في RSPF – نبني ملفك البحثي ونصنع الفارق
                      </p>

                      {/* Price link */}
                      <a
                        href="https://wa.me/966598409805"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-price-${opp.id}`}
                        className="text-[#1B5E37] text-sm underline text-right block mb-3"
                      >
                        تواصل لمعرفة السعر
                      </a>

                      {/* Progress bar */}
                      <div className="mb-1">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1B5E37] rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-right mb-4">
                        تبقى {opp.seatsLeft} مقاعد فقط من أصل {opp.totalSeats}
                      </p>

                      {/* Expandable benefits */}
                      <button
                        data-testid={`button-expand-benefits-${opp.id}`}
                        onClick={() => toggleExpand(opp.id)}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#1B5E37] mb-3 flex-row-reverse w-full justify-end"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        مزايا وقيمة المشاركة 💡
                      </button>
                      {isExpanded && (
                        <ul className="space-y-1.5 mb-4">
                          {opp.benefits.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-right flex-row-reverse text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E37] flex-shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Register button */}
                      <button
                        data-testid={`button-register-${opp.id}`}
                        onClick={() => openModal(opp.title)}
                        className="w-full bg-[#1B5E37] text-white font-bold py-3 rounded-xl hover:bg-[#155030] transition-colors text-base mb-2"
                      >
                        سجل الآن 👤
                      </button>
                      <button
                        data-testid={`button-copy-link-${opp.id}`}
                        className="w-full text-sm text-gray-400 hover:text-gray-600 py-1"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("تم نسخ الرابط");
                        }}
                      >
                        نسخ رابط الاستبيان 🔗
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === 1 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">برنامج تدريب باحث مع النشر</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                برنامج تدريبي متكامل يأخذك من الصفر إلى النشر الدولي. للانضمام وللمزيد من التفاصيل تواصل معنا.
              </p>
              <a
                href="https://wa.me/966598409805"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-trainer-whatsapp"
                className="inline-flex items-center gap-2 bg-[#0D9488] text-white px-7 py-3.5 rounded-full font-bold hover:bg-[#0b7a6e] transition-colors"
              >
                تواصل معنا للتسجيل ←
              </a>
            </div>
          )}

          {activeTab === 2 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🎓</div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">دورات طبية بساعات طبية معتمدة CME</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                دورات طبية معتمدة من الهيئة السعودية للتخصصات الصحية. احصل على نقاطك CME مع شهادة معتمدة.
              </p>
              <a
                href="https://wa.me/966598409805"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-cme-whatsapp"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-7 py-3.5 rounded-full font-bold hover:bg-purple-700 transition-colors"
              >
                تواصل معنا للتسجيل ←
              </a>
            </div>
          )}
        </div>
      </section>

      {/* HALL OF FAME */}
      <section className="py-12 px-4 bg-[#F0FAF4]">
        <div className="max-w-5xl mx-auto">
          <div className="text-right mb-6">
            <h2 className="text-2xl font-black text-gray-900">مشاريع اكتمل فريقها (لوحة الشرف) 🏆</h2>
            <p className="text-gray-500 text-sm mt-1">أبحاث سابقة تم إغلاق التسجيل فيها بنجاح</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {hallOfFame.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
                data-testid={`card-hall-of-fame-${i}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    <Lock size={10} />
                    اكتمل الفريق بنجاح
                  </span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.specialtyColor} inline-block mb-2`}>
                  {item.specialty}
                </span>
                <p className="text-sm font-semibold text-gray-700 line-clamp-3">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        researchTitle={selectedResearch}
      />
    </div>
  );
}
