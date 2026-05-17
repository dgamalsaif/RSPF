import { Link } from "wouter";
import {
  FlaskConical, Users, BookOpen, BarChart2, Heart, Award,
  CheckCircle2, ChevronLeft
} from "lucide-react";

const services = [
  {
    bg: "#1B5E37",
    icon: <FlaskConical size={28} className="text-white" />,
    title: "فرص بحثية للمشاركة والنشر",
    desc: "شارك في أبحاث طبية محكمة ومفهرسة دولياً مع إشراف كامل حتى النشر",
    badge: "الأكثر طلباً ⭐",
    href: "/participant-portal",
  },
  {
    bg: "#0D9488",
    icon: <Users size={28} className="text-white" />,
    title: "برنامج تدريب باحث",
    desc: "تدريب متكامل على مهارات البحث العلمي مع فرصة نشر حقيقية في نهاية البرنامج",
    badge: null,
    href: "/participant-portal",
  },
  {
    bg: "#7C3AED",
    icon: <BookOpen size={28} className="text-white" />,
    title: "دعم النشر في مجلات عالية التصنيف",
    desc: "إعداد بحثك للنشر في مجلات Q1 و Q2 المفهرسة في Scopus وWoS وPubMed",
    badge: null,
    href: "/special-requests",
  },
  {
    bg: "#1E3A5F",
    icon: <BarChart2 size={28} className="text-white" />,
    title: "التدقيق والتحليل الإحصائي",
    desc: "تحليل إحصائي دقيق ومراجعة علمية شاملة لضمان سلامة البيانات وصحة النتائج",
    badge: null,
    href: "/special-requests",
  },
  {
    bg: "#2563EB",
    icon: <Heart size={28} className="text-white" />,
    title: "وجهتك للتدريب الصحي",
    desc: "برامج تدريب صحي معتمدة تمنحك شهادات معترف بها من الهيئة السعودية للتخصصات الصحية",
    badge: null,
    href: "/participant-portal",
  },
  {
    bg: "#EA580C",
    icon: <Award size={28} className="text-white" />,
    title: "دورات طبية معتمدة CME",
    desc: "دورات طبية معتمدة تمنحك نقاط CME المطلوبة لتجديد اعتمادك المهني",
    badge: null,
    href: "/participant-portal",
  },
];

const universities = [
  "جامعة القصيم", "جامعة الملك فيصل", "جامعة أم القرى", "جامعة تبوك",
  "جامعة حائل", "جامعة نجران", "جامعة جازان", "جامعة الملك عبدالعزيز",
  "جامعة الملك سعود", "جامعة الأمير سلطان", "جامعة الإمام محمد بن سعود",
];

const databases = [
  { name: "PMC", desc: "PubMed Central" },
  { name: "WoS", desc: "Web of Science" },
  { name: "PubMed", desc: "المرجع الأول" },
  { name: "Scopus", desc: "أكبر قواعد البيانات" },
  { name: "Q1", desc: "أعلى ربع تصنيفاً" },
];

const goals = [
  { emoji: "🏥", title: "البورد السعودي", badge: "5 نقاط كاملة", bullets: ["5 نقاط SCFHS للبورد", "بحث مفهرس في مجلة محكمة", "إشراف كامل حتى النشر", "شهادة مشاركة معتمدة"] },
  { emoji: "🎓", title: "زمالة التخصصات الدقيقة", badge: "بورد+", bullets: ["بحث في تخصصك الدقيق", "نشر في مجلة Q1 أو Q2", "رسالة توصية من المشرف", "CV بحثي احترافي"] },
  { emoji: "🌍", title: "الزمالات الخارجية", badge: "ERAS / Oriel", bullets: ["بحث منشور بحسابك كمؤلف", "CV يلفت نظر المراكز العالمية", "ملف بحثي متكامل", "خطاب نية بحثي"] },
  { emoji: "📚", title: "الترقية الأكاديمية", badge: "+3 أبحاث", bullets: ["3 أبحاث أكاديمية أو أكثر", "نشر في مجلات محكمة", "فهرسة PubMed/Scopus", "ملف أكاديمي متكامل"] },
  { emoji: "✈️", title: "الابتعاث الخارجي", badge: "بحوث علمية", bullets: ["بحوث تدعم ملف الابتعاث", "نشر دولي موثق", "رسائل توصية أكاديمية", "سجل بحثي واضح"] },
  { emoji: "💼", title: "الترقية المهنية", badge: "ملف متميز", bullets: ["ملف مهني يتكلم عنك", "نشر في مجلات معترف بها", "نقاط CME إضافية", "تميز واضح عن الأقران"] },
];

const partnerFeatures = [
  "فريق متخصص من الأطباء والباحثين",
  "إشراف كامل من الفكرة حتى النشر",
  "مجلات مفهرسة في PubMed وScopus",
  "دعم إحصائي احترافي",
  "ردود سريعة خلال 24 ساعة",
  "أسعار مناسبة للباحثين",
  "شهادات معتمدة من SCFHS",
  "شبكة واسعة من المجلات الدولية",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-[#F0FAF4] py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>✨</span>
            <span>Research Scientific Publications Forum · Edition 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
            <span className="text-gray-900">المنصة </span>
            <span className="text-[#D4A22A]">الرائدة </span>
            <span className="text-gray-900">للبحث العلمي الطبي في </span>
            <span className="text-[#D4A22A]">المملكة العربية السعودية</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            نقدم لك منصة بحثية متكاملة تجمع بين الخبرة الأكاديمية والدعم الشامل لمساعدتك في نشر أبحاثك في أرقى المجلات العلمية العالمية
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/participant-portal" data-testid="button-hero-explore" className="bg-[#1B5E37] text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-[#155030] transition-colors inline-flex items-center gap-2 justify-center">
              استكشف الفرص البحثية
              <ChevronLeft size={18} />
            </Link>
            <Link href="/about" data-testid="button-hero-about" className="border-2 border-[#1B5E37] text-[#1B5E37] px-7 py-3.5 rounded-full font-bold text-base hover:bg-[#1B5E37]/5 transition-colors inline-flex items-center gap-2 justify-center">
              تعرف علينا
              <ChevronLeft size={18} />
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            {[
              { value: "SCFHS", label: "اعتماد" },
              { value: "500+", label: "باحث مسجل" },
              { value: "50+", label: "دراسة مكتملة" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-black text-[#1B5E37]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              خدماتنا المتميزة ⭐
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">خدمات بحثية متكاملة مصممة خصيصاً للأطباء والباحثين في المملكة العربية السعودية والخليج</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl p-6 text-white flex flex-col gap-4"
                style={{ backgroundColor: svc.bg }}
                data-testid={`card-service-${svc.title.substring(0, 10)}`}
              >
                {svc.badge && (
                  <span className="inline-flex self-start bg-[#D4A22A] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {svc.badge}
                  </span>
                )}
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {svc.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{svc.title}</h3>
                  <p className="text-white/80 text-sm mt-2 leading-relaxed">{svc.desc}</p>
                </div>
                <Link
                  href={svc.href}
                  data-testid={`button-service-explore-${svc.title.substring(0, 8)}`}
                  className="mt-auto inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  استكشف الباقة وسجل الآن
                  <ChevronLeft size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="py-14 px-4 bg-[#F0FAF4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              شركاؤنا الأكاديميون 🤝
            </div>
            <h2 className="text-2xl font-black text-gray-900">يثق بنا باحثون من أكثر من 30 جامعة سعودية وخليجية</h2>
          </div>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            {["🇸🇦 السعودية", "🇧🇭 البحرين", "🇶🇦 قطر", "🇴🇲 عُمان", "🇰🇼 الكويت"].map((c) => (
              <span key={c} className="text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">{c}</span>
            ))}
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee">
              {[...universities, ...universities].map((uni, i) => (
                <span key={i} className="flex-shrink-0 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                  🇸🇦 {uni}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH EXCELLENCE */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4A22A]/20 text-[#B8860B] px-4 py-1.5 rounded-full text-sm font-bold mb-3">
            التميز العلمي 🏆
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            حقّق التميّز العلمي وانشر في أقوى المجلات العالمية
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">أبحاثنا مفهرسة في أكبر وأهم قواعد البيانات العلمية الدولية</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            {databases.map((db) => (
              <div key={db.name} className="bg-[#F0FAF4] border border-[#1B5E37]/20 rounded-2xl p-4 text-center">
                <div className="text-xl font-black text-[#1B5E37]">{db.name}</div>
                <div className="text-xs text-gray-500 mt-1">{db.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["Cochrane Library", "EBSCO", "Google Scholar", "Ovid", "DOAJ", "CINAHL"].map((db) => (
              <span key={db} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">{db}</span>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS BY GOAL */}
      <section className="py-14 px-4 bg-[#F0FAF4]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              🎯 هدفك الأكاديمي
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">الفائدة حسب هدفك</h2>
            <p className="text-gray-500 mt-2">نخصص دعمنا حسب هدفك البحثي والمهني</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {goals.map((goal) => (
              <div key={goal.title} className="bg-white rounded-2xl p-5 border border-[#1B5E37]/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#1B5E37]/10 text-[#1B5E37] text-xs font-bold px-2.5 py-1 rounded-full">{goal.badge}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{goal.emoji}</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-right mb-3">{goal.title}</h3>
                <ul className="space-y-1.5">
                  {goal.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-right flex-row-reverse">
                      <CheckCircle2 size={14} className="text-[#1B5E37] flex-shrink-0" />
                      <span className="text-sm text-gray-600">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE PATH */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1B5E37] rounded-3xl p-8 sm:p-10 text-white text-right">
            <div className="inline-flex items-center gap-2 bg-[#D4A22A] text-white px-4 py-1.5 rounded-full text-xs font-bold mb-4">
              RSPF 2026 في 🌟
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-6">نوّر لك المسار الكامل 🚀</h2>
            <ul className="space-y-3 mb-8">
              {[
                "فرص مشاركة بحثية في مجلات Q1 و Q2",
                "مفهرسة في PubMed / Scopus / WoS / PMC",
                "إشراف كامل من الفكرة حتى النشر",
                "إشراف استشاريين معتمدين من الهيئة",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 flex-row-reverse">
                  <CheckCircle2 size={18} className="text-[#D4A22A] flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/966598409805"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-path-whatsapp"
                className="bg-[#D4A22A] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#B8860B] transition-colors inline-flex items-center gap-2 justify-center"
              >
                ابدأ الآن عبر واتساب
                <ChevronLeft size={16} />
              </a>
              <Link
                href="/participant-portal"
                data-testid="button-path-browse"
                className="border-2 border-white/50 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors inline-flex items-center gap-2 justify-center"
              >
                تصفح الفرص البحثية
                <ChevronLeft size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORY */}
      <section className="py-14 px-4 bg-[#F0FAF4]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4A22A]/20 text-[#B8860B] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            قصة حقيقية 🏆
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">من رفضين متتاليين إلى القبول في زمالة القلبية ❤️</h2>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 text-right mb-5">
            <blockquote className="text-gray-700 text-lg font-medium leading-relaxed mb-6 italic">
              "كنت أعتقد أن رحلتي مع الزمالة انتهت بعد الرفض الثاني، لكن RSPF صنع معي ملفاً بحثياً من الصفر خلال 6 أشهر"
            </blockquote>
            <div className="space-y-3">
              {[
                "تحديد موضوع بحثي مناسب لتخصصه في طب القلب",
                "بناء فريق البحث وتوزيع المهام بدقة",
                "الإشراف على جمع البيانات والتحليل الإحصائي",
                "النشر في مجلة Q2 مفهرسة في Scopus",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-7 h-7 rounded-full bg-[#1B5E37] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-gray-600 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#D4A22A]/10 border-2 border-[#D4A22A] rounded-2xl p-5 inline-block w-full">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-black text-gray-900 text-lg">قُبل في برنامج زمالة القلبية ✅</div>
            <div className="text-sm text-gray-500 mt-1">بعد 6 أشهر فقط مع RSPF</div>
          </div>
        </div>
      </section>

      {/* REVIVE RESEARCH */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">أُحيي أبحاثك المتوقفة ونوصلها لمرحلة النشر</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">لا تترك بحثك يجمع الغبار — لدينا الفريق والخبرة لإعادة إحياء أي بحث متوقف</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { bg: "#1B5E37", text: "بحث جاهز بدون نشر؟" },
              { bg: "#2563EB", text: "بيانات مجمعة بدون تحليل؟" },
              { bg: "#7C3AED", text: "فكرة بدون فريق؟" },
            ].map((card) => (
              <div
                key={card.text}
                className="rounded-2xl p-6 text-white text-center font-bold text-lg"
                style={{ backgroundColor: card.bg }}
              >
                {card.text}
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/966598409805"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-revive-whatsapp"
            className="inline-flex items-center gap-2 bg-[#1B5E37] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#155030] transition-colors"
          >
            تحدث معنا الآن لإحياء بحثك
            <ChevronLeft size={18} />
          </a>
        </div>
      </section>

      {/* PARTNER STATS */}
      <section className="py-14 px-4 bg-[#F0FAF4]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">شريكك الحقيقي في رحلتك البحثية</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">
            {[
              { value: "200+", label: "المدرّبون والمشاركون" },
              { value: "50+", label: "الفرص البحثية" },
              { value: "95%", label: "نسبة النجاح" },
              { value: "30+", label: "مجلة دولية محكمة" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-[#1B5E37]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {partnerFeatures.map((feat) => (
              <div key={feat} className="flex items-center gap-3 flex-row-reverse bg-white rounded-xl px-4 py-3 border border-gray-100">
                <CheckCircle2 size={18} className="text-[#1B5E37] flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT COUNCILS */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#D4A22A]/20 text-[#B8860B] px-4 py-1.5 rounded-full text-sm font-bold mb-3">
              مبادرة حصرية - جديد 🎓
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">باقة التميز للمجالس الطلابية والأندية الأكاديمية</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { value: "5", label: "نقاط SCFHS" },
              { value: "+5", label: "طلاب في المجموعة" },
              { value: "25%", label: "خصم حتى" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1B5E37]/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-[#1B5E37]">{stat.value}</div>
                <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#F0FAF4] rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-right">الفئات المستهدفة:</h3>
            <ul className="space-y-2">
              {["المجالس الطلابية في كليات الطب والتمريض والصيدلة", "الأندية الأكاديمية والبحثية في الجامعات السعودية", "برامج الدكتوراه والدراسات العليا", "أندية البورد والزمالات الطبية"].map((item) => (
                <li key={item} className="flex items-center gap-3 flex-row-reverse">
                  <CheckCircle2 size={16} className="text-[#1B5E37] flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "التواصل والتسجيل", desc: "تواصل مع فريق RSPF عبر واتساب وأخبرنا عن مجلسك أو ناديك" },
              { step: "2", title: "تخصيص الباقة", desc: "نخصص لكم باقة بحثية مناسبة مع خصم خاص للمجموعات" },
              { step: "3", title: "البدء والنشر", desc: "تبدأ رحلتكم البحثية مع إشراف كامل حتى مرحلة النشر" },
            ].map((step) => (
              <div key={step.step} className="bg-white border border-[#1B5E37]/20 rounded-2xl p-5 text-right">
                <div className="w-8 h-8 rounded-full bg-[#1B5E37] text-white text-sm font-black flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-[#1B5E37]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">جاهز للبدء في بحثك القادم؟</h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">فريق RSPF جاهز لمساعدتك في كل خطوة من خطوات رحلتك البحثية</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/participant-portal"
              data-testid="button-cta-portal"
              className="bg-white text-[#1B5E37] px-8 py-4 rounded-full font-bold text-base hover:bg-green-50 transition-colors"
            >
              دخول بوابة المشارك ←
            </Link>
            <Link
              href="/special-requests"
              data-testid="button-cta-special"
              className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-colors"
            >
              طلب خدمة خاصة ←
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
