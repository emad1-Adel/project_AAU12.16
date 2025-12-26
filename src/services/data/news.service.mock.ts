import { NewsItem } from '@/types';

const mockNews: NewsItem[] = [
  {
    id: '1',
    slug: 'new-college-building-opening',
    titleAr: 'افتتاح مبنى الكلية الجديد',
    titleEn: 'Opening of New College Building',
    descriptionAr: 'افتتاح رسمي لمبنى الكلية الجديد بحضور كبار المسؤولين',
    descriptionEn: 'Official opening of the new college building with senior officials',
    contentAr: 'تم افتتاح مبنى الكلية الجديد بحضور كبار المسؤولين والطلاب. يضم المبنى الجديد قاعات دراسية حديثة ومختبرات متطورة ومكتبة رقمية شاملة. يهدف هذا المشروع إلى توفير بيئة تعليمية متطورة تدعم التميز الأكاديمي والبحث العلمي. المبنى مجهز بأحدث التقنيات التعليمية ويتسع لأكثر من 2000 طالب وطالبة.',
    contentEn: 'The new college building was opened in the presence of senior officials and students. The new building includes modern classrooms, advanced laboratories, and a comprehensive digital library. This project aims to provide an advanced educational environment that supports academic excellence and scientific research. The building is equipped with the latest educational technologies and can accommodate more than 2000 students.',
    image: '/placeholder.svg',
    date: '2025-01-15',
    views: 245,
    tags: ['infrastructure', 'education', 'facilities'],
  },
  {
    id: '2',
    slug: 'research-excellence-award',
    titleAr: 'جائزة التميز البحثي للجامعة',
    titleEn: 'University Research Excellence Award',
    descriptionAr: 'الجامعة تحصل على جائزة التميز البحثي لعام 2025',
    descriptionEn: 'University receives Research Excellence Award for 2025',
    contentAr: 'حصلت جامعتنا على جائزة التميز البحثي لعام 2025 تقديرًا لمساهماتها المتميزة في مجال البحث العلمي. تم تكريم عدد من الباحثين المتميزين في حفل أقيم بحضور ممثلين من وزارة التعليم العالي والبحث العلمي. هذا الإنجاز يعكس التزام الجامعة بدعم البحث العلمي والابتكار.',
    contentEn: 'Our university received the Research Excellence Award for 2025 in recognition of its outstanding contributions in scientific research. Several distinguished researchers were honored at a ceremony attended by representatives from the Ministry of Higher Education and Scientific Research. This achievement reflects the university\'s commitment to supporting scientific research and innovation.',
    image: '/placeholder.svg',
    date: '2025-01-10',
    views: 189,
    tags: ['research', 'award', 'excellence'],
  },
  {
    id: '3',
    slug: 'international-partnership',
    titleAr: 'شراكة دولية جديدة مع جامعات أوروبية',
    titleEn: 'New International Partnership with European Universities',
    descriptionAr: 'توقيع اتفاقية شراكة استراتيجية مع جامعات رائدة في أوروبا',
    descriptionEn: 'Signing a strategic partnership agreement with leading European universities',
    contentAr: 'وقعت الجامعة اتفاقية شراكة استراتيجية مع ثلاث جامعات أوروبية رائدة لتبادل الطلاب والباحثين وتطوير برامج أكاديمية مشتركة. تهدف هذه الشراكة إلى تعزيز التعاون الأكاديمي الدولي وإتاحة فرص جديدة للطلاب للدراسة في الخارج.',
    contentEn: 'The university signed a strategic partnership agreement with three leading European universities to exchange students and researchers and develop joint academic programs. This partnership aims to enhance international academic cooperation and provide new opportunities for students to study abroad.',
    image: '/placeholder.svg',
    date: '2025-01-05',
    views: 312,
    tags: ['partnership', 'international', 'collaboration'],
  },
  {
    id: '4',
    slug: 'digital-library-launch',
    titleAr: 'إطلاق المكتبة الرقمية الشاملة',
    titleEn: 'Launch of Comprehensive Digital Library',
    descriptionAr: 'افتتاح مكتبة رقمية تحتوي على أكثر من 50,000 مرجع علمي',
    descriptionEn: 'Opening of digital library containing over 50,000 scientific references',
    contentAr: 'أطلقت الجامعة مكتبتها الرقمية الجديدة التي تحتوي على أكثر من 50,000 مرجع علمي في مختلف التخصصات. المكتبة متاحة للطلاب والباحثين على مدار الساعة وتوفر إمكانية البحث المتقدم والوصول الفوري للمحتوى.',
    contentEn: 'The university launched its new digital library containing over 50,000 scientific references across various disciplines. The library is available 24/7 for students and researchers, offering advanced search capabilities and instant access to content.',
    image: '/placeholder.svg',
    date: '2024-12-20',
    views: 428,
    tags: ['education', 'technology', 'library'],
  },
  {
    id: '5',
    slug: 'student-innovation-competition',
    titleAr: 'مسابقة الابتكار الطلابي السنوية',
    titleEn: 'Annual Student Innovation Competition',
    descriptionAr: 'انطلاق النسخة الخامسة من مسابقة الابتكار الطلابي',
    descriptionEn: 'Launch of the fifth edition of the Student Innovation Competition',
    contentAr: 'انطلقت النسخة الخامسة من مسابقة الابتكار الطلابي بمشاركة أكثر من 100 مشروع طلابي مبتكر في مجالات التكنولوجيا والهندسة والعلوم. المسابقة تهدف لتشجيع الإبداع والابتكار بين الطلاب وتوفير فرص لتحويل أفكارهم إلى مشاريع واقعية.',
    contentEn: 'The fifth edition of the Student Innovation Competition was launched with over 100 innovative student projects in technology, engineering, and science fields. The competition aims to encourage creativity and innovation among students and provide opportunities to turn their ideas into real projects.',
    image: '/placeholder.svg',
    date: '2024-12-15',
    views: 356,
    tags: ['students', 'innovation', 'competition'],
  },
  {
    id: '6',
    slug: 'sports-tournament-2025',
    titleAr: 'بطولة الجامعة الرياضية 2025',
    titleEn: 'University Sports Tournament 2025',
    descriptionAr: 'انطلاق البطولة الرياضية السنوية بمشاركة جميع الكليات',
    descriptionEn: 'Launch of the annual sports tournament with participation from all colleges',
    contentAr: 'انطلقت البطولة الرياضية السنوية للجامعة بمشاركة فرق من جميع الكليات في مختلف الألعاب الرياضية. البطولة تستمر لمدة أسبوعين وتشمل كرة القدم وكرة السلة والكرة الطائرة وألعاب القوى.',
    contentEn: 'The university\'s annual sports tournament was launched with teams from all colleges participating in various sports. The tournament lasts for two weeks and includes football, basketball, volleyball, and athletics.',
    image: '/placeholder.svg',
    date: '2024-12-10',
    views: 289,
    tags: ['sports', 'events', 'students'],
  },
  {
    id: '7',
    slug: 'cultural-festival',
    titleAr: 'المهرجان الثقافي السنوي',
    titleEn: 'Annual Cultural Festival',
    descriptionAr: 'احتفالية ثقافية وفنية بمشاركة الطلاب والفنانين المحليين',
    descriptionEn: 'Cultural and artistic celebration with participation of students and local artists',
    contentAr: 'نظمت الجامعة مهرجانها الثقافي السنوي الذي شهد فعاليات متنوعة من عروض فنية وموسيقية ومعارض للفنون التشكيلية. المهرجان يهدف لتعزيز الحياة الثقافية في الجامعة وإبراز مواهب الطلاب.',
    contentEn: 'The university organized its annual cultural festival featuring diverse activities including artistic and musical performances and visual arts exhibitions. The festival aims to enhance cultural life at the university and showcase student talents.',
    image: '/placeholder.svg',
    date: '2024-12-05',
    views: 412,
    tags: ['culture', 'events', 'arts'],
  },
  {
    id: '8',
    slug: 'career-fair-2025',
    titleAr: 'معرض التوظيف 2025',
    titleEn: 'Career Fair 2025',
    descriptionAr: 'معرض توظيف بمشاركة أكثر من 50 شركة رائدة',
    descriptionEn: 'Career fair with participation of over 50 leading companies',
    contentAr: 'استضافت الجامعة معرض التوظيف السنوي بمشاركة أكثر من 50 شركة محلية ودولية رائدة. المعرض وفر فرص توظيف مباشرة للطلاب والخريجين في مختلف التخصصات، بالإضافة إلى ورش عمل تدريبية وجلسات إرشادية.',
    contentEn: 'The university hosted its annual career fair with participation from over 50 leading local and international companies. The fair provided direct employment opportunities for students and graduates across various specializations, along with training workshops and counseling sessions.',
    image: '/placeholder.svg',
    date: '2024-11-28',
    views: 523,
    tags: ['employment', 'career', 'students'],
  },
];

export const newsService = {
  getAll: (): Promise<NewsItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockNews), 300);
    });
  },

  getBySlug: (slug: string): Promise<NewsItem | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const news = mockNews.find((n) => n.slug === slug);
        resolve(news || null);
      }, 200);
    });
  },

  getRecent: (limit: number = 3): Promise<NewsItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockNews.slice(0, limit));
      }, 200);
    });
  },

  search: (query: string): Promise<NewsItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockNews.filter(
          (n) =>
            n.titleAr.includes(query) ||
            n.titleEn.toLowerCase().includes(query.toLowerCase()) ||
            n.descriptionAr.includes(query) ||
            n.descriptionEn.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  },
};
