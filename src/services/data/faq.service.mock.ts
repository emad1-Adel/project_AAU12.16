import { FAQItem } from '@/types';

const mockFAQs: FAQItem[] = [
  {
    id: '1',
    questionAr: 'كيف يمكنني التقديم للجامعة؟',
    questionEn: 'How can I apply to the university?',
    answerAr: 'يمكنك التقديم من خلال البوابة الإلكترونية للجامعة. قم بإنشاء حساب جديد، املأ نموذج التقديم، وأرفق المستندات المطلوبة. سيتم مراجعة طلبك خلال 7-10 أيام عمل.',
    answerEn: 'You can apply through the university\'s online portal. Create a new account, fill out the application form, and attach the required documents. Your application will be reviewed within 7-10 business days.',
    category: 'admission',
  },
  {
    id: '2',
    questionAr: 'ما هي الرسوم الدراسية؟',
    questionEn: 'What are the tuition fees?',
    answerAr: 'تختلف الرسوم الدراسية حسب التخصص والكلية. يمكنك الاطلاع على جدول الرسوم الكامل في صفحة القبول والتسجيل. كما نوفر خيارات للتقسيط ومنح دراسية للطلاب المتفوقين.',
    answerEn: 'Tuition fees vary by major and college. You can view the complete fee schedule on the admissions page. We also offer installment options and scholarships for excellent students.',
    category: 'fees',
  },
  {
    id: '3',
    questionAr: 'هل توفر الجامعة سكنًا للطلاب؟',
    questionEn: 'Does the university provide student housing?',
    answerAr: 'نعم، توفر الجامعة سكنًا للطلاب من خارج المدينة. يتضمن السكن غرفًا مشتركة ومفردة مع جميع المرافق الأساسية. يجب التقديم للسكن مبكرًا بسبب محدودية الأماكن.',
    answerEn: 'Yes, the university provides housing for students from outside the city. Housing includes shared and single rooms with all basic facilities. Early application is required due to limited availability.',
    category: 'housing',
  },
  {
    id: '4',
    questionAr: 'كيف يمكنني الحصول على منحة دراسية؟',
    questionEn: 'How can I get a scholarship?',
    answerAr: 'نقدم عدة أنواع من المنح الدراسية بناءً على التفوق الأكاديمي، الحالة المادية، أو التميز في الأنشطة. يمكنك التقديم للمنح من خلال بوابة الطالب خلال فترة التقديم المحددة.',
    answerEn: 'We offer several types of scholarships based on academic excellence, financial need, or excellence in activities. You can apply for scholarships through the student portal during the specified application period.',
    category: 'scholarship',
  },
  {
    id: '5',
    questionAr: 'ما هي مواعيد التسجيل؟',
    questionEn: 'What are the registration dates?',
    answerAr: 'يبدأ التسجيل للفصل الخريفي في شهر يونيو، وللفصل الربيعي في شهر ديسمبر. ننصح بالتسجيل المبكر لضمان الحصول على الشعب والمواد المطلوبة.',
    answerEn: 'Registration for the fall semester begins in June, and for the spring semester in December. We recommend early registration to ensure availability of required sections and courses.',
    category: 'registration',
  },
  {
    id: '6',
    questionAr: 'هل يمكنني تحويل الكلية أو التخصص؟',
    questionEn: 'Can I transfer college or major?',
    answerAr: 'نعم، يمكنك تقديم طلب تحويل بعد إكمال فصل دراسي واحد على الأقل. يجب استيفاء شروط التحويل والحصول على موافقة الكليتين المعنيتين.',
    answerEn: 'Yes, you can submit a transfer request after completing at least one semester. You must meet the transfer requirements and obtain approval from both colleges involved.',
    category: 'academic',
  },
];

export const faqService = {
  getAll: (): Promise<FAQItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFAQs), 300);
    });
  },

  getByCategory: (category: string): Promise<FAQItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFAQs.filter((f) => f.category === category));
      }, 300);
    });
  },
};
