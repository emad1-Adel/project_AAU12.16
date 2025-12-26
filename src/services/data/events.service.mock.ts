import { EventItem } from '@/types';

const mockEvents: EventItem[] = [
  {
    id: '1',
    slug: 'opening-ceremony-2024',
    titleAr: 'حفل الافتتاح للعام الدراسي 2024',
    titleEn: 'Opening Ceremony 2024',
    descriptionAr: 'حفل افتتاح العام الدراسي الجديد بحضور رئيس الجامعة وأعضاء الهيئة التدريسية',
    descriptionEn: 'Opening ceremony for the new academic year attended by the university president and faculty members',
    contentAr: 'يسر جامعة الوطنية الخاصة دعوتكم لحضور حفل افتتاح العام الدراسي 2024. سيتضمن الحفل كلمة رئيس الجامعة، عرض إنجازات العام الماضي، والخطط المستقبلية للجامعة.',
    contentEn: 'National Private University is pleased to invite you to attend the opening ceremony of the academic year 2024. The ceremony will include a speech by the university president, a presentation of last year achievements, and future plans for the university.',
    date: '2024-09-15',
    locationAr: 'القاعة الرئيسية - مبنى الإدارة',
    locationEn: 'Main Hall - Administration Building',
    organizerAr: 'إدارة الجامعة',
    organizerEn: 'University Administration',
    category: 'academic',
    status: 'completed',
    registrationRequired: false,
  },
  {
    id: '2',
    slug: 'tech-conference-2024',
    titleAr: 'مؤتمر التقنية والابتكار 2024',
    titleEn: 'Technology and Innovation Conference 2024',
    descriptionAr: 'مؤتمر علمي حول أحدث التطورات في مجال التكنولوجيا والذكاء الاصطناعي',
    descriptionEn: 'Scientific conference on the latest developments in technology and artificial intelligence',
    contentAr: 'مؤتمر علمي متخصص يستضيف خبراء من مختلف الجامعات والشركات التقنية لمناقشة أحدث التطورات في مجال الذكاء الاصطناعي والتعلم الآلي.',
    contentEn: 'Specialized scientific conference hosting experts from various universities and technology companies to discuss the latest developments in artificial intelligence and machine learning.',
    date: '2024-11-20',
    endDate: '2024-11-22',
    locationAr: 'مدرج كلية الهندسة المعلوماتية',
    locationEn: 'Informatics Engineering College Auditorium',
    organizerAr: 'كلية الهندسة المعلوماتية',
    organizerEn: 'College of Informatics Engineering',
    category: 'academic',
    status: 'upcoming',
    registrationRequired: true,
    registrationLink: '/contact',
  },
  {
    id: '3',
    slug: 'sports-day-2024',
    titleAr: 'اليوم الرياضي السنوي',
    titleEn: 'Annual Sports Day',
    descriptionAr: 'يوم رياضي مليء بالمنافسات والفعاليات الرياضية المتنوعة',
    descriptionEn: 'A sports day full of competitions and various sporting events',
    contentAr: 'يوم رياضي شامل يتضمن منافسات في كرة القدم، كرة السلة، الطائرة، ألعاب القوى، وغيرها من الأنشطة الرياضية.',
    contentEn: 'Comprehensive sports day including competitions in football, basketball, volleyball, athletics, and other sports activities.',
    date: '2024-12-05',
    locationAr: 'الملاعب الرياضية - الحرم الجامعي',
    locationEn: 'Sports Fields - Campus',
    organizerAr: 'عمادة شؤون الطلاب',
    organizerEn: 'Dean of Student Affairs',
    category: 'sports',
    status: 'upcoming',
    registrationRequired: false,
  },
  {
    id: '4',
    slug: 'cultural-week-2024',
    titleAr: 'الأسبوع الثقافي 2024',
    titleEn: 'Cultural Week 2024',
    descriptionAr: 'أسبوع ثقافي متنوع يتضمن معارض فنية، ندوات أدبية، وعروض موسيقية',
    descriptionEn: 'Diverse cultural week including art exhibitions, literary seminars, and musical performances',
    contentAr: 'أسبوع ثقافي شامل يحتفي بالتنوع الثقافي ويتضمن معارض فنية، ندوات أدبية، عروض مسرحية، حفلات موسيقية، ومسابقات ثقافية.',
    contentEn: 'Comprehensive cultural week celebrating cultural diversity including art exhibitions, literary seminars, theatrical performances, musical concerts, and cultural competitions.',
    date: '2025-01-15',
    endDate: '2025-01-20',
    locationAr: 'مركز الفعاليات الثقافية',
    locationEn: 'Cultural Events Center',
    organizerAr: 'النادي الثقافي',
    organizerEn: 'Cultural Club',
    category: 'cultural',
    status: 'upcoming',
    registrationRequired: false,
  },
  {
    id: '5',
    slug: 'career-fair-2024',
    titleAr: 'معرض التوظيف والمهن 2024',
    titleEn: 'Career Fair 2024',
    descriptionAr: 'معرض يجمع الطلاب بالشركات الرائدة لفرص التوظيف والتدريب',
    descriptionEn: 'Fair bringing students together with leading companies for employment and training opportunities',
    contentAr: 'معرض سنوي يستضيف العديد من الشركات والمؤسسات لتقديم فرص عمل وتدريب للطلاب والخريجين. يتضمن المعرض جلسات إرشادية وورش عمل حول كتابة السيرة الذاتية ومهارات المقابلة.',
    contentEn: 'Annual fair hosting many companies and institutions to provide employment and training opportunities for students and graduates. The fair includes guidance sessions and workshops on resume writing and interview skills.',
    date: '2025-02-10',
    locationAr: 'القاعة الكبرى - المركز الطلابي',
    locationEn: 'Grand Hall - Student Center',
    organizerAr: 'مكتب التوظيف والخريجين',
    organizerEn: 'Employment and Alumni Office',
    category: 'academic',
    status: 'upcoming',
    registrationRequired: true,
  },
  {
    id: '6',
    slug: 'graduation-ceremony-2024',
    titleAr: 'حفل التخرج 2024',
    titleEn: 'Graduation Ceremony 2024',
    descriptionAr: 'حفل تخرج دفعة 2024 وتكريم الطلاب المتفوقين',
    descriptionEn: 'Graduation ceremony for the class of 2024 and honoring outstanding students',
    contentAr: 'حفل تخرج مهيب للدفعة الجديدة من خريجي الجامعة، يتضمن توزيع الشهادات، تكريم الطلاب المتفوقين، وكلمات من رئيس الجامعة والخريجين.',
    contentEn: 'Grand graduation ceremony for the new batch of university graduates, including certificate distribution, honoring outstanding students, and speeches from the university president and graduates.',
    date: '2024-07-20',
    locationAr: 'مسرح الجامعة المفتوح',
    locationEn: 'University Open Theater',
    organizerAr: 'إدارة الجامعة',
    organizerEn: 'University Administration',
    category: 'academic',
    status: 'completed',
    registrationRequired: false,
  },
  {
    id: '7',
    slug: 'health-awareness-day',
    titleAr: 'يوم التوعية الصحية',
    titleEn: 'Health Awareness Day',
    descriptionAr: 'يوم توعوي صحي يتضمن فحوصات مجانية ومحاضرات صحية',
    descriptionEn: 'Health awareness day including free checkups and health lectures',
    contentAr: 'يوم توعوي شامل بالتعاون مع كلية الصيدلة والمراكز الصحية، يتضمن فحوصات طبية مجانية، محاضرات حول الصحة العامة، والوقاية من الأمراض.',
    contentEn: 'Comprehensive awareness day in cooperation with the College of Pharmacy and health centers, including free medical checkups, lectures on public health, and disease prevention.',
    date: '2025-03-15',
    locationAr: 'المركز الصحي الجامعي',
    locationEn: 'University Health Center',
    organizerAr: 'كلية الصيدلة',
    organizerEn: 'College of Pharmacy',
    category: 'social',
    status: 'upcoming',
    registrationRequired: false,
  },
  {
    id: '8',
    slug: 'startup-pitch-competition',
    titleAr: 'مسابقة عرض المشاريع الناشئة',
    titleEn: 'Startup Pitch Competition',
    descriptionAr: 'مسابقة لعرض أفكار المشاريع الريادية والحصول على دعم وتمويل',
    descriptionEn: 'Competition to pitch entrepreneurial project ideas and receive support and funding',
    contentAr: 'مسابقة سنوية لتشجيع الطلاب على تقديم أفكارهم الريادية والحصول على فرصة للحصول على تمويل وإرشاد لتطوير مشاريعهم.',
    contentEn: 'Annual competition to encourage students to present their entrepreneurial ideas and get a chance to receive funding and mentorship to develop their projects.',
    date: '2025-04-10',
    locationAr: 'مركز ريادة الأعمال',
    locationEn: 'Entrepreneurship Center',
    organizerAr: 'مركز ريادة الأعمال',
    organizerEn: 'Entrepreneurship Center',
    category: 'academic',
    status: 'upcoming',
    registrationRequired: true,
    registrationLink: '/contact',
  },
];

export const eventsService = {
  getAllEvents: async (): Promise<EventItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getEventById: async (id: string): Promise<EventItem | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockEvents.find(event => event.id === id);
  },

  getEventBySlug: async (slug: string): Promise<EventItem | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockEvents.find(event => event.slug === slug);
  },

  getUpcomingEvents: async (): Promise<EventItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEvents
      .filter(event => event.status === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  getEventsByCategory: async (category: string): Promise<EventItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEvents.filter(event => event.category === category);
  },
};
