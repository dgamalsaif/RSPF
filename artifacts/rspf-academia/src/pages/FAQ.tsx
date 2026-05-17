import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "ما هو RSPF ومن المستهدف من الخدمة؟",
    a: "RSPF (Research Scientific Publications Forum) هي منصة أكاديمية سعودية متخصصة في دعم الأطباء والباحثين الصحيين في رحلتهم البحثية. نستهدف أطباء البورد، المقيمين، الاستشاريين، وطلاب الدراسات العليا في المملكة العربية السعودية ودول الخليج.",
  },
  {
    q: "كيف يمكنني التسجيل في فرصة بحثية؟",
    a: "ادخل إلى بوابة المشارك، اختر الفرصة البحثية المناسبة لتخصصك، ثم اضغط على زر 'سجل الآن' وأكمل بيانات التسجيل. سيتواصل معك فريق RSPF خلال 24-48 ساعة لتأكيد التسجيل وإعطائك التفاصيل الكاملة.",
  },
  {
    q: "ما الفرق بين الفرص البحثية وبرنامج تدريب الباحث؟",
    a: "الفرص البحثية: تنضم فيها إلى بحث قائم بالفعل كمؤلف مشارك مع إشراف كامل. برنامج تدريب الباحث: برنامج تدريبي متكامل يعلمك مهارات البحث العلمي من الصفر مع فرصة نشر حقيقية في نهاية البرنامج.",
  },
  {
    q: "هل الأبحاث مفهرسة في PubMed وScopus؟",
    a: "نعم، جميع أبحاثنا تنشر في مجلات مفهرسة في قواعد البيانات الدولية المعتمدة مثل PubMed وScopus وWeb of Science وPMC. نختار المجلات بعناية لضمان أعلى جودة أكاديمية وأوسع انتشار علمي.",
  },
  {
    q: "كم تستغرق عملية النشر؟",
    a: "تتفاوت مدة النشر بين 6 و18 شهراً حسب المجلة والبحث. عادةً ما تستغرق مرحلة إعداد البحث وجمع البيانات 3-6 أشهر، ثم تأتي مرحلة مراجعة المجلة ونشر البحث التي قد تمتد من 3 إلى 12 شهراً.",
  },
  {
    q: "هل أحتاج خبرة سابقة في البحث العلمي؟",
    a: "لا، لا تحتاج إلى أي خبرة سابقة. فريق RSPF يشرف على كل خطوة بدءاً من اختيار الموضوع وحتى النشر النهائي. كل ما نحتاجه منك هو التزامك وحضورك في اجتماعات الفريق.",
  },
  {
    q: "ما هي نقاط SCFHS وكيف يساعدني RSPF في الحصول عليها؟",
    a: "نقاط SCFHS (الهيئة السعودية للتخصصات الصحية) هي نقاط التعليم الطبي المستمر المطلوبة لتجديد الترخيص المهني والتقدم للبورد السعودي. RSPF تمنحك 5 نقاط SCFHS عند إتمام المشاركة في بحث ونشره.",
  },
  {
    q: "هل تقدمون خدمات لطلاب الطب؟",
    a: "نعم، لدينا باقة خاصة للمجالس الطلابية والأندية الأكاديمية تشمل خصماً خاصاً وإمكانية المشاركة كمجموعة. يمكن لطلاب الطب الاستفادة من برامجنا لبناء ملف بحثي قوي منذ سنوات الدراسة.",
  },
  {
    q: "كيف أتواصل مع فريق RSPF؟",
    a: "يمكنك التواصل معنا عبر: واتساب: +966 59 840 9805 | تيليجرام: @rspf_sa | البريد الإلكتروني: info@rspf.sa. فريقنا متاح 6 أيام في الأسبوع ويرد عادةً خلال ساعات.",
  },
  {
    q: "هل يمكن إحياء بحث متوقف؟",
    a: "بالتأكيد! هذه إحدى خدماتنا المميزة. إذا كان لديك بحث توقف لأي سبب (بيانات غير محللة، فريق انحل، مشكلة في المنهجية)، يمكن لفريق RSPF إعادة تقييمه وإحيائه ووصوله إلى مرحلة النشر.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <section className="bg-gradient-to-b from-[#F0FAF4] to-white py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1B5E37]/10 text-[#1B5E37] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            الأسئلة الشائعة
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">الأسئلة الشائعة</h1>
          <p className="text-gray-600">إجابات على أكثر الأسئلة شيوعاً حول منصة RSPF وخدماتها</p>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden"
              data-testid={`accordion-faq-${index}`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                data-testid={`button-faq-toggle-${index}`}
              >
                <div className="flex items-center gap-3">
                  {openIndex === index ? (
                    <ChevronUp size={18} className="text-[#1B5E37] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-3 flex-row-reverse flex-1">
                  <span className="w-7 h-7 rounded-full bg-[#1B5E37]/10 text-[#1B5E37] text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900 text-right">{faq.q}</span>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-right border-t border-gray-100 bg-gray-50">
                  <p className="text-gray-600 leading-relaxed pt-4 text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT CTA */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#D4A22A]/10 border-2 border-[#D4A22A] rounded-2xl p-7 text-right">
            <h3 className="text-xl font-black text-gray-900 mb-2">هل لديك سؤال آخر؟</h3>
            <p className="text-gray-600 text-sm mb-5">فريقنا جاهز للإجابة على جميع استفساراتك</p>
            <a
              href="https://wa.me/966598409805"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-faq-whatsapp"
              className="inline-flex items-center gap-2 bg-[#1B5E37] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#155030] transition-colors"
            >
              تواصل معنا عبر واتساب ←
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
