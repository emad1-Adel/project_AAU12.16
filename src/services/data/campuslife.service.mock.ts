import { CampusLifeItem } from '@/types';

const mockCampusLifeItems: CampusLifeItem[] = [
  {
    id: '1',
    titleAr: 'المكتبة المركزية',
    titleEn: 'Central Library',
    descriptionAr: 'مكتبة حديثة مجهزة بأحدث الكتب والمراجع العلمية ومساحات دراسة هادئة',
    descriptionEn: 'Modern library equipped with the latest books, scientific references, and quiet study spaces',
    category: 'facilities',
  },
  {
    id: '2',
    titleAr: 'المختبرات العلمية',
    titleEn: 'Scientific Laboratories',
    descriptionAr: 'مختبرات متطورة مجهزة بأحدث التقنيات للتجارب العملية والأبحاث',
    descriptionEn: 'Advanced laboratories equipped with the latest technologies for practical experiments and research',
    category: 'facilities',
  },
  {
    id: '3',
    titleAr: 'الملاعب الرياضية',
    titleEn: 'Sports Fields',
    descriptionAr: 'ملاعب مجهزة لمختلف الألعاب الرياضية: كرة القدم، السلة، الطائرة، والتنس',
    descriptionEn: 'Fields equipped for various sports: football, basketball, volleyball, and tennis',
    category: 'facilities',
  },
  {
    id: '4',
    titleAr: 'المركز الصحي',
    titleEn: 'Health Center',
    descriptionAr: 'مركز طبي متكامل يقدم الخدمات الصحية للطلاب والموظفين',
    descriptionEn: 'Integrated medical center providing health services for students and staff',
    category: 'facilities',
  },
  {
    id: '5',
    titleAr: 'المطاعم والكافيتريات',
    titleEn: 'Restaurants and Cafeterias',
    descriptionAr: 'مطاعم وكافيتريات متنوعة تقدم وجبات صحية ولذيذة',
    descriptionEn: 'Various restaurants and cafeterias offering healthy and delicious meals',
    category: 'facilities',
  },
  {
    id: '6',
    titleAr: 'النادي الطلابي',
    titleEn: 'Student Club',
    descriptionAr: 'مساحة ترفيهية للطلاب تتضمن ألعاب وأنشطة متنوعة',
    descriptionEn: 'Entertainment space for students including games and various activities',
    category: 'activities',
  },
  {
    id: '7',
    titleAr: 'الأنشطة الرياضية',
    titleEn: 'Sports Activities',
    descriptionAr: 'دوريات رياضية منتظمة وبطولات في مختلف الألعاب',
    descriptionEn: 'Regular sports leagues and championships in various games',
    category: 'activities',
  },
  {
    id: '8',
    titleAr: 'الأنشطة الثقافية',
    titleEn: 'Cultural Activities',
    descriptionAr: 'ندوات ثقافية، معارض فنية، وأمسيات أدبية منتظمة',
    descriptionEn: 'Cultural seminars, art exhibitions, and regular literary evenings',
    category: 'activities',
  },
  {
    id: '9',
    titleAr: 'النادي العلمي',
    titleEn: 'Scientific Club',
    descriptionAr: 'ورش عمل علمية ومسابقات تقنية وجلسات برمجية',
    descriptionEn: 'Scientific workshops, technical competitions, and programming sessions',
    category: 'activities',
  },
  {
    id: '10',
    titleAr: 'النشاطات التطوعية',
    titleEn: 'Volunteer Activities',
    descriptionAr: 'برامج تطوعية منتظمة خدمة للمجتمع المحلي',
    descriptionEn: 'Regular volunteer programs serving the local community',
    category: 'activities',
  },
  {
    id: '11',
    titleAr: 'الحرم الجامعي',
    titleEn: 'University Campus',
    descriptionAr: 'حرم جامعي واسع ومنظم مع مساحات خضراء ومناطق استراحة',
    descriptionEn: 'Spacious and organized campus with green spaces and rest areas',
    category: 'campus',
  },
  {
    id: '12',
    titleAr: 'المواصلات الجامعية',
    titleEn: 'University Transportation',
    descriptionAr: 'خدمة حافلات منتظمة تربط الجامعة بمختلف مناطق المدينة',
    descriptionEn: 'Regular bus service connecting the university to various city areas',
    category: 'campus',
  },
  {
    id: '13',
    titleAr: 'مواقف السيارات',
    titleEn: 'Parking Lots',
    descriptionAr: 'مواقف واسعة ومؤمنة للطلاب والموظفين',
    descriptionEn: 'Spacious and secure parking for students and staff',
    category: 'campus',
  },
  {
    id: '14',
    titleAr: 'مركز التقنية',
    titleEn: 'Technology Center',
    descriptionAr: 'مركز مجهز بأحدث التقنيات وخدمات الإنترنت عالي السرعة',
    descriptionEn: 'Center equipped with the latest technologies and high-speed internet services',
    category: 'facilities',
  },
  {
    id: '15',
    titleAr: 'قاعات المحاضرات',
    titleEn: 'Lecture Halls',
    descriptionAr: 'قاعات محاضرات مجهزة بأحدث أنظمة العرض والصوت',
    descriptionEn: 'Lecture halls equipped with the latest display and sound systems',
    category: 'facilities',
  },
];

export const campusLifeService = {
  getAllItems: async (): Promise<CampusLifeItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCampusLifeItems;
  },

  getItemsByCategory: async (category: string): Promise<CampusLifeItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCampusLifeItems.filter(item => item.category === category);
  },
};
