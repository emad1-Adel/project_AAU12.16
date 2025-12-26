import { CenterItem } from '@/types';

const mockCenters: CenterItem[] = [
  {
    id: 'research',
    titleAr: 'مركز البحوث والدراسات',
    titleEn: 'Research and Studies Center',
    descAr: 'مركز متخصص في البحث العلمي والدراسات الأكاديمية المتقدمة',
    descEn: 'Specialized center for scientific research and advanced academic studies',
    services: [
      { ar: 'إجراء البحوث العلمية', en: 'Conducting scientific research' },
      { ar: 'نشر الأبحاث في مجلات عالمية', en: 'Publishing research in international journals' },
      { ar: 'الإشراف على رسائل الماجستير والدكتوراه', en: 'Supervising master and PhD theses' },
      { ar: 'تنظيم المؤتمرات العلمية', en: 'Organizing scientific conferences' },
      { ar: 'التعاون البحثي الدولي', en: 'International research collaboration' },
    ],
    programs: [
      { ar: 'برنامج البحث المتقدم', en: 'Advanced Research Program' },
      { ar: 'برنامج النشر العلمي', en: 'Scientific Publishing Program' },
      { ar: 'برنامج الباحث الزائر', en: 'Visiting Researcher Program' },
      { ar: 'برنامج المنح البحثية', en: 'Research Grants Program' },
    ],
  },
  {
    id: 'training',
    titleAr: 'مركز التدريب والتطوير',
    titleEn: 'Training and Development Center',
    descAr: 'برامج تدريبية متنوعة لتطوير المهارات والقدرات',
    descEn: 'Diverse training programs for skills and capabilities development',
    services: [
      { ar: 'دورات تدريبية متخصصة', en: 'Specialized training courses' },
      { ar: 'ورش عمل عملية', en: 'Practical workshops' },
      { ar: 'شهادات معتمدة', en: 'Certified certificates' },
      { ar: 'برامج تطوير مهني', en: 'Professional development programs' },
      { ar: 'التدريب عن بعد', en: 'Remote training' },
    ],
    programs: [
      { ar: 'برنامج تطوير المهارات', en: 'Skills Development Program' },
      { ar: 'برنامج القيادة', en: 'Leadership Program' },
      { ar: 'برنامج ريادة الأعمال', en: 'Entrepreneurship Program' },
      { ar: 'برنامج اللغات', en: 'Languages Program' },
    ],
  },
  {
    id: 'consulting',
    titleAr: 'مركز الاستشارات',
    titleEn: 'Consulting Center',
    descAr: 'خدمات استشارية متخصصة للمؤسسات والأفراد',
    descEn: 'Specialized consulting services for institutions and individuals',
    services: [
      { ar: 'استشارات إدارية', en: 'Management consulting' },
      { ar: 'استشارات تقنية', en: 'Technical consulting' },
      { ar: 'استشارات أكاديمية', en: 'Academic consulting' },
      { ar: 'استشارات قانونية', en: 'Legal consulting' },
      { ar: 'استشارات تطوير الأعمال', en: 'Business development consulting' },
    ],
    programs: [
      { ar: 'برنامج الاستشارات المؤسسية', en: 'Institutional Consulting Program' },
      { ar: 'برنامج التطوير الاستراتيجي', en: 'Strategic Development Program' },
      { ar: 'برنامج التحول الرقمي', en: 'Digital Transformation Program' },
      { ar: 'برنامج تحسين الجودة', en: 'Quality Improvement Program' },
    ],
  },
];

export const centersService = {
  getAll: (): Promise<CenterItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCenters), 300);
    });
  },

  getById: (id: string): Promise<CenterItem | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const center = mockCenters.find((c) => c.id === id);
        resolve(center || null);
      }, 200);
    });
  },
};
