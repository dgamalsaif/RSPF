import { useState } from "react";
import {
  FlaskConical, GraduationCap, FileText, Shield,
  Globe, Search, BarChart2, Wrench
} from "lucide-react";
import ServiceModal from "@/components/ServiceModal";

const services = [
  {
    bg: "#0D4F3C",
    icon: <FlaskConical size={28} className="text-white" />,
    title: "إعداد الدراسة البحثية",
    desc: "تصميم وإعداد الدراسات البحثية الفردية وفق أعلى المعايير الأكاديمية الدولية",
  },
  {
    bg: "#0D7A6E",
    icon: <GraduationCap size={28} className="text-white" />,
    title: "رسائل الماجستير",
    desc: "دعم شامل لرسائل الماجستير من اختيار الموضوع حتى النشر في مجلة محكمة",
  },
  {
    bg: "#5B21B6",
    icon: <FileText size={28} className="text-white" />,
    title: "رسائل الدكتوراه",
    desc: "دعم متكامل لرسائل الدكتوراه والبحوث الأكاديمية المتقدمة بأعلى مستوى من الجودة",
  },
  {
    bg: "#B45309",
    icon: <Shield size={28} className="text-white" />,
    title: "التحكيم العلمي",
    desc: "خدمات التحكيم العلمي للأدوات البحثية والاستبيانات والمقاييس من متخصصين معتمدين",
  },
  {
    bg: "#9D174D",
    icon: <Globe size={28} className="text-white" />,
    title: "الترجمة الأكاديمية",
    desc: "ترجمة أكاديمية وطبية متخصصة بين العربية والإنجليزية بأدق المصطلحات العلمية",
  },
  {
    bg: "#1E3A5F",
    icon: <Search size={28} className="text-white" />,
    title: "التدقيق والمراجعة",
    desc: "تدقيق لغوي وعلمي احترافي للأبحاث والمقالات باللغتين العربية والإنجليزية",
  },
  {
    bg: "#1B5E37",
    icon: <BarChart2 size={28} className="text-white" />,
    title: "التحليل الإحصائي",
    desc: "تحليل إحصائي متقدم باستخدام SPSS وR وغيرها من الأدوات المتخصصة",
  },
  {
    bg: "#374151",
    icon: <Wrench size={28} className="text-white" />,
    title: "خدمات أخرى",
    desc: "خدمات أخرى غير مذكورة أعلاه. يرجى وصف احتياجك بالتفصيل وسنجد لك الحل",
  },
];

export default function SpecialRequests() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <section className="bg-gradient-to-b from-[#F0FAF4] to-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            الطلبات الخاصة
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">بوابة الطلبات الخاصة</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            خدمات بحثية متخصصة ومتكاملة للباحثين وطلاب الدراسات العليا. اختر الخدمة المطلوبة للتواصل مع فريق الخبراء
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl p-6 text-white"
                style={{ backgroundColor: svc.bg }}
                data-testid={`card-special-${svc.title.substring(0, 10)}`}
              >
                <div className="flex items-start gap-4 flex-row-reverse mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    {svc.icon}
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-bold leading-snug">{svc.title}</h3>
                    <p className="text-white/80 text-sm mt-1 leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
                <button
                  data-testid={`button-request-${svc.title.substring(0, 8)}`}
                  onClick={() => openModal(svc.title)}
                  className="w-full border border-white/50 text-white font-semibold py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  اطلب هذه الخدمة ←
                </button>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">هل تريد التواصل المباشر مع فريقنا؟</p>
            <a
              href="https://wa.me/966598409805"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-special-whatsapp"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#1eb856] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              تواصل عبر واتساب مباشرة
            </a>
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}
