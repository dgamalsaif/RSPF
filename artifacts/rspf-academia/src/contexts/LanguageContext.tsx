import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "ar" | "en";

const translations = {
  ar: {
    nav: {
      home: "الرئيسية",
      knowledge: "مركز المعرفة",
      about: "عن المنصة",
      participant: "بوابة المشارك",
      coordinator: "بوابة المنسق",
      special: "الطلبات الخاصة ⭐",
      whatsapp: "تواصل عبر واتساب",
    },
    hero: {
      badge: "Research Scientific Publications Forum · Edition 2026",
      title1: "المنصة ",
      title2: "الرائدة ",
      title3: "للبحث العلمي الطبي في ",
      title4: "المملكة العربية السعودية",
      subtitle: "نقدم لك منصة بحثية متكاملة تجمع بين الخبرة الأكاديمية والدعم الشامل لمساعدتك في نشر أبحاثك في أرقى المجلات العلمية العالمية",
      explore: "استكشف الفرص البحثية",
      learnMore: "تعرف علينا",
    },
    registration: {
      title: "التسجيل في الفرصة البحثية",
      fullName: "الاسم الكامل",
      fullNameEn: "Full Name",
      specialization: "التخصص الدقيق",
      specializationEn: "Specialization",
      academicDegree: "الدرجة الأكاديمية",
      academicDegreeEn: "Academic Degree",
      email: "البريد الإلكتروني",
      emailEn: "Email",
      affiliation: "جهة الانتساب",
      affiliationEn: "Affiliation",
      city: "المدينة",
      country: "الدولة",
      whatsapp: "رقم واتساب",
      whatsappEn: "WhatsApp",
      orcid: "ORCID Number",
      optional: "اختياري",
      required: "مطلوب",
      submit: "تسجيل الآن 👤",
      submitting: "جاري الإرسال...",
      success: "تم استلام طلبك بنجاح!",
      successDesc: "تم حفظ بياناتك وسيتواصل معك فريق RSPF قريباً.",
      close: "إغلاق",
      error: "حدث خطأ أثناء الإرسال",
      fullNumber: "الرقم الكامل",
      afterSubmit: "بعد التسجيل سيتواصل معك الفريق عبر البريد أو الواتساب",
    },
    service: {
      title: "تقديم طلب خدمة",
      subtitle: "يرجى ملء النموذج لتقديم طلبك",
      fullName: "الاسم الكامل",
      phone: "رقم الجوال (واتساب)",
      email: "البريد الإلكتروني",
      serviceType: "نوع الخدمة",
      details: "تفاصيل الطلب",
      fileLink: "رابط الملفات",
      optional: "(اختياري)",
      submit: "تقديم الطلب الآن 📤",
      submitting: "جاري الإرسال...",
      success: "تم استلام طلبك!",
      successDesc: "تم حفظ طلبك وسيتواصل معك الفريق خلال 24 ساعة.",
      close: "إغلاق",
      afterSubmit: "بعد التقديم سيتواصل معك الفريق خلال 24 ساعة",
    },
    degrees: {
      student: "طالب طب / Medical Student",
      intern: "إنترن / Intern",
      resident: "مقيم / Resident",
      fellow: "زميل / Fellow",
      specialist: "أخصائي / Specialist",
      consultant: "استشاري / Consultant",
      professor: "أستاذ / Professor",
      postgrad: "طالب دراسات عليا",
      other: "أخرى / Other",
    },
  },
  en: {
    nav: {
      home: "Home",
      knowledge: "Knowledge Center",
      about: "About",
      participant: "Participant Portal",
      coordinator: "Coordinator Portal",
      special: "Special Requests ⭐",
      whatsapp: "Contact via WhatsApp",
    },
    hero: {
      badge: "Research Scientific Publications Forum · Edition 2026",
      title1: "The ",
      title2: "Leading ",
      title3: "Medical Research Platform in ",
      title4: "Saudi Arabia",
      subtitle: "We provide an integrated research platform combining academic expertise and comprehensive support to help you publish in the world's top scientific journals.",
      explore: "Explore Research Opportunities",
      learnMore: "Learn More",
    },
    registration: {
      title: "Research Opportunity Registration",
      fullName: "الاسم الكامل",
      fullNameEn: "Full Name",
      specialization: "التخصص الدقيق",
      specializationEn: "Specialization",
      academicDegree: "الدرجة الأكاديمية",
      academicDegreeEn: "Academic Degree",
      email: "البريد الإلكتروني",
      emailEn: "Email",
      affiliation: "جهة الانتساب",
      affiliationEn: "Affiliation / Hospital",
      city: "City",
      country: "Country",
      whatsapp: "رقم واتساب",
      whatsappEn: "WhatsApp Number",
      orcid: "ORCID Number",
      optional: "Optional",
      required: "Required",
      submit: "Register Now 👤",
      submitting: "Submitting...",
      success: "Registration Received!",
      successDesc: "Your data has been saved. The RSPF team will contact you soon.",
      close: "Close",
      error: "An error occurred while submitting",
      fullNumber: "Full number",
      afterSubmit: "The team will contact you via email or WhatsApp after registration",
    },
    service: {
      title: "Submit a Service Request",
      subtitle: "Please fill out the form to submit your request",
      fullName: "Full Name",
      phone: "Phone (WhatsApp)",
      email: "Email",
      serviceType: "Service Type",
      details: "Request Details",
      fileLink: "File Link",
      optional: "(Optional)",
      submit: "Submit Request 📤",
      submitting: "Submitting...",
      success: "Request Received!",
      successDesc: "Your request has been saved. The team will contact you within 24 hours.",
      close: "Close",
      afterSubmit: "The team will contact you within 24 hours",
    },
    degrees: {
      student: "Medical Student",
      intern: "Intern",
      resident: "Resident",
      fellow: "Fellow",
      specialist: "Specialist",
      consultant: "Consultant",
      professor: "Professor / Academic",
      postgrad: "Postgraduate Student",
      other: "Other",
    },
  },
};

export type Translations = typeof translations.ar;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  t: translations.ar,
  dir: "rtl",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("rspf_lang") as Lang) || "ar";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("rspf_lang", l);
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export const ACADEMIC_DEGREES = (t: Translations) => [
  { value: "medical_student", label: t.degrees.student },
  { value: "intern", label: t.degrees.intern },
  { value: "resident", label: t.degrees.resident },
  { value: "fellow", label: t.degrees.fellow },
  { value: "specialist", label: t.degrees.specialist },
  { value: "consultant", label: t.degrees.consultant },
  { value: "professor", label: t.degrees.professor },
  { value: "postgrad", label: t.degrees.postgrad },
  { value: "other", label: t.degrees.other },
];

export const UNIVERSITIES: { name: string; city: string; country: string }[] = [
  { name: "جامعة الملك سعود", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "جامعة الملك عبدالعزيز", city: "جدة", country: "المملكة العربية السعودية" },
  { name: "جامعة الملك فهد للبترول والمعادن", city: "الظهران", country: "المملكة العربية السعودية" },
  { name: "جامعة الملك فيصل", city: "الأحساء", country: "المملكة العربية السعودية" },
  { name: "جامعة الملك خالد", city: "أبها", country: "المملكة العربية السعودية" },
  { name: "جامعة أم القرى", city: "مكة المكرمة", country: "المملكة العربية السعودية" },
  { name: "الجامعة الإسلامية بالمدينة المنورة", city: "المدينة المنورة", country: "المملكة العربية السعودية" },
  { name: "جامعة الإمام محمد بن سعود الإسلامية", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "جامعة الإمام عبدالرحمن بن فيصل", city: "الدمام", country: "المملكة العربية السعودية" },
  { name: "جامعة القصيم", city: "بريدة", country: "المملكة العربية السعودية" },
  { name: "جامعة تبوك", city: "تبوك", country: "المملكة العربية السعودية" },
  { name: "جامعة حائل", city: "حائل", country: "المملكة العربية السعودية" },
  { name: "جامعة نجران", city: "نجران", country: "المملكة العربية السعودية" },
  { name: "جامعة جازان", city: "جازان", country: "المملكة العربية السعودية" },
  { name: "جامعة الجوف", city: "سكاكا", country: "المملكة العربية السعودية" },
  { name: "جامعة الأمير سطام بن عبدالعزيز", city: "الخرج", country: "المملكة العربية السعودية" },
  { name: "جامعة الأمير سلطان", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "جامعة الملك عبدالله للعلوم والتقنية (كاوست)", city: "جدة", country: "المملكة العربية السعودية" },
  { name: "جامعة الأمير محمد بن فهد", city: "الدمام", country: "المملكة العربية السعودية" },
  { name: "جامعة الأمير نورة بنت عبدالرحمن", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "كلية الملك سعود الطبية", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "الكلية الطبية العسكرية", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "مستشفى الملك فيصل التخصصي ومركز الأبحاث", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "مستشفى الملك فيصل التخصصي ومركز الأبحاث - جدة", city: "جدة", country: "المملكة العربية السعودية" },
  { name: "مدينة الملك سلمان الطبية", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "مستشفى الملك عبدالعزيز الجامعي", city: "الرياض", country: "المملكة العربية السعودية" },
  { name: "جامعة الكويت", city: "الكويت", country: "الكويت" },
  { name: "جامعة البحرين", city: "المنامة", country: "البحرين" },
  { name: "جامعة قطر", city: "الدوحة", country: "قطر" },
  { name: "جامعة الإمارات العربية المتحدة", city: "العين", country: "الإمارات" },
  { name: "جامعة الشارقة", city: "الشارقة", country: "الإمارات" },
  { name: "جامعة محمد بن زايد للعلوم الاصطناعية", city: "أبوظبي", country: "الإمارات" },
  { name: "جامعة السلطان قابوس", city: "مسقط", country: "عُمان" },
  { name: "جامعة الأردن", city: "عمان", country: "الأردن" },
  { name: "الجامعة الأمريكية في بيروت", city: "بيروت", country: "لبنان" },
  { name: "جامعة القاهرة", city: "القاهرة", country: "مصر" },
  { name: "جامعة عين شمس", city: "القاهرة", country: "مصر" },
  { name: "أخرى / Other", city: "", country: "" },
];
